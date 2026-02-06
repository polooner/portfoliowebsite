'use client';

import { Link2, Link2Off } from 'lucide-react';
import { useButtonStore } from '../../_store/button-store';
import { BorderMode } from '../../_types/button-config';
import { CollapsibleSection } from '../collapsible-section';
import { ColorPicker } from '../color-picker';
import { SliderRow } from '../slider-row';
import {
  BORDER_WIDTH_MIN,
  BORDER_WIDTH_MAX,
  BORDER_RADIUS_MIN,
  BORDER_RADIUS_MAX,
} from '../../_constants/defaults';

const BORDER_MODE_OPTIONS = [
  { label: 'Uniform', value: BorderMode.Uniform },
  { label: 'Beveled', value: BorderMode.Beveled },
] as const;

export function BorderSection() {
  const border = useButtonStore((s) => s.config.border);
  const setBorder = useButtonStore((s) => s.setBorder);

  return (
    <CollapsibleSection id="border" title="Border">
      <div className="space-y-4">
        <SliderRow
          label="Width"
          value={border.width}
          onChange={(v) => setBorder({ width: v })}
          min={BORDER_WIDTH_MIN}
          max={BORDER_WIDTH_MAX}
          suffix="px"
        />

        {/* Mode toggle */}
        <div className="flex gap-1 rounded-lg bg-neutral-700/40 p-1">
          {BORDER_MODE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setBorder({ mode: option.value })}
              className={`flex-1 rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${
                border.mode === option.value
                  ? 'bg-neutral-600 text-neutral-200'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Color pickers based on mode */}
        {border.mode === BorderMode.Uniform ? (
          <ColorPicker
            color={border.uniformColor}
            opacity={border.uniformOpacity}
            onColorChange={(c) => setBorder({ uniformColor: c })}
            onOpacityChange={(o) => setBorder({ uniformOpacity: o })}
          />
        ) : (
          <div className="space-y-3">
            <div>
              <span className="mb-1 block text-[10px] text-neutral-500">
                Highlight (top/left)
              </span>
              <ColorPicker
                color={border.bevelHighlightColor}
                opacity={border.bevelHighlightOpacity}
                onColorChange={(c) => setBorder({ bevelHighlightColor: c })}
                onOpacityChange={(o) =>
                  setBorder({ bevelHighlightOpacity: o })
                }
              />
            </div>
            <div>
              <span className="mb-1 block text-[10px] text-neutral-500">
                Shadow (bottom/right)
              </span>
              <ColorPicker
                color={border.bevelShadowColor}
                opacity={border.bevelShadowOpacity}
                onColorChange={(c) => setBorder({ bevelShadowColor: c })}
                onOpacityChange={(o) => setBorder({ bevelShadowOpacity: o })}
              />
            </div>
          </div>
        )}

        {/* Border radius */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neutral-500">Radius</span>
            <button
              onClick={() =>
                setBorder({
                  radiusLinked: !border.radiusLinked,
                  ...((!border.radiusLinked) && {
                    topRightRadius: border.topLeftRadius,
                    bottomRightRadius: border.topLeftRadius,
                    bottomLeftRadius: border.topLeftRadius,
                  }),
                })
              }
              className={`rounded p-1 transition-colors ${
                border.radiusLinked
                  ? 'text-neutral-300'
                  : 'text-neutral-600 hover:text-neutral-400'
              }`}
            >
              {border.radiusLinked ? (
                <Link2 size={12} />
              ) : (
                <Link2Off size={12} />
              )}
            </button>
          </div>

          {border.radiusLinked ? (
            <SliderRow
              label="All Corners"
              value={border.topLeftRadius}
              onChange={(v) => setBorder({ topLeftRadius: v })}
              min={BORDER_RADIUS_MIN}
              max={BORDER_RADIUS_MAX}
              suffix="px"
            />
          ) : (
            <>
              <SliderRow
                label="Top Left"
                value={border.topLeftRadius}
                onChange={(v) => setBorder({ topLeftRadius: v, radiusLinked: false })}
                min={BORDER_RADIUS_MIN}
                max={BORDER_RADIUS_MAX}
                suffix="px"
              />
              <SliderRow
                label="Top Right"
                value={border.topRightRadius}
                onChange={(v) => setBorder({ topRightRadius: v, radiusLinked: false })}
                min={BORDER_RADIUS_MIN}
                max={BORDER_RADIUS_MAX}
                suffix="px"
              />
              <SliderRow
                label="Bottom Right"
                value={border.bottomRightRadius}
                onChange={(v) => setBorder({ bottomRightRadius: v, radiusLinked: false })}
                min={BORDER_RADIUS_MIN}
                max={BORDER_RADIUS_MAX}
                suffix="px"
              />
              <SliderRow
                label="Bottom Left"
                value={border.bottomLeftRadius}
                onChange={(v) => setBorder({ bottomLeftRadius: v, radiusLinked: false })}
                min={BORDER_RADIUS_MIN}
                max={BORDER_RADIUS_MAX}
                suffix="px"
              />
            </>
          )}
        </div>
      </div>
    </CollapsibleSection>
  );
}
