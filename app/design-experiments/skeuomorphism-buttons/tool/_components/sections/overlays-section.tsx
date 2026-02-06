'use client';

import { Eye, EyeOff, Trash2 } from 'lucide-react';
import { BlendMode, OverlayType, type OverlayLayer } from '../../_types/button-config';
import { useButtonStore } from '../../_store/button-store';
import { CollapsibleSection } from '../collapsible-section';
import { SliderRow } from '../slider-row';
import { OVERLAY_OPACITY_MIN, OVERLAY_OPACITY_MAX } from '../../_constants/defaults';

// ── Templates for new overlays ───────────────────────────────────────────

let overlayIdCounter = 200;
const nextOverlayId = () => `ol-${++overlayIdCounter}`;

const OVERLAY_TYPE_OPTIONS = [
  { label: 'Shimmer', value: OverlayType.Shimmer },
  { label: 'Specular', value: OverlayType.Specular },
  { label: 'Noise', value: OverlayType.Noise },
] as const;

function createOverlay(type: OverlayType): OverlayLayer {
  return {
    id: nextOverlayId(),
    type,
    visible: true,
    blendMode: BlendMode.SoftLight,
    opacity: 30,
    shimmerAngle: 135,
    shimmerWidth: 50,
    specularX: 50,
    specularY: 25,
    specularRadius: 60,
    noiseIntensity: 10,
  };
}

export function OverlaysSection() {
  const overlays = useButtonStore((s) => s.config.overlays);
  const addOverlay = useButtonStore((s) => s.addOverlay);
  const removeOverlay = useButtonStore((s) => s.removeOverlay);
  const updateOverlay = useButtonStore((s) => s.updateOverlay);
  const toggleOverlayVisibility = useButtonStore((s) => s.toggleOverlayVisibility);

  return (
    <CollapsibleSection id="overlays" title="Overlays" badge={overlays.length || undefined}>
      <div className="space-y-3">
        {overlays.map((overlay) => (
          <OverlayRow
            key={overlay.id}
            overlay={overlay}
            onUpdate={(partial) => updateOverlay(overlay.id, partial)}
            onRemove={() => removeOverlay(overlay.id)}
            onToggleVisibility={() => toggleOverlayVisibility(overlay.id)}
          />
        ))}

        {/* Add overlay buttons */}
        <div className="flex gap-1">
          {OVERLAY_TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => addOverlay(createOverlay(opt.value))}
              className="flex-1 rounded-lg border border-dashed border-neutral-600/50 py-1.5 text-[10px] text-neutral-500 transition-colors hover:border-neutral-500 hover:text-neutral-400"
            >
              + {opt.label}
            </button>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}

// ── Overlay Row ──────────────────────────────────────────────────────────

function OverlayRow({
  overlay,
  onUpdate,
  onRemove,
  onToggleVisibility,
}: {
  overlay: OverlayLayer;
  onUpdate: (partial: Partial<OverlayLayer>) => void;
  onRemove: () => void;
  onToggleVisibility: () => void;
}) {
  return (
    <div className="space-y-3 rounded-lg bg-neutral-700/30 p-2">
      {/* Header */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleVisibility}
          className="text-neutral-500 transition-colors hover:text-neutral-300"
        >
          {overlay.visible ? <Eye size={12} /> : <EyeOff size={12} />}
        </button>
        <span className="flex-1 text-[10px] font-medium capitalize text-neutral-400">
          {overlay.type}
        </span>
        <button
          onClick={onRemove}
          className="text-neutral-500 transition-colors hover:text-red-400"
        >
          <Trash2 size={10} />
        </button>
      </div>

      <SliderRow
        label="Opacity"
        value={overlay.opacity}
        onChange={(v) => onUpdate({ opacity: v })}
        min={OVERLAY_OPACITY_MIN}
        max={OVERLAY_OPACITY_MAX}
        suffix="%"
      />

      {/* Blend mode select */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-neutral-500">Blend</span>
        <select
          value={overlay.blendMode}
          onChange={(e) => onUpdate({ blendMode: e.target.value as BlendMode })}
          className="rounded bg-neutral-700/50 px-2 py-0.5 text-[10px] text-neutral-300 outline-none"
        >
          {Object.values(BlendMode).map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
      </div>

      {/* Type-specific controls */}
      {overlay.type === OverlayType.Shimmer && (
        <>
          <SliderRow
            label="Angle"
            value={overlay.shimmerAngle}
            onChange={(v) => onUpdate({ shimmerAngle: v })}
            min={0}
            max={360}
            suffix="°"
          />
          <SliderRow
            label="Width"
            value={overlay.shimmerWidth}
            onChange={(v) => onUpdate({ shimmerWidth: v })}
            min={10}
            max={90}
            suffix="%"
          />
        </>
      )}

      {overlay.type === OverlayType.Specular && (
        <>
          <SliderRow
            label="X Position"
            value={overlay.specularX}
            onChange={(v) => onUpdate({ specularX: v })}
            min={0}
            max={100}
            suffix="%"
          />
          <SliderRow
            label="Y Position"
            value={overlay.specularY}
            onChange={(v) => onUpdate({ specularY: v })}
            min={0}
            max={100}
            suffix="%"
          />
          <SliderRow
            label="Radius"
            value={overlay.specularRadius}
            onChange={(v) => onUpdate({ specularRadius: v })}
            min={10}
            max={100}
            suffix="%"
          />
        </>
      )}

      {overlay.type === OverlayType.Noise && (
        <SliderRow
          label="Intensity"
          value={overlay.noiseIntensity}
          onChange={(v) => onUpdate({ noiseIntensity: v })}
          min={1}
          max={30}
          suffix="%"
        />
      )}
    </div>
  );
}
