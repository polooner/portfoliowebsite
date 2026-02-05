'use client';

import { useId } from 'react';

// Grid layout
const COLUMNS = 2;
const ROWS = 4;
const PANE_WIDTH = 180;
const PANE_HEIGHT = 180;
const GAP_X = 20; // vertical frame dividers
const GAP_Y = 15; // horizontal blind gaps

// Default transform values
const DEFAULT_SKEW_X = 5;
const DEFAULT_SKEW_Y = 20;

// Blur
const BLUR_AMOUNT = 15;

// Calculate total grid dimensions
const TOTAL_WIDTH = COLUMNS * PANE_WIDTH + (COLUMNS - 1) * GAP_X;
const TOTAL_HEIGHT = ROWS * PANE_HEIGHT + (ROWS - 1) * GAP_Y;

// ViewBox dimensions (larger than grid to allow for blur overflow)
const VIEWBOX_PADDING = 200;
const VIEWBOX_WIDTH = TOTAL_WIDTH + VIEWBOX_PADDING * 2;
const VIEWBOX_HEIGHT = TOTAL_HEIGHT + VIEWBOX_PADDING * 2;

function generatePaneRects() {
  const rects: Array<{ x: number; y: number; width: number; height: number }> = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      const x = col * (PANE_WIDTH + GAP_X);
      const y = row * (PANE_HEIGHT + GAP_Y);
      rects.push({ x, y, width: PANE_WIDTH, height: PANE_HEIGHT });
    }
  }

  return rects;
}

const PANE_RECTS = generatePaneRects();

interface WindowShadowProps {
  /** When true, renders as an overlay with mix-blend-multiply instead of a background */
  asOverlay?: boolean;
  /** Horizontal skew angle in degrees */
  skewX?: number;
  /** Vertical skew angle in degrees */
  skewY?: number;
  /** Horizontal offset - negative moves left, positive moves right (default: 0) */
  offsetX?: number;
  /** Vertical offset - negative moves up, positive moves down (default: 0) */
  offsetY?: number;
}

export default function WindowShadowExperiment({
  asOverlay = false,
  skewX = DEFAULT_SKEW_X,
  skewY = DEFAULT_SKEW_Y,
  offsetX = 0,
  offsetY = 0,
}: WindowShadowProps) {
  const uniqueId = useId();
  const filterId = `window-blur-${uniqueId}`;
  const fadeGradientId = `fade-gradient-${uniqueId}`;
  const fadeMaskId = `fade-mask-${uniqueId}`;

  // Position the grid within the viewBox
  const gridOffsetX = VIEWBOX_PADDING + offsetX;
  const gridOffsetY = VIEWBOX_PADDING + offsetY;

  const containerClasses = asOverlay
    ? 'fixed inset-0 z-20 w-full h-full overflow-hidden pointer-events-none mix-blend-multiply'
    : 'fixed inset-0 z-0 w-full h-full bg-neutral-300 overflow-hidden';

  // Shift windows to the left in overlay mode
  const aspectRatio = asOverlay ? 'xMinYMid slice' : 'xMidYMid slice';

  return (
    <div className={containerClasses}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio={aspectRatio}
      >
        <defs>
          <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={BLUR_AMOUNT} />
          </filter>

          {/* Gradient for fade effect - goes from opaque to transparent */}
          {asOverlay && (
            <>
              <linearGradient id={fadeGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="50%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id={fadeMaskId}>
                <rect x="0" y="0" width="100%" height="100%" fill={`url(#${fadeGradientId})`} />
              </mask>
            </>
          )}
        </defs>

        {/* Content group with fade mask in overlay mode */}
        <g mask={asOverlay ? `url(#${fadeMaskId})` : undefined}>
          {/* Gray base for overlay mode - this creates the shadow effect */}
          {asOverlay && (
            <rect x="0" y="0" width="100%" height="100%" fill="#a3a3a3" />
          )}

          {/* Window shadow grid - centered and skewed */}
          <g
            filter={`url(#${filterId})`}
            transform={`
              translate(${gridOffsetX}, ${gridOffsetY})
              skewX(${skewX})
              skewY(${skewY})
            `}
          >
            {PANE_RECTS.map((rect, index) => (
              <rect
                key={index}
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                fill="white"
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
