'use client';

import { useButtonStore } from '../../_store/button-store';
import { CollapsibleSection } from '../collapsible-section';
import { ColorPicker } from '../color-picker';
import { SliderRow } from '../slider-row';
import {
  HOVER_TRANSLATE_MIN,
  HOVER_TRANSLATE_MAX,
  ACTIVE_TRANSLATE_MIN,
  ACTIVE_TRANSLATE_MAX,
  SHADOW_INTENSITY_MIN,
  SHADOW_INTENSITY_MAX,
  LIGHTEN_DARKEN_MIN,
  LIGHTEN_DARKEN_MAX,
  SHADOW_FLATTEN_MIN,
  SHADOW_FLATTEN_MAX,
  INSET_BLUR_MIN,
  INSET_BLUR_MAX,
  TRANSITION_DURATION_MIN,
  TRANSITION_DURATION_MAX,
} from '../../_constants/defaults';

export function StatesSection() {
  const hover = useButtonStore((s) => s.config.hover);
  const active = useButtonStore((s) => s.config.active);
  const setHover = useButtonStore((s) => s.setHover);
  const setActive = useButtonStore((s) => s.setActive);

  return (
    <CollapsibleSection id="states" title="States">
      <div className="space-y-5">
        {/* Hover */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500/80">
              Hover
            </span>
            <button
              onClick={() => setHover({ enabled: !hover.enabled })}
              className={`rounded px-2 py-0.5 text-[10px] transition-colors ${
                hover.enabled
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-neutral-700/50 text-neutral-500'
              }`}
            >
              {hover.enabled ? 'On' : 'Off'}
            </button>
          </div>

          {hover.enabled && (
            <>
              <SliderRow
                label="Translate Y"
                value={hover.translateY}
                onChange={(v) => setHover({ translateY: v })}
                min={HOVER_TRANSLATE_MIN}
                max={HOVER_TRANSLATE_MAX}
                suffix="px"
              />
              <SliderRow
                label="Shadow Intensity"
                value={hover.shadowIntensityMultiplier}
                onChange={(v) => setHover({ shadowIntensityMultiplier: v })}
                min={SHADOW_INTENSITY_MIN}
                max={SHADOW_INTENSITY_MAX}
                step={0.1}
                precision={1}
                suffix="x"
              />
              <SliderRow
                label="Lighten"
                value={hover.backgroundLighten}
                onChange={(v) => setHover({ backgroundLighten: v })}
                min={LIGHTEN_DARKEN_MIN}
                max={LIGHTEN_DARKEN_MAX}
              />
              <SliderRow
                label="Transition"
                value={hover.transitionDuration}
                onChange={(v) => setHover({ transitionDuration: v })}
                min={TRANSITION_DURATION_MIN}
                max={TRANSITION_DURATION_MAX}
                suffix="ms"
              />
            </>
          )}
        </div>

        {/* Active */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500/80">
              Active
            </span>
            <button
              onClick={() => setActive({ enabled: !active.enabled })}
              className={`rounded px-2 py-0.5 text-[10px] transition-colors ${
                active.enabled
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-neutral-700/50 text-neutral-500'
              }`}
            >
              {active.enabled ? 'On' : 'Off'}
            </button>
          </div>

          {active.enabled && (
            <>
              <SliderRow
                label="Translate Y"
                value={active.translateY}
                onChange={(v) => setActive({ translateY: v })}
                min={ACTIVE_TRANSLATE_MIN}
                max={ACTIVE_TRANSLATE_MAX}
                suffix="px"
              />
              <SliderRow
                label="Shadow Flatten"
                value={active.shadowFlattenAmount}
                onChange={(v) => setActive({ shadowFlattenAmount: v })}
                min={SHADOW_FLATTEN_MIN}
                max={SHADOW_FLATTEN_MAX}
                suffix="%"
              />
              <SliderRow
                label="Darken"
                value={active.backgroundDarken}
                onChange={(v) => setActive({ backgroundDarken: v })}
                min={LIGHTEN_DARKEN_MIN}
                max={LIGHTEN_DARKEN_MAX}
              />

              {/* Inset shadow on active */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-500">
                  Add Inset Shadow
                </span>
                <button
                  onClick={() =>
                    setActive({ addInsetShadow: !active.addInsetShadow })
                  }
                  className={`rounded px-2 py-0.5 text-[10px] transition-colors ${
                    active.addInsetShadow
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-neutral-700/50 text-neutral-500'
                  }`}
                >
                  {active.addInsetShadow ? 'On' : 'Off'}
                </button>
              </div>

              {active.addInsetShadow && (
                <div className="space-y-2 rounded-lg bg-neutral-700/30 p-2">
                  <SliderRow
                    label="Blur"
                    value={active.insetShadowBlur}
                    onChange={(v) => setActive({ insetShadowBlur: v })}
                    min={INSET_BLUR_MIN}
                    max={INSET_BLUR_MAX}
                    suffix="px"
                  />
                  <ColorPicker
                    color={active.insetShadowColor}
                    opacity={active.insetShadowOpacity}
                    onColorChange={(c) =>
                      setActive({ insetShadowColor: c })
                    }
                    onOpacityChange={(o) =>
                      setActive({ insetShadowOpacity: o })
                    }
                  />
                </div>
              )}

              <SliderRow
                label="Transition"
                value={active.transitionDuration}
                onChange={(v) => setActive({ transitionDuration: v })}
                min={TRANSITION_DURATION_MIN}
                max={TRANSITION_DURATION_MAX}
                suffix="ms"
              />
            </>
          )}
        </div>
      </div>
    </CollapsibleSection>
  );
}
