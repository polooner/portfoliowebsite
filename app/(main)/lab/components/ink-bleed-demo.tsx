'use client';

import { useState, useEffect, useRef, useMemo, CSSProperties } from 'react';
import { LabItemFooter } from '@/app/(main)/lab/components/lab-item-footer';
import { InkBleedFilter } from '@/components/design-experiments/ink-bleed-filter';
import { type InkBleedConfig } from '@/lib/ink-bleed-utils';

const ANIMATION_DURATION = 3000;

// Extreme preset end values
const END_CONFIG = {
  blur: 2.5,
  baseFrequency: 0.08,
  numOctaves: 3,
  scale: 5,
};

export function InkBleedDemo() {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const newProgress = Math.min(elapsed / ANIMATION_DURATION, 1);

      setProgress(newProgress);

      if (newProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Interpolate from 0 to extreme values
  const config: InkBleedConfig = useMemo(() => {
    // Ease out cubic for smooth deceleration
    const eased = 1 - Math.pow(1 - progress, 3);

    return {
      blur: END_CONFIG.blur * eased,
      threshold: [0, 1, 1, 1],
      turbulence: {
        // Keep frequency constant so the noise pattern stays in place
        // This makes the effect grow "from within" rather than flow directionally
        baseFrequency: END_CONFIG.baseFrequency,
        numOctaves: END_CONFIG.numOctaves,
        // Only animate scale - the displacement amount
        scale: END_CONFIG.scale * eased,
      },
      filterId: 'ink-bleed-demo',
    };
  }, [progress]);

  const textStyle: CSSProperties = useMemo(() => {
    if (progress === 0) return {};

    return {
      filter: `blur(${config.blur}px) url(#ink-bleed-demo)`,
      WebkitFilter: `blur(${config.blur}px) url(#ink-bleed-demo)`,
    };
  }, [config.blur, progress]);

  return (
    <div className="lab-item relative">
      <InkBleedFilter config={config} />
      <div className="h-[280px] flex items-center justify-center">
        <span
          className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight select-none"
          style={textStyle}
        >
          Ink Bleed
        </span>
      </div>
      <LabItemFooter
        title="Ink bleed text"
        description="SVG filter effect that simulates ink bleeding on paper."
      />
    </div>
  );
}
