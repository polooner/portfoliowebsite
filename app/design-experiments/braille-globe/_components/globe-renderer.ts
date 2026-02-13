import type { ProjectedDot, CursorPosition } from '../_types/globe-types';
import { calculateHoverInfluence, computeDotColor } from '../_utils/sphere-influence';

/**
 * Draws all projected dots to a 2D canvas context.
 * Dots should already be sorted back-to-front (painter's algorithm).
 */
export function renderGlobe(
  ctx: CanvasRenderingContext2D,
  dots: ProjectedDot[],
  cursor: CursorPosition | null,
  width: number,
  height: number
): void {
  ctx.clearRect(0, 0, width, height);

  for (const dot of dots) {
    const influence = calculateHoverInfluence(dot, cursor);
    const color = computeDotColor(dot, influence);

    ctx.beginPath();
    ctx.arc(dot.screenX, dot.screenY, dot.radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
}
