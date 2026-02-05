'use client';

import { HexColorPicker, HexColorInput } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ColorPickerProps {
  color: string;
  opacity: number;
  onColorChange: (color: string) => void;
  onOpacityChange: (opacity: number) => void;
}

export function ColorPicker({ color, opacity, onColorChange, onOpacityChange }: ColorPickerProps) {
  const hexWithoutHash = color.replace('#', '').toUpperCase();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex w-full items-center gap-2 rounded-lg bg-neutral-700/50 px-3 py-2 transition-colors hover:bg-neutral-700">
          {/* Color swatch */}
          <div
            className="h-4 w-4 rounded"
            style={{ backgroundColor: color, opacity: opacity / 100 }}
          />
          {/* Hex value */}
          <span className="flex-1 text-left font-mono text-xs text-neutral-300">
            {hexWithoutHash}
          </span>
          {/* Opacity */}
          <span className="font-mono text-xs text-neutral-500">{opacity}%</span>
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
  );
}
