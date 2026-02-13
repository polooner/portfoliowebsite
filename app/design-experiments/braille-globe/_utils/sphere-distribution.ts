import type { SpherePoint3D } from '../_types/globe-types';

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

/**
 * Generates evenly distributed points on a unit sphere using the Fibonacci spiral method.
 * Returns points with coordinates in [-1, 1] range.
 */
export function generateFibonacciSphere(count: number): SpherePoint3D[] {
  const points: SpherePoint3D[] = [];

  for (let i = 0; i < count; i++) {
    const z = 1 - (2 * i) / (count - 1);
    const radiusAtZ = Math.sqrt(1 - z * z);
    const longitude = (2 * Math.PI * i) / GOLDEN_RATIO;

    points.push({
      x: Math.cos(longitude) * radiusAtZ,
      y: Math.sin(longitude) * radiusAtZ,
      z,
    });
  }

  return points;
}
