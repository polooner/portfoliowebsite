'use client';

import { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { type OklchColor, oklchToCss, oklchToHex } from '../_store/shadow-store';

interface ColorPickerProps {
  color: OklchColor;
  opacity: number;
  onColorChange: (color: OklchColor) => void;
  onOpacityChange: (opacity: number) => void;
}

const MIN_OPACITY = 0;
const MAX_OPACITY = 100;

const LIGHTNESS_MIN = 0;
const LIGHTNESS_MAX = 100;
const LIGHTNESS_STEP = 0.1;
const CHROMA_MIN = 0;
const CHROMA_MAX = 0.4;
const CHROMA_STEP = 0.001;
const HUE_MIN = 0;
const HUE_MAX = 360;
const HUE_STEP = 0.1;

function formatOklchDisplay(color: OklchColor): string {
  return `${color.l.toFixed(1)} ${color.c.toFixed(3)} ${color.h.toFixed(0)}`;
}

function getSliderProgress(value: number, min: number, max: number): string {
  return `${((value - min) / (max - min)) * 100}%`;
}

interface OklchSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  /** Number of decimal places for display/input */
  precision?: number;
  /** Suffix to show after the value (e.g., "%", "°") */
  suffix?: string;
}

function OklchSlider({ label, value, onChange, min, max, step = 1, precision = 0, suffix = '' }: OklchSliderProps) {
  const progress = getSliderProgress(value, min, max);
  const [inputValue, setInputValue] = useState(value.toFixed(precision));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setInputValue(value.toFixed(precision));
    }
  }, [value, precision, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

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

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    e.target.select();
  };

  // Calculate input width based on content
  const inputWidth = Math.max(inputValue.length, 3) * 7 + 4;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-400">{label}</span>
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            onFocus={handleInputFocus}
            className="bg-transparent text-right font-mono text-xs text-neutral-300 outline-none"
            style={{ width: inputWidth }}
          />
          {suffix && <span className="font-mono text-xs text-neutral-500">{suffix}</span>}
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

export function ColorPicker({ color, opacity, onColorChange, onOpacityChange }: ColorPickerProps) {
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
            <Popover>
              <PopoverTrigger asChild>
                <button className="absolute right-1.5 top-1.5 cursor-help rounded-lg select-none bg-black/40 px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-white/80">
                  oklch
                </button>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                align="end"
                sideOffset={22}
                className="max-w-52 border-white/10 bg-neutral-800 text-xs text-neutral-300 rounded-xl"
                style={{ transform: 'translateX(1.2rem)' }}
              >
                OKLCH produces superior gradients by ensuring uniform perceptual lightness, eliminating the muddy middle tones common in RGB or HSL.
              </PopoverContent>
            </Popover>
          </div>

          {/* Hex fallback display for verification */}
          <div className="mb-3 flex select-none items-center justify-between rounded-md bg-neutral-700/50 px-2 py-1.5">
            <span className="text-[10px] text-neutral-500">sRGB Hex</span>
            <span className="font-mono text-xs text-neutral-300">{oklchToHex(color)}</span>
          </div>

          {/* OKLCH Sliders */}
          <div className="space-y-3">
            <OklchSlider
              label="Lightness"
              value={color.l}
              onChange={(v) => updateColor('l', v)}
              min={LIGHTNESS_MIN}
              max={LIGHTNESS_MAX}
              step={LIGHTNESS_STEP}
              precision={1}
              suffix="%"
            />
            <OklchSlider
              label="Chroma"
              value={color.c}
              onChange={(v) => updateColor('c', v)}
              min={CHROMA_MIN}
              max={CHROMA_MAX}
              step={CHROMA_STEP}
              precision={3}
            />
            <OklchSlider
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
            <OklchSlider
              label="Opacity"
              value={opacity}
              onChange={onOpacityChange}
              min={MIN_OPACITY}
              max={MAX_OPACITY}
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
