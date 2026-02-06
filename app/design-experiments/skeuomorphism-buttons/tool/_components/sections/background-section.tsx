'use client';

import { useButtonStore } from '../../_store/button-store';
import { BackgroundMode } from '../../_types/button-config';
import { CollapsibleSection } from '../collapsible-section';
import { ColorPicker } from '../color-picker';
import { SliderRow } from '../slider-row';
import { GRADIENT_ANGLE_MIN, GRADIENT_ANGLE_MAX } from '../../_constants/defaults';

const BACKGROUND_MODE_OPTIONS = [
  { label: 'Solid', value: BackgroundMode.Solid },
  { label: 'Linear', value: BackgroundMode.LinearGradient },
  { label: 'Radial', value: BackgroundMode.RadialGradient },
] as const;

export function BackgroundSection() {
  const background = useButtonStore((s) => s.config.background);
  const setBackground = useButtonStore((s) => s.setBackground);
  const addGradientStop = useButtonStore((s) => s.addGradientStop);
  const removeGradientStop = useButtonStore((s) => s.removeGradientStop);
  const updateGradientStop = useButtonStore((s) => s.updateGradientStop);

  const isGradient =
    background.mode === BackgroundMode.LinearGradient ||
    background.mode === BackgroundMode.RadialGradient;

  return (
    <CollapsibleSection id="background" title="Background">
      <div className="space-y-4">
        {/* Mode toggle */}
        <div className="flex gap-1 rounded-lg bg-neutral-700/40 p-1">
          {BACKGROUND_MODE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setBackground({ mode: option.value })}
              className={`flex-1 rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${
                background.mode === option.value
                  ? 'bg-neutral-600 text-neutral-200'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Solid color */}
        {background.mode === BackgroundMode.Solid && (
          <ColorPicker
            color={background.solidColor}
            opacity={background.solidOpacity}
            onColorChange={(c) => setBackground({ solidColor: c })}
            onOpacityChange={(o) => setBackground({ solidOpacity: o })}
          />
        )}

        {/* Gradient controls */}
        {isGradient && (
          <>
            {background.mode === BackgroundMode.LinearGradient && (
              <SliderRow
                label="Angle"
                value={background.gradientAngle}
                onChange={(v) => setBackground({ gradientAngle: v })}
                min={GRADIENT_ANGLE_MIN}
                max={GRADIENT_ANGLE_MAX}
                suffix="°"
              />
            )}

            {background.mode === BackgroundMode.RadialGradient && (
              <div className="space-y-3">
                <SliderRow
                  label="Center X"
                  value={background.gradientCenterX}
                  onChange={(v) => setBackground({ gradientCenterX: v })}
                  min={0}
                  max={100}
                  suffix="%"
                />
                <SliderRow
                  label="Center Y"
                  value={background.gradientCenterY}
                  onChange={(v) => setBackground({ gradientCenterY: v })}
                  min={0}
                  max={100}
                  suffix="%"
                />
              </div>
            )}

            {/* Gradient stops */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-500">Stops</span>
                <button
                  onClick={addGradientStop}
                  className="rounded-md px-2 py-0.5 text-[10px] text-neutral-400 transition-colors hover:bg-neutral-700/50 hover:text-neutral-300"
                >
                  + Add
                </button>
              </div>

              {background.gradientStops.map((stop) => (
                <div key={stop.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <SliderRow
                      label={`${stop.position}%`}
                      value={stop.position}
                      onChange={(v) =>
                        updateGradientStop(stop.id, { position: v })
                      }
                      min={0}
                      max={100}
                      suffix="%"
                    />
                    {background.gradientStops.length > 2 && (
                      <button
                        onClick={() => removeGradientStop(stop.id)}
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
                      updateGradientStop(stop.id, { color: c })
                    }
                    onOpacityChange={(o) =>
                      updateGradientStop(stop.id, { opacity: o })
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </CollapsibleSection>
  );
}
