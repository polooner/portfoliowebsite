import { Vector3 } from 'three';

export interface InfluencePoint {
  id: number;
  position: Vector3;
  radius: number;
  strength: number;
  phase: 'fadeIn' | 'hold' | 'fadeOut';
  phaseStartTime: number;
  holdDuration: number;
}

export interface GridConfig {
  spacing: number;
  baseRadius: number;
  maxScale: number;
  baseOpacity: number;
  maxOpacity: number;
}

export interface InfluenceConfig {
  minRadius: number;
  maxRadius: number;
  gaussianK: number;
  spawnIntervalMin: number;
  spawnIntervalMax: number;
  maxActivePoints: number;
}

export interface AnimationConfig {
  fadeInDuration: number;
  fadeOutDuration: number;
  holdDurationMin: number;
  holdDurationMax: number;
}
