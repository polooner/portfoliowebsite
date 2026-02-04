'use client';

import { useId } from 'react';

// Grid layout
const COLUMNS = 2;
const ROWS = 4;
const PANE_WIDTH = 180;
const PANE_HEIGHT = 180;
const GAP_X = 20;
const GAP_Y = 15;

// Transform values
const SKEW_X = 5;
const SKEW_Y = 20;

// Blur
const BLUR_AMOUNT = 15;

// Calculate total grid dimensions
const TOTAL_WIDTH = COLUMNS * PANE_WIDTH + (COLUMNS - 1) * GAP_X;
const TOTAL_HEIGHT = ROWS * PANE_HEIGHT + (ROWS - 1) * GAP_Y;

// ViewBox dimensions
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

/**
 * Shadow preview content for the tool canvas.
 */
export default function CanvasContent() {
  const uniqueId = useId();
  const filterId = `tool-blur-${uniqueId}`;

  const gridOffsetX = VIEWBOX_PADDING;
  const gridOffsetY = VIEWBOX_PADDING;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-300">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={BLUR_AMOUNT} />
          </filter>
        </defs>

        {/* Gray base */}
        <rect x="0" y="0" width="100%" height="100%" fill="#d4d4d4" />

        {/* Window shadow grid */}
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
