'use client';

import { useState, useEffect, useRef, useMemo, CSSProperties, useCallback } from 'react';
import { LabItemFooter } from '@/app/(main)/lab/components/lab-item-footer';
import { InkBleedFilter } from '@/components/design-experiments/ink-bleed-filter';
import { type InkBleedConfig, THRESHOLD_TABLE } from '@/lib/ink-bleed-utils';

// Phase 1: Typewriter - characters appear one by one
const TYPEWRITER_WORDS = ['new', 'web', 'aesthetics'];
const TYPEWRITER_TEXT = TYPEWRITER_WORDS.join('\n');
const TYPEWRITER_CHAR_INTERVAL = 150;  // ms between each character appearing

// Phase 2: Ink bleed intensification
const INK_BLEED_DURATION = 750;

// Phase 4: Showcase rotation
const SHOWCASE_ROTATION_INTERVAL = 300;
const SHOWCASE_ROTATION_COUNT = 5;

// Ink bleed config - blur + threshold effect
const END_CONFIG = {
  maxBlur: 3,        // Max blur in pixels
  minThreshold: 30,  // Lower = more bleed visible (used at max intensity)
  maxThreshold: 70,  // Higher = sharper cutoff (used at min intensity)
};

// 5 intensity levels - 0 = no effect, 1 = max effect
const INTENSITY_LEVELS = [1, 0.75, 0.5, 0.25, 0];

// Map intensity (0-1) to threshold value (picks from table)
function getThresholdForIntensity(intensity: number): string {
  if (intensity === 0) return THRESHOLD_TABLE[100]; // No effect
  // Higher intensity = lower threshold number = more bleed visible
  const thresholdKey = Math.round(
    END_CONFIG.maxThreshold - (END_CONFIG.maxThreshold - END_CONFIG.minThreshold) * intensity
  );
  // Snap to nearest 10
  const snapped = Math.round(thresholdKey / 10) * 10;
  return THRESHOLD_TABLE[Math.max(0, Math.min(100, snapped))] || THRESHOLD_TABLE[50];
}

type Phase = 'typewriter' | 'inkBleed' | 'flipped' | 'showcase';

export function InkBleedDemo() {
  const [phase, setPhase] = useState<Phase>('typewriter');
  const [visibleCharCount, setVisibleCharCount] = useState(0);
  const [inkBleedProgress, setInkBleedProgress] = useState(0);
  const [rotationIndex, setRotationIndex] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const chars = TYPEWRITER_TEXT.split('');

  const resetAnimation = useCallback(() => {
    setPhase('typewriter');
    setVisibleCharCount(0);
    setInkBleedProgress(0);
    setRotationIndex(0);
    startTimeRef.current = null;
  }, []);

  // Phase 1: Typewriter - characters appear one by one
  useEffect(() => {
    if (phase !== 'typewriter') return;

    if (visibleCharCount >= chars.length) {
      // All characters visible, move to ink bleed phase
      setPhase('inkBleed');
      startTimeRef.current = null;
      return;
    }

    const timeout = setTimeout(() => {
      setVisibleCharCount((prev) => prev + 1);
    }, TYPEWRITER_CHAR_INTERVAL);

    return () => clearTimeout(timeout);
  }, [phase, visibleCharCount, chars.length]);

  // Phase 2: Ink bleed intensification
  useEffect(() => {
    if (phase !== 'inkBleed') return;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const newProgress = Math.min(elapsed / INK_BLEED_DURATION, 1);

      setInkBleedProgress(newProgress);

      if (newProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setPhase('flipped');
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [phase]);

  // Phase 3: Flipped -> transition to showcase after holding
  useEffect(() => {
    if (phase !== 'flipped') return;

    const timeout = setTimeout(() => {
      setPhase('showcase');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [phase]);

  // Phase 4: Showcase rotation
  useEffect(() => {
    if (phase !== 'showcase') return;

    if (rotationIndex >= SHOWCASE_ROTATION_COUNT) {
      resetAnimation();
      return;
    }

    const timeout = setTimeout(() => {
      setRotationIndex((prev) => prev + 1);
    }, SHOWCASE_ROTATION_INTERVAL);

    return () => clearTimeout(timeout);
  }, [phase, rotationIndex, resetAnimation]);

  // Get the rotated intensity order for showcase phase
  const getRotatedIntensities = useCallback(() => {
    const rotated = [...INTENSITY_LEVELS];
    for (let i = 0; i < rotationIndex; i++) {
      const last = rotated.pop()!;
      rotated.unshift(last);
    }
    return rotated;
  }, [rotationIndex]);

  // Main ink bleed config (for ink bleed phase)
  const config: InkBleedConfig = useMemo(() => {
    const eased = 1 - Math.pow(1 - inkBleedProgress, 3);

    return {
      blur: END_CONFIG.maxBlur * eased,
      thresholdTable: getThresholdForIntensity(eased),
      filterId: 'ink-bleed-demo',
    };
  }, [inkBleedProgress]);

  const textStyle: CSSProperties = useMemo(() => {
    if (inkBleedProgress === 0) return {};

    return {
      filter: `blur(${config.blur}px) url(#ink-bleed-demo)`,
      WebkitFilter: `blur(${config.blur}px) url(#ink-bleed-demo)`,
    };
  }, [config.blur, inkBleedProgress]);

  const getShowcaseStyle = useCallback((intensity: number, index: number): CSSProperties => {
    if (intensity === 0) {
      return { color: 'rgb(255, 255, 255)' };
    }

    const blur = END_CONFIG.maxBlur * intensity;

    return {
      filter: `blur(${blur}px) url(#ink-bleed-showcase-${index})`,
      WebkitFilter: `blur(${blur}px) url(#ink-bleed-showcase-${index})`,
      color: 'rgb(255, 255, 255)',
    };
  }, []);

  const isFlipped = phase === 'flipped' || phase === 'showcase';

  const rotatedIntensities = getRotatedIntensities();

  return (
    <div className="lab-item relative">
      <InkBleedFilter config={config} />
      {rotatedIntensities.map((intensity, index) => (
        <InkBleedFilter
          key={`showcase-${index}`}
          config={{
            blur: END_CONFIG.maxBlur * intensity,
            thresholdTable: getThresholdForIntensity(intensity),
            filterId: `ink-bleed-showcase-${index}`,
          }}
        />
      ))}
      <div
        className="h-[380px] flex items-center justify-center w-full relative overflow-hidden"
        style={{ backgroundColor: isFlipped ? 'rgb(0, 0, 0)' : 'transparent' }}
      >
        {phase === 'showcase' ? (
          <div className="flex flex-col items-center gap-6">
            {rotatedIntensities.map((intensity, index) => (
              <span
                key={index}
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight select-none relative"
                style={getShowcaseStyle(intensity, index)}
              >
                new aesthetics
                <span
                  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
                  style={{
                    backgroundImage: 'url(/noise.avif)',
                    backgroundSize: '150px',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                  }}
                  aria-hidden="true"
                >
                  new aesthetics
                </span>
              </span>
            ))}
          </div>
        ) : phase === 'typewriter' ? (
          <div className="flex flex-col items-center text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight select-none text-black">
            {(() => {
              const visibleText = chars.slice(0, visibleCharCount).join('');
              const lines = visibleText.split('\n');
              return lines.map((line, lineIndex) => (
                <div key={lineIndex}>
                  {line.split('').map((char, charIndex) => (
                    <span key={charIndex} className="inline-block">
                      {char}
                    </span>
                  ))}
                </div>
              ));
            })()}
          </div>
        ) : (
          <div
            className="flex flex-col items-center text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight select-none relative"
            style={{
              ...textStyle,
              color: isFlipped ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
            }}
          >
            {TYPEWRITER_WORDS.map((word, index) => (
              <span key={index}>{word}</span>
            ))}
            <div
              className="absolute inset-0 flex flex-col items-center pointer-events-none mix-blend-overlay opacity-50"
              style={{
                backgroundImage: 'url(/noise.avif)',
                backgroundSize: '150px',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
              aria-hidden="true"
            >
              {TYPEWRITER_WORDS.map((word, index) => (
                <span key={index}>{word}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <LabItemFooter
        title="Ink bleed text"
        description="SVG filter effect that simulates ink bleeding on paper."
      />
    </div>
  );
}
