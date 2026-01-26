import { Vector3 } from 'three';
import type { InfluencePoint } from './dot-matrix-grid-types';
import { GAUSSIAN_K } from './dot-matrix-grid-constants';

/**
 * Calculates ripple influence (expanding ring)
 */
function calculateRippleInfluence(
  dotPos: Vector3,
  point: InfluencePoint
): number {
  const dist = dotPos.distanceTo(point.position);
  const ringWidth = point.radius * 0.4;
  const distFromRing = Math.abs(dist - point.radius);

  if (distFromRing > ringWidth) return 0;

  const normalizedDist = distFromRing / ringWidth;
  return Math.exp(-GAUSSIAN_K * normalizedDist ** 2) * point.strength;
}

/**
 * Calculates the maximum influence on a dot from all active influence points
 */
export function calculateInfluence(
  dotPos: Vector3,
  points: InfluencePoint[]
): number {
  let maxInfluence = 0;

  for (const point of points) {
    const influence = calculateRippleInfluence(dotPos, point);
    maxInfluence = Math.max(maxInfluence, influence);
  }

  return maxInfluence;
}

/**
 * Returns a random number between min and max
 */
export function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
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
