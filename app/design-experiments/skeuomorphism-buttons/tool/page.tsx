'use client';

import { useState } from 'react';
import LeftPanel from './_components/left-panel';
import RightPanel from './_components/right-panel';
import ToolCanvas from './_components/tool-canvas';

export default function SkeuomorphismButtonsToolPage() {
  const [isCodePanelOpen, setIsCodePanelOpen] = useState(false);

  const handleToggleCodePanel = () => {
    setIsCodePanelOpen((prev) => !prev);
  };

  return (
    <div className="dark fixed inset-0 bg-neutral-900 text-neutral-100">
      <ToolCanvas />
      <LeftPanel
        isOpen={isCodePanelOpen}
        onClose={() => setIsCodePanelOpen(false)}
      />
      <RightPanel
        isCodePanelOpen={isCodePanelOpen}
        onToggleCodePanel={handleToggleCodePanel}
      />
    </div>
  );
}
