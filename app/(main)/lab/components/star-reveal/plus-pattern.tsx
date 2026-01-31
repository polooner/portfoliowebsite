import {
  PLUS_GRID_GAP,
  PLUS_SIZE,
  PLUS_THICKNESS,
  PLUS_COLOR,
} from './star-reveal-constants';
import type { PlusPatternProps } from './star-reveal-types';

/**
 * Creates an SVG data URL for a single plus sign.
 * Used as a repeating background pattern.
 */
function createPlusSvgDataUrl(
  size: number,
  thickness: number,
  color: string,
  gap: number
): string {
  const cellSize = gap;
  const halfCell = cellSize / 2;
  const halfSize = size / 2;
  const halfThickness = thickness / 2;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${cellSize}" height="${cellSize}">
      <rect
        x="${halfCell - halfThickness}"
        y="${halfCell - halfSize}"
        width="${thickness}"
        height="${size}"
        fill="${encodeURIComponent(color)}"
      />
      <rect
        x="${halfCell - halfSize}"
        y="${halfCell - halfThickness}"
        width="${size}"
        height="${thickness}"
        fill="${encodeURIComponent(color)}"
      />
    </svg>
  `.trim().replace(/\s+/g, ' ');

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Renders a CSS-based plus sign grid pattern.
 * Uses an inline SVG data URL as a repeating background.
 */
export function PlusPattern({
  gap = PLUS_GRID_GAP,
  size = PLUS_SIZE,
  thickness = PLUS_THICKNESS,
  color = PLUS_COLOR,
}: PlusPatternProps = {}) {
  const patternUrl = createPlusSvgDataUrl(size, thickness, color, gap);

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url("${patternUrl}")`,
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center center',
      }}
    />
  );
}
