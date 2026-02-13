import type { SpherePoint3D, ProjectedDot } from '../_types/globe-types';
import {
  SPHERE_RADIUS_PX,
  DOT_BASE_RADIUS,
  DOT_MIN_RADIUS_RATIO,
  DOT_FRONT_OPACITY,
  DOT_EDGE_OPACITY,
  BACKFACE_CULL_THRESHOLD,
} from '../_constants/globe-config';

/**
 * Projects a 3D sphere point to 2D screen coordinates using orthographic projection.
 * Returns null for back-facing dots (z below cull threshold).
 */
export function projectPoint(
  point: SpherePoint3D,
  centerX: number,
  centerY: number
): ProjectedDot | null {
  if (point.z < BACKFACE_CULL_THRESHOLD) return null;

  const depthFactor = Math.max(0, point.z);

  return {
    screenX: centerX + point.x * SPHERE_RADIUS_PX,
    screenY: centerY + point.y * SPHERE_RADIUS_PX,
    radius: DOT_BASE_RADIUS * (DOT_MIN_RADIUS_RATIO + (1 - DOT_MIN_RADIUS_RATIO) * depthFactor),
    opacity: DOT_EDGE_OPACITY + (DOT_FRONT_OPACITY - DOT_EDGE_OPACITY) * depthFactor,
    z: point.z,
  };
}

/**
 * Projects all sphere points and returns visible dots sorted back-to-front (painter's algorithm).
 */
export function projectAllPoints(
  points: SpherePoint3D[],
  centerX: number,
  centerY: number
): ProjectedDot[] {
  const projected: ProjectedDot[] = [];

  for (const point of points) {
    const dot = projectPoint(point, centerX, centerY);
    if (dot) projected.push(dot);
  }

  projected.sort((a, b) => a.z - b.z);
  return projected;
}
