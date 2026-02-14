'use client';

import { useId, useMemo, useRef, useCallback, useEffect, memo } from 'react';
import { useGridAnimatorStore } from '../_store/grid-animator-store';
import { CellShape, AnimationStyle, BackgroundStyle } from '../_types/grid-animator-types';
import {
  computeCellDelay,
  computeCellIntensity,
  computeBreatheIntensity,
} from '../_utils/animation-patterns';

const MIN_OPACITY_ACTIVE = 0.1;
const PULSE_SIZE_MIN = 0.6;
const SCALE_MIN = 0.35;

interface InstanceRendererProps {
  instanceId: string;
}

/**
 * Renders a single grid animation instance with its label.
 * Uses direct DOM manipulation via refs for the rAF animation loop.
 */
function InstanceRendererInner({ instanceId }: InstanceRendererProps) {
  const id = useId();
  const filterId = `grid-glow-${id}`;

  const instance = useGridAnimatorStore(
    (state) => state.instances[instanceId]
  );

  if (!instance) return null;

  const { config, isPlaying, label, labelFontSize, labelSpacing, x, y } = instance;
  const { grid, activeCells, animation, color, effects } = config;
  const { rows, cols, cellShape, cellSize, gap, cornerRadius } = grid;
  const { pattern, style, direction, fps, backgroundStyle } = animation;
  const {
    activeColor,
    activeOpacity,
    inactiveColor,
    inactiveOpacity,
    backgroundColor,
    backgroundOpacity,
  } = color;
  const { glowEnabled, glowRadius, glowColor, glowOpacity } = effects;

  const totalWidth = cols * cellSize + Math.max(0, cols - 1) * gap;
  const totalHeight = rows * cellSize + Math.max(0, rows - 1) * gap;
  const glowPadding = glowEnabled ? glowRadius * 3 : 0;
  const svgWidth = totalWidth + glowPadding * 2;
  const svgHeight = totalHeight + glowPadding * 2;
  const bgPadding = Math.max(gap, 8);

  const cellDelays = useMemo(() => {
    const delays: number[][] = [];
    for (let r = 0; r < rows; r++) {
      delays[r] = [];
      for (let c = 0; c < cols; c++) {
        delays[r][c] = computeCellDelay(r, c, activeCells, rows, cols, pattern, direction);
      }
    }
    return delays;
  }, [rows, cols, activeCells, pattern, direction]);

  const cellRefs = useRef<(SVGElement | null)[][]>([]);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  if (cellRefs.current.length !== rows) {
    cellRefs.current = Array.from({ length: rows }, () => Array(cols).fill(null));
  }
  for (let r = 0; r < rows; r++) {
    if (cellRefs.current[r].length !== cols) {
      cellRefs.current[r] = Array(cols).fill(null);
    }
  }

  const setCellRef = useCallback(
    (r: number, c: number) => (el: SVGElement | null) => {
      if (!cellRefs.current[r]) cellRefs.current[r] = [];
      cellRefs.current[r][c] = el;
    },
    []
  );

  useEffect(() => {
    if (!isPlaying) {
      startTimeRef.current = null;
      return;
    }

    const cycleDurationMs = (12 / fps) * 1000;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const t = (elapsed % cycleDurationMs) / cycleDurationMs;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const el = cellRefs.current[r]?.[c];
          if (!el) continue;

          const isActive = activeCells[r]?.[c] ?? false;
          const delay = cellDelays[r]?.[c] ?? 0;
          const cx = c * (cellSize + gap) + cellSize / 2;
          const cy = r * (cellSize + gap) + cellSize / 2;

          if (isActive) {
            const intensity = computeCellIntensity(t, delay);
            const opacity =
              MIN_OPACITY_ACTIVE + intensity * (activeOpacity / 100 - MIN_OPACITY_ACTIVE);

            el.setAttribute('opacity', String(opacity));

            if (style === AnimationStyle.PulseSize) {
              const scale = PULSE_SIZE_MIN + intensity * (1 - PULSE_SIZE_MIN);
              el.setAttribute(
                'transform',
                `translate(${cx}, ${cy}) scale(${scale}) translate(${-cx}, ${-cy})`
              );
            } else if (style === AnimationStyle.Scale) {
              const scale = SCALE_MIN + intensity * (1 - SCALE_MIN);
              el.setAttribute(
                'transform',
                `translate(${cx}, ${cy}) scale(${scale}) translate(${-cx}, ${-cy})`
              );
            } else {
              el.removeAttribute('transform');
            }
          } else {
            if (backgroundStyle === BackgroundStyle.Breathe) {
              const breathe = computeBreatheIntensity(t);
              el.setAttribute('opacity', String(breathe));
            } else {
              el.setAttribute('opacity', String(inactiveOpacity / 100));
            }

            if (style === AnimationStyle.PulseSize) {
              el.setAttribute(
                'transform',
                `translate(${cx}, ${cy}) scale(${PULSE_SIZE_MIN}) translate(${-cx}, ${-cy})`
              );
            } else if (style === AnimationStyle.Scale) {
              el.setAttribute(
                'transform',
                `translate(${cx}, ${cy}) scale(${SCALE_MIN}) translate(${-cx}, ${-cy})`
              );
            } else {
              el.removeAttribute('transform');
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [
    isPlaying,
    fps,
    rows,
    cols,
    activeCells,
    cellDelays,
    style,
    backgroundStyle,
    cellSize,
    gap,
    activeOpacity,
    inactiveOpacity,
  ]);

  const cells = useMemo(() => {
    const result: Array<{
      r: number;
      c: number;
      x: number;
      y: number;
      isActive: boolean;
    }> = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        result.push({
          r,
          c,
          x: c * (cellSize + gap),
          y: r * (cellSize + gap),
          isActive: activeCells[r]?.[c] ?? false,
        });
      }
    }
    return result;
  }, [rows, cols, cellSize, gap, activeCells]);

  const gridBoxHeight = totalHeight + bgPadding * 2 + glowPadding * 2;

  return (
    <div
      className="absolute select-none"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        willChange: 'transform',
      }}
    >
      <div className="flex items-center">
        <div
          className="rounded-2xl"
          style={{
            backgroundColor,
            opacity: backgroundOpacity / 100,
            padding: bgPadding,
          }}
        >
          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: -glowPadding }}
          >
            {glowEnabled && (
              <defs>
                <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation={glowRadius} result="blur" />
                  <feFlood floodColor={glowColor} floodOpacity={glowOpacity / 100} result="color" />
                  <feComposite in="color" in2="blur" operator="in" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            )}
            <g
              transform={`translate(${glowPadding}, ${glowPadding})`}
              filter={glowEnabled ? `url(#${filterId})` : undefined}
            >
              {cells.map(({ r, c, x: cellX, y: cellY, isActive }) => {
                const fillColor = isActive ? activeColor : inactiveColor;
                const opacity = isActive ? activeOpacity / 100 : inactiveOpacity / 100;

                if (cellShape === CellShape.Circle) {
                  return (
                    <circle
                      key={`${r}-${c}`}
                      ref={setCellRef(r, c)}
                      cx={cellX + cellSize / 2}
                      cy={cellY + cellSize / 2}
                      r={cellSize / 2}
                      fill={fillColor}
                      opacity={isPlaying ? undefined : opacity}
                    />
                  );
                }

                const rx = cellShape === CellShape.RoundedRect ? cornerRadius : 0;

                return (
                  <rect
                    key={`${r}-${c}`}
                    ref={setCellRef(r, c)}
                    x={cellX}
                    y={cellY}
                    width={cellSize}
                    height={cellSize}
                    rx={rx}
                    fill={fillColor}
                    opacity={isPlaying ? undefined : opacity}
                  />
                );
              })}
            </g>
          </svg>
        </div>

        {label && (
          <span
            className="whitespace-nowrap text-neutral-200"
            style={{
              fontSize: labelFontSize,
              marginLeft: labelSpacing,
              lineHeight: `${gridBoxHeight}px`,
            }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

export const InstanceRenderer = memo(InstanceRendererInner);
