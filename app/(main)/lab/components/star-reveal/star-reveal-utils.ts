import {
  BLUR_SCALE_FACTOR,
  MIN_BLUR_AMOUNT,
  STAR_POINTS_COUNT,
  STAR_INNER_RADIUS_RATIO,
} from './star-reveal-constants';

/** Starting angle offset to point star upward */
const STAR_START_ANGLE = (Math.PI / 2) * 3;

/**
 * Generates an SVG path string for a star shape.
 * Creates a closed path alternating between outer and inner radius points.
 */
export function calculateStarPath(
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number
): string {
  let rotation = STAR_START_ANGLE;
  const step = Math.PI / spikes;
  let path = `M ${cx} ${cy - outerRadius}`;

  for (let i = 0; i < spikes; i++) {
    const outerX = cx + Math.cos(rotation) * outerRadius;
    const outerY = cy + Math.sin(rotation) * outerRadius;
    path += ` L ${outerX} ${outerY}`;
    rotation += step;

    const innerX = cx + Math.cos(rotation) * innerRadius;
    const innerY = cy + Math.sin(rotation) * innerRadius;
    path += ` L ${innerX} ${innerY}`;
    rotation += step;
  }

  path += ` L ${cx} ${cy - outerRadius} Z`;
  return path;
}

/**
 * Generates SVG polygon points string for a star shape.
 * Creates alternating outer and inner points around a center.
 */
export function generateStarPoints(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  pointCount: number = STAR_POINTS_COUNT
): string {
  const points: string[] = [];
  const totalPoints = pointCount * 2;
  const angleStep = Math.PI / pointCount;
  const startAngle = -Math.PI / 2;

  for (let i = 0; i < totalPoints; i++) {
    const angle = startAngle + i * angleStep;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  return points.join(' ');
}

/**
 * Calculates proportional blur amount based on star size.
 * Ensures consistent softness across different star sizes.
 */
export function calculateBlur(size: number): number {
  const calculatedBlur = size * BLUR_SCALE_FACTOR;
  return Math.max(calculatedBlur, MIN_BLUR_AMOUNT);
}

/**
 * Calculates inner radius from outer radius using the default ratio.
 */
export function calculateInnerRadius(
  outerRadius: number,
  ratio: number = STAR_INNER_RADIUS_RATIO
): number {
  return outerRadius * ratio;
}

/**
 * Creates an SVG mask as a data URL where star is WHITE (visible) on BLACK background (hidden).
 * Uses multiple layered stars with increasing opacity for soft edges.
 */
export function createStarMaskDataUrl(
  width: number,
  height: number,
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  pointCount: number,
  blur: number
): string {
  // Create multiple star layers for soft edge effect
  const layers: string[] = [];
  const steps = 15;

  // Build layers from largest (faintest) to smallest (fully white)
  for (let i = steps; i >= 0; i--) {
    const scale = 1 + (i / steps) * (blur / outerRadius);
    // Outer layers are faint gray, inner layers approach white
    const grayValue = Math.round(255 * (1 - i / steps));
    const color = `rgb(${grayValue},${grayValue},${grayValue})`;
    const scaledOuter = outerRadius * scale;
    const scaledInner = innerRadius * scale;
    const points = generateStarPoints(cx, cy, scaledOuter, scaledInner, pointCount);
    layers.push(`<polygon points="${points}" fill="${color}" />`);
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect fill="black" width="100%" height="100%" />${layers.join('')}</svg>`;

  // Encode for use in CSS url()
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
