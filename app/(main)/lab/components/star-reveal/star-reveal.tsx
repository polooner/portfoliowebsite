'use client';

import { useId, useMemo } from 'react';
import { PlusPattern } from './plus-pattern';
import { LabItemFooter } from '../lab-item-footer';
import { calculateBlur, calculateInnerRadius, calculateStarPath } from './star-reveal-utils';
import {
  CONTAINER_WIDTH,
  CONTAINER_HEIGHT,
  OVERLAY_COLOR,
  STAR_POINTS_COUNT,
  STAR_INNER_RADIUS_RATIO,
  LAB_ITEM_TITLE,
  LAB_ITEM_DESCRIPTION,
} from './star-reveal-constants';
import type { StarRevealProps } from './star-reveal-types';

/**
 * A component that reveals a plus-sign grid pattern through a soft-edged star-shaped mask.
 * Uses inline SVG mask with Gaussian blur for reliable cross-browser soft edges.
 */
export function StarReveal({
  width = CONTAINER_WIDTH,
  height = CONTAINER_HEIGHT,
  star,
  overlayColor = OVERLAY_COLOR,
  className,
}: StarRevealProps) {
  // Generate unique IDs to prevent conflicts when multiple instances are used
  const uniqueId = useId();
  const maskId = `star-mask-${uniqueId}`;
  const filterId = `star-blur-${uniqueId}`;

  const cx = star.position?.x ?? width / 2;
  const cy = star.position?.y ?? height / 2;
  const outerRadius = star.size;
  const innerRadiusRatio = star.innerRadiusRatio ?? STAR_INNER_RADIUS_RATIO;
  const innerRadius = calculateInnerRadius(outerRadius, innerRadiusRatio);
  const pointCount = star.points ?? STAR_POINTS_COUNT;
  const blurAmount = star.blurAmount ?? calculateBlur(star.size);

  const starPath = useMemo(() => {
    return calculateStarPath(cx, cy, pointCount, outerRadius, innerRadius);
  }, [cx, cy, pointCount, outerRadius, innerRadius]);

  const maskUrl = `url(#${maskId})`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`relative overflow-hidden rounded-2xl ${className ?? ''}`}
        style={{ width, height, backgroundColor: overlayColor }}
      >
        {/* Inline SVG defining the mask and blur filter - invisible but in DOM */}
        <svg
          width="0"
          height="0"
          style={{ position: 'absolute', pointerEvents: 'none' }}
          aria-hidden="true"
        >
          <defs>
            {/* Gaussian blur filter for soft edges */}
            <filter id={filterId}>
              <feGaussianBlur in="SourceGraphic" stdDeviation={blurAmount} />
            </filter>

            {/* Mask definition: black = hidden, white = visible */}
            <mask id={maskId}>
              <rect x="0" y="0" width="100%" height="100%" fill="black" />
              <path d={starPath} fill="white" filter={`url(#${filterId})`} />
            </mask>
          </defs>
        </svg>

        {/* Plus pattern with star-shaped mask applied */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: maskUrl,
            WebkitMaskImage: maskUrl,
          }}
        >
          <PlusPattern />
        </div>
      </div>
      <LabItemFooter title={LAB_ITEM_TITLE} description={LAB_ITEM_DESCRIPTION} />
    </div>
  );
}
