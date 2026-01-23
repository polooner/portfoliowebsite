"use client";

import { useState } from "react";
import { InkBleed } from "@/components/ui/ink-bleed";
import { WarpSlider } from "@/components/ui/warp-slider";
import { SectionHeader } from "./section-header";
import { FontGrid } from "./font-grid";
import { FontConfig } from "../config";

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

const DEFAULT_VALUES = {
  intensity: "normal" as const,
  blur: 1,
  baseFrequency: 0.04,
  numOctaves: 2,
  scale: 2,
  animated: false,
  animateTurbulence: false,
};

export function InkBleedPlayground() {
  const [intensity, setIntensity] = useState<
    "subtle" | "normal" | "strong" | "extreme"
  >(DEFAULT_VALUES.intensity);
  const [blur, setBlur] = useState(DEFAULT_VALUES.blur);
  const [baseFrequency, setBaseFrequency] = useState(
    DEFAULT_VALUES.baseFrequency
  );
  const [numOctaves, setNumOctaves] = useState(DEFAULT_VALUES.numOctaves);
  const [scale, setScale] = useState(DEFAULT_VALUES.scale);
  const [animated, setAnimated] = useState(DEFAULT_VALUES.animated);
  const [animateTurbulence, setAnimateTurbulence] = useState(
    DEFAULT_VALUES.animateTurbulence
  );

  const resetToDefaults = () => {
    setIntensity(DEFAULT_VALUES.intensity);
    setBlur(DEFAULT_VALUES.blur);
    setBaseFrequency(DEFAULT_VALUES.baseFrequency);
    setNumOctaves(DEFAULT_VALUES.numOctaves);
    setScale(DEFAULT_VALUES.scale);
    setAnimated(DEFAULT_VALUES.animated);
    setAnimateTurbulence(DEFAULT_VALUES.animateTurbulence);
  };

  const inkBleedConfig = {
    blur,
    threshold: [0, 1, 1, 1] as [number, number, number, number],
    turbulence: {
      baseFrequency,
      numOctaves,
      scale,
    },
  };

  const renderFontWithInkBleed = (font: FontConfig, text: string) => (
    <InkBleed
      intensity={intensity}
      customConfig={inkBleedConfig}
      animated={animated}
      animateTurbulence={animateTurbulence}
    >
      <h1 className={font.className}>{text}</h1>
    </InkBleed>
  );

  return (
    <section className="flex flex-col gap-6 select-none">
      <SectionHeader title="INK BLEED EFFECT PLAYGROUND" />

      <div className="flex flex-row gap-4 p-px flex-wrap">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-zinc-400">Intensity</label>
          <select
            value={intensity}
            onChange={(e) =>
              setIntensity(
                e.target.value as "subtle" | "normal" | "strong" | "extreme"
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

        <SliderControl
          label="Blur"
          value={blur}
          onChange={setBlur}
          min={0}
          max={5}
          step={0.1}
          format={(v) => `${v.toFixed(1)}px`}
        />

        <SliderControl
          label="Base Freq"
          value={baseFrequency}
          onChange={setBaseFrequency}
          min={0.01}
          max={0.15}
          step={0.001}
          format={(v) => v.toFixed(3)}
        />

        <SliderControl
          label="Octaves"
          value={numOctaves}
          onChange={setNumOctaves}
          min={1}
          max={5}
          step={1}
        />

        <SliderControl
          label="Scale"
          value={scale}
          onChange={setScale}
          min={0}
          max={10}
          step={0.5}
          format={(v) => v.toFixed(1)}
        />

        <div className="flex flex-col w-32 min-w-32">
          <label className="text-xs font-medium text-zinc-400 opacity-0">
            Reset
          </label>
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 border rounded transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <FontGrid renderItem={renderFontWithInkBleed} />
    </section>
  );
}
