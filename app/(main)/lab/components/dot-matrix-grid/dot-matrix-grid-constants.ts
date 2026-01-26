import type { GridConfig, WaveConfig } from './dot-matrix-grid-types';

export const GRID_CONFIG: GridConfig = {
  spacing: 8,
  baseRadius: 1.5,
  maxScale: 2.5,
  baseOpacity: 0.15,
  maxOpacity: 1.0,
};

export const WAVE_CONFIG: WaveConfig = {
  cometSpeed: 80,
  cometRadiusMin: 25,
  cometRadiusMax: 40,
  cometTailLength: 60,
  rippleExpandSpeed: 50,
  rippleMaxRadius: 100,
  sweepSpeed: 120,
  spawnIntervalMin: 800,
  spawnIntervalMax: 2000,
  maxActivePoints: 4,
};

export const GAUSSIAN_K = 2.5;

export const CONTAINER_WIDTH = 500;
export const CONTAINER_HEIGHT = 192;
