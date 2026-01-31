import { Vector3 } from 'three';

export type WaveType = 'ripple' | 'cursor';

/** Fit mode for image masks */
export enum MaskFitMode {
  Contain = 'contain',
  Cover = 'cover',
  Fill = 'fill',
}

/** Image-based mask input */
export interface ImageMaskInput {
  type: 'image';
  src: string;
  fit?: MaskFitMode;
}

/** Result from mask creation containing intensity values for each dot */
export interface MaskResult {
  intensities: Float32Array;
  cols: number;
  rows: number;
}

export interface InfluencePoint {
  id: number;
  position: Vector3;
  velocity: Vector3;
  radius: number;
  strength: number;
  type: WaveType;
  birthTime: number;
  lifetime: number;
}

export interface GridConfig {
  spacing: number;
  baseRadius: number;
  maxScale: number;
  baseOpacity: number;
  maxOpacity: number;
}

export interface WaveConfig {
  rippleExpandSpeed: number;
  rippleMaxRadius: number;
  spawnIntervalMin: number;
  spawnIntervalMax: number;
  maxActivePoints: number;
}
