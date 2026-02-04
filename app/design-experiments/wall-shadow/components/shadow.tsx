'use client';

import { useId } from 'react';

// Grid layout
const COLUMNS = 3;
const ROWS = 8;
const PANE_WIDTH = 180;
const PANE_HEIGHT = 80;
const GAP_X = 20; // vertical frame dividers
const GAP_Y = 15; // horizontal blind gaps

// Transform
const SKEW_X = -5;
const SKEW_Y = 8;

// Blur
const BLUR_AMOUNT = 20;

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
}

export default function WindowShadowExperiment({ asOverlay = false }: WindowShadowProps) {
  const uniqueId = useId();
  const filterId = `window-blur-${uniqueId}`;

  // Center the grid within the viewBox
  const gridOffsetX = VIEWBOX_PADDING;
  const gridOffsetY = VIEWBOX_PADDING;

  const containerClasses = asOverlay
    ? 'fixed inset-0 z-20 w-full h-full overflow-hidden pointer-events-none mix-blend-multiply'
    : 'fixed inset-0 z-0 w-full h-full bg-neutral-300 overflow-hidden';

  return (
    <div className={containerClasses}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={BLUR_AMOUNT} />
          </filter>
        </defs>

        {/* Gray base for overlay mode - this creates the shadow effect */}
        {asOverlay && (
          <rect x="0" y="0" width="100%" height="100%" fill="#d4d4d4" />
        )}

        {/* Window shadow grid - centered and skewed */}
        <g
          filter={`url(#${filterId})`}
          transform={`
            translate(${gridOffsetX}, ${gridOffsetY})
            skewX(${SKEW_X})
            skewY(${SKEW_Y})
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
      </svg>
    </div>
  );
}
