import { Vector3 } from 'three';
import type { InfluencePoint } from './plus-matrix-types';
import { GAUSSIAN_K, CURSOR_INFLUENCE_RADIUS } from './plus-matrix-constants';

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
 * Calculates cursor influence (filled circle with radial falloff)
 */
function calculateCursorInfluence(
  dotPos: Vector3,
  point: InfluencePoint
): number {
  const dist = dotPos.distanceTo(point.position);

  if (dist > CURSOR_INFLUENCE_RADIUS) return 0;

  const normalizedDist = dist / CURSOR_INFLUENCE_RADIUS;
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
    let influence = 0;

    if (point.type === 'cursor') {
      influence = calculateCursorInfluence(dotPos, point);
    } else {
      influence = calculateRippleInfluence(dotPos, point);
    }

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
