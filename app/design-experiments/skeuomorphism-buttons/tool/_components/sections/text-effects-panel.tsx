'use client';

import { useButtonStore } from '../../_store/button-store';
import { TextEffectType, TextGradientMode } from '../../_types/button-config';
import { ColorPicker } from '../color-picker';
import { SliderRow } from '../slider-row';
import {
  GRADIENT_ANGLE_MIN,
  GRADIENT_ANGLE_MAX,
  TEXT_SHIMMER_WIDTH_MIN,
  TEXT_SHIMMER_WIDTH_MAX,
  TEXT_SHIMMER_SPEED_MIN,
  TEXT_SHIMMER_SPEED_MAX,
  TEXT_STROKE_WIDTH_MIN,
  TEXT_STROKE_WIDTH_MAX,
  TEXT_EFFECT_OFFSET_MIN,
  TEXT_EFFECT_OFFSET_MAX,
  TEXT_EFFECT_BLUR_MIN,
  TEXT_EFFECT_BLUR_MAX,
} from '../../_constants/defaults';

const EFFECT_MODE_OPTIONS = [
  { label: 'None', value: TextEffectType.None },
  { label: 'Engraved', value: TextEffectType.Engraved },
  { label: 'Embossed', value: TextEffectType.Embossed },
  { label: 'Gradient', value: TextEffectType.GradientFill },
] as const;

const TEXT_GRADIENT_MODE_OPTIONS = [
  { label: 'Linear', value: TextGradientMode.Linear },
  { label: 'Radial', value: TextGradientMode.Radial },
] as const;

export function TextEffectsPanel() {
  const text = useButtonStore((s) => s.config.text);
  const setText = useButtonStore((s) => s.setText);
  const setTextEngraved = useButtonStore((s) => s.setTextEngraved);
  const setTextEmbossed = useButtonStore((s) => s.setTextEmbossed);
  const setTextGradient = useButtonStore((s) => s.setTextGradient);
  const addTextGradientStop = useButtonStore((s) => s.addTextGradientStop);
  const removeTextGradientStop = useButtonStore((s) => s.removeTextGradientStop);
  const updateTextGradientStop = useButtonStore((s) => s.updateTextGradientStop);
  const setTextShimmer = useButtonStore((s) => s.setTextShimmer);
  const setTextStroke = useButtonStore((s) => s.setTextStroke);

  const showEngravedControls = text.effect === TextEffectType.Engraved;
  const showEmbossedControls = text.effect === TextEffectType.Embossed;
  const showGradientControls = text.effect === TextEffectType.GradientFill;

  return (
    <div className="space-y-4">
      {/* ── Effect Mode Toggle ────────────────────────────── */}
      <div className="space-y-3">
        <span className="text-[10px] text-neutral-500">Effect Mode</span>
        <div className="flex gap-1 rounded-lg bg-neutral-700/40 p-1">
          {EFFECT_MODE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setText({ effect: option.value })}
              className={`flex-1 rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${
                text.effect === option.value
                  ? 'bg-neutral-600 text-neutral-200'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Engraved Controls ────────────────────────────── */}
      {showEngravedControls && (
        <div className="space-y-3 rounded-lg bg-neutral-700/20 p-3">
          <span className="text-[10px] text-neutral-500">Engraved Highlight</span>
          <ColorPicker
            color={text.engraved.highlightColor}
            opacity={text.engraved.highlightOpacity}
            onColorChange={(c) => setTextEngraved({ highlightColor: c })}
            onOpacityChange={(o) => setTextEngraved({ highlightOpacity: o })}
          />
          <SliderRow
            label="X"
            value={text.engraved.highlightOffsetX}
            onChange={(v) => setTextEngraved({ highlightOffsetX: v })}
            min={TEXT_EFFECT_OFFSET_MIN}
            max={TEXT_EFFECT_OFFSET_MAX}
            step={0.5}
            precision={1}
            suffix="px"
          />
          <SliderRow
            label="Y"
            value={text.engraved.highlightOffsetY}
            onChange={(v) => setTextEngraved({ highlightOffsetY: v })}
            min={TEXT_EFFECT_OFFSET_MIN}
            max={TEXT_EFFECT_OFFSET_MAX}
            step={0.5}
            precision={1}
            suffix="px"
          />
          <SliderRow
            label="Blur"
            value={text.engraved.highlightBlur}
            onChange={(v) => setTextEngraved({ highlightBlur: v })}
            min={TEXT_EFFECT_BLUR_MIN}
            max={TEXT_EFFECT_BLUR_MAX}
            step={0.5}
            precision={1}
            suffix="px"
          />
        </div>
      )}

      {/* ── Embossed Controls ────────────────────────────── */}
      {showEmbossedControls && (
        <div className="space-y-4 rounded-lg bg-neutral-700/20 p-3">
          {/* Highlight */}
          <div className="space-y-3">
            <span className="text-[10px] text-neutral-500">Highlight</span>
            <ColorPicker
              color={text.embossed.highlightColor}
              opacity={text.embossed.highlightOpacity}
              onColorChange={(c) => setTextEmbossed({ highlightColor: c })}
              onOpacityChange={(o) => setTextEmbossed({ highlightOpacity: o })}
            />
            <SliderRow
              label="X"
              value={text.embossed.highlightOffsetX}
              onChange={(v) => setTextEmbossed({ highlightOffsetX: v })}
              min={TEXT_EFFECT_OFFSET_MIN}
              max={TEXT_EFFECT_OFFSET_MAX}
              step={0.5}
              precision={1}
              suffix="px"
            />
            <SliderRow
              label="Y"
              value={text.embossed.highlightOffsetY}
              onChange={(v) => setTextEmbossed({ highlightOffsetY: v })}
              min={TEXT_EFFECT_OFFSET_MIN}
              max={TEXT_EFFECT_OFFSET_MAX}
              step={0.5}
              precision={1}
              suffix="px"
            />
            <SliderRow
              label="Blur"
              value={text.embossed.highlightBlur}
              onChange={(v) => setTextEmbossed({ highlightBlur: v })}
              min={TEXT_EFFECT_BLUR_MIN}
              max={TEXT_EFFECT_BLUR_MAX}
              step={0.5}
              precision={1}
              suffix="px"
            />
          </div>

          {/* Shadow */}
          <div className="space-y-3">
            <span className="text-[10px] text-neutral-500">Shadow</span>
            <ColorPicker
              color={text.embossed.shadowColor}
              opacity={text.embossed.shadowOpacity}
              onColorChange={(c) => setTextEmbossed({ shadowColor: c })}
              onOpacityChange={(o) => setTextEmbossed({ shadowOpacity: o })}
            />
            <SliderRow
              label="X"
              value={text.embossed.shadowOffsetX}
              onChange={(v) => setTextEmbossed({ shadowOffsetX: v })}
              min={TEXT_EFFECT_OFFSET_MIN}
              max={TEXT_EFFECT_OFFSET_MAX}
              step={0.5}
              precision={1}
              suffix="px"
            />
            <SliderRow
              label="Y"
              value={text.embossed.shadowOffsetY}
              onChange={(v) => setTextEmbossed({ shadowOffsetY: v })}
              min={TEXT_EFFECT_OFFSET_MIN}
              max={TEXT_EFFECT_OFFSET_MAX}
              step={0.5}
              precision={1}
              suffix="px"
            />
            <SliderRow
              label="Blur"
              value={text.embossed.shadowBlur}
              onChange={(v) => setTextEmbossed({ shadowBlur: v })}
              min={TEXT_EFFECT_BLUR_MIN}
              max={TEXT_EFFECT_BLUR_MAX}
              step={0.5}
              precision={1}
              suffix="px"
            />
          </div>
        </div>
      )}

      {/* ── Gradient Fill Controls ────────────────────────── */}
      {showGradientControls && (
        <div className="space-y-3 rounded-lg bg-neutral-700/20 p-3">
          <span className="text-[10px] text-neutral-500">Text Gradient</span>

          {/* Mode toggle */}
          <div className="flex gap-1 rounded-lg bg-neutral-700/40 p-1">
            {TEXT_GRADIENT_MODE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setTextGradient({ mode: option.value })}
                className={`flex-1 rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${
                  text.gradientFill.mode === option.value
                    ? 'bg-neutral-600 text-neutral-200'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Angle / Center controls */}
          {text.gradientFill.mode === TextGradientMode.Linear && (
            <SliderRow
              label="Angle"
              value={text.gradientFill.angle}
              onChange={(v) => setTextGradient({ angle: v })}
              min={GRADIENT_ANGLE_MIN}
              max={GRADIENT_ANGLE_MAX}
              suffix="°"
            />
          )}

          {text.gradientFill.mode === TextGradientMode.Radial && (
            <>
              <SliderRow
                label="Center X"
                value={text.gradientFill.centerX}
                onChange={(v) => setTextGradient({ centerX: v })}
                min={0}
                max={100}
                suffix="%"
              />
              <SliderRow
                label="Center Y"
                value={text.gradientFill.centerY}
                onChange={(v) => setTextGradient({ centerY: v })}
                min={0}
                max={100}
                suffix="%"
              />
            </>
          )}

          {/* Gradient stops */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-500">Stops</span>
              <button
                onClick={addTextGradientStop}
                className="rounded-md px-2 py-0.5 text-[10px] text-neutral-400 transition-colors hover:bg-neutral-700/50 hover:text-neutral-300"
              >
                + Add
              </button>
            </div>

            {text.gradientFill.stops.map((stop) => (
              <div key={stop.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <SliderRow
                    label={`${stop.position}%`}
                    value={stop.position}
                    onChange={(v) =>
                      updateTextGradientStop(stop.id, { position: v })
                    }
                    min={0}
                    max={100}
                    suffix="%"
                  />
                  {text.gradientFill.stops.length > 2 && (
                    <button
                      onClick={() => removeTextGradientStop(stop.id)}
                      className="shrink-0 rounded p-1 text-neutral-500 transition-colors hover:bg-neutral-700/50 hover:text-neutral-300"
                    >
                      <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <ColorPicker
                  color={stop.color}
                  opacity={stop.opacity}
                  onColorChange={(c) =>
                    updateTextGradientStop(stop.id, { color: c })
                  }
                  onOpacityChange={(o) =>
                    updateTextGradientStop(stop.id, { opacity: o })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Text Shimmer ──────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-neutral-500">Text Shimmer</span>
          <button
            onClick={() => setTextShimmer({ enabled: !text.shimmer.enabled })}
            className={`relative h-4 w-7 rounded-full transition-colors ${
              text.shimmer.enabled ? 'bg-blue-500' : 'bg-neutral-600'
            }`}
          >
            <span
              className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform ${
                text.shimmer.enabled ? 'left-3.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {text.shimmer.enabled && (
          <div className="space-y-2 rounded-lg bg-neutral-700/20 p-3">
            <SliderRow
              label="Angle"
              value={text.shimmer.angle}
              onChange={(v) => setTextShimmer({ angle: v })}
              min={GRADIENT_ANGLE_MIN}
              max={GRADIENT_ANGLE_MAX}
              suffix="°"
            />
            <SliderRow
              label="Width"
              value={text.shimmer.width}
              onChange={(v) => setTextShimmer({ width: v })}
              min={TEXT_SHIMMER_WIDTH_MIN}
              max={TEXT_SHIMMER_WIDTH_MAX}
              suffix="%"
            />
            <SliderRow
              label="Speed"
              value={text.shimmer.speed}
              onChange={(v) => setTextShimmer({ speed: v })}
              min={TEXT_SHIMMER_SPEED_MIN}
              max={TEXT_SHIMMER_SPEED_MAX}
              step={0.1}
              precision={1}
              suffix="s"
            />
            <ColorPicker
              color={text.shimmer.color}
              opacity={text.shimmer.opacity}
              onColorChange={(c) => setTextShimmer({ color: c })}
              onOpacityChange={(o) => setTextShimmer({ opacity: o })}
            />
          </div>
        )}
      </div>

      {/* ── Text Stroke ───────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-neutral-500">Text Stroke</span>
          <button
            onClick={() => setTextStroke({ enabled: !text.stroke.enabled })}
            className={`relative h-4 w-7 rounded-full transition-colors ${
              text.stroke.enabled ? 'bg-blue-500' : 'bg-neutral-600'
            }`}
          >
            <span
              className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform ${
                text.stroke.enabled ? 'left-3.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {text.stroke.enabled && (
          <div className="space-y-2 rounded-lg bg-neutral-700/20 p-3">
            <SliderRow
              label="Width"
              value={text.stroke.width}
              onChange={(v) => setTextStroke({ width: v })}
              min={TEXT_STROKE_WIDTH_MIN}
              max={TEXT_STROKE_WIDTH_MAX}
              step={0.1}
              precision={1}
              suffix="px"
            />
            <ColorPicker
              color={text.stroke.color}
              opacity={text.stroke.opacity}
              onColorChange={(c) => setTextStroke({ color: c })}
              onOpacityChange={(o) => setTextStroke({ opacity: o })}
            />
          </div>
        )}
      </div>
    </div>
  );
}
