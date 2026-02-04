'use client';

import { useState, useEffect } from 'react';
import { spring, motion, AnimatePresence } from 'motion/react';
import { LabIconCarouselIcon } from './lab-icon-carousel-icon';
import { CAROUSEL_LOGOS } from './lab-icon-carousel-logos';
import {
  LAB_ICON_SIZE_FOCUSED,
  LAB_PILL_PADDING,
  LAB_PILL_GAP,
  LAB_PILL_WIDTH,
  LAB_PILL_HEIGHT,
  LAB_CIRCLE_RADIUS,
  LAB_CONTAINER_WIDTH,
  LAB_CONTAINER_HEIGHT,
} from './lab-icon-carousel-constants';

/** Rim light effect that sweeps around the button border - cool cyan tones */
function RimLight({ triggerKey, size }: { triggerKey: number; size: number }) {
  const borderWidth = 1;
  const outerSize = size + borderWidth * 2;

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={triggerKey}
        className="absolute rounded-full"
        style={{
          width: outerSize,
          height: outerSize,
          left: -borderWidth,
          top: -borderWidth,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { times: [0, 0.1, 0.5, 1], duration: 1.4 },
        }}
      >
        {/* Animated conic gradient - cyan/white tones for dark mode */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(
              from 90deg,
              transparent 0deg,
              transparent 60deg,
              rgba(56, 189, 248, 0.6) 120deg,
              rgba(255, 255, 255, 0.9) 180deg,
              rgba(56, 189, 248, 0.6) 240deg,
              transparent 300deg,
              transparent 360deg
            )`,
          }}
          initial={{ rotate: 180 }}
          animate={{ rotate: -180 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
        {/* Inner mask to cut out center, leaving only the rim */}
        <div
          className="absolute rounded-full bg-neutral-900"
          style={{
            inset: borderWidth,
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

/** Shine animation synced to carousel rotation - cool cyan/sky tones */
function ShineUnderlay({ triggerKey }: { triggerKey: number }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={triggerKey}
        className="absolute inset-0"
        style={{
          width: '100%',
          height: '100%',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { times: [0, 0.1, 0.5, 1], duration: 1.4 },
        }}
      >
        {/* Gradient that sweeps upward - cyan/sky tones for dark mode */}
        <motion.div
          className="absolute inset-x-0"
          style={{
            height: '300%',
            bottom: '-200%',
            background: `linear-gradient(
              to top,
              rgba(56, 189, 248, 0.3) 0%,
              rgba(14, 165, 233, 0.4) 20%,
              rgba(2, 132, 199, 0.4) 35%,
              rgba(255, 255, 255, 0.7) 45%,
              rgba(255, 255, 255, 0.9) 50%,
              rgba(255, 255, 255, 0.7) 55%,
              rgba(125, 211, 252, 0.5) 65%,
              rgba(186, 230, 253, 0.4) 80%,
              rgba(186, 230, 253, 0.3) 100%
            )`,
          }}
          initial={{ y: '0%' }}
          animate={{ y: '-66%' }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

interface LabIconCarouselCoreProps {
  width?: number;
  height?: number;
  className?: string;
}

export function LabIconCarouselCore({
  width = LAB_CONTAINER_WIDTH,
  height = LAB_CONTAINER_HEIGHT,
  className = '',
}: LabIconCarouselCoreProps) {
  const logos = CAROUSEL_LOGOS;

  // Center the pill in the container
  const pillCenterX = width / 2;
  const pillLeftEdge = pillCenterX - LAB_PILL_WIDTH / 2;
  const focusedIconY = height * 0.5;

  // Position focused icon at the right side of the pill
  const focusedIconX = pillCenterX + LAB_PILL_WIDTH / 2 - LAB_PILL_PADDING - LAB_ICON_SIZE_FOCUSED / 2;
  const centerX = focusedIconX - LAB_CIRCLE_RADIUS;
  const centerY = focusedIconY;
  const distancePerIcon = (2 * Math.PI * LAB_CIRCLE_RADIUS) / logos.length;

  const pauseMs = 1800;
  const springDuration = 0.6;
  const springBounce = 0.25;

  const [currentOffset, setCurrentOffset] = useState(0);
  const [rotationCount, setRotationCount] = useState(0);
  const springTransition = String(spring(springDuration, springBounce));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffset((prev) => prev + distancePerIcon);
      setRotationCount((prev) => prev + 1);
    }, pauseMs);

    return () => clearInterval(interval);
  }, [distancePerIcon]);

  const angleOffset = currentOffset / LAB_CIRCLE_RADIUS;

  const iconPositions = logos.map((_, index) => {
    const anglePerIcon = (2 * Math.PI) / logos.length;
    const baseAngle = index * anglePerIcon;
    const angle = baseAngle + angleOffset;
    const x = centerX + Math.cos(angle) * LAB_CIRCLE_RADIUS;
    const y = centerY + Math.sin(angle) * LAB_CIRCLE_RADIUS;
    const normalizedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const isFocused = normalizedAngle < 0.15 || normalizedAngle > 2 * Math.PI - 0.15;
    let distanceFromFocus = normalizedAngle;
    if (distanceFromFocus > Math.PI) {
      distanceFromFocus = 2 * Math.PI - distanceFromFocus;
    }
    const scale = 1 - (distanceFromFocus / Math.PI) * 0.4;
    const isHidden = x < centerX - LAB_CIRCLE_RADIUS * 0.8;

    return { x, y, scale, opacity: 1, isFocused, isHidden };
  });

  return (
    <div className={`relative bg-neutral-900 ${className}`} style={{ width, height }}>
      {/* Pill Wrapper */}
      <div
        className="absolute z-30 flex items-center rounded-full bg-neutral-800/50 backdrop-blur-sm"
        style={{
          left: pillLeftEdge,
          top: focusedIconY,
          transform: 'translateY(-50%)',
          width: LAB_PILL_WIDTH,
          height: LAB_PILL_HEIGHT,
          padding: LAB_PILL_PADDING,
          gap: LAB_PILL_GAP,
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* FW Button Group */}
        <div className="relative shrink-0 group">
          {/* Glow container */}
          <div
            className="absolute -inset-4 rounded-full blur-[8px] overflow-hidden z-0 flex items-end justify-center"
            style={{ opacity: 1 }}
          >
            <ShineUnderlay triggerKey={rotationCount} />
          </div>

          {/* Button face with rim light */}
          <div
            className="relative z-10 flex items-center justify-center rounded-full"
            style={{
              width: LAB_ICON_SIZE_FOCUSED,
              height: LAB_ICON_SIZE_FOCUSED,
              background: `
                linear-gradient(180deg, transparent 80%, rgba(255, 255, 255, 0.08) 100%),
                linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, transparent 30%),
                #0a0a0a
              `,
              boxShadow: `
                inset 0 0 16px 8px rgba(255, 255, 255, 0.01),
                inset 0 0 8px 4px rgba(255, 255, 255, 0.01),
                inset 0 0 4px 2px rgba(255, 255, 255, 0.01),
                inset 0 0 2px 1px rgba(255, 255, 255, 0.015)
              `,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <RimLight triggerKey={rotationCount} size={LAB_ICON_SIZE_FOCUSED} />
            <span className="font-bold text-white text-lg relative z-10">FW</span>
          </div>
        </div>

        {/* Empty slot for icon */}
        <div
          className="shrink-0"
          style={{ width: LAB_ICON_SIZE_FOCUSED, height: LAB_ICON_SIZE_FOCUSED }}
        />
      </div>

      {/* Circle track */}
      <svg
        className="absolute inset-0 pointer-events-none z-0"
        width={width}
        height={height}
      >
        <circle
          cx={centerX}
          cy={centerY}
          r={LAB_CIRCLE_RADIUS}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
        />
      </svg>

      {/* Skewed Gradient Overlay - covers left side of icons */}
      <div
        className="absolute inset-y-0 pointer-events-none z-20"
        style={{
          width: 400,
          background: 'linear-gradient(to right, rgb(23 23 23) 0%, rgb(23 23 23) 50%, transparent 100%)',
          transform: 'skewX(40deg) translateX(-300px)',
          transformOrigin: 'top left',
        }}
      />

      {/* Orbiting logos */}
      {logos.map((logo, index) => {
        const pos = iconPositions[index];
        const zIndex = pos.isFocused ? 40 : 10;

        return (
          <div
            key={logo.id}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex }}
          >
            <LabIconCarouselIcon
              logoPath={logo.path}
              label={logo.label}
              x={pos.x}
              y={pos.y}
              scale={pos.scale}
              opacity={pos.opacity}
              isHidden={pos.isHidden}
              transition={springTransition}
              invert={logo.invert}
              sizeMultiplier={logo.sizeMultiplier}
            />
          </div>
        );
      })}
    </div>
  );
}
