'use client';

import { useButtonStore } from '../../_store/button-store';
import { CollapsibleSection } from '../collapsible-section';
import { ShadowLayerRow } from './shadow-layer-row';

export function ShadowsSection() {
  const shadows = useButtonStore((s) => s.config.shadows);
  const addShadow = useButtonStore((s) => s.addShadow);

  return (
    <CollapsibleSection id="shadows" title="Shadows" badge={shadows.length}>
      <div className="space-y-2">
        {shadows.map((layer, index) => (
          <ShadowLayerRow
            key={layer.id}
            layer={layer}
            index={index}
            total={shadows.length}
          />
        ))}

        <button
          onClick={addShadow}
          className="w-full rounded-lg border border-dashed border-neutral-600/50 py-2 text-[10px] text-neutral-500 transition-colors hover:border-neutral-500 hover:text-neutral-400"
        >
          + Add Shadow
        </button>
      </div>
    </CollapsibleSection>
  );
}
