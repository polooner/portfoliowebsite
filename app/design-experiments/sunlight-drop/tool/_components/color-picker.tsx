'use client';

import { useState, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ColorPickerProps {
  color: string;
  opacity: number;
  onColorChange: (color: string) => void;
  onOpacityChange: (opacity: number) => void;
}

const MIN_OPACITY = 0;
const MAX_OPACITY = 100;

export function ColorPicker({ color, opacity, onColorChange, onOpacityChange }: ColorPickerProps) {
  const hexWithoutHash = color.replace('#', '').toUpperCase();
  const [opacityInput, setOpacityInput] = useState(opacity.toString());

  useEffect(() => {
    setOpacityInput(opacity.toString());
  }, [opacity]);

  const handleOpacityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOpacityInput(value);
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

  return (
    <div className="flex w-full">
      {/* Left button - Color picker trigger */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex flex-1 items-center gap-2 rounded-l-lg border-r border-neutral-600/50 bg-neutral-700/50 px-3 py-2 transition-colors hover:bg-neutral-700">
            <div
              className="h-4 w-4 rounded"
              style={{ backgroundColor: color, opacity: opacity / 100 }}
            />
            <span className="font-mono text-xs text-neutral-300">
              {hexWithoutHash}
            </span>
          </button>
        </PopoverTrigger>
      <PopoverContent
        side="left"
        align="start"
        sideOffset={20}
        className="w-56 rounded-xl border-white/10 bg-neutral-800 p-3"
      >
        {/* Color picker */}
        <HexColorPicker
          color={color}
          onChange={onColorChange}
          className="!w-full"
        />

        {/* Hex input */}
        <div className="mt-3 flex items-center gap-2">
          <div
            className="h-8 w-8 shrink-0 rounded"
            style={{ backgroundColor: color, opacity: opacity / 100 }}
          />
          <div className="flex flex-1 items-center rounded-md bg-neutral-700/50 px-2">
            <span className="text-xs text-neutral-500">#</span>
            <HexColorInput
              color={color}
              onChange={onColorChange}
              prefixed={false}
              className="w-full bg-transparent px-1 py-1.5 font-mono text-xs text-neutral-200 uppercase outline-none"
            />
          </div>
        </div>

        {/* Opacity slider */}
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-neutral-400">Opacity</span>
            <span className="font-mono text-xs text-neutral-500">{opacity}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => onOpacityChange(Number(e.target.value))}
            className="slider-input h-6 w-full cursor-pointer appearance-none bg-transparent"
            style={{ '--slider-progress': `${opacity}%` } as React.CSSProperties}
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
