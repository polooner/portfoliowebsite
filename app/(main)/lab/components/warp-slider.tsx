'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Slider } from '@/components/ui/slider';

const SLIDER_WIDTH = 300;
const MAX_TRANSLATE = 8;
const MAX_WARP_MAGNITUDE = 120;

export function WarpSlider() {
  const [value, setValue] = useState([50]);
  const [isDragging, setIsDragging] = useState(false);
  const warpMagnitude = useMotionValue(0);
  const warpDirection = useRef<'left' | 'right' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const warpStretch = useSpring(useTransform(warpMagnitude, [0, MAX_WARP_MAGNITUDE], [1, 1.02]), {
    stiffness: 300,
    damping: 30,
    bounce: 0.6,
  });
  const warpCompress = useSpring(useTransform(warpMagnitude, [0, MAX_WARP_MAGNITUDE], [1, 0.92]), {
    stiffness: 300,
    damping: 30,
    bounce: 0.6,
  });
  const warpTranslate = useSpring(
    useTransform(warpMagnitude, [0, MAX_WARP_MAGNITUDE], [0, MAX_TRANSLATE]),
    { stiffness: 300, damping: 30, bounce: 0.4 }
  );

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;

      let magnitude = 0;
      let direction: 'left' | 'right' | null = null;

      if (relativeX < 0) {
        direction = 'left';
        const overflow = Math.abs(relativeX);
        magnitude = Math.min(MAX_WARP_MAGNITUDE, overflow * 0.6);
      } else if (relativeX > SLIDER_WIDTH) {
        direction = 'right';
        const overflow = relativeX - SLIDER_WIDTH;
        magnitude = Math.min(MAX_WARP_MAGNITUDE, overflow * 0.6);
      }

      warpDirection.current = direction;
      warpMagnitude.set(magnitude);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      warpMagnitude.set(0);
      warpDirection.current = null;
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, warpMagnitude]);

  const currentWarpTranslate =
    warpDirection.current === 'left'
      ? -warpTranslate.get()
      : warpDirection.current === 'right'
        ? warpTranslate.get()
        : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] gap-8 w-full self-center">
      <div className="relative h-48 flex items-center justify-center min-w-[250px] w-[500px]">
        <motion.div
          ref={sliderRef}
          style={{
            scaleX: warpStretch,
            scaleY: warpCompress,
            x: currentWarpTranslate,
            width: SLIDER_WIDTH,
          }}
          onPointerDown={() => setIsDragging(true)}
        >
          <Slider
            value={value}
            onValueChange={setValue}
            min={0}
            max={100}
            step={1}
            thumbVariant="thin"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isDragging ? 1 : 0 }}
          className="absolute top-16 left-1/2 -translate-x-1/2 text-sm font-mono text-neutral-600"
        >
          {Math.round(value[0])}
        </motion.div>
      </div>

      <div className="self-start text-left flex flex-col">
        <span className="font-mono font-medium">Limit-aware warping slider</span>
        <span className="text-xs">
          Lively responds to hitting its limits. I wish more products utilized some version of this.
          Inspired by Apple.
        </span>
      </div>
    </div>
  );
}
