'use client';

import { useState } from 'react';
import LeftPanel from './_components/left-panel';
import RightPanel from './_components/right-panel';
import ToolCanvas from './_components/tool-canvas';
import type { LeftPanelTab } from './_types/button-config';

export default function SkeuomorphismButtonsToolPage() {
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);
  const [activeLeftTab, setActiveLeftTab] = useState<LeftPanelTab>('code');

  const handleOpenTab = (tab: LeftPanelTab) => {
    if (isLeftPanelOpen && activeLeftTab === tab) {
      setIsLeftPanelOpen(false);
    } else {
      setActiveLeftTab(tab);
      setIsLeftPanelOpen(true);
    }
  };

  return (
    <div className="dark fixed inset-0 bg-neutral-900 text-neutral-100">
      <ToolCanvas />
      <LeftPanel
        isOpen={isLeftPanelOpen}
        activeTab={activeLeftTab}
        onTabChange={setActiveLeftTab}
        onClose={() => setIsLeftPanelOpen(false)}
      />
      <RightPanel
        isCodePanelOpen={isLeftPanelOpen && activeLeftTab === 'code'}
        isEffectsPanelOpen={isLeftPanelOpen && activeLeftTab === 'effects'}
        onToggleCodePanel={() => handleOpenTab('code')}
        onToggleEffectsPanel={() => handleOpenTab('effects')}
      />
    </div>
  );
}
