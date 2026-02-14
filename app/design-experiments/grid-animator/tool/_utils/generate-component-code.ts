import {
  type GridAnimatorConfig,
  CellShape,
  AnimationStyle,
  BackgroundStyle,
} from '../_types/grid-animator-types';
import { computeCellDelay } from './animation-patterns';
import { SPINNER_ACTIVE_FRACTION } from '../_constants/grid-animator-constants';

/** Generates the duration in seconds from FPS (one full cycle) */
function computeCycleDuration(fps: number): number {
  // Map FPS to a cycle duration: lower FPS = slower cycle
  // At 12fps, one full cycle ~ 1s. Scale inversely.
  return 12 / fps;
}

/**
 * Generates a standalone React component string with CSS keyframes
 * that reproduces the current grid animation.
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

  // Compute total SVG dimensions
  const totalWidth = cols * cellSize + (cols - 1) * gap;
  const totalHeight = rows * cellSize + (rows - 1) * gap;

  // Build keyframes based on animation style
  const activeKeyframeName = 'gridCellActive';
  const breatheKeyframeName = 'gridCellBreathe';

  let activeKeyframes = '';
  switch (style) {
    case AnimationStyle.OpacityOnly:
      activeKeyframes = `@keyframes ${activeKeyframeName} {
  0%, ${Math.round(SPINNER_ACTIVE_FRACTION * 100)}%, 100% { opacity: 0.1; }
  ${Math.round((SPINNER_ACTIVE_FRACTION / 2) * 100)}% { opacity: 1; }
}`;
      break;
    case AnimationStyle.PulseSize:
      activeKeyframes = `@keyframes ${activeKeyframeName} {
  0%, ${Math.round(SPINNER_ACTIVE_FRACTION * 100)}%, 100% { opacity: 0.1; transform: scale(0.8); }
  ${Math.round((SPINNER_ACTIVE_FRACTION / 2) * 100)}% { opacity: 1; transform: scale(1); }
}`;
      break;
    case AnimationStyle.Scale:
      activeKeyframes = `@keyframes ${activeKeyframeName} {
  0%, ${Math.round(SPINNER_ACTIVE_FRACTION * 100)}%, 100% { opacity: 0.1; transform: scale(0.5); }
  ${Math.round((SPINNER_ACTIVE_FRACTION / 2) * 100)}% { opacity: 1; transform: scale(1); }
}`;
      break;
  }

  const breatheKeyframes =
    backgroundStyle === BackgroundStyle.Breathe
      ? `\n@keyframes ${breatheKeyframeName} {
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.25; }
}`
      : '';

  // Generate cell elements
  const cellElements: string[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isActive = activeCells[r]?.[c] ?? false;
      const x = c * (cellSize + gap);
      const y = r * (cellSize + gap);
      const delay = computeCellDelay(r, c, activeCells, rows, cols, pattern, direction);
      const delaySec = (delay * cycleDuration).toFixed(3);

      const animationName = isActive ? activeKeyframeName : (backgroundStyle === BackgroundStyle.Breathe ? breatheKeyframeName : '');
      const cellColor = isActive ? activeColor : inactiveColor;
      const cellOpacity = isActive ? activeOpacityDecimal : inactiveOpacityDecimal;
      const animDuration = isActive ? cycleDuration.toFixed(3) : (cycleDuration * 3).toFixed(3);

      const needsTransformOrigin = isActive && (style === AnimationStyle.PulseSize || style === AnimationStyle.Scale);
      const transformOrigin = needsTransformOrigin
        ? `transformOrigin: '${x + cellSize / 2}px ${y + cellSize / 2}px',`
        : '';

      const styleObj = animationName
        ? `style={{ animation: '${animationName} ${animDuration}s ease-in-out ${delaySec}s infinite', ${transformOrigin} fill: '${cellColor}', opacity: ${cellOpacity} }}`
        : `style={{ fill: '${cellColor}', opacity: ${cellOpacity} }}`;

      if (cellShape === CellShape.Circle) {
        const cx = x + cellSize / 2;
        const cy = y + cellSize / 2;
        const radius = cellSize / 2;
        cellElements.push(
          `        <circle cx={${cx}} cy={${cy}} r={${radius}} ${styleObj} />`
        );
      } else {
        const rx = cellShape === CellShape.RoundedRect ? cornerRadius : 0;
        cellElements.push(
          `        <rect x={${x}} y={${y}} width={${cellSize}} height={${cellSize}} rx={${rx}} ${styleObj} />`
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

  return `'use client';

import { useId } from 'react';

const STYLE = \`
${activeKeyframes}${breatheKeyframes}
\`;

export function GridAnimation() {
  const id = useId();
  const filterId = \`grid-glow-\${id}\`;

  return (
    <>
      <style>{STYLE}</style>
      <div
        style={{
          display: 'inline-flex',
          backgroundColor: '${backgroundColor}',
          opacity: ${bgOpacityDecimal},
          padding: ${Math.max(gap, 4)},
          borderRadius: ${Math.round(cornerRadius * 1.5)},
        }}
      >
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
    </>
  );
}`;
}
