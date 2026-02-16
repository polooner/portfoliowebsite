import {
  CellShape,
  AnimationPattern,
  AnimationStyle,
  BackgroundStyle,
  Direction,
  type GridAnimatorConfig,
} from '../_types/grid-animator-types';
import { createDefaultActiveCells } from './grid-animator-constants';

// --- Preset instance definitions ---

export interface PresetInstance {
  x: number;
  y: number;
  label: string;
  labelFontSize: number;
  labelSpacing: number;
  isPlaying: boolean;
  config: GridAnimatorConfig;
}

// --- Shared palette ---

const ACTIVE_WHITE = '#d4d4d4';
const INACTIVE_GRAY = '#404040';
const BG_DARK = '#171717';

const INACTIVE_OPACITY = 20;
const ACTIVE_OPACITY = 80;
const BG_OPACITY = 100;

const LABEL_FONT = 14;
const LABEL_GAP = 10;

/** Vertical spacing between preset rows */
const ROW_SPACING = 40;
const START_Y = -180;
const X = -60;

/** Shared color/effects to reduce repetition */
const SHARED_COLOR = { activeColor: ACTIVE_WHITE, activeOpacity: ACTIVE_OPACITY, inactiveColor: INACTIVE_GRAY, inactiveOpacity: INACTIVE_OPACITY, backgroundColor: BG_DARK, backgroundOpacity: BG_OPACITY };
const NO_EFFECTS = { glowEnabled: false, glowRadius: 0, glowColor: '#ffffff', glowOpacity: 0 };

function preset(index: number, label: string, config: GridAnimatorConfig): PresetInstance {
  return { x: X, y: START_Y + ROW_SPACING * index, label, labelFontSize: LABEL_FONT, labelSpacing: LABEL_GAP, isPlaying: true, config };
}

// --- Presets ---

const THINKING = preset(0, 'Thinking', {
  grid: { rows: 2, cols: 2, cellShape: CellShape.RoundedRect, cellSize: 4, gap: 2, cornerRadius: 1 },
  activeCells: createDefaultActiveCells(2, 2),
  animation: { pattern: AnimationPattern.Spinner, style: AnimationStyle.OpacityOnly, backgroundStyle: BackgroundStyle.None, direction: Direction.Right, fps: 10 },
  color: SHARED_COLOR,
  effects: NO_EFFECTS,
});

const STREAMING = preset(1, 'Streaming', {
  grid: { rows: 1, cols: 4, cellShape: CellShape.RoundedRect, cellSize: 4, gap: 2, cornerRadius: 1 },
  activeCells: createDefaultActiveCells(1, 4),
  animation: { pattern: AnimationPattern.Directional, style: AnimationStyle.OpacityOnly, backgroundStyle: BackgroundStyle.None, direction: Direction.Right, fps: 10 },
  color: SHARED_COLOR,
  effects: NO_EFFECTS,
});

const PROCESSING = preset(2, 'Processing', {
  grid: { rows: 3, cols: 3, cellShape: CellShape.Circle, cellSize: 3, gap: 2, cornerRadius: 0 },
  activeCells: createDefaultActiveCells(3, 3),
  animation: { pattern: AnimationPattern.WaveDiagonal, style: AnimationStyle.OpacityOnly, backgroundStyle: BackgroundStyle.None, direction: Direction.Right, fps: 8 },
  color: SHARED_COLOR,
  effects: NO_EFFECTS,
});

const WAITING = preset(3, 'Waiting', {
  grid: { rows: 1, cols: 3, cellShape: CellShape.Circle, cellSize: 3, gap: 3, cornerRadius: 0 },
  activeCells: createDefaultActiveCells(1, 3),
  animation: { pattern: AnimationPattern.Blink, style: AnimationStyle.OpacityOnly, backgroundStyle: BackgroundStyle.None, direction: Direction.Right, fps: 4 },
  color: SHARED_COLOR,
  effects: NO_EFFECTS,
});

const ANALYZING = preset(4, 'Analyzing', {
  grid: { rows: 6, cols: 6, cellShape: CellShape.Square, cellSize: 2, gap: 1, cornerRadius: 0 },
  activeCells: createDefaultActiveCells(6, 6),
  animation: { pattern: AnimationPattern.WaveHorizontal, style: AnimationStyle.OpacityOnly, backgroundStyle: BackgroundStyle.Breathe, direction: Direction.Right, fps: 6 },
  color: SHARED_COLOR,
  effects: NO_EFFECTS,
});

const LOADING = preset(5, 'Loading', {
  grid: { rows: 1, cols: 6, cellShape: CellShape.RoundedRect, cellSize: 3, gap: 2, cornerRadius: 1 },
  activeCells: createDefaultActiveCells(1, 6),
  animation: { pattern: AnimationPattern.Linear, style: AnimationStyle.OpacityOnly, backgroundStyle: BackgroundStyle.None, direction: Direction.Right, fps: 12 },
  color: SHARED_COLOR,
  effects: NO_EFFECTS,
});

const SEARCHING = preset(6, 'Searching', {
  grid: { rows: 3, cols: 3, cellShape: CellShape.RoundedRect, cellSize: 3, gap: 2, cornerRadius: 1 },
  activeCells: createDefaultActiveCells(3, 3),
  animation: { pattern: AnimationPattern.WaveVertical, style: AnimationStyle.OpacityOnly, backgroundStyle: BackgroundStyle.None, direction: Direction.Down, fps: 8 },
  color: SHARED_COLOR,
  effects: NO_EFFECTS,
});

const GENERATING = preset(7, 'Generating', {
  grid: { rows: 2, cols: 4, cellShape: CellShape.Square, cellSize: 3, gap: 2, cornerRadius: 0 },
  activeCells: createDefaultActiveCells(2, 4),
  animation: { pattern: AnimationPattern.Spinner, style: AnimationStyle.OpacityOnly, backgroundStyle: BackgroundStyle.None, direction: Direction.Right, fps: 14 },
  color: SHARED_COLOR,
  effects: NO_EFFECTS,
});

const CONNECTING = preset(8, 'Connecting', {
  grid: { rows: 1, cols: 3, cellShape: CellShape.RoundedRect, cellSize: 4, gap: 4, cornerRadius: 1 },
  activeCells: createDefaultActiveCells(1, 3),
  animation: { pattern: AnimationPattern.Directional, style: AnimationStyle.OpacityOnly, backgroundStyle: BackgroundStyle.None, direction: Direction.Right, fps: 6 },
  color: SHARED_COLOR,
  effects: NO_EFFECTS,
});

const SYNCING = preset(9, 'Syncing', {
  grid: { rows: 4, cols: 4, cellShape: CellShape.Circle, cellSize: 2, gap: 2, cornerRadius: 0 },
  activeCells: createDefaultActiveCells(4, 4),
  animation: { pattern: AnimationPattern.WaveDiagonal, style: AnimationStyle.Scale, backgroundStyle: BackgroundStyle.None, direction: Direction.Left, fps: 10 },
  color: SHARED_COLOR,
  effects: NO_EFFECTS,
});

export const DEFAULT_PRESETS: PresetInstance[] = [
  THINKING,
  STREAMING,
  PROCESSING,
  WAITING,
  ANALYZING,
  LOADING,
  SEARCHING,
  GENERATING,
  CONNECTING,
  SYNCING,
];
