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
import { computeInstanceBounds, precomputeSnapLines, computeSnappedPosition } from '../_utils/snap-utils';

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

interface GridAnimatorStore {
  instances: Record<string, GridAnimatorInstance>;
  instanceOrder: string[];
  selectedId: string | null;
  dragState: DragState | null;
  resizeState: ResizeState | null;
  expandedSections: Record<string, boolean>;

  // Instance CRUD
  addInstance: (position?: { x: number; y: number }) => string;
  removeInstance: (id: string) => void;
  duplicateInstance: (id: string) => string | null;

  // Selection
  selectInstance: (id: string | null) => void;

  // Drag
  startDrag: (id: string, canvasX: number, canvasY: number, zoomScale: number) => void;
  updateDrag: (canvasX: number, canvasY: number, zoomScale: number) => void;
  endDrag: () => void;

  // Resize
  startResize: (id: string, corner: ResizeCorner, canvasX: number, canvasY: number) => void;
  updateResize: (canvasX: number, canvasY: number) => void;
  endResize: () => void;

  // Config setters (scoped to selectedId)
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

  // Label setters (scoped to selectedId)
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

// --- Default state ---

const defaultInstance = createDefaultInstance(0, 0);

const DEFAULT_STATE = {
  instances: { [defaultInstance.id]: defaultInstance } as Record<string, GridAnimatorInstance>,
  instanceOrder: [defaultInstance.id],
  selectedId: defaultInstance.id as string | null,
  dragState: null as DragState | null,
  resizeState: null as ResizeState | null,
  expandedSections: { ...DEFAULT_EXPANDED_SECTIONS },
};

export const useGridAnimatorStore = create<GridAnimatorStore>((set, get) => ({
  ...DEFAULT_STATE,

  // --- Instance CRUD ---

  addInstance: (position) => {
    const inst = createDefaultInstance(position?.x ?? 0, position?.y ?? 0);
    set((state) => ({
      instances: { ...state.instances, [inst.id]: inst },
      instanceOrder: [...state.instanceOrder, inst.id],
      selectedId: inst.id,
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
        selectedId: state.selectedId === id ? null : state.selectedId,
        dragState: state.dragState?.instanceId === id ? null : state.dragState,
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
      selectedId: newInst.id,
    }));

    return newInst.id;
  },

  // --- Selection ---

  selectInstance: (id) =>
    set(() => ({ selectedId: id })),

  // --- Drag ---

  startDrag: (id, canvasX, canvasY, _zoomScale) =>
    set((state) => {
      const instance = state.instances[id];
      if (!instance) return {};

      const bounds = computeInstanceBounds(instance);
      const snapLines = precomputeSnapLines(state.instances, id);

      return {
        selectedId: id,
        // Bring to front
        instanceOrder: [...state.instanceOrder.filter((i) => i !== id), id],
        dragState: {
          instanceId: id,
          offsetX: canvasX - instance.x,
          offsetY: canvasY - instance.y,
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

      const proposedX = canvasX - dragState.offsetX;
      const proposedY = canvasY - dragState.offsetY;

      const { x, y, activeSnaps } = computeSnappedPosition(
        proposedX,
        proposedY,
        dragState.draggedWidth,
        dragState.draggedHeight,
        dragState.snapLines,
        zoomScale
      );

      return {
        instances: {
          ...instances,
          [dragState.instanceId]: {
            ...instances[dragState.instanceId],
            x,
            y,
          },
        },
        dragState: {
          ...dragState,
          activeSnaps,
        },
      };
    }),

  endDrag: () =>
    set(() => ({ dragState: null })),

  // --- Resize ---

  startResize: (id, corner, _canvasX, _canvasY) =>
    set((state) => {
      const instance = state.instances[id];
      if (!instance) return {};

      const bounds = computeInstanceBounds(instance);

      // The opposite corner stays fixed
      let fixedX: number;
      let fixedY: number;
      switch (corner) {
        case ResizeCorner.TopLeft:
          fixedX = bounds.right;
          fixedY = bounds.bottom;
          break;
        case ResizeCorner.TopRight:
          fixedX = bounds.left;
          fixedY = bounds.bottom;
          break;
        case ResizeCorner.BottomLeft:
          fixedX = bounds.right;
          fixedY = bounds.top;
          break;
        case ResizeCorner.BottomRight:
          fixedX = bounds.left;
          fixedY = bounds.top;
          break;
      }

      return {
        resizeState: {
          instanceId: id,
          corner,
          fixedX,
          fixedY,
          initialBoundsWidth: bounds.width,
          initialCellSize: instance.config.grid.cellSize,
          initialFontSize: instance.labelFontSize,
        },
      };
    }),

  updateResize: (canvasX, _canvasY) =>
    set((state) => {
      const { resizeState, instances } = state;
      if (!resizeState) return {};

      const instance = instances[resizeState.instanceId];
      if (!instance) return {};

      const { corner, fixedX, fixedY, initialBoundsWidth, initialCellSize, initialFontSize } = resizeState;

      // Compute new width based on mouse distance from fixed corner
      const rawWidth = (corner === ResizeCorner.TopLeft || corner === ResizeCorner.BottomLeft)
        ? fixedX - canvasX
        : canvasX - fixedX;

      const scale = Math.max(0.1, rawWidth / initialBoundsWidth);

      const newCellSize = Math.round(
        Math.min(CELL_SIZE_MAX, Math.max(CELL_SIZE_MIN, initialCellSize * scale))
      );
      const newFontSize = Math.round(
        Math.min(LABEL_FONT_SIZE_MAX, Math.max(LABEL_FONT_SIZE_MIN, initialFontSize * scale))
      );

      // Recompute the instance position so the fixed corner stays fixed
      const updatedInstance: GridAnimatorInstance = {
        ...instance,
        labelFontSize: newFontSize,
        config: {
          ...instance.config,
          grid: { ...instance.config.grid, cellSize: newCellSize },
        },
      };

      const newBounds = computeInstanceBounds(updatedInstance);

      let newX: number;
      let newY: number;
      switch (corner) {
        case ResizeCorner.TopLeft:
          newX = fixedX - newBounds.width;
          newY = fixedY - newBounds.height;
          break;
        case ResizeCorner.TopRight:
          newX = fixedX;
          newY = fixedY - newBounds.height;
          break;
        case ResizeCorner.BottomLeft:
          newX = fixedX - newBounds.width;
          newY = fixedY;
          break;
        case ResizeCorner.BottomRight:
        default:
          newX = fixedX;
          newY = fixedY;
          break;
      }

      return {
        instances: {
          ...instances,
          [resizeState.instanceId]: {
            ...updatedInstance,
            x: newX,
            y: newY,
          },
        },
      };
    }),

  endResize: () =>
    set(() => ({ resizeState: null })),

  // --- Config setters (scoped to selectedId) ---

  setGridRows: (rows) =>
    set((state) => {
      if (!state.selectedId) return {};
      return {
        instances: updateInstanceConfig(state.instances, state.selectedId, (config) => ({
          grid: { ...config.grid, rows },
          activeCells: resizeActiveCells(config.activeCells, rows, config.grid.cols),
        })),
      };
    }),

  setGridCols: (cols) =>
    set((state) => {
      if (!state.selectedId) return {};
      return {
        instances: updateInstanceConfig(state.instances, state.selectedId, (config) => ({
          grid: { ...config.grid, cols },
          activeCells: resizeActiveCells(config.activeCells, config.grid.rows, cols),
        })),
      };
    }),

  setGrid: (partial) =>
    set((state) => {
      if (!state.selectedId) return {};
      return {
        instances: updateInstanceConfig(state.instances, state.selectedId, (config) => ({
          grid: { ...config.grid, ...partial },
        })),
      };
    }),

  toggleCell: (row, col) =>
    set((state) => {
      if (!state.selectedId) return {};
      const instance = state.instances[state.selectedId];
      if (!instance) return {};

      const newCells = instance.config.activeCells.map((r) => [...r]);
      if (newCells[row]?.[col] !== undefined) {
        newCells[row][col] = !newCells[row][col];
      }
      return {
        instances: {
          ...state.instances,
          [state.selectedId]: {
            ...instance,
            config: { ...instance.config, activeCells: newCells },
          },
        },
      };
    }),

  setCell: (row, col, value) =>
    set((state) => {
      if (!state.selectedId) return {};
      const instance = state.instances[state.selectedId];
      if (!instance) return {};

      const newCells = instance.config.activeCells.map((r) => [...r]);
      if (newCells[row]?.[col] !== undefined) {
        newCells[row][col] = value;
      }
      return {
        instances: {
          ...state.instances,
          [state.selectedId]: {
            ...instance,
            config: { ...instance.config, activeCells: newCells },
          },
        },
      };
    }),

  clearAllCells: () =>
    set((state) => {
      if (!state.selectedId) return {};
      return {
        instances: updateInstanceConfig(state.instances, state.selectedId, (config) => ({
          activeCells: createDefaultActiveCells(config.grid.rows, config.grid.cols).map(
            (row) => row.map(() => false)
          ),
        })),
      };
    }),

  fillAllCells: () =>
    set((state) => {
      if (!state.selectedId) return {};
      return {
        instances: updateInstanceConfig(state.instances, state.selectedId, (config) => ({
          activeCells: createDefaultActiveCells(config.grid.rows, config.grid.cols),
        })),
      };
    }),

  setAnimation: (partial) =>
    set((state) => {
      if (!state.selectedId) return {};
      return {
        instances: updateInstanceConfig(state.instances, state.selectedId, (config) => ({
          animation: { ...config.animation, ...partial },
        })),
      };
    }),

  setColor: (partial) =>
    set((state) => {
      if (!state.selectedId) return {};
      return {
        instances: updateInstanceConfig(state.instances, state.selectedId, (config) => ({
          color: { ...config.color, ...partial },
        })),
      };
    }),

  setEffects: (partial) =>
    set((state) => {
      if (!state.selectedId) return {};
      return {
        instances: updateInstanceConfig(state.instances, state.selectedId, (config) => ({
          effects: { ...config.effects, ...partial },
        })),
      };
    }),

  // --- Label setters ---

  setLabel: (text) =>
    set((state) => {
      if (!state.selectedId) return {};
      const instance = state.instances[state.selectedId];
      if (!instance) return {};
      return {
        instances: {
          ...state.instances,
          [state.selectedId]: { ...instance, label: text },
        },
      };
    }),

  setLabelFontSize: (size) =>
    set((state) => {
      if (!state.selectedId) return {};
      const instance = state.instances[state.selectedId];
      if (!instance) return {};
      return {
        instances: {
          ...state.instances,
          [state.selectedId]: { ...instance, labelFontSize: size },
        },
      };
    }),

  setLabelSpacing: (spacing) =>
    set((state) => {
      if (!state.selectedId) return {};
      const instance = state.instances[state.selectedId];
      if (!instance) return {};
      return {
        instances: {
          ...state.instances,
          [state.selectedId]: { ...instance, labelSpacing: spacing },
        },
      };
    }),

  // --- Play ---

  togglePlaying: () =>
    set((state) => {
      if (!state.selectedId) return {};
      const instance = state.instances[state.selectedId];
      if (!instance) return {};
      return {
        instances: {
          ...state.instances,
          [state.selectedId]: { ...instance, isPlaying: !instance.isPlaying },
        },
      };
    }),

  // --- UI ---

  toggleSection: (id) =>
    set((state) => ({
      expandedSections: {
        ...state.expandedSections,
        [id]: !state.expandedSections[id],
      },
    })),

  reset: () => {
    nextId = 1;
    const inst = createDefaultInstance(0, 0);
    set({
      instances: { [inst.id]: inst },
      instanceOrder: [inst.id],
      selectedId: inst.id,
      dragState: null,
      resizeState: null,
      expandedSections: { ...DEFAULT_EXPANDED_SECTIONS },
    });
  },
}));
