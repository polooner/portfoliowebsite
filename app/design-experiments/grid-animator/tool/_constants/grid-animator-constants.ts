import {
  CellShape,
  AnimationPattern,
  AnimationStyle,
  BackgroundStyle,
  Direction,
  type GridAnimatorConfig,
} from '../_types/grid-animator-types';

// --- Slider Bounds ---

export const GRID_ROWS_MIN = 1;
export const GRID_ROWS_MAX = 10;
export const GRID_COLS_MIN = 1;
export const GRID_COLS_MAX = 10;

export const CELL_SIZE_MIN = 8;
export const CELL_SIZE_MAX = 64;

export const GAP_MIN = 0;
export const GAP_MAX = 24;

export const CORNER_RADIUS_MIN = 0;
export const CORNER_RADIUS_MAX = 32;

export const FPS_MIN = 1;
export const FPS_MAX = 60;

export const GLOW_RADIUS_MIN = 0;
export const GLOW_RADIUS_MAX = 20;

export const GLOW_OPACITY_MIN = 0;
export const GLOW_OPACITY_MAX = 100;

export const OPACITY_MIN = 0;
export const OPACITY_MAX = 100;

// --- Animation Math ---

export const SPINNER_ACTIVE_FRACTION = 0.4;
export const BREATHE_CYCLE_MULTIPLIER = 0.3;
export const BREATHE_OPACITY_MIN = 0.05;
export const BREATHE_OPACITY_MAX = 0.25;

// --- Canvas ---

export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 600;

// --- Dropdown Options ---

export const CELL_SHAPE_OPTIONS = [
  { value: CellShape.RoundedRect, label: 'Rounded Rect' },
  { value: CellShape.Circle, label: 'Circle' },
  { value: CellShape.Square, label: 'Square' },
];

export const ANIMATION_PATTERN_OPTIONS = [
  { value: AnimationPattern.Spinner, label: 'Spinner' },
  { value: AnimationPattern.WaveDiagonal, label: 'Wave Diagonal' },
  { value: AnimationPattern.WaveHorizontal, label: 'Wave Horizontal' },
  { value: AnimationPattern.WaveVertical, label: 'Wave Vertical' },
  { value: AnimationPattern.Blink, label: 'Blink' },
  { value: AnimationPattern.Linear, label: 'Linear' },
  { value: AnimationPattern.Directional, label: 'Directional' },
];

export const ANIMATION_STYLE_OPTIONS = [
  { value: AnimationStyle.OpacityOnly, label: 'Opacity' },
  { value: AnimationStyle.PulseSize, label: 'Pulse Size' },
  { value: AnimationStyle.Scale, label: 'Scale' },
];

export const BACKGROUND_STYLE_OPTIONS = [
  { value: BackgroundStyle.None, label: 'None' },
  { value: BackgroundStyle.Breathe, label: 'Breathe' },
];

// --- Defaults ---

const DEFAULT_ROWS = 3;
const DEFAULT_COLS = 3;

/** Creates a 2D boolean array with all cells set to true */
export function createDefaultActiveCells(rows: number, cols: number): boolean[][] {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => true));
}

export const DEFAULT_CONFIG: GridAnimatorConfig = {
  grid: {
    rows: DEFAULT_ROWS,
    cols: DEFAULT_COLS,
    cellShape: CellShape.RoundedRect,
    cellSize: 24,
    gap: 6,
    cornerRadius: 6,
  },
  activeCells: createDefaultActiveCells(DEFAULT_ROWS, DEFAULT_COLS),
  animation: {
    pattern: AnimationPattern.Spinner,
    style: AnimationStyle.OpacityOnly,
    backgroundStyle: BackgroundStyle.None,
    direction: Direction.Right,
    fps: 12,
  },
  color: {
    activeColor: '#ffffff',
    activeOpacity: 100,
    inactiveColor: '#404040',
    inactiveOpacity: 30,
    backgroundColor: '#171717',
    backgroundOpacity: 100,
  },
  effects: {
    glowEnabled: false,
    glowRadius: 4,
    glowColor: '#ffffff',
    glowOpacity: 60,
  },
};

// --- Snap & Selection ---

export const SNAP_THRESHOLD_PX = 5;
export const SELECTION_COLOR = '#3b82f6';
export const HANDLE_SIZE_PX = 8;

// --- Label Defaults ---

export const DEFAULT_LABEL = '';
export const DEFAULT_LABEL_FONT_SIZE = 14;
export const LABEL_FONT_SIZE_MIN = 8;
export const LABEL_FONT_SIZE_MAX = 48;
export const DEFAULT_LABEL_SPACING = 12;
export const LABEL_SPACING_MIN = 0;
export const LABEL_SPACING_MAX = 64;

// --- Instance Offset ---

export const DUPLICATE_OFFSET_PX = 30;

// --- Collapsible Section IDs ---

export const SECTION_GRID = 'grid';
export const SECTION_BUILDER = 'builder';
export const SECTION_ANIMATION = 'animation';
export const SECTION_COLOR = 'color';
export const SECTION_LABEL = 'label';
export const SECTION_EFFECTS = 'effects';

export const DEFAULT_EXPANDED_SECTIONS: Record<string, boolean> = {
  [SECTION_GRID]: true,
  [SECTION_BUILDER]: true,
  [SECTION_ANIMATION]: true,
  [SECTION_COLOR]: false,
  [SECTION_EFFECTS]: false,
};
