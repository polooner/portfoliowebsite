'use client';

import { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ColorPickerProps {
  label: string;
  color: string;
  opacity: number;
  onColorChange: (color: string) => void;
  onOpacityChange: (opacity: number) => void;
}

const MIN_OPACITY = 0;
const MAX_OPACITY = 100;

const HUE_MIN = 0;
const HUE_MAX = 360;
const HUE_STEP = 1;
const SATURATION_MIN = 0;
const SATURATION_MAX = 100;
const SATURATION_STEP = 1;
const LIGHTNESS_MIN = 0;
const LIGHTNESS_MAX = 100;
const LIGHTNESS_STEP = 1;

// --- Hex <-> HSL conversion utilities ---

interface HslColor {
  h: number;
  s: number;
  l: number;
}

function hexToHsl(hex: string): HslColor {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToHex(hsl: HslColor): string {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  if (s === 0) {
    const v = Math.round(l * 255);
    return `#${v.toString(16).padStart(2, '0')}${v.toString(16).padStart(2, '0')}${v.toString(16).padStart(2, '0')}`;
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

  const toHex = (v: number) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// --- Slider sub-component ---

function getSliderProgress(value: number, min: number, max: number): string {
  return `${((value - min) / (max - min)) * 100}%`;
}

interface HslSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  precision?: number;
  suffix?: string;
}

function HslSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  precision = 0,
  suffix = '',
}: HslSliderProps) {
  const progress = getSliderProgress(value, min, max);
  const [inputValue, setInputValue] = useState(value.toFixed(precision));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setInputValue(value.toFixed(precision));
    }
  }, [value, precision, isFocused]);

  const handleInputBlur = () => {
    setIsFocused(false);
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed)) {
      setInputValue(value.toFixed(precision));
      return;
    }
    const clamped = Math.max(min, Math.min(max, parsed));
    onChange(clamped);
    setInputValue(clamped.toFixed(precision));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
      (e.target as HTMLInputElement).blur();
    }
    if (e.key === 'Escape') {
      setInputValue(value.toFixed(precision));
      (e.target as HTMLInputElement).blur();
    }
  };

  const inputWidth = Math.max(inputValue.length, 3) * 7 + 4;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-400">{label}</span>
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            onFocus={(e) => {
              setIsFocused(true);
              e.target.select();
            }}
            className="bg-transparent text-right font-mono text-xs text-neutral-300 outline-none"
            style={{ width: inputWidth }}
          />
          {suffix && (
            <span className="font-mono text-xs text-neutral-500">{suffix}</span>
          )}
        </div>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="slider-input h-6 w-full cursor-pointer appearance-none bg-transparent"
        style={{ '--slider-progress': progress } as React.CSSProperties}
      />
    </div>
  );
}

// --- Main ColorPicker ---

export function ColorPicker({
  label,
  color,
  opacity,
  onColorChange,
  onOpacityChange,
}: ColorPickerProps) {
  const [opacityInput, setOpacityInput] = useState(opacity.toString());
  const hsl = hexToHsl(color);

  useEffect(() => {
    setOpacityInput(opacity.toString());
  }, [opacity]);

  const handleOpacityBlur = () => {
    const parsed = parseInt(opacityInput, 10);
    if (isNaN(parsed)) {
      setOpacityInput(opacity.toString());
      return;
    }
    const clamped = Math.max(MIN_OPACITY, Math.min(MAX_OPACITY, parsed));
    onOpacityChange(clamped);
    setOpacityInput(clamped.toString());
  };

  const handleOpacityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleOpacityBlur();
      (e.target as HTMLInputElement).blur();
    }
  };

  const updateHsl = (key: keyof HslColor, value: number) => {
    onColorChange(hslToHex({ ...hsl, [key]: value }));
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs text-neutral-400">{label}</label>
      <div className="flex w-full">
        {/* Left side - Color picker trigger */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex flex-1 items-center gap-2 rounded-l-lg border-r border-neutral-600/50 bg-neutral-700/50 px-3 py-2 transition-colors hover:bg-neutral-700">
              <div
                className="h-4 w-4 rounded"
                style={{ backgroundColor: color, opacity: opacity / 100 }}
              />
              <span className="font-mono text-xs text-neutral-300">{color}</span>
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
                style={{ backgroundColor: color, opacity: opacity / 100 }}
              />
            </div>

            {/* Hex display */}
            <div className="mb-3 flex select-none items-center justify-between rounded-md bg-neutral-700/50 px-2 py-1.5">
              <span className="text-[10px] text-neutral-500">Hex</span>
              <span className="font-mono text-xs text-neutral-300">{color}</span>
            </div>

            {/* HSL Sliders */}
            <div className="space-y-3">
              <HslSlider
                label="Hue"
                value={hsl.h}
                onChange={(v) => updateHsl('h', v)}
                min={HUE_MIN}
                max={HUE_MAX}
                step={HUE_STEP}
                suffix="°"
              />
              <HslSlider
                label="Saturation"
                value={hsl.s}
                onChange={(v) => updateHsl('s', v)}
                min={SATURATION_MIN}
                max={SATURATION_MAX}
                step={SATURATION_STEP}
                suffix="%"
              />
              <HslSlider
                label="Lightness"
                value={hsl.l}
                onChange={(v) => updateHsl('l', v)}
                min={LIGHTNESS_MIN}
                max={LIGHTNESS_MAX}
                step={LIGHTNESS_STEP}
                suffix="%"
              />
            </div>

            {/* Opacity slider */}
            <div className="mt-3 border-t border-neutral-700 pt-3">
              <HslSlider
                label="Opacity"
                value={opacity}
                onChange={onOpacityChange}
                min={MIN_OPACITY}
                max={MAX_OPACITY}
                suffix="%"
              />
            </div>
          </PopoverContent>
        </Popover>

        {/* Right side - Opacity input */}
        <div className="flex items-center gap-1 rounded-r-lg bg-neutral-700/50 px-3 py-2">
          <input
            type="text"
            value={opacityInput}
            onChange={(e) => setOpacityInput(e.target.value)}
            onBlur={handleOpacityBlur}
            onKeyDown={handleOpacityKeyDown}
            className="w-8 bg-transparent text-right font-mono text-xs text-neutral-300 outline-none"
          />
          <span className="font-mono text-xs text-neutral-500">%</span>
        </div>
      </div>
    </div>
  );
}
