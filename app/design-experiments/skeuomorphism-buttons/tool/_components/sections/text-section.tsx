'use client';

import { Trash2 } from 'lucide-react';
import { useButtonStore } from '../../_store/button-store';
import { CollapsibleSection } from '../collapsible-section';
import { ColorPicker } from '../color-picker';
import { SliderRow } from '../slider-row';
import {
  FONT_SIZE_MIN,
  FONT_SIZE_MAX,
  LETTER_SPACING_MIN,
  LETTER_SPACING_MAX,
  SHADOW_OFFSET_MIN,
  SHADOW_OFFSET_MAX,
  SHADOW_BLUR_MIN,
  SHADOW_BLUR_MAX,
} from '../../_constants/defaults';

const FONT_WEIGHT_OPTIONS = [300, 400, 500, 600, 700, 800] as const;

export function TextSection() {
  const text = useButtonStore((s) => s.config.text);
  const setText = useButtonStore((s) => s.setText);
  const addTextShadow = useButtonStore((s) => s.addTextShadow);
  const removeTextShadow = useButtonStore((s) => s.removeTextShadow);
  const updateTextShadow = useButtonStore((s) => s.updateTextShadow);

  return (
    <CollapsibleSection id="text" title="Text">
      <div className="space-y-4">
        {/* Content input */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-neutral-400">Content</span>
          <input
            type="text"
            value={text.content}
            onChange={(e) => setText({ content: e.target.value })}
            className="rounded-lg bg-neutral-700/50 px-3 py-2 text-xs text-neutral-200 outline-none transition-colors focus:bg-neutral-700"
          />
        </div>

        <ColorPicker
          color={text.color}
          opacity={text.opacity}
          onColorChange={(c) => setText({ color: c })}
          onOpacityChange={(o) => setText({ opacity: o })}
        />

        <SliderRow
          label="Font Size"
          value={text.fontSize}
          onChange={(v) => setText({ fontSize: v })}
          min={FONT_SIZE_MIN}
          max={FONT_SIZE_MAX}
          suffix="px"
        />

        {/* Font weight select */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-400">Weight</span>
          <select
            value={text.fontWeight}
            onChange={(e) => setText({ fontWeight: Number(e.target.value) })}
            className="rounded bg-neutral-700/50 px-2 py-1 text-xs text-neutral-300 outline-none"
          >
            {FONT_WEIGHT_OPTIONS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        <SliderRow
          label="Letter Spacing"
          value={text.letterSpacing}
          onChange={(v) => setText({ letterSpacing: v })}
          min={LETTER_SPACING_MIN}
          max={LETTER_SPACING_MAX}
          step={0.1}
          precision={1}
          suffix="px"
        />

        {/* Text shadows */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neutral-500">Text Shadows</span>
            <button
              onClick={addTextShadow}
              className="rounded-md px-2 py-0.5 text-[10px] text-neutral-400 transition-colors hover:bg-neutral-700/50 hover:text-neutral-300"
            >
              + Add
            </button>
          </div>

          {text.textShadows.map((ts) => (
            <div
              key={ts.id}
              className="space-y-2 rounded-lg bg-neutral-700/30 p-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-400">Text Shadow</span>
                <button
                  onClick={() => removeTextShadow(ts.id)}
                  className="text-neutral-500 transition-colors hover:text-red-400"
                >
                  <Trash2 size={10} />
                </button>
              </div>
              <SliderRow
                label="X"
                value={ts.offsetX}
                onChange={(v) => updateTextShadow(ts.id, { offsetX: v })}
                min={SHADOW_OFFSET_MIN}
                max={SHADOW_OFFSET_MAX}
                suffix="px"
              />
              <SliderRow
                label="Y"
                value={ts.offsetY}
                onChange={(v) => updateTextShadow(ts.id, { offsetY: v })}
                min={SHADOW_OFFSET_MIN}
                max={SHADOW_OFFSET_MAX}
                suffix="px"
              />
              <SliderRow
                label="Blur"
                value={ts.blur}
                onChange={(v) => updateTextShadow(ts.id, { blur: v })}
                min={SHADOW_BLUR_MIN}
                max={SHADOW_BLUR_MAX}
                suffix="px"
              />
              <ColorPicker
                color={ts.color}
                opacity={ts.opacity}
                onColorChange={(c) => updateTextShadow(ts.id, { color: c })}
                onOpacityChange={(o) => updateTextShadow(ts.id, { opacity: o })}
              />
            </div>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}
