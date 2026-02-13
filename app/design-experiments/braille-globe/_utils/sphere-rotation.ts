import type { SpherePoint3D, RotationMatrix } from '../_types/globe-types';

/** Identity matrix (no rotation). */
export const IDENTITY_MATRIX: RotationMatrix = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1,
];

/**
 * Creates a rotation matrix from an axis-angle representation.
 * Axis does not need to be normalized — it will be normalized internally.
 */
export function axisAngleToMatrix(
  axisX: number,
  axisY: number,
  axisZ: number,
  angle: number
): RotationMatrix {
  const len = Math.sqrt(axisX * axisX + axisY * axisY + axisZ * axisZ);
  if (len < 1e-10) return IDENTITY_MATRIX;

  const nx = axisX / len;
  const ny = axisY / len;
  const nz = axisZ / len;

  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const oneMinusCos = 1 - cos;

  return [
    cos + nx * nx * oneMinusCos,
    nx * ny * oneMinusCos - nz * sin,
    nx * nz * oneMinusCos + ny * sin,

    ny * nx * oneMinusCos + nz * sin,
    cos + ny * ny * oneMinusCos,
    ny * nz * oneMinusCos - nx * sin,

    nz * nx * oneMinusCos - ny * sin,
    nz * ny * oneMinusCos + nx * sin,
    cos + nz * nz * oneMinusCos,
  ];
}

/**
 * Multiplies two 3x3 rotation matrices (row-major): result = A * B.
 */
export function multiplyMatrices(
  a: RotationMatrix,
  b: RotationMatrix
): RotationMatrix {
  return [
    a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
    a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
    a[0] * b[2] + a[1] * b[5] + a[2] * b[8],

    a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
    a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
    a[3] * b[2] + a[4] * b[5] + a[5] * b[8],

    a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
    a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
    a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
  ];
}

/**
 * Applies a rotation matrix to a 3D point.
 */
export function rotatePoint(
  point: SpherePoint3D,
  matrix: RotationMatrix
): SpherePoint3D {
  return {
    x: matrix[0] * point.x + matrix[1] * point.y + matrix[2] * point.z,
    y: matrix[3] * point.x + matrix[4] * point.y + matrix[5] * point.z,
    z: matrix[6] * point.x + matrix[7] * point.y + matrix[8] * point.z,
  };
}

/**
 * Rotates all points by the given matrix.
 */
export function rotateAllPoints(
  points: SpherePoint3D[],
  matrix: RotationMatrix
): SpherePoint3D[] {
  return points.map((p) => rotatePoint(p, matrix));
}
