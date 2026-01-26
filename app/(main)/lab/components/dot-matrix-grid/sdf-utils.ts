import { Vector3 } from 'three';
import type { InfluencePoint } from './dot-matrix-grid-types';
import { GAUSSIAN_K } from './dot-matrix-grid-constants';

const tempVec = new Vector3();

/**
 * Calculates comet influence with a head and fading tail
 */
function calculateCometInfluence(
  dotPos: Vector3,
  point: InfluencePoint
): number {
  // Direction the comet is traveling (normalized velocity)
  const dir = tempVec.copy(point.velocity).normalize();

  // Vector from comet head to dot
  const toDot = new Vector3().subVectors(dotPos, point.position);

  // Project onto comet direction (negative = behind comet = in tail)
  const alongAxis = toDot.dot(dir);

  // Perpendicular distance from comet axis
  const perpendicular = Math.sqrt(
    toDot.lengthSq() - alongAxis * alongAxis
  );

  // Head influence (circular, in front of or at comet position)
  if (alongAxis >= 0) {
    const dist = dotPos.distanceTo(point.position);
    const normalizedDist = dist / point.radius;
    if (normalizedDist < 1) {
      return Math.exp(-GAUSSIAN_K * normalizedDist ** 2) * point.strength;
    }
    return 0;
  }

  // Tail influence (behind comet, elongated)
  const tailProgress = Math.abs(alongAxis) / point.tailLength;
  if (tailProgress > 1) return 0;

  // Tail gets narrower toward the end
  const tailRadius = point.radius * (1 - tailProgress * 0.7);
  const normalizedPerp = perpendicular / tailRadius;
  if (normalizedPerp > 1) return 0;

  // Fade out along tail and radially
  const tailFade = 1 - tailProgress;
  const radialFade = Math.exp(-GAUSSIAN_K * normalizedPerp ** 2);

  return tailFade * radialFade * point.strength * 0.7;
}

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
 * Calculates sweep influence (vertical or horizontal wave line)
 */
function calculateSweepInfluence(
  dotPos: Vector3,
  point: InfluencePoint
): number {
  // Sweep uses velocity direction to determine sweep axis
  const isHorizontal = Math.abs(point.velocity.x) > Math.abs(point.velocity.y);

  const dist = isHorizontal
    ? Math.abs(dotPos.x - point.position.x)
    : Math.abs(dotPos.y - point.position.y);

  const normalizedDist = dist / point.radius;
  if (normalizedDist > 1) return 0;

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

    switch (point.type) {
      case 'comet':
        influence = calculateCometInfluence(dotPos, point);
        break;
      case 'ripple':
        influence = calculateRippleInfluence(dotPos, point);
        break;
      case 'sweep':
        influence = calculateSweepInfluence(dotPos, point);
        break;
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
