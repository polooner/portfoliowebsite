import { Vector3 } from 'three';
import type { InfluencePoint } from './dot-matrix-grid-types';
import { INFLUENCE_CONFIG } from './dot-matrix-grid-constants';

/**
 * Calculates the maximum influence on a dot from all active influence points
 * using Gaussian falloff based on signed distance
 */
export function calculateInfluence(
  dotPos: Vector3,
  points: InfluencePoint[]
): number {
  let maxInfluence = 0;

  for (const point of points) {
    const distance = dotPos.distanceTo(point.position);
    const normalizedDist = distance / point.radius;

    if (normalizedDist < 1) {
      const falloff = Math.exp(-INFLUENCE_CONFIG.gaussianK * normalizedDist ** 2);
      const influence = falloff * point.strength;
      maxInfluence = Math.max(maxInfluence, influence);
    }
  }

  return maxInfluence;
}

/**
 * Easing function for smooth fade in (ease out cubic)
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Easing function for smooth fade out (ease in cubic)
 */
export function easeInCubic(t: number): number {
  return t * t * t;
}

/**
 * Returns a random number between min and max
 */
export function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}
