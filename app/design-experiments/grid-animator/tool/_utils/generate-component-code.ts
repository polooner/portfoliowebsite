import {
  type GridAnimatorConfig,
  CellShape,
  AnimationStyle,
  BackgroundStyle,
} from '../_types/grid-animator-types';
import { computeCellDelay } from './animation-patterns';
import { SPINNER_ACTIVE_FRACTION } from '../_constants/grid-animator-constants';

const ACTIVE_KEYFRAME_NAME = 'gridCellActive';
const BREATHE_KEYFRAME_NAME = 'gridCellBreathe';

/** Maps FPS to a cycle duration: lower FPS = slower cycle. At 12fps, one full cycle ~ 1s. */
function computeCycleDuration(fps: number): number {
  return 12 / fps;
}

/** Builds the @keyframes CSS block for active cells based on animation style. */
function buildActiveKeyframes(style: AnimationStyle): string {
  const peakPct = Math.round((SPINNER_ACTIVE_FRACTION / 2) * 100);
  const endPct = Math.round(SPINNER_ACTIVE_FRACTION * 100);

  switch (style) {
    case AnimationStyle.OpacityOnly:
      return `@keyframes ${ACTIVE_KEYFRAME_NAME} {
  0%, ${endPct}%, 100% { opacity: 0.1; }
  ${peakPct}% { opacity: 1; }
}`;
    case AnimationStyle.PulseSize:
      return `@keyframes ${ACTIVE_KEYFRAME_NAME} {
  0%, ${endPct}%, 100% { opacity: 0.1; transform: scale(0.8); }
  ${peakPct}% { opacity: 1; transform: scale(1); }
}`;
    case AnimationStyle.Scale:
      return `@keyframes ${ACTIVE_KEYFRAME_NAME} {
  0%, ${endPct}%, 100% { opacity: 0.1; transform: scale(0.5); }
  ${peakPct}% { opacity: 1; transform: scale(1); }
}`;
  }
}

/** Builds the @keyframes CSS block for breathing background cells. */
function buildBreatheKeyframes(): string {
  return `@keyframes ${BREATHE_KEYFRAME_NAME} {
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.25; }
}`;
}

/**
 * Generates CSS @keyframes for the grid animation.
 * Users paste this into their globals.css or equivalent stylesheet.
 */
export function generateCssCode(config: GridAnimatorConfig): string {
  const { style, backgroundStyle } = config.animation;

  const sections: string[] = [
    '/* Add to your globals.css */',
    buildActiveKeyframes(style),
  ];

  if (backgroundStyle === BackgroundStyle.Breathe) {
    sections.push(buildBreatheKeyframes());
  }

  return sections.join('\n\n');
}

/**
 * Generates a standalone React component string using Tailwind arbitrary values.
 * CSS @keyframes are expected to be defined separately (see generateCssCode).
 */
export function generateComponentCode(config: GridAnimatorConfig): string {
  const { grid, activeCells, animation, color, effects } = config;
  const { rows, cols, cellShape, cellSize, gap, cornerRadius } = grid;
  const { pattern, style, backgroundStyle, direction, fps } = animation;
  const { activeColor, activeOpacity, inactiveColor, inactiveOpacity, backgroundColor, backgroundOpacity } = color;
  const { glowEnabled, glowRadius, glowColor, glowOpacity } = effects;

  const cycleDuration = computeCycleDuration(fps);
  const activeOpacityDecimal = (activeOpacity / 100).toFixed(2);
  const inactiveOpacityDecimal = (inactiveOpacity / 100).toFixed(2);
  const bgOpacityDecimal = (backgroundOpacity / 100).toFixed(2);
  const glowOpacityDecimal = (glowOpacity / 100).toFixed(2);

  const totalWidth = cols * cellSize + (cols - 1) * gap;
  const totalHeight = rows * cellSize + (rows - 1) * gap;

  const padding = Math.max(gap, 4);
  const borderRadius = Math.round(cornerRadius * 1.5);

  // Build cell elements with Tailwind arbitrary values
  const cellElements: string[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isActive = activeCells[r]?.[c] ?? false;
      const x = c * (cellSize + gap);
      const y = r * (cellSize + gap);
      const delay = computeCellDelay(r, c, activeCells, rows, cols, pattern, direction);
      const delaySec = (delay * cycleDuration).toFixed(3);

      const animName = isActive
        ? ACTIVE_KEYFRAME_NAME
        : (backgroundStyle === BackgroundStyle.Breathe ? BREATHE_KEYFRAME_NAME : '');
      const cellColor = isActive ? activeColor : inactiveColor;
      const cellOpacity = isActive ? activeOpacityDecimal : inactiveOpacityDecimal;
      const animDuration = isActive ? cycleDuration.toFixed(3) : (cycleDuration * 3).toFixed(3);

      const needsTransformOrigin = isActive && (style === AnimationStyle.PulseSize || style === AnimationStyle.Scale);
      const originClass = needsTransformOrigin
        ? ` origin-[${x + cellSize / 2}px_${y + cellSize / 2}px]`
        : '';

      // Build className with Tailwind arbitrary values
      const classNames = animName
        ? `animate-[${animName}_${animDuration}s_ease-in-out_infinite] [animation-delay:${delaySec}s]${originClass} opacity-[${cellOpacity}]`
        : `opacity-[${cellOpacity}]`;

      const classAttr = `className="${classNames}"`;

      if (cellShape === CellShape.Circle) {
        const cx = x + cellSize / 2;
        const cy = y + cellSize / 2;
        const radius = cellSize / 2;
        cellElements.push(
          `        <circle cx={${cx}} cy={${cy}} r={${radius}} fill="${cellColor}" ${classAttr} />`
        );
      } else {
        const rx = cellShape === CellShape.RoundedRect ? cornerRadius : 0;
        cellElements.push(
          `        <rect x={${x}} y={${y}} width={${cellSize}} height={${cellSize}} rx={${rx}} fill="${cellColor}" ${classAttr} />`
        );
      }
    }
  }

  // Build glow filter
  const glowFilterDef = glowEnabled
    ? `
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={${glowRadius}} result="blur" />
            <feFlood floodColor="${glowColor}" floodOpacity={${glowOpacityDecimal}} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>`
    : '';

  const filterAttr = glowEnabled ? ' filter={`url(#${filterId})`}' : '';

  // Only need useId when glow is enabled (for unique filter IDs)
  const useIdImport = glowEnabled ? "\nimport { useId } from 'react';\n" : '';
  const useIdDecl = glowEnabled
    ? `\n  const id = useId();\n  const filterId = \`grid-glow-\${id}\`;\n`
    : '';

  return `'use client';
${useIdImport}
export function GridAnimation() {${useIdDecl}
  return (
    <div className="inline-flex bg-[${backgroundColor}] opacity-[${bgOpacityDecimal}] p-[${padding}px] rounded-[${borderRadius}px]">
      <svg
        width={${totalWidth}}
        height={${totalHeight}}
        viewBox="0 0 ${totalWidth} ${totalHeight}"
        xmlns="http://www.w3.org/2000/svg"
      >${glowFilterDef ? `
          <defs>${glowFilterDef}
          </defs>` : ''}
        <g${filterAttr}>
${cellElements.join('\n')}
        </g>
      </svg>
    </div>
  );
}`;
}
