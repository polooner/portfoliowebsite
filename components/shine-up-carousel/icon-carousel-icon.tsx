'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ICON_SIZE_FOCUSED } from './icon-carousel-constants';

interface IconCarouselIconProps {
  icon: ReactNode;
  label: string;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  isFocused: boolean;
  isHidden: boolean;
  transition?: string;
}

export function IconCarouselIcon({
  icon,
  label,
  x,
  y,
  scale,
  opacity,
  isFocused,
  isHidden,
  transition = 'none',
}: IconCarouselIconProps) {
  const baseSize = ICON_SIZE_FOCUSED;
  const size = baseSize * scale;
  const [isRevealed, setIsRevealed] = useState(false);

  // Set state during render instead of effects
  if (isFocused && !isRevealed) {
    setIsRevealed(true);
  }
  if (isHidden && isRevealed) {
    setIsRevealed(false);
  }

  return (
    <div
       className="absolute flex flex-col items-center justify-center pointer-events-none select-none rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)',
        opacity,
        transition: transition !== 'none' ? `left ${transition}, top ${transition}` : 'none',
        willChange: 'left, top',
      }}
    >
      {/* Icon circle - glossy 3D effect (white based) */}
      <div
        className="relative flex flex-col items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          background: `
            linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(245, 245, 245, 1) 100%)
          `,
          boxShadow: `
            inset 0 2px 4px rgba(255, 255, 255, 0.8),
            inset 0 -2px 4px rgba(0, 0, 0, 0.05),
            0 4px 12px rgba(0, 0, 0, 0.08),
            0 2px 4px rgba(0, 0, 0, 0.04)
          `,
          border: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            // Question mark (mystery state)
            <motion.span
              key="mystery"
              className="text-muted-foreground font-medium"
              style={{ fontSize: size * 0.35 }}
              initial={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.3 }}
            >
              ?
            </motion.span>
          ) : (
            // Revealed icon with label inside
            <motion.div
              key="revealed"
              className="flex flex-col items-center justify-center gap-1"
              initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.8 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="text-foreground">
                {icon}
              </span>
              {/* Label inside circle */}
              <span
                className="text-foreground/70 font-medium whitespace-nowrap"
                style={{ fontSize: Math.max(8, size * 0.1) }}
              >
                {label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
