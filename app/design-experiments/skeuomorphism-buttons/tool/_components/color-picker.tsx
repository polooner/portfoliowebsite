'use client';

import { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { OklchColor } from '../_types/button-config';
import { oklchToCss, oklchToHex } from '../_utils/color-utils';
import { SliderRow } from './slider-row';

// ── Slider Bounds ────────────────────────────────────────────────────────

const LIGHTNESS_MIN = 0;
const LIGHTNESS_MAX = 100;
const LIGHTNESS_STEP = 0.1;
const CHROMA_MIN = 0;
const CHROMA_MAX = 0.4;
const CHROMA_STEP = 0.001;
const HUE_MIN = 0;
const HUE_MAX = 360;
const HUE_STEP = 0.1;
const OPACITY_MIN = 0;
const OPACITY_MAX = 100;

function formatOklchDisplay(color: OklchColor): string {
  return `${color.l.toFixed(1)} ${color.c.toFixed(3)} ${color.h.toFixed(0)}`;
}

interface ColorPickerProps {
  color: OklchColor;
  opacity: number;
  onColorChange: (color: OklchColor) => void;
  onOpacityChange: (opacity: number) => void;
}

export function ColorPicker({
  color,
  opacity,
  onColorChange,
  onOpacityChange,
}: ColorPickerProps) {
  const [opacityInput, setOpacityInput] = useState(opacity.toString());

  useEffect(() => {
    setOpacityInput(opacity.toString());
  }, [opacity]);

  const handleOpacityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpacityInput(e.target.value);
  };

  const handleOpacityBlur = () => {
    const parsed = parseInt(opacityInput, 10);
    if (isNaN(parsed)) {
      setOpacityInput(opacity.toString());
      return;
    }
    const clamped = Math.max(OPACITY_MIN, Math.min(OPACITY_MAX, parsed));
    onOpacityChange(clamped);
    setOpacityInput(clamped.toString());
  };

  const handleOpacityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleOpacityBlur();
      (e.target as HTMLInputElement).blur();
    }
  };

  const updateColor = (key: keyof OklchColor, value: number) => {
    onColorChange({ ...color, [key]: value });
  };

  const cssColor = oklchToCss(color);

  return (
    <div className="flex w-full">
      {/* Left button - Color picker trigger */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex flex-1 items-center gap-2 rounded-l-lg border-r border-neutral-600/50 bg-neutral-700/50 px-3 py-2 transition-colors hover:bg-neutral-700">
            <div
              className="h-4 w-4 rounded"
              style={{ backgroundColor: cssColor, opacity: opacity / 100 }}
            />
            <span className="font-mono text-xs text-neutral-300">
              {formatOklchDisplay(color)}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="left"
          align="start"
          sideOffset={20}
          className="w-56 rounded-xl border-white/10 bg-neutral-800 p-3"
        >
          {/* Color preview */}
          <div className="relative mb-3">
            <div
              className="h-12 w-full rounded-lg"
              style={{ backgroundColor: cssColor, opacity: opacity / 100 }}
            />
          </div>

          {/* Hex fallback display */}
          <div className="mb-3 flex select-none items-center justify-between rounded-md bg-neutral-700/50 px-2 py-1.5">
            <span className="text-[10px] text-neutral-500">sRGB Hex</span>
            <span className="font-mono text-xs text-neutral-300">
              {oklchToHex(color)}
            </span>
          </div>

          {/* OKLCH Sliders */}
          <div className="space-y-3">
            <SliderRow
              label="Lightness"
              value={color.l}
              onChange={(v) => updateColor('l', v)}
              min={LIGHTNESS_MIN}
              max={LIGHTNESS_MAX}
              step={LIGHTNESS_STEP}
              precision={1}
              suffix="%"
            />
            <SliderRow
              label="Chroma"
              value={color.c}
              onChange={(v) => updateColor('c', v)}
              min={CHROMA_MIN}
              max={CHROMA_MAX}
              step={CHROMA_STEP}
              precision={3}
            />
            <SliderRow
              label="Hue"
              value={color.h}
              onChange={(v) => updateColor('h', v)}
              min={HUE_MIN}
              max={HUE_MAX}
              step={HUE_STEP}
              precision={1}
              suffix="°"
            />
          </div>

          {/* Opacity slider */}
          <div className="mt-3 border-t border-neutral-700 pt-3">
            <SliderRow
              label="Opacity"
              value={opacity}
              onChange={onOpacityChange}
              min={OPACITY_MIN}
              max={OPACITY_MAX}
              precision={0}
              suffix="%"
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* Right button - Opacity input */}
      <div className="flex items-center gap-1 rounded-r-lg bg-neutral-700/50 px-3 py-2">
        <input
          type="text"
          value={opacityInput}
          onChange={handleOpacityInputChange}
          onBlur={handleOpacityBlur}
          onKeyDown={handleOpacityKeyDown}
          className="w-8 bg-transparent text-right font-mono text-xs text-neutral-300 outline-none"
        />
        <span className="font-mono text-xs text-neutral-500">%</span>
      </div>
    </div>
  );
}
