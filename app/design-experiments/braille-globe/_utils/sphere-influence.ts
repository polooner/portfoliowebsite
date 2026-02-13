import type { CursorPosition, ProjectedDot } from '../_types/globe-types';
import {
  HOVER_INFLUENCE_RADIUS,
  HOVER_GAUSSIAN_K,
  DOT_DEFAULT_COLOR_RGB,
  DOT_HIGHLIGHT_COLOR_RGB,
} from '../_constants/globe-config';

/**
 * Calculates Gaussian falloff influence from cursor to a projected dot.
 * Returns a value in [0, 1] where 1 = directly under cursor.
 */
export function calculateHoverInfluence(
  dot: ProjectedDot,
  cursor: CursorPosition | null
): number {
  if (!cursor) return 0;

  const dx = dot.screenX - cursor.x;
  const dy = dot.screenY - cursor.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > HOVER_INFLUENCE_RADIUS) return 0;

  const normalizedDist = dist / HOVER_INFLUENCE_RADIUS;
  return Math.exp(-HOVER_GAUSSIAN_K * normalizedDist * normalizedDist);
}

/**
 * Computes the final RGBA color string for a dot based on hover influence and depth opacity.
 */
export function computeDotColor(
  dot: ProjectedDot,
  influence: number
): string {
  const r = lerp(DOT_DEFAULT_COLOR_RGB.r, DOT_HIGHLIGHT_COLOR_RGB.r, influence);
  const g = lerp(DOT_DEFAULT_COLOR_RGB.g, DOT_HIGHLIGHT_COLOR_RGB.g, influence);
  const b = lerp(DOT_DEFAULT_COLOR_RGB.b, DOT_HIGHLIGHT_COLOR_RGB.b, influence);

  const boostedOpacity = Math.min(1, dot.opacity + influence * 0.3);

  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${boostedOpacity.toFixed(3)})`;
}

/** Linear interpolation between two values. */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
