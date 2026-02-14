import { create } from 'zustand';
import {
  type GridConfig,
  type AnimationConfig,
  type ColorConfig,
  type EffectsConfig,
  type GridAnimatorConfig,
} from '../_types/grid-animator-types';
import {
  DEFAULT_CONFIG,
  DEFAULT_EXPANDED_SECTIONS,
  createDefaultActiveCells,
} from '../_constants/grid-animator-constants';

interface GridAnimatorStore extends GridAnimatorConfig {
  isPlaying: boolean;
  expandedSections: Record<string, boolean>;

  // Grid setters
  setGridRows: (rows: number) => void;
  setGridCols: (cols: number) => void;
  setGrid: (partial: Partial<GridConfig>) => void;

  // Cell manipulation
  toggleCell: (row: number, col: number) => void;
  setCell: (row: number, col: number, value: boolean) => void;
  clearAllCells: () => void;
  fillAllCells: () => void;

  // Config setters
  setAnimation: (partial: Partial<AnimationConfig>) => void;
  setColor: (partial: Partial<ColorConfig>) => void;
  setEffects: (partial: Partial<EffectsConfig>) => void;

  // UI state
  togglePlaying: () => void;
  toggleSection: (id: string) => void;
  reset: () => void;
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

export const useGridAnimatorStore = create<GridAnimatorStore>((set) => ({
  ...DEFAULT_CONFIG,
  isPlaying: true,
  expandedSections: { ...DEFAULT_EXPANDED_SECTIONS },

  setGridRows: (rows) =>
    set((state) => ({
      grid: { ...state.grid, rows },
      activeCells: resizeActiveCells(state.activeCells, rows, state.grid.cols),
    })),

  setGridCols: (cols) =>
    set((state) => ({
      grid: { ...state.grid, cols },
      activeCells: resizeActiveCells(state.activeCells, state.grid.rows, cols),
    })),

  setGrid: (partial) =>
    set((state) => ({
      grid: { ...state.grid, ...partial },
    })),

  toggleCell: (row, col) =>
    set((state) => {
      const newCells = state.activeCells.map((r) => [...r]);
      if (newCells[row]?.[col] !== undefined) {
        newCells[row][col] = !newCells[row][col];
      }
      return { activeCells: newCells };
    }),

  setCell: (row, col, value) =>
    set((state) => {
      const newCells = state.activeCells.map((r) => [...r]);
      if (newCells[row]?.[col] !== undefined) {
        newCells[row][col] = value;
      }
      return { activeCells: newCells };
    }),

  clearAllCells: () =>
    set((state) => ({
      activeCells: createDefaultActiveCells(state.grid.rows, state.grid.cols).map(
        (row) => row.map(() => false)
      ),
    })),

  fillAllCells: () =>
    set((state) => ({
      activeCells: createDefaultActiveCells(state.grid.rows, state.grid.cols),
    })),

  setAnimation: (partial) =>
    set((state) => ({
      animation: { ...state.animation, ...partial },
    })),

  setColor: (partial) =>
    set((state) => ({
      color: { ...state.color, ...partial },
    })),

  setEffects: (partial) =>
    set((state) => ({
      effects: { ...state.effects, ...partial },
    })),

  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),

  toggleSection: (id) =>
    set((state) => ({
      expandedSections: {
        ...state.expandedSections,
        [id]: !state.expandedSections[id],
      },
    })),

  reset: () =>
    set({
      ...DEFAULT_CONFIG,
      activeCells: DEFAULT_CONFIG.activeCells.map((r) => [...r]),
      isPlaying: true,
      expandedSections: { ...DEFAULT_EXPANDED_SECTIONS },
    }),
}));
