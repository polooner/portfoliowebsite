import { Vector3 } from 'three';

export type WaveType = 'ripple';

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
