import { create } from 'zustand';
import {
  type GridConfig,
  type AnimationConfig,
  type ColorConfig,
  type EffectsConfig,
  type GridAnimatorConfig,
  type GridAnimatorInstance,
  type DragState,
  type ResizeState,
  type MarqueeState,
  type ClipboardEntry,
  ResizeCorner,
} from '../_types/grid-animator-types';
import {
  DEFAULT_CONFIG,
  DEFAULT_EXPANDED_SECTIONS,
  DEFAULT_LABEL,
  DEFAULT_LABEL_FONT_SIZE,
  DEFAULT_LABEL_SPACING,
  DUPLICATE_OFFSET_PX,
  CELL_SIZE_MIN,
  CELL_SIZE_MAX,
  LABEL_FONT_SIZE_MIN,
  LABEL_FONT_SIZE_MAX,
  createDefaultActiveCells,
} from '../_constants/grid-animator-constants';
import { DEFAULT_PRESETS } from '../_constants/grid-animator-presets';
import {
  computeInstanceBounds,
  computeGroupBounds,
  precomputeSnapLines,
  computeSnappedPosition,
  computeMarqueeSelection,
} from '../_utils/snap-utils';

let nextId = 1;

function generateId(): string {
  return `inst_${nextId++}`;
}

/** Deep-clone a GridAnimatorConfig */
function cloneConfig(config: GridAnimatorConfig): GridAnimatorConfig {
  return {
    ...config,
    grid: { ...config.grid },
    activeCells: config.activeCells.map((r) => [...r]),
    animation: { ...config.animation },
    color: { ...config.color },
    effects: { ...config.effects },
  };
}

/** Resizes activeCells to new dimensions, preserving existing cell states */
function resizeActiveCells(
  current: boolean[][],
  newRows: number,
  newCols: number
): boolean[][] {
  return Array.from({ length: newRows }, (_, r) =>
    Array.from({ length: newCols }, (_, c) =>
      r < current.length && c < (current[r]?.length ?? 0)
        ? current[r][c]
        : true
    )
  );
}

function createDefaultInstance(x = 0, y = 0): GridAnimatorInstance {
  const id = generateId();
  return {
    id,
    x,
    y,
    label: DEFAULT_LABEL,
    labelFontSize: DEFAULT_LABEL_FONT_SIZE,
    labelSpacing: DEFAULT_LABEL_SPACING,
    isPlaying: true,
    config: cloneConfig(DEFAULT_CONFIG),
  };
}

// --- Store Interface ---

interface ClipboardState {
  entries: ClipboardEntry[];
  /** Centroid X of the original selection at copy time */
  centroidX: number;
  /** Centroid Y of the original selection at copy time */
  centroidY: number;
  /** Number of times pasted — used to stack offset */
  pasteCount: number;
}

interface GridAnimatorStore {
  instances: Record<string, GridAnimatorInstance>;
  instanceOrder: string[];
  selectedIds: string[];
  clipboard: ClipboardState | null;
  dragState: DragState | null;
  resizeState: ResizeState | null;
  marqueeState: MarqueeState | null;
  expandedSections: Record<string, boolean>;

  // Instance CRUD
  addInstance: (position?: { x: number; y: number }) => string;
  removeInstance: (id: string) => void;
  duplicateInstance: (id: string) => string | null;

  // Clipboard
  copySelection: () => void;
  pasteSelection: () => void;

  // Selection
  selectInstance: (id: string | null, additive?: boolean) => void;

  // Drag (multi-instance aware)
  startDrag: (primaryId: string, canvasX: number, canvasY: number, zoomScale: number) => void;
  updateDrag: (canvasX: number, canvasY: number, zoomScale: number) => void;
  endDrag: () => void;

  // Resize (group-aware: resizes all selected instances proportionally)
  startResize: (corner: ResizeCorner, canvasX: number, canvasY: number) => void;
  updateResize: (canvasX: number, canvasY: number) => void;
  endResize: () => void;

  // Marquee
  startMarquee: (canvasX: number, canvasY: number) => void;
  updateMarquee: (canvasX: number, canvasY: number) => void;
  endMarquee: () => void;

  // Config setters (scoped to primary selected — selectedIds[0])
  setGridRows: (rows: number) => void;
  setGridCols: (cols: number) => void;
  setGrid: (partial: Partial<GridConfig>) => void;
  toggleCell: (row: number, col: number) => void;
  setCell: (row: number, col: number, value: boolean) => void;
  clearAllCells: () => void;
  fillAllCells: () => void;
  setAnimation: (partial: Partial<AnimationConfig>) => void;
  setColor: (partial: Partial<ColorConfig>) => void;
  setEffects: (partial: Partial<EffectsConfig>) => void;

  // Label setters (scoped to primary selected)
  setLabel: (text: string) => void;
  setLabelFontSize: (size: number) => void;
  setLabelSpacing: (spacing: number) => void;

  // Play
  togglePlaying: () => void;

  // UI
  toggleSection: (id: string) => void;
  reset: () => void;
}

/** Helper to update the config of a specific instance */
function updateInstanceConfig(
  instances: Record<string, GridAnimatorInstance>,
  id: string,
  updater: (config: GridAnimatorConfig) => Partial<GridAnimatorConfig>
): Record<string, GridAnimatorInstance> {
  const instance = instances[id];
  if (!instance) return instances;

  const updates = updater(instance.config);
  return {
    ...instances,
    [id]: {
      ...instance,
      config: { ...instance.config, ...updates },
    },
  };
}

/** Returns the primary selected ID (first in selectedIds) or null */
function primaryId(state: { selectedIds: string[] }): string | null {
  return state.selectedIds[0] ?? null;
}

// --- Default state (built from presets) ---

function createInitialState() {
  const instances: Record<string, GridAnimatorInstance> = {};
  const instanceOrder: string[] = [];

  for (const preset of DEFAULT_PRESETS) {
    const id = generateId();
    instances[id] = {
      id,
      x: preset.x,
      y: preset.y,
      label: preset.label,
      labelFontSize: preset.labelFontSize,
      labelSpacing: preset.labelSpacing,
      isPlaying: preset.isPlaying,
      config: cloneConfig(preset.config),
    };
    instanceOrder.push(id);
  }

  const firstId = instanceOrder[0];

  return {
    instances,
    instanceOrder,
    selectedIds: firstId ? [firstId] : ([] as string[]),
    clipboard: null as ClipboardState | null,
    dragState: null as DragState | null,
    resizeState: null as ResizeState | null,
    marqueeState: null as MarqueeState | null,
    expandedSections: { ...DEFAULT_EXPANDED_SECTIONS },
  };
}

const DEFAULT_STATE = createInitialState();

export const useGridAnimatorStore = create<GridAnimatorStore>((set, get) => ({
  ...DEFAULT_STATE,

  // --- Instance CRUD ---

  addInstance: (position) => {
    const inst = createDefaultInstance(position?.x ?? 0, position?.y ?? 0);
    set((state) => ({
      instances: { ...state.instances, [inst.id]: inst },
      instanceOrder: [...state.instanceOrder, inst.id],
      selectedIds: [inst.id],
    }));
    return inst.id;
  },

  removeInstance: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.instances;
      const newOrder = state.instanceOrder.filter((i) => i !== id);
      return {
        instances: rest,
        instanceOrder: newOrder,
        selectedIds: state.selectedIds.filter((i) => i !== id),
        dragState: state.dragState?.primaryId === id ? null : state.dragState,
      };
    }),

  duplicateInstance: (id) => {
    const state = get();
    const source = state.instances[id];
    if (!source) return null;

    const newInst: GridAnimatorInstance = {
      ...source,
      id: generateId(),
      x: source.x + DUPLICATE_OFFSET_PX,
      y: source.y + DUPLICATE_OFFSET_PX,
      config: cloneConfig(source.config),
    };

    set((s) => ({
      instances: { ...s.instances, [newInst.id]: newInst },
      instanceOrder: [...s.instanceOrder, newInst.id],
      selectedIds: [newInst.id],
    }));

    return newInst.id;
  },

  // --- Clipboard ---

  copySelection: () => {
    const { selectedIds, instances } = get();
    if (selectedIds.length === 0) return;

    const selected = selectedIds
      .map((id) => instances[id])
      .filter(Boolean) as GridAnimatorInstance[];

    if (selected.length === 0) return;

    // Compute centroid of selected instances
    const centroidX = selected.reduce((sum, inst) => sum + inst.x, 0) / selected.length;
    const centroidY = selected.reduce((sum, inst) => sum + inst.y, 0) / selected.length;

    const entries: ClipboardEntry[] = selected.map((inst) => ({
      relativeX: inst.x - centroidX,
      relativeY: inst.y - centroidY,
      label: inst.label,
      labelFontSize: inst.labelFontSize,
      labelSpacing: inst.labelSpacing,
      isPlaying: inst.isPlaying,
      config: cloneConfig(inst.config),
    }));

    set({ clipboard: { entries, centroidX, centroidY, pasteCount: 0 } });
  },

  pasteSelection: () => {
    const { clipboard } = get();
    if (!clipboard || clipboard.entries.length === 0) return;

    const nextPasteCount = clipboard.pasteCount + 1;
    const offset = DUPLICATE_OFFSET_PX * nextPasteCount;

    const newIds: string[] = [];
    const newInstances: Record<string, GridAnimatorInstance> = {};

    for (const entry of clipboard.entries) {
      const id = generateId();
      newIds.push(id);
      newInstances[id] = {
        id,
        x: clipboard.centroidX + entry.relativeX + offset,
        y: clipboard.centroidY + entry.relativeY + offset,
        label: entry.label,
        labelFontSize: entry.labelFontSize,
        labelSpacing: entry.labelSpacing,
        isPlaying: entry.isPlaying,
        config: cloneConfig(entry.config),
      };
    }

    set((state) => ({
      instances: { ...state.instances, ...newInstances },
      instanceOrder: [...state.instanceOrder, ...newIds],
      selectedIds: newIds,
      clipboard: { ...clipboard, pasteCount: nextPasteCount },
    }));
  },

  // --- Selection ---

  selectInstance: (id, additive = false) =>
    set((state) => {
      if (id === null) return { selectedIds: [] };

      if (additive) {
        // Toggle: add if missing, remove if present
        const exists = state.selectedIds.includes(id);
        return {
          selectedIds: exists
            ? state.selectedIds.filter((i) => i !== id)
            : [...state.selectedIds, id],
        };
      }

      return { selectedIds: [id] };
    }),

  // --- Drag (multi-instance) ---

  startDrag: (id, canvasX, canvasY, _zoomScale) =>
    set((state) => {
      const primary = state.instances[id];
      if (!primary) return {};

      // Ensure the grabbed instance is in selection
      const selected = state.selectedIds.includes(id)
        ? state.selectedIds
        : [id];

      const excludeSet = new Set(selected);
      const bounds = computeInstanceBounds(primary);
      const snapLines = precomputeSnapLines(state.instances, excludeSet);

      // Compute relative offsets for every other selected instance
      const relativeOffsets: Record<string, { dx: number; dy: number }> = {};
      for (const sid of selected) {
        if (sid === id) continue;
        const inst = state.instances[sid];
        if (!inst) continue;
        relativeOffsets[sid] = {
          dx: inst.x - primary.x,
          dy: inst.y - primary.y,
        };
      }

      // Bring all selected to front, primary on top
      const unselected = state.instanceOrder.filter((i) => !excludeSet.has(i));
      const selectedOrdered = selected.filter((i) => i !== id);
      selectedOrdered.push(id);

      return {
        selectedIds: selected,
        instanceOrder: [...unselected, ...selectedOrdered],
        dragState: {
          primaryId: id,
          primaryOffsetX: canvasX - primary.x,
          primaryOffsetY: canvasY - primary.y,
          relativeOffsets,
          snapLines,
          activeSnaps: [],
          draggedWidth: bounds.width,
          draggedHeight: bounds.height,
        },
      };
    }),

  updateDrag: (canvasX, canvasY, zoomScale) =>
    set((state) => {
      const { dragState, instances } = state;
      if (!dragState) return {};

      const proposedX = canvasX - dragState.primaryOffsetX;
      const proposedY = canvasY - dragState.primaryOffsetY;

      const { x, y, activeSnaps } = computeSnappedPosition(
        proposedX,
        proposedY,
        dragState.draggedWidth,
        dragState.draggedHeight,
        dragState.snapLines,
        zoomScale
      );

      // Apply snapped position to primary, then offset to others
      const updated = { ...instances };
      updated[dragState.primaryId] = {
        ...instances[dragState.primaryId],
        x,
        y,
      };

      for (const [sid, offset] of Object.entries(dragState.relativeOffsets)) {
        if (!instances[sid]) continue;
        updated[sid] = {
          ...instances[sid],
          x: x + offset.dx,
          y: y + offset.dy,
        };
      }

      return {
        instances: updated,
        dragState: { ...dragState, activeSnaps },
      };
    }),

  endDrag: () =>
    set(() => ({ dragState: null })),

  // --- Resize ---

  startResize: (corner, _canvasX, _canvasY) =>
    set((state) => {
      const { selectedIds, instances } = state;
      if (selectedIds.length === 0) return {};

      const groupBounds = computeGroupBounds(selectedIds, instances);
      if (!groupBounds) return {};

      let fixedX: number;
      let fixedY: number;
      switch (corner) {
        case ResizeCorner.TopLeft:
          fixedX = groupBounds.right; fixedY = groupBounds.bottom; break;
        case ResizeCorner.TopRight:
          fixedX = groupBounds.left; fixedY = groupBounds.bottom; break;
        case ResizeCorner.BottomLeft:
          fixedX = groupBounds.right; fixedY = groupBounds.top; break;
        case ResizeCorner.BottomRight:
          fixedX = groupBounds.left; fixedY = groupBounds.top; break;
      }

      const snapshots = selectedIds
        .map((id) => {
          const inst = instances[id];
          if (!inst) return null;
          return {
            id,
            initialX: inst.x,
            initialY: inst.y,
            initialCellSize: inst.config.grid.cellSize,
            initialFontSize: inst.labelFontSize,
          };
        })
        .filter(Boolean) as ResizeState['snapshots'];

      return {
        resizeState: {
          corner,
          fixedX,
          fixedY,
          initialGroupWidth: groupBounds.width,
          initialGroupHeight: groupBounds.height,
          initialGroupLeft: groupBounds.left,
          initialGroupTop: groupBounds.top,
          snapshots,
        },
      };
    }),

  updateResize: (canvasX, _canvasY) =>
    set((state) => {
      const { resizeState, instances } = state;
      if (!resizeState) return {};

      const { corner, fixedX, fixedY, initialGroupWidth, initialGroupLeft, initialGroupTop, snapshots } = resizeState;

      const rawWidth = (corner === ResizeCorner.TopLeft || corner === ResizeCorner.BottomLeft)
        ? fixedX - canvasX
        : canvasX - fixedX;

      const scale = Math.max(0.1, rawWidth / initialGroupWidth);

      // Compute the new group origin (the top-left of the scaled group)
      const newGroupWidth = initialGroupWidth * scale;
      const newGroupHeight = resizeState.initialGroupHeight * scale;

      let newGroupLeft: number;
      let newGroupTop: number;
      switch (corner) {
        case ResizeCorner.TopLeft:
          newGroupLeft = fixedX - newGroupWidth;
          newGroupTop = fixedY - newGroupHeight;
          break;
        case ResizeCorner.TopRight:
          newGroupLeft = fixedX;
          newGroupTop = fixedY - newGroupHeight;
          break;
        case ResizeCorner.BottomLeft:
          newGroupLeft = fixedX - newGroupWidth;
          newGroupTop = fixedY;
          break;
        case ResizeCorner.BottomRight:
        default:
          newGroupLeft = fixedX;
          newGroupTop = fixedY;
          break;
      }

      const updated = { ...instances };

      for (const snap of snapshots) {
        const inst = instances[snap.id];
        if (!inst) continue;

        const newCellSize = Math.round(
          Math.min(CELL_SIZE_MAX, Math.max(CELL_SIZE_MIN, snap.initialCellSize * scale))
        );
        const newFontSize = Math.round(
          Math.min(LABEL_FONT_SIZE_MAX, Math.max(LABEL_FONT_SIZE_MIN, snap.initialFontSize * scale))
        );

        // Reposition proportionally within the group
        const relX = snap.initialX - initialGroupLeft;
        const relY = snap.initialY - initialGroupTop;

        updated[snap.id] = {
          ...inst,
          x: newGroupLeft + relX * scale,
          y: newGroupTop + relY * scale,
          labelFontSize: newFontSize,
          config: {
            ...inst.config,
            grid: { ...inst.config.grid, cellSize: newCellSize },
          },
        };
      }

      return { instances: updated };
    }),

  endResize: () =>
    set(() => ({ resizeState: null })),

  // --- Marquee ---

  startMarquee: (canvasX, canvasY) =>
    set(() => ({
      marqueeState: { startX: canvasX, startY: canvasY, currentX: canvasX, currentY: canvasY },
    })),

  updateMarquee: (canvasX, canvasY) =>
    set((state) => {
      if (!state.marqueeState) return {};
      return {
        marqueeState: { ...state.marqueeState, currentX: canvasX, currentY: canvasY },
      };
    }),

  endMarquee: () =>
    set((state) => {
      if (!state.marqueeState) return { marqueeState: null };

      const { startX, startY, currentX, currentY } = state.marqueeState;
      const minX = Math.min(startX, currentX);
      const maxX = Math.max(startX, currentX);
      const minY = Math.min(startY, currentY);
      const maxY = Math.max(startY, currentY);

      // If marquee is tiny (click with no drag), deselect
      const MARQUEE_MIN_SIZE = 3;
      if (maxX - minX < MARQUEE_MIN_SIZE && maxY - minY < MARQUEE_MIN_SIZE) {
        return { marqueeState: null, selectedIds: [] };
      }

      const hit = computeMarqueeSelection(
        minX, minY, maxX, maxY,
        state.instances,
        state.instanceOrder
      );

      return { marqueeState: null, selectedIds: hit };
    }),

  // --- Config setters (scoped to primary selected) ---

  setGridRows: (rows) =>
    set((state) => {
      const pid = primaryId(state);
      if (!pid) return {};
      return {
        instances: updateInstanceConfig(state.instances, pid, (config) => ({
          grid: { ...config.grid, rows },
          activeCells: resizeActiveCells(config.activeCells, rows, config.grid.cols),
        })),
      };
    }),

  setGridCols: (cols) =>
    set((state) => {
      const pid = primaryId(state);
      if (!pid) return {};
      return {
        instances: updateInstanceConfig(state.instances, pid, (config) => ({
          grid: { ...config.grid, cols },
          activeCells: resizeActiveCells(config.activeCells, config.grid.rows, cols),
        })),
      };
    }),

  setGrid: (partial) =>
    set((state) => {
      const pid = primaryId(state);
      if (!pid) return {};
      return {
        instances: updateInstanceConfig(state.instances, pid, (config) => ({
          grid: { ...config.grid, ...partial },
        })),
      };
    }),

  toggleCell: (row, col) =>
    set((state) => {
      const pid = primaryId(state);
      if (!pid) return {};
      const instance = state.instances[pid];
      if (!instance) return {};

      const newCells = instance.config.activeCells.map((r) => [...r]);
      if (newCells[row]?.[col] !== undefined) {
        newCells[row][col] = !newCells[row][col];
      }
      return {
        instances: {
          ...state.instances,
          [pid]: { ...instance, config: { ...instance.config, activeCells: newCells } },
        },
      };
    }),

  setCell: (row, col, value) =>
    set((state) => {
      const pid = primaryId(state);
      if (!pid) return {};
      const instance = state.instances[pid];
      if (!instance) return {};

      const newCells = instance.config.activeCells.map((r) => [...r]);
      if (newCells[row]?.[col] !== undefined) {
        newCells[row][col] = value;
      }
      return {
        instances: {
          ...state.instances,
          [pid]: { ...instance, config: { ...instance.config, activeCells: newCells } },
        },
      };
    }),

  clearAllCells: () =>
    set((state) => {
      const pid = primaryId(state);
      if (!pid) return {};
      return {
        instances: updateInstanceConfig(state.instances, pid, (config) => ({
          activeCells: createDefaultActiveCells(config.grid.rows, config.grid.cols).map(
            (row) => row.map(() => false)
          ),
        })),
      };
    }),

  fillAllCells: () =>
    set((state) => {
      const pid = primaryId(state);
      if (!pid) return {};
      return {
        instances: updateInstanceConfig(state.instances, pid, (config) => ({
          activeCells: createDefaultActiveCells(config.grid.rows, config.grid.cols),
        })),
      };
    }),

  setAnimation: (partial) =>
    set((state) => {
      const pid = primaryId(state);
      if (!pid) return {};
      return {
        instances: updateInstanceConfig(state.instances, pid, (config) => ({
          animation: { ...config.animation, ...partial },
        })),
      };
    }),

  setColor: (partial) =>
    set((state) => {
      const pid = primaryId(state);
      if (!pid) return {};
      return {
        instances: updateInstanceConfig(state.instances, pid, (config) => ({
          color: { ...config.color, ...partial },
        })),
      };
    }),

  setEffects: (partial) =>
    set((state) => {
      const pid = primaryId(state);
      if (!pid) return {};
      return {
        instances: updateInstanceConfig(state.instances, pid, (config) => ({
          effects: { ...config.effects, ...partial },
        })),
      };
    }),

  // --- Label setters ---

  setLabel: (text) =>
    set((state) => {
      const pid = primaryId(state);
      if (!pid) return {};
      const instance = state.instances[pid];
      if (!instance) return {};
      return {
        instances: { ...state.instances, [pid]: { ...instance, label: text } },
      };
    }),

  setLabelFontSize: (size) =>
    set((state) => {
      const pid = primaryId(state);
      if (!pid) return {};
      const instance = state.instances[pid];
      if (!instance) return {};
      return {
        instances: { ...state.instances, [pid]: { ...instance, labelFontSize: size } },
      };
    }),

  setLabelSpacing: (spacing) =>
    set((state) => {
      const pid = primaryId(state);
      if (!pid) return {};
      const instance = state.instances[pid];
      if (!instance) return {};
      return {
        instances: { ...state.instances, [pid]: { ...instance, labelSpacing: spacing } },
      };
    }),

  // --- Play ---

  togglePlaying: () =>
    set((state) => {
      const pid = primaryId(state);
      if (!pid) return {};
      const instance = state.instances[pid];
      if (!instance) return {};
      return {
        instances: { ...state.instances, [pid]: { ...instance, isPlaying: !instance.isPlaying } },
      };
    }),

  // --- UI ---

  toggleSection: (id) =>
    set((state) => ({
      expandedSections: { ...state.expandedSections, [id]: !state.expandedSections[id] },
    })),

  reset: () => {
    nextId = 1;
    const inst = createDefaultInstance(0, 0);
    set({
      instances: { [inst.id]: inst },
      instanceOrder: [inst.id],
      selectedIds: [inst.id],
      clipboard: null,
      dragState: null,
      resizeState: null,
      marqueeState: null,
      expandedSections: { ...DEFAULT_EXPANDED_SECTIONS },
    });
  },
}));
