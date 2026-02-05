'use client';

import { useId, useMemo } from 'react';
import { useShadowStore } from '../_store/shadow-store';

const VIEWBOX_PADDING = 200;

/**
 * Shadow preview content for the tool canvas.
 */
export default function CanvasContent() {
  const uniqueId = useId();
  const filterId = `tool-blur-${uniqueId}`;

  const { columns, rows, paneWidth, paneHeight, gapX, gapY, skewX, skewY, blur } =
    useShadowStore();

  // Calculate grid dimensions
  const totalWidth = columns * paneWidth + (columns - 1) * gapX;
  const totalHeight = rows * paneHeight + (rows - 1) * gapY;
  const viewBoxWidth = totalWidth + VIEWBOX_PADDING * 2;
  const viewBoxHeight = totalHeight + VIEWBOX_PADDING * 2;

  // Generate pane rectangles
  const paneRects = useMemo(() => {
    const rects: Array<{ x: number; y: number; width: number; height: number }> = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const x = col * (paneWidth + gapX);
        const y = row * (paneHeight + gapY);
        rects.push({ x, y, width: paneWidth, height: paneHeight });
      }
    }
    return rects;
  }, [columns, rows, paneWidth, paneHeight, gapX, gapY]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-300">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
          </filter>
        </defs>

        {/* Gray base */}
        <rect x="0" y="0" width="100%" height="100%" fill="#d4d4d4" />

        {/* Window shadow grid */}
        <g
          filter={`url(#${filterId})`}
          transform={`
            translate(${VIEWBOX_PADDING}, ${VIEWBOX_PADDING})
            skewX(${skewX})
            skewY(${skewY})
          `}
        >
          {paneRects.map((rect, index) => (
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
