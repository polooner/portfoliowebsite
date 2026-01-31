'use client';

import { useMemo } from 'react';
import { PlusPattern } from './plus-pattern';
import { calculateBlur } from './star-reveal-utils';
import {
  CONTAINER_WIDTH,
  CONTAINER_HEIGHT,
  OVERLAY_COLOR,
  GRADIENT_INNER_STOP,
  GRADIENT_OUTER_STOP,
} from './star-reveal-constants';
import type { StarRevealProps } from './star-reveal-types';

/**
 * Creates a radial gradient mask string for revealing the pattern through a circular soft edge.
 */
function createRadialGradientMask(
  cx: number,
  cy: number,
  radius: number,
  blur: number
): string {
  const innerStop = radius * GRADIENT_INNER_STOP;
  const outerStop = radius * GRADIENT_OUTER_STOP;

  return `radial-gradient(circle at ${cx}px ${cy}px, black 0%, black ${innerStop}px, transparent ${outerStop}px)`;
}

/**
 * A component that reveals a plus-sign grid pattern through a soft-edged circular mask.
 * The center clearly shows the pattern with a smooth gradient transition to an overlay.
 */
export function StarReveal({
  width = CONTAINER_WIDTH,
  height = CONTAINER_HEIGHT,
  star,
  overlayColor = OVERLAY_COLOR,
  className,
}: StarRevealProps) {
  const gradientMask = useMemo(() => {
    const cx = star.position?.x ?? width / 2;
    const cy = star.position?.y ?? height / 2;
    const radius = star.size;
    const blur = star.blurAmount ?? calculateBlur(star.size);

    return createRadialGradientMask(cx, cy, radius, blur);
  }, [star, width, height]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className ?? ''}`}
      style={{ width, height, backgroundColor: overlayColor }}
    >
      {/* Plus pattern with radial gradient mask - visible in center, fades to overlay at edges */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: gradientMask,
          WebkitMaskImage: gradientMask,
        }}
      >
        <PlusPattern />
      </div>
    </div>
  );
}
