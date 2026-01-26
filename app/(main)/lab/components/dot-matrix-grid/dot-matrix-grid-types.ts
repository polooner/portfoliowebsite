import { Vector3 } from 'three';

export type WaveType = 'comet' | 'ripple' | 'sweep';

export interface InfluencePoint {
  id: number;
  position: Vector3;
  velocity: Vector3;
  radius: number;
  strength: number;
  tailLength: number;
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
  cometSpeed: number;
  cometRadiusMin: number;
  cometRadiusMax: number;
  cometTailLength: number;
  rippleExpandSpeed: number;
  rippleMaxRadius: number;
  sweepSpeed: number;
  spawnIntervalMin: number;
  spawnIntervalMax: number;
  maxActivePoints: number;
}
