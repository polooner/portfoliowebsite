'use client';

import { useMemo } from 'react';
import { useButtonStore } from '../../_store/button-store';
import { PRESETS } from '../../_constants/presets';
import { generateButtonStyles, generateOverlayStyle } from '../../_utils/generate-css-styles';
import { CollapsibleSection } from '../collapsible-section';

export function PresetsSection() {
  const loadPreset = useButtonStore((s) => s.loadPreset);

  return (
    <CollapsibleSection id="presets" title="Presets">
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((preset) => (
          <PresetThumbnail
            key={preset.name}
            name={preset.name}
            onSelect={() => loadPreset(preset.config)}
            config={preset.config}
          />
        ))}
      </div>
    </CollapsibleSection>
  );
}

function PresetThumbnail({
  name,
  onSelect,
  config,
}: {
  name: string;
  onSelect: () => void;
  config: import('../../_types/button-config').ButtonConfig;
}) {
  const thumbStyle = useMemo(() => {
    const styles = generateButtonStyles(config);
    return {
      ...styles,
      fontSize: 9,
      padding: '4px 8px',
      minWidth: 0,
      transition: 'none',
      lineHeight: 1.3,
    } as React.CSSProperties;
  }, [config]);

  const overlays = useMemo(
    () => config.overlays.filter((o) => o.visible),
    [config]
  );

  return (
    <button
      onClick={onSelect}
      className="flex h-16 items-center justify-center rounded-lg bg-neutral-700/30 p-2 transition-colors hover:bg-neutral-600/40"
    >
      <div style={thumbStyle} className="pointer-events-none max-w-full truncate">
        {config.text.content}
        {overlays.map((overlay) => (
          <div
            key={overlay.id}
            style={generateOverlayStyle(overlay)}
          />
        ))}
      </div>
    </button>
  );
}
