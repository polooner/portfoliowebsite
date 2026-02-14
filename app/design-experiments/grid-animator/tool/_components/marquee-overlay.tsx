'use client';

import { memo } from 'react';
import { useGridAnimatorStore } from '../_store/grid-animator-store';
import { SELECTION_COLOR } from '../_constants/grid-animator-constants';

const FILL_OPACITY = 0.08;

function MarqueeOverlayInner() {
  const marqueeState = useGridAnimatorStore((state) => state.marqueeState);

  if (!marqueeState) return null;

  const { startX, startY, currentX, currentY } = marqueeState;
  const x = Math.min(startX, currentX);
  const y = Math.min(startY, currentY);
  const w = Math.abs(currentX - startX);
  const h = Math.abs(currentY - startY);

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 overflow-visible"
      style={{ width: 1, height: 1 }}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={SELECTION_COLOR}
        fillOpacity={FILL_OPACITY}
        stroke={SELECTION_COLOR}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export const MarqueeOverlay = memo(MarqueeOverlayInner);
