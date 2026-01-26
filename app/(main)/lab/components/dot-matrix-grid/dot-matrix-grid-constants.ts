import type { GridConfig, InfluenceConfig, AnimationConfig } from './dot-matrix-grid-types';

export const GRID_CONFIG: GridConfig = {
  spacing: 12,
  baseRadius: 1.5,
  maxScale: 2.5,
  baseOpacity: 0.15,
  maxOpacity: 0.6,
};

export const INFLUENCE_CONFIG: InfluenceConfig = {
  minRadius: 40,
  maxRadius: 80,
  gaussianK: 3,
  spawnIntervalMin: 2000,
  spawnIntervalMax: 4000,
  maxActivePoints: 3,
};

export const ANIMATION_CONFIG: AnimationConfig = {
  fadeInDuration: 800,
  fadeOutDuration: 1200,
  holdDurationMin: 1500,
  holdDurationMax: 3000,
};

export const CONTAINER_WIDTH = 500;
export const CONTAINER_HEIGHT = 192;
