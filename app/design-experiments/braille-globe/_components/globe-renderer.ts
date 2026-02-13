import type { ProjectedDot, CursorPosition, RotationMatrix } from '../_types/globe-types';
import { IMAGE_PLANE_OPACITY } from '../_constants/globe-config';
import { calculateHoverInfluence, computeDotColor } from '../_utils/sphere-influence';
import { projectImagePlane, drawImagePlane } from '../_utils/image-plane';

/** Draws a single dot with SDF hover influence. */
function drawDot(
  ctx: CanvasRenderingContext2D,
  dot: ProjectedDot,
  cursor: CursorPosition | null
): void {
  const influence = calculateHoverInfluence(dot, cursor);
  const color = computeDotColor(dot, influence);

  ctx.beginPath();
  ctx.arc(dot.screenX, dot.screenY, dot.radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Draws the full globe: back-hemisphere dots, then image plane, then front-hemisphere dots.
 * Dots should already be sorted back-to-front (ascending z).
 */
export function renderGlobe(
  ctx: CanvasRenderingContext2D,
  dots: ProjectedDot[],
  cursor: CursorPosition | null,
  width: number,
  height: number,
  image: HTMLImageElement | null,
  rotationMatrix: RotationMatrix
): void {
  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;

  if (!image) {
    for (const dot of dots) drawDot(ctx, dot, cursor);
    return;
  }

  const plane = projectImagePlane(rotationMatrix, centerX, centerY);

  // Back dots (behind image plane)
  let i = 0;
  for (; i < dots.length; i++) {
    if (dots[i].z >= plane.zCenter) break;
    drawDot(ctx, dots[i], cursor);
  }

  // Image plane
  drawImagePlane(ctx, image, plane, IMAGE_PLANE_OPACITY);

  // Front dots (in front of image plane)
  for (; i < dots.length; i++) {
    drawDot(ctx, dots[i], cursor);
  }
}
