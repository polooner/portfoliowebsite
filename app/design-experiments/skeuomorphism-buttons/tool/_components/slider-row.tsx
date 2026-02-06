'use client';

import { useState, useEffect } from 'react';

interface SliderRowProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  /** Number of decimal places for display/input */
  precision?: number;
  /** Suffix to show after the value (e.g., "px", "%") */
  suffix?: string;
}

function getSliderProgress(value: number, min: number, max: number): string {
  return `${((value - min) / (max - min)) * 100}%`;
}

export function SliderRow({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  precision = 0,
  suffix = '',
}: SliderRowProps) {
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
