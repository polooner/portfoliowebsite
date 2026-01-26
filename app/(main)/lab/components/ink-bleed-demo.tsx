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

// Phase 5: Motion blur
const MOTION_BLUR_ROTATION_INTERVAL = 300;
const MOTION_BLUR_ROTATION_COUNT = 5;

// 3 intensity levels for motion blur phase
const MOTION_BLUR_INTENSITIES = [0.8, 0.5, 0.2];

// Phase 6: Finale - large text with motion blur + ink bleed animating in
const FINALE_ANIMATION_DURATION = 1000;
const FINALE_HOLD_DURATION = 1500;

// Ink bleed config - blur + threshold effect
const END_CONFIG = {
  maxBlur: 3,        // Max blur in pixels
  minThreshold: 30,  // Lower = more bleed visible (used at max intensity)
  maxThreshold: 70,  // Higher = sharper cutoff (used at min intensity)
};

// 5 intensity levels - 0 = no effect, 1 = max effect
const INTENSITY_LEVELS = [1, 0.75, 0.5, 0.25, 0];

// Motion blur offsets and opacities for the trail effect
const MOTION_BLUR_LAYERS = [
  { offset: -20, opacity: 0.1 },
  { offset: -15, opacity: 0.15 },
  { offset: -10, opacity: 0.2 },
  { offset: -5, opacity: 0.3 },
  { offset: 0, opacity: 1 },
  { offset: 5, opacity: 0.3 },
  { offset: 10, opacity: 0.2 },
  { offset: 15, opacity: 0.15 },
  { offset: 20, opacity: 0.1 },
];

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

type Phase = 'typewriter' | 'inkBleed' | 'flipped' | 'showcase' | 'motionBlur' | 'finale';

export function InkBleedDemo() {
  const [phase, setPhase] = useState<Phase>('typewriter');
  const [visibleCharCount, setVisibleCharCount] = useState(0);
  const [inkBleedProgress, setInkBleedProgress] = useState(0);
  const [rotationIndex, setRotationIndex] = useState(0);
  const [motionBlurRotationIndex, setMotionBlurRotationIndex] = useState(0);
  const [finaleProgress, setFinaleProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const finaleStartRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const chars = TYPEWRITER_TEXT.split('');

  const resetAnimation = useCallback(() => {
    setPhase('typewriter');
    setVisibleCharCount(0);
    setInkBleedProgress(0);
    setRotationIndex(0);
    setMotionBlurRotationIndex(0);
    setFinaleProgress(0);
    startTimeRef.current = null;
    finaleStartRef.current = null;
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
      setPhase('motionBlur');
      return;
    }

    const timeout = setTimeout(() => {
      setRotationIndex((prev) => prev + 1);
    }, SHOWCASE_ROTATION_INTERVAL);

    return () => clearTimeout(timeout);
  }, [phase, rotationIndex]);

  // Phase 5: Motion blur with rotation
  useEffect(() => {
    if (phase !== 'motionBlur') return;

    if (motionBlurRotationIndex >= MOTION_BLUR_ROTATION_COUNT) {
      setPhase('finale');
      return;
    }

    const timeout = setTimeout(() => {
      setMotionBlurRotationIndex((prev) => prev + 1);
    }, MOTION_BLUR_ROTATION_INTERVAL);

    return () => clearTimeout(timeout);
  }, [phase, motionBlurRotationIndex]);

  // Phase 6: Finale - animate in motion blur + ink bleed, then hold
  useEffect(() => {
    if (phase !== 'finale') return;

    const animate = (timestamp: number) => {
      if (finaleStartRef.current === null) {
        finaleStartRef.current = timestamp;
      }

      const elapsed = timestamp - finaleStartRef.current;
      const newProgress = Math.min(elapsed / FINALE_ANIMATION_DURATION, 1);

      setFinaleProgress(newProgress);

      if (newProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Hold at full effect, then reset
        setTimeout(() => {
          resetAnimation();
        }, FINALE_HOLD_DURATION);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [phase, resetAnimation]);

  // Get the rotated intensity order for showcase phase
  const getRotatedIntensities = useCallback(() => {
    const rotated = [...INTENSITY_LEVELS];
    for (let i = 0; i < rotationIndex; i++) {
      const last = rotated.pop()!;
      rotated.unshift(last);
    }
    return rotated;
  }, [rotationIndex]);

  // Get the rotated intensity order for motion blur phase
  const getMotionBlurIntensities = useCallback(() => {
    const rotated = [...MOTION_BLUR_INTENSITIES];
    for (let i = 0; i < motionBlurRotationIndex; i++) {
      const last = rotated.pop()!;
      rotated.unshift(last);
    }
    return rotated;
  }, [motionBlurRotationIndex]);

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

  const isFlipped = phase === 'flipped' || phase === 'showcase' || phase === 'motionBlur';

  // Finale config with animated intensity - dissolves into nothing
  const finaleConfig = useMemo(() => {
    const eased = 1 - Math.pow(1 - finaleProgress, 2);
    // Very high blur that increases dramatically to dissolve completely
    const blur = 20 * eased;
    // High intensity for extreme ink bleed
    const intensity = Math.min(1, eased * 1.5);

    return {
      blur,
      intensity,
      thresholdTable: getThresholdForIntensity(intensity),
      filterId: 'ink-bleed-finale',
    };
  }, [finaleProgress]);

  const rotatedIntensities = getRotatedIntensities();
  const motionBlurIntensities = getMotionBlurIntensities();

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
      {motionBlurIntensities.map((intensity, index) => (
        <InkBleedFilter
          key={`motion-blur-${index}`}
          config={{
            blur: END_CONFIG.maxBlur * intensity,
            thresholdTable: getThresholdForIntensity(intensity),
            filterId: `ink-bleed-motion-${index}`,
          }}
        />
      ))}
      <InkBleedFilter config={{
        blur: finaleConfig.blur,
        thresholdTable: finaleConfig.thresholdTable,
        filterId: 'ink-bleed-finale',
      }} />
      <div
        className="h-[380px] flex items-center justify-center w-full relative overflow-hidden"
        style={{ backgroundColor: isFlipped ? 'rgb(0, 0, 0)' : 'transparent' }}
      >
        {phase === 'finale' ? (
          <span
            className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight select-none relative"
            style={{
              color: 'rgb(0, 0, 0)',
              filter: finaleProgress > 0 ? `blur(${finaleConfig.blur}px) url(#ink-bleed-finale)` : undefined,
              WebkitFilter: finaleProgress > 0 ? `blur(${finaleConfig.blur}px) url(#ink-bleed-finale)` : undefined,
              opacity: 1 - finaleProgress, // Fade completely to nothing
            }}
          >
            {/* Motion blur layers that animate in and spread wide */}
            {MOTION_BLUR_LAYERS.map((layer, layerIndex) => {
              const eased = 1 - Math.pow(1 - finaleProgress, 2);
              // Spread much wider as it dissolves
              const spreadMultiplier = 1 + eased * 5;
              const animatedOffset = layer.offset * spreadMultiplier;
              // All layers fade to nothing
              const baseOpacity = layerIndex === 4 ? 1 : layer.opacity * eased;
              const animatedOpacity = baseOpacity * (1 - finaleProgress);

              return (
                <span
                  key={layerIndex}
                  className="absolute whitespace-nowrap"
                  style={{
                    transform: `translateX(${animatedOffset}px)`,
                    opacity: Math.max(0, animatedOpacity),
                    left: 0,
                    right: 0,
                  }}
                  aria-hidden={layerIndex !== 4}
                >
                  new aesthetics
                </span>
              );
            })}
            {/* Invisible text for sizing */}
            <span className="invisible">new aesthetics</span>
          </span>
        ) : phase === 'motionBlur' ? (
          <div className="flex flex-col items-center gap-8">
            {motionBlurIntensities.map((intensity, index) => {
              const blur = END_CONFIG.maxBlur * intensity;
              return (
                <span
                  key={index}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight select-none relative"
                  style={{
                    color: 'rgb(255, 255, 255)',
                    filter: `blur(${blur}px) url(#ink-bleed-motion-${index})`,
                    WebkitFilter: `blur(${blur}px) url(#ink-bleed-motion-${index})`,
                  }}
                >
                  {/* Motion blur layers */}
                  {MOTION_BLUR_LAYERS.map((layer, layerIndex) => (
                    <span
                      key={layerIndex}
                      className="absolute whitespace-nowrap"
                      style={{
                        transform: `translateX(${layer.offset}px)`,
                        opacity: layer.opacity,
                        left: 0,
                        right: 0,
                      }}
                      aria-hidden={layerIndex !== 4}
                    >
                      new aesthetics
                    </span>
                  ))}
                  {/* Invisible text for sizing */}
                  <span className="invisible">new aesthetics</span>
                </span>
              );
            })}
          </div>
        ) : phase === 'showcase' ? (
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
