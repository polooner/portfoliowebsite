"use client";

import { useState, useEffect, useId } from "react";
import { InkBleed } from "@/components/ui/ink-bleed";
import { WarpSlider } from "@/components/ui/warp-slider";
import { easeOutExpo } from "@/lib/easing";
import { SectionHeader } from "./section-header";
import { DISPLAY_TEXT } from "../config";

interface AnimationConfig {
  initialBlur: number;
  finalBlur: number;
  duration: number;
  noiseOpacity: number;
  inkBleedIntensity: "subtle" | "normal" | "strong" | "extreme";
}

const DEFAULT_CONFIG: AnimationConfig = {
  initialBlur: 100,
  finalBlur: 0,
  duration: 1200,
  noiseOpacity: 0.25,
  inkBleedIntensity: "strong",
};

const INK_BLEED_CONFIG = {
  blur: 1.3,
  threshold: [0, 1, 1, 1] as [number, number, number, number],
  turbulence: {
    baseFrequency: 0.071,
    numOctaves: 2,
    scale: 5,
  },
};

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  format?: (value: number) => string;
}

function SliderControl({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format = (v) => v.toString(),
}: SliderControlProps) {
  return (
    <div className="flex flex-col w-32 min-w-32">
      <label className="text-xs font-medium text-zinc-400 justify-between flex">
        <span>{label}:</span> <span>{format(value)}</span>
      </label>
      <WarpSlider
        value={value}
        onValueChange={onChange}
        min={min}
        max={max}
        step={step}
        className="my-auto"
      />
    </div>
  );
}

interface NoiseFilterProps {
  id: string;
  opacity: number;
}

function NoiseFilter({ id, opacity }: NoiseFilterProps) {
  return (
    <svg className="absolute w-0 h-0">
      <defs>
        <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
          {/* Generate noise */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />

          {/* Desaturate noise */}
          <feColorMatrix
            in="noise"
            type="saturate"
            values="0"
            result="grayNoise"
          />

          {/* Control noise opacity */}
          <feComponentTransfer in="grayNoise" result="fadedNoise">
            <feFuncA type="linear" slope={opacity} />
          </feComponentTransfer>

          {/* Use source alpha to mask the noise - only show noise where text exists */}
          <feComposite
            in="fadedNoise"
            in2="SourceGraphic"
            operator="in"
            result="maskedNoise"
          />

          {/* Blend masked noise with source using soft-light */}
          <feBlend in="SourceGraphic" in2="maskedNoise" mode="soft-light" />
        </filter>
      </defs>
    </svg>
  );
}

interface BlurInTextProps {
  text: string;
  blur: number;
  initialBlur: number;
  noiseOpacity: number;
  inkBleedIntensity: "subtle" | "normal" | "strong" | "extreme";
  className?: string;
}

function BlurInText({
  text,
  blur,
  initialBlur,
  noiseOpacity,
  inkBleedIntensity,
  className = "",
}: BlurInTextProps) {
  const noiseId = useId();
  const filterId = `noise-${noiseId.replace(/:/g, "")}`;

  // Calculate progress for noise fade
  const progress = initialBlur > 0 ? blur / initialBlur : 0;
  const currentNoiseOpacity = progress * noiseOpacity;

  return (
    <div className="relative">
      <NoiseFilter id={filterId} opacity={currentNoiseOpacity} />

      {/* Single layer: text assembles from blur with integrated noise */}
      <div
        style={{
          filter: `blur(${blur}px) url(#${filterId})`,
          willChange: "filter",
        }}
      >
        <InkBleed intensity={inkBleedIntensity} customConfig={INK_BLEED_CONFIG}>
          <h1 className={`font-concrette text-[70px] leading-20 ${className}`}>
            {text}
          </h1>
        </InkBleed>
      </div>
    </div>
  );
}

export function BlurInPlayground() {
  const [config, setConfig] = useState<AnimationConfig>(DEFAULT_CONFIG);
  const [currentBlur, setCurrentBlur] = useState(config.initialBlur);
  const [isAnimating, setIsAnimating] = useState(false);

  const updateConfig = <K extends keyof AnimationConfig>(
    key: K,
    value: AnimationConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const startAnimation = () => {
    setCurrentBlur(config.initialBlur);
    setIsAnimating(true);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentBlur(config.initialBlur);
  };

  useEffect(() => {
    if (!isAnimating) return;

    const startTime = performance.now();
    const startBlur = config.initialBlur;
    const endBlur = config.finalBlur;
    const duration = config.duration;

    let animationId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased = easeOutExpo(progress);

      const newBlur = startBlur + (endBlur - startBlur) * eased;
      setCurrentBlur(newBlur);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isAnimating, config.initialBlur, config.finalBlur, config.duration]);

  return (
    <section className="flex flex-col gap-6 select-none">
      <SectionHeader title="BLUR-IN ANIMATION EXPERIMENT" />

      {/* Controls */}
      <div className="flex flex-row gap-4 p-px flex-wrap">
        <SliderControl
          label="Initial Blur"
          value={config.initialBlur}
          onChange={(v) => {
            updateConfig("initialBlur", v);
            if (!isAnimating) setCurrentBlur(v);
          }}
          min={10}
          max={100}
          step={5}
          format={(v) => `${v}px`}
        />

        <SliderControl
          label="Final Blur"
          value={config.finalBlur}
          onChange={(v) => updateConfig("finalBlur", v)}
          min={0}
          max={20}
          step={1}
          format={(v) => `${v}px`}
        />

        <SliderControl
          label="Duration"
          value={config.duration}
          onChange={(v) => updateConfig("duration", v)}
          min={500}
          max={5000}
          step={100}
          format={(v) => `${(v / 1000).toFixed(1)}s`}
        />

        <SliderControl
          label="Noise"
          value={config.noiseOpacity}
          onChange={(v) => updateConfig("noiseOpacity", v)}
          min={0}
          max={0.5}
          step={0.01}
          format={(v) => `${(v * 100).toFixed(0)}%`}
        />

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-400">Ink Bleed</label>
          <select
            value={config.inkBleedIntensity}
            onChange={(e) =>
              updateConfig(
                "inkBleedIntensity",
                e.target.value as AnimationConfig["inkBleedIntensity"]
              )
            }
            className="px-3 py-2 text-sm bg-zinc-900 border rounded"
          >
            <option value="subtle">Subtle</option>
            <option value="normal">Normal</option>
            <option value="strong">Strong</option>
            <option value="extreme">Extreme</option>
          </select>
        </div>

        <div className="flex flex-col w-32 min-w-32">
          <label className="text-xs font-medium text-zinc-400 opacity-0">
            Actions
          </label>
          <div className="flex gap-2">
            <button
              onClick={startAnimation}
              disabled={isAnimating}
              className="px-4 py-2 text-sm bg-zinc-100 text-zinc-900 hover:bg-white disabled:opacity-50 border rounded transition-colors font-medium"
            >
              Play
            </button>
            <button
              onClick={resetAnimation}
              className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 border rounded transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Animation Preview */}
      <div className="border p-12 flex items-center justify-center min-h-[200px] bg-zinc-950 relative overflow-hidden">
        <BlurInText
          text={DISPLAY_TEXT}
          blur={currentBlur}
          initialBlur={config.initialBlur}
          noiseOpacity={config.noiseOpacity}
          inkBleedIntensity={config.inkBleedIntensity}
        />

        {/* Current blur indicator */}
        <div className="absolute bottom-4 right-4 text-xs text-zinc-500 font-mono">
          blur: {currentBlur.toFixed(1)}px
        </div>
      </div>
    </section>
  );
}
