'use client';

import { useState } from 'react';
import { Eye, EyeOff, Copy, Trash2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ShadowType, type ShadowLayer } from '../../_types/button-config';
import { useButtonStore } from '../../_store/button-store';
import { SliderRow } from '../slider-row';
import { ColorPicker } from '../color-picker';
import {
  SHADOW_OFFSET_MIN,
  SHADOW_OFFSET_MAX,
  SHADOW_BLUR_MIN,
  SHADOW_BLUR_MAX,
  SHADOW_SPREAD_MIN,
  SHADOW_SPREAD_MAX,
} from '../../_constants/defaults';

interface ShadowLayerRowProps {
  layer: ShadowLayer;
  index: number;
  total: number;
}

const SHADOW_TYPE_OPTIONS = [
  { label: 'Outer', value: ShadowType.Outer },
  { label: 'Inset', value: ShadowType.Inset },
] as const;

export function ShadowLayerRow({ layer, index, total }: ShadowLayerRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const updateShadow = useButtonStore((s) => s.updateShadow);
  const removeShadow = useButtonStore((s) => s.removeShadow);
  const duplicateShadow = useButtonStore((s) => s.duplicateShadow);
  const toggleShadowVisibility = useButtonStore((s) => s.toggleShadowVisibility);
  const reorderShadows = useButtonStore((s) => s.reorderShadows);

  const summary = `${layer.offsetX}, ${layer.offsetY}, ${layer.blur}b`;

  return (
    <div className="rounded-lg bg-neutral-700/30">
      {/* Header row */}
      <div className="flex items-center gap-1.5 px-2 py-1.5">
        <button
          onClick={() => toggleShadowVisibility(layer.id)}
          className="shrink-0 text-neutral-500 transition-colors hover:text-neutral-300"
        >
          {layer.visible ? <Eye size={12} /> : <EyeOff size={12} />}
        </button>

        {/* Type pill */}
        <span
          className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium uppercase ${
            layer.type === ShadowType.Inset
              ? 'bg-blue-500/20 text-blue-400'
              : 'bg-neutral-600/50 text-neutral-400'
          }`}
        >
          {layer.type}
        </span>

        {/* Summary */}
        <span className="flex-1 truncate font-mono text-[10px] text-neutral-500">
          {summary}
        </span>

        {/* Reorder buttons */}
        {index > 0 && (
          <button
            onClick={() => reorderShadows(index, index - 1)}
            className="shrink-0 text-neutral-500 transition-colors hover:text-neutral-300"
          >
            <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        )}
        {index < total - 1 && (
          <button
            onClick={() => reorderShadows(index, index + 1)}
            className="shrink-0 text-neutral-500 transition-colors hover:text-neutral-300"
          >
            <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}

        <button
          onClick={() => duplicateShadow(layer.id)}
          className="shrink-0 text-neutral-500 transition-colors hover:text-neutral-300"
        >
          <Copy size={10} />
        </button>

        <button
          onClick={() => removeShadow(layer.id)}
          className="shrink-0 text-neutral-500 transition-colors hover:text-red-400"
        >
          <Trash2 size={10} />
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="shrink-0 text-neutral-500 transition-colors hover:text-neutral-300"
        >
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.15 }}
            className="block"
          >
            <ChevronDown size={12} />
          </motion.span>
        </button>
      </div>

      {/* Expanded controls */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 px-2 pb-3 pt-1">
              {/* Type toggle */}
              <div className="flex gap-1 rounded-md bg-neutral-700/50 p-0.5">
                {SHADOW_TYPE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateShadow(layer.id, { type: opt.value })}
                    className={`flex-1 rounded px-2 py-0.5 text-[10px] font-medium transition-colors ${
                      layer.type === opt.value
                        ? 'bg-neutral-600 text-neutral-200'
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <SliderRow
                label="Offset X"
                value={layer.offsetX}
                onChange={(v) => updateShadow(layer.id, { offsetX: v })}
                min={SHADOW_OFFSET_MIN}
                max={SHADOW_OFFSET_MAX}
                suffix="px"
              />
              <SliderRow
                label="Offset Y"
                value={layer.offsetY}
                onChange={(v) => updateShadow(layer.id, { offsetY: v })}
                min={SHADOW_OFFSET_MIN}
                max={SHADOW_OFFSET_MAX}
                suffix="px"
              />
              <SliderRow
                label="Blur"
                value={layer.blur}
                onChange={(v) => updateShadow(layer.id, { blur: v })}
                min={SHADOW_BLUR_MIN}
                max={SHADOW_BLUR_MAX}
                suffix="px"
              />
              <SliderRow
                label="Spread"
                value={layer.spread}
                onChange={(v) => updateShadow(layer.id, { spread: v })}
                min={SHADOW_SPREAD_MIN}
                max={SHADOW_SPREAD_MAX}
                suffix="px"
              />

              <ColorPicker
                color={layer.color}
                opacity={layer.opacity}
                onColorChange={(c) => updateShadow(layer.id, { color: c })}
                onOpacityChange={(o) => updateShadow(layer.id, { opacity: o })}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
