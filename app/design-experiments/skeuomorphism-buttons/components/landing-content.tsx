'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { PRESETS } from '../tool/_constants/presets';
import {
  generateButtonStyles,
  generateOverlayStyle,
} from '../tool/_utils/generate-css-styles';

export default function LandingContent() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-neutral-100">
      {/* Hero */}
      <div className="flex w-full max-w-3xl flex-col items-center gap-6 px-6 pt-32 text-center">
        <h1 className="text-5xl font-medium tracking-tight text-neutral-900 md:text-6xl">
          Skeuomorphic
          <br />
          <span className="text-neutral-400">Button Designer.</span>
        </h1>
        <p className="max-w-md text-base text-neutral-500">
          Craft pixel-perfect 3D buttons with layered shadows, gradients,
          borders, and interactive states. Copy the React component when done.
        </p>
        <div className="flex flex-row gap-3 pt-2">
          <Link
            href="/design-experiments/skeuomorphism-buttons/tool"
            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Open Designer
          </Link>
        </div>
      </div>

      {/* Preset showcase */}
      <div className="flex w-full max-w-4xl flex-col gap-8 px-6 py-24">
        <h2 className="text-center text-sm font-medium uppercase tracking-wider text-neutral-400">
          Preset Examples
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {PRESETS.map((preset) => (
            <PresetShowcase key={preset.name} name={preset.name} config={preset.config} />
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="flex w-full max-w-3xl flex-col items-center gap-4 px-6 pb-24">
        <div className="flex flex-row items-center gap-6 text-sm text-neutral-500">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
            Box shadows
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
            Gradients
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
            Beveled borders
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
            Hover & active states
          </span>
        </div>
      </div>
    </div>
  );
}

function PresetShowcase({
  name,
  config,
}: {
  name: string;
  config: import('../tool/_types/button-config').ButtonConfig;
}) {
  const buttonStyle = useMemo(() => generateButtonStyles(config), [config]);
  const overlays = useMemo(
    () => config.overlays.filter((o) => o.visible),
    [config]
  );

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-24 items-center justify-center">
        <button style={buttonStyle} className="pointer-events-none">
          {config.text.content}
          {overlays.map((overlay) => (
            <div key={overlay.id} style={generateOverlayStyle(overlay)} />
          ))}
        </button>
      </div>
      <span className="text-xs text-neutral-400">{name}</span>
    </div>
  );
}
