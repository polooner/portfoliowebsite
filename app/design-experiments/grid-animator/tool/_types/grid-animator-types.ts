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

// --- Multi-instance types ---

export interface GridAnimatorInstance {
  id: string;
  x: number;
  y: number;
  label: string;
  labelFontSize: number;
  labelSpacing: number;
  isPlaying: boolean;
  config: GridAnimatorConfig;
}

export interface InstanceBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

export enum SnapAxis {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export interface SnapLine {
  axis: SnapAxis;
  value: number;
  sourceId: string;
}

export type SnapEdge =
  | 'left'
  | 'right'
  | 'centerX'
  | 'top'
  | 'bottom'
  | 'centerY';

export interface ActiveSnap {
  line: SnapLine;
  matchedEdge: SnapEdge;
}

export interface DragState {
  instanceId: string;
  offsetX: number;
  offsetY: number;
  snapLines: SnapLine[];
  activeSnaps: ActiveSnap[];
  draggedWidth: number;
  draggedHeight: number;
}

export enum ResizeCorner {
  TopLeft = 'topLeft',
  TopRight = 'topRight',
  BottomLeft = 'bottomLeft',
  BottomRight = 'bottomRight',
}

export interface ResizeState {
  instanceId: string;
  corner: ResizeCorner;
  /** The opposite corner's canvas position — stays fixed during resize */
  fixedX: number;
  fixedY: number;
  initialBoundsWidth: number;
  initialCellSize: number;
  initialFontSize: number;
}
