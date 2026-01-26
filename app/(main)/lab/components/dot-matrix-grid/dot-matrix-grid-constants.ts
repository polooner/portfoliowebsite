import type { GridConfig, WaveConfig } from './dot-matrix-grid-types';

export const GRID_CONFIG: GridConfig = {
  spacing: 8,
  baseRadius: 1.5,
  maxScale: 2.5,
  baseOpacity: 0.15,
  maxOpacity: 1.0,
};

export const WAVE_CONFIG: WaveConfig = {
  rippleExpandSpeed: 40,
  rippleMaxRadius: 120,
  spawnIntervalMin: 1000,
  spawnIntervalMax: 2500,
  maxActivePoints: 3,
};

export const GAUSSIAN_K = 2.5;

export const CURSOR_INFLUENCE_RADIUS = 80;
export const CURSOR_FADE_SPEED = 1.5;

export const CONTAINER_WIDTH = 500;
export const CONTAINER_HEIGHT = 192;
