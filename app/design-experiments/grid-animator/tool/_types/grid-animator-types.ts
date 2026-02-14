export enum CellShape {
  RoundedRect = 'roundedRect',
  Circle = 'circle',
  Square = 'square',
}

export enum AnimationPattern {
  Spinner = 'spinner',
  WaveDiagonal = 'waveDiagonal',
  WaveHorizontal = 'waveHorizontal',
  WaveVertical = 'waveVertical',
  Blink = 'blink',
  Linear = 'linear',
  Directional = 'directional',
}

export enum AnimationStyle {
  OpacityOnly = 'opacityOnly',
  PulseSize = 'pulseSize',
  Scale = 'scale',
}

export enum BackgroundStyle {
  None = 'none',
  Breathe = 'breathe',
}

export enum Direction {
  Right = 'right',
  Left = 'left',
  Down = 'down',
  Up = 'up',
}

export interface GridConfig {
  rows: number;
  cols: number;
  cellShape: CellShape;
  cellSize: number;
  gap: number;
  cornerRadius: number;
}

export interface AnimationConfig {
  pattern: AnimationPattern;
  style: AnimationStyle;
  backgroundStyle: BackgroundStyle;
  direction: Direction;
  fps: number;
}

export interface ColorConfig {
  activeColor: string;
  activeOpacity: number;
  inactiveColor: string;
  inactiveOpacity: number;
  backgroundColor: string;
  backgroundOpacity: number;
}

export interface EffectsConfig {
  glowEnabled: boolean;
  glowRadius: number;
  glowColor: string;
  glowOpacity: number;
}

export interface GridAnimatorConfig {
  grid: GridConfig;
  activeCells: boolean[][];
  animation: AnimationConfig;
  color: ColorConfig;
  effects: EffectsConfig;
}
