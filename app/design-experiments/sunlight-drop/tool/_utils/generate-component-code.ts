import { OklchColor, oklchToCss } from '../_store/shadow-store';

/** Configuration for generating React component code */
export interface ComponentCodeConfig {
  columns: number;
  rows: number;
  paneWidth: number;
  paneHeight: number;
  gapX: number;
  gapY: number;
  skewX: number;
  skewY: number;
  blur: number;
  fillColor: OklchColor;
  fillOpacity: number;
  backgroundColor: OklchColor;
  backgroundOpacity: number;
}

const VIEWBOX_PADDING = 200;

/** Generates pane rectangle positions for the grid */
function generatePaneRects(config: ComponentCodeConfig) {
  const { columns, rows, paneWidth, paneHeight, gapX, gapY } = config;
  const rects: Array<{ x: number; y: number }> = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const x = col * (paneWidth + gapX);
      const y = row * (paneHeight + gapY);
      rects.push({ x, y });
    }
  }

  return rects;
}

/**
 * Generates a React component string from shadow configuration.
 * Produces a standalone component that can be copied and used directly.
 */
export function generateComponentCode(config: ComponentCodeConfig): string {
  const {
    columns,
    rows,
    paneWidth,
    paneHeight,
    gapX,
    gapY,
    skewX,
    skewY,
    blur,
    fillColor,
    fillOpacity,
    backgroundColor,
    backgroundOpacity,
  } = config;

  // Calculate dimensions
  const totalWidth = columns * paneWidth + (columns - 1) * gapX;
  const totalHeight = rows * paneHeight + (rows - 1) * gapY;
  const viewBoxWidth = totalWidth + VIEWBOX_PADDING * 2;
  const viewBoxHeight = totalHeight + VIEWBOX_PADDING * 2;

  // Generate rect elements
  const paneRects = generatePaneRects(config);
  const rectsCode = paneRects
    .map(
      ({ x, y }, index) =>
        `          <rect key={${index}} x={${x}} y={${y}} width={${paneWidth}} height={${paneHeight}} />`
    )
    .join('\n');

  // Format colors
  const bgColor = oklchToCss(backgroundColor);
  const bgOpacity = (backgroundOpacity / 100).toFixed(2);
  const fColor = oklchToCss(fillColor);
  const fOpacity = (fillOpacity / 100).toFixed(2);

  // Build transform string
  const transformParts = [`translate(${VIEWBOX_PADDING}, ${VIEWBOX_PADDING})`];
  if (skewX !== 0) transformParts.push(`skewX(${skewX})`);
  if (skewY !== 0) transformParts.push(`skewY(${skewY})`);
  const transformStr = transformParts.join(' ');

  return `'use client';

import { useId } from 'react';

interface SunlightDropProps {
  /** When true, renders as an overlay with mix-blend-multiply */
  asOverlay?: boolean;
}

export function SunlightDrop({ asOverlay = false }: SunlightDropProps) {
  const id = useId();
  const filterId = \`sunlight-blur-\${id}\`;

  return (
    <div
      className={
        asOverlay
          ? 'fixed inset-0 pointer-events-none mix-blend-multiply'
          : 'fixed inset-0'
      }
      style={!asOverlay ? { backgroundColor: '${bgColor}', opacity: ${bgOpacity} } : undefined}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={${blur}} />
          </filter>
        </defs>

        {/* Background for overlay mode */}
        {asOverlay && (
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="${bgColor}"
            fillOpacity={${bgOpacity}}
          />
        )}

        {/* Window shadow grid */}
        <g
          filter={\`url(#\${filterId})\`}
          transform="${transformStr}"
          fill="${fColor}"
          fillOpacity={${fOpacity}}
        >
${rectsCode}
        </g>
      </svg>
    </div>
  );
}`;
}
