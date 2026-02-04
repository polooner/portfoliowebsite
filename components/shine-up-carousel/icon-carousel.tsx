'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { spring, motion, AnimatePresence } from 'motion/react'; // Updated import
import {
  Briefcase,
  Building2,
  Home,
  FileText,
  GraduationCap,
  CreditCard,
  Car,
  Heart,
  ShoppingCart,
  Plane,
  Smartphone,
  Users,
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign,
} from 'lucide-react';
import type { IconCarouselProps, CarouselIcon } from './icon-carousel-types';
import { IconCarouselIcon } from './icon-carousel-icon';
import {
  DEFAULT_ICONS,
  ICON_SIZE_FOCUSED,
  PILL_PADDING,
  PILL_GAP,
  PILL_WIDTH,
  PILL_HEIGHT,
  LOGO_SIZE,
  ICON_DISPLAY_TEXT,
} from './icon-carousel-constants';

// Data point icons
const SAMPLE_ICONS: CarouselIcon[] = [
  { id: 'job', label: 'Employment', icon: <Briefcase size={28} /> },
  { id: 'city', label: 'Location', icon: <Building2 size={28} /> },
  { id: 'home', label: 'Housing', icon: <Home size={28} /> },
  { id: 'resume', label: 'Experience', icon: <FileText size={28} /> },
  { id: 'diploma', label: 'Education', icon: <GraduationCap size={28} /> },
  { id: 'credit', label: 'Financial', icon: <CreditCard size={28} /> },
  { id: 'car', label: 'Vehicle', icon: <Car size={28} /> },
  { id: 'health', label: 'Health', icon: <Heart size={28} /> },
  { id: 'shopping', label: 'Shopping', icon: <ShoppingCart size={28} /> },
  { id: 'travel', label: 'Travel', icon: <Plane size={28} /> },
  { id: 'mobile', label: 'Mobile', icon: <Smartphone size={28} /> },
  { id: 'family', label: 'Family', icon: <Users size={28} /> },
  { id: 'income', label: 'Income', icon: <TrendingUp size={28} /> },
  { id: 'address', label: 'Address', icon: <MapPin size={28} /> },
  { id: 'age', label: 'Age', icon: <Calendar size={28} /> },
  { id: 'wealth', label: 'Wealth', icon: <DollarSign size={28} /> },
];

const CIRCLE_RADIUS = 360;

// ... imports stay the same ...

// --- Rim light effect that sweeps around the button border ---
const RimLight = ({ triggerKey, size }: { triggerKey: number; size: number }) => {
  const borderWidth = 2;
  const outerSize = size + borderWidth * 2;

  return (
    <AnimatePresence mode='popLayout'>
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
        {/* Animated conic gradient that sweeps around */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(
              from 90deg,
              transparent 0deg,
              transparent 60deg,
              rgba(255, 194, 51, 0.6) 120deg,
              rgba(255, 255, 255, 0.9) 180deg,
              rgba(255, 194, 51, 0.6) 240deg,
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
          className="absolute rounded-full bg-white"
          style={{
            inset: borderWidth,
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

// --- Shine animation synced to carousel rotation ---
const ShineUnderlay = ({ triggerKey }: { triggerKey: number }) => {
  return (
    <AnimatePresence mode='popLayout'>
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
        {/* Single continuous gradient that sweeps upward */}
        <motion.div
          className="absolute inset-x-0"
          style={{
            height: '300%',
            bottom: '-200%',
            background: `linear-gradient(
              to top,
              rgba(255 194 51 / 0.3) 0%,
              oklch(0.78 0.17 66.48 / 0.4) 20%,
              oklch(0.7 0.2 44.22 / 0.4) 35%,
              rgba(255, 255, 255, 0.7) 45%,
              rgba(255, 255, 255, 0.9) 50%,
              rgba(255, 255, 255, 0.7) 55%,
              rgba(254, 215, 170, 0.5) 65%,
              rgba(254, 240, 138, 0.4) 80%,
              rgba(254, 240, 138, 0.3) 100%
            )`
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
};


export function IconCarousel({
  icons = SAMPLE_ICONS,
  width = 500,
  height = 600,
  className = '',
  onFocusedLabelChange,
}: IconCarouselProps & { onFocusedLabelChange?: (label: string) => void }) {
  // ... (Keep existing setup code: displayIcons, coordinates, effects, etc.) ...
  const displayIcons = icons.length > 0 ? icons : DEFAULT_ICONS;

  const focusedIconX = width - ICON_SIZE_FOCUSED / 2 - PILL_PADDING - 20;
  const focusedIconY = height * 0.5;
  const centerX = focusedIconX - CIRCLE_RADIUS;
  const centerY = focusedIconY;

  const pillRightEdge = focusedIconX + (ICON_SIZE_FOCUSED / 2) + PILL_PADDING;
  const pillLeftEdge = pillRightEdge - PILL_WIDTH;
  const distancePerIcon = (2 * Math.PI * CIRCLE_RADIUS) / displayIcons.length;

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
  }, [pauseMs, distancePerIcon]);

  const angleOffset = currentOffset / CIRCLE_RADIUS;

  const focusedIconIndex = (() => {
    const anglePerIcon = (2 * Math.PI) / displayIcons.length;
    for (let index = 0; index < displayIcons.length; index++) {
      const baseAngle = index * anglePerIcon;
      const angle = baseAngle + angleOffset;
      const normalizedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      if (normalizedAngle < 0.15 || normalizedAngle > (2 * Math.PI - 0.15)) {
        return index;
      }
    }
    return -1;
  })();

  const focusedLabel = focusedIconIndex >= 0 ? displayIcons[focusedIconIndex].label : '';
  const prevFocusedLabelRef = useRef(focusedLabel);

  useEffect(() => {
    if (focusedLabel !== prevFocusedLabelRef.current) {
      prevFocusedLabelRef.current = focusedLabel;
      onFocusedLabelChange?.(focusedLabel);
    }
  }, [focusedLabel, onFocusedLabelChange]);

  const iconPositions = displayIcons.map((_, index) => {
    const anglePerIcon = (2 * Math.PI) / displayIcons.length;
    const baseAngle = index * anglePerIcon;
    const angle = baseAngle + angleOffset;
    const x = centerX + Math.cos(angle) * CIRCLE_RADIUS;
    const y = centerY + Math.sin(angle) * CIRCLE_RADIUS;
    const normalizedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const isFocused = normalizedAngle < 0.15 || normalizedAngle > (2 * Math.PI - 0.15);
    let distanceFromFocus = normalizedAngle;
    if (distanceFromFocus > Math.PI) {
      distanceFromFocus = 2 * Math.PI - distanceFromFocus;
    }
    const scale = 1 - (distanceFromFocus / Math.PI) * 0.4;
    const isHidden = x < centerX - CIRCLE_RADIUS * 0.8;

    return { x, y, scale, opacity: 1, isFocused, isHidden };
  });

  return (
    <div className={`relative ${className}`} style={{ width, height }}>

      {/* Pill Wrapper */}
      <div
        className="absolute z-30 flex items-center border rounded-full bg-white/50 backdrop-blur-sm"
        style={{
          left: pillLeftEdge,
          top: focusedIconY,
          transform: 'translateY(-50%)',
          width: PILL_WIDTH,
          height: PILL_HEIGHT,
          padding: PILL_PADDING,
          gap: PILL_GAP,
          borderColor: 'rgba(0,0,0,0.05)',
        }}
      >
        {/* Minerva Button Group */}
        <div className="relative shrink-0 group">

          {/* GLOW CONTAINER 
                1. Increased -inset to -4 (creates a larger halo).
                2. Increased blur to 8px (smoother light).
                3. Added overflow-hidden + rounded-full to clip the square shine.
            */}
          <div
            className="absolute -inset-4 rounded-full blur-[8px] overflow-hidden z-0 flex items-end justify-center"
            style={{ opacity: 1 }}
          >
            <ShineUnderlay triggerKey={rotationCount} />
          </div>

          {/* Button Face with Rim Light */}
          <div
            className="relative z-10 flex items-center justify-center rounded-full bg-white"
            style={{
              width: ICON_SIZE_FOCUSED,
              height: ICON_SIZE_FOCUSED,
              boxShadow: `0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)`,
            }}
          >
            {/* Rim light overlay */}
            <RimLight triggerKey={rotationCount} size={ICON_SIZE_FOCUSED} />
            {/* Static border */}
            <div className="absolute inset-0 rounded-full border border-black/5" />
            <div className="absolute inset-0 rounded-full opacity-50 bg-linear-to-b from-white to-neutral-100" />
            <span>FW</span>
          </div>
        </div>

        {/* Empty slot for icon */}
        <div
          className="shrink-0"
          style={{ width: ICON_SIZE_FOCUSED, height: ICON_SIZE_FOCUSED }}
        />
      </div>

      <svg
        className="absolute inset-0 pointer-events-none z-0"
        width={width}
        height={height}
      >
        <circle
          cx={centerX}
          cy={centerY}
          r={CIRCLE_RADIUS}
          fill="none"
          stroke="rgba(0, 0, 0, 0.08)"
          strokeWidth="1"
        />
      </svg>

      {displayIcons.map((icon, index) => {
        const pos = iconPositions[index];
        const zIndex = pos.isFocused ? 40 : 10;

        return (
          <div
            key={icon.id}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex }}
          >
            <IconCarouselIcon
              icon={icon.icon}
              label={icon.label}
              x={pos.x}
              y={pos.y}
              scale={pos.scale}
              opacity={pos.opacity}
              isFocused={pos.isFocused}
              isHidden={pos.isHidden}
              transition={springTransition}
            />
          </div>
        );
      })}
    </div>
  );
}

export function IconCarouselSection() {
  const [focusedLabel, setFocusedLabel] = useState('');
  const [textKey, setTextKey] = useState(0);

  const handleFocusedLabelChange = useCallback((label: string) => {
    setFocusedLabel(label);
    setTextKey((k) => k + 1);
  }, []);


  return (
    <section className="py-24">
      <div className="relative border-y border-border">
        <div className="relative min-h-[700px] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <IconCarousel
              width={900}
              height={700}
              onFocusedLabelChange={handleFocusedLabelChange}
            />
          </div>

          {/* Solid Cover */}
          <div
            className="absolute bottom-0 left-0 pointer-events-none z-20 bg-background"
            style={{ width: '50%', height: '60%' }}
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-y-0 -left-40 pointer-events-none z-20"
            style={{
              width: '75%',
              background: 'linear-gradient(to right, var(--background) 0%, var(--background) 50%, transparent 100%)',
              transform: 'skewX(40deg)',
              transformOrigin: 'top left',
              marginLeft: '-5%',
            }}
          />

          {/* Text Content */}
          <div className="relative z-50 flex flex-col justify-center h-full min-h-[700px] p-8 lg:p-12 lg:pl-24 xl:pl-32 max-w-2xl">
            <h3 className="heading-section text-3xl md:text-4xl lg:text-5xl mb-4">
              Infamous hero text
            </h3>

          </div>
        </div>
      </div>
    </section>
  );
}