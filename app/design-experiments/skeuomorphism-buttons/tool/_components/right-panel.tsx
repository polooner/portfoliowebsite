'use client';

import { useButtonStore } from '../_store/button-store';
import { generateComponentCode } from '../_utils/generate-component-code';
import { CopyButton } from './copy-button';
import { ViewCodeButton } from './view-code-button';
import { TextFxButton } from './text-fx-button';
import { PresetsSection } from './sections/presets-section';
import { ShapeSection } from './sections/shape-section';
import { BackgroundSection } from './sections/background-section';
import { ShadowsSection } from './sections/shadows-section';
import { BorderSection } from './sections/border-section';
import { OverlaysSection } from './sections/overlays-section';
import { TextSection } from './sections/text-section';
import { StatesSection } from './sections/states-section';

interface RightPanelProps {
  isCodePanelOpen: boolean;
  isEffectsPanelOpen: boolean;
  onToggleCodePanel: () => void;
  onToggleEffectsPanel: () => void;
}

export default function RightPanel({
  isCodePanelOpen,
  isEffectsPanelOpen,
  onToggleCodePanel,
  onToggleEffectsPanel,
}: RightPanelProps) {
  const config = useButtonStore((s) => s.config);
  const reset = useButtonStore((s) => s.reset);

  return (
    <aside className="fixed bottom-4 right-4 top-4 z-50 flex w-72 flex-col rounded-2xl border border-white/10 bg-neutral-800/90 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <h2 className="text-xs font-medium text-neutral-100">Button</h2>
        <button
          onClick={reset}
          className="rounded-md px-2 py-1 text-[10px] text-neutral-500 transition-colors hover:bg-neutral-700/50 hover:text-neutral-300"
        >
          Reset
        </button>
      </div>

      {/* Scrollable sections */}
      <div className="flex-1 space-y-1 overflow-y-auto px-4 py-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-600 hover:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        <PresetsSection />
        <BackgroundSection />
        <ShadowsSection />
        <ShapeSection />
        <BorderSection />
        <OverlaysSection />
        <TextSection />
        <StatesSection />
      </div>

      {/* Footer buttons */}
      <div className="flex gap-2 border-t border-white/10 p-3">
        <ViewCodeButton isOpen={isCodePanelOpen} onToggle={onToggleCodePanel} />
        <TextFxButton isOpen={isEffectsPanelOpen} onToggle={onToggleEffectsPanel} />
        <CopyButton getText={() => generateComponentCode(config)} />
      </div>
    </aside>
  );
}
