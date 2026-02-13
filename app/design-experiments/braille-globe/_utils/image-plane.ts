import type { RotationMatrix, SpherePoint3D } from '../_types/globe-types';
import { SPHERE_RADIUS_PX, IMAGE_PLANE_SCALE } from '../_constants/globe-config';
import { rotatePoint } from './sphere-rotation';

/** Screen-space coordinates for the 3 anchor points needed for an affine transform. */
export interface ProjectedPlane {
  /** Top-left corner in screen space. */
  topLeft: { x: number; y: number };
  /** Top-right corner in screen space. */
  topRight: { x: number; y: number };
  /** Bottom-left corner in screen space. */
  bottomLeft: { x: number; y: number };
  /** Average z-depth for painter's algorithm ordering. */
  zCenter: number;
}

const HALF = IMAGE_PLANE_SCALE;

/** The 3 anchor corners of the image plane on the XY plane at z=0 (unit sphere coords). */
const PLANE_TOP_LEFT: SpherePoint3D = { x: -HALF, y: -HALF, z: 0 };
const PLANE_TOP_RIGHT: SpherePoint3D = { x: HALF, y: -HALF, z: 0 };
const PLANE_BOTTOM_LEFT: SpherePoint3D = { x: -HALF, y: HALF, z: 0 };

/**
 * Projects a 3D point to screen space using orthographic projection.
 */
function toScreen(p: SpherePoint3D, cx: number, cy: number) {
  return {
    x: cx + p.x * SPHERE_RADIUS_PX,
    y: cy + p.y * SPHERE_RADIUS_PX,
  };
}

/**
 * Rotates and projects the image plane corners into screen space.
 */
export function projectImagePlane(
  matrix: RotationMatrix,
  centerX: number,
  centerY: number
): ProjectedPlane {
  const rTL = rotatePoint(PLANE_TOP_LEFT, matrix);
  const rTR = rotatePoint(PLANE_TOP_RIGHT, matrix);
  const rBL = rotatePoint(PLANE_BOTTOM_LEFT, matrix);

  return {
    topLeft: toScreen(rTL, centerX, centerY),
    topRight: toScreen(rTR, centerX, centerY),
    bottomLeft: toScreen(rBL, centerX, centerY),
    zCenter: (rTL.z + rTR.z + rBL.z) / 3,
  };
}

/**
 * Draws an image onto the canvas using an affine transform derived from
 * the 3 projected corner points (top-left, top-right, bottom-left).
 */
export function drawImagePlane(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  plane: ProjectedPlane,
  opacity: number
): void {
  const { topLeft, topRight, bottomLeft } = plane;
  const w = image.naturalWidth;
  const h = image.naturalHeight;

  // Affine matrix: maps (0,0)→topLeft, (w,0)→topRight, (0,h)→bottomLeft
  const ax = (topRight.x - topLeft.x) / w;
  const ay = (topRight.y - topLeft.y) / w;
  const bx = (bottomLeft.x - topLeft.x) / h;
  const by = (bottomLeft.y - topLeft.y) / h;

  ctx.save();
  ctx.globalAlpha = opacity;
  // Use ctx.transform (not setTransform) to multiply onto the existing DPR scale
  ctx.transform(ax, ay, bx, by, topLeft.x, topLeft.y);
  ctx.drawImage(image, 0, 0);
  ctx.restore();
}
