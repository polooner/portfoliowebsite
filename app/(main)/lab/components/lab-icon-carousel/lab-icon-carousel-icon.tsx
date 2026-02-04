'use client';

import Image from 'next/image';
import { LAB_ICON_SIZE_FOCUSED, LAB_LOGO_SIZE } from './lab-icon-carousel-constants';

interface LabIconCarouselIconProps {
  logoPath: string;
  label: string;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  isHidden: boolean;
  transition?: string;
  invert?: boolean;
  sizeMultiplier?: number;
}

export function LabIconCarouselIcon({
  logoPath,
  label,
  x,
  y,
  scale,
  opacity,
  isHidden,
  transition = 'none',
  invert = false,
  sizeMultiplier = 1,
}: LabIconCarouselIconProps) {
  const baseSize = LAB_ICON_SIZE_FOCUSED;
  const size = baseSize * scale;
  const logoSize = Math.round(LAB_LOGO_SIZE * scale * sizeMultiplier);

  if (isHidden) {
    return null;
  }

  return (
    <div
      className="absolute flex items-center justify-center pointer-events-none select-none rounded-full"
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
      {/* Glossy dark circle */}
      <div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
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
        <Image
          src={logoPath}
          alt={label}
          width={logoSize}
          height={logoSize}
          className={`object-contain ${invert ? 'invert' : ''}`}
        />
      </div>
    </div>
  );
}
