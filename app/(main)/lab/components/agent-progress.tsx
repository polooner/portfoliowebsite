'use client';

import { useState } from 'react';
import { LabItemFooter } from '@/app/(main)/lab/components/lab-item-footer';
import { VariationsSwitch } from '@/components/variations-switch';
import { AgentProgressVariation1 } from './agent-progress/variation-1';
import { AgentProgressVariation2 } from './agent-progress/variation-2';
import { AgentProgressVariation3 } from './agent-progress/variation-3';
import './agent-progress.css';

const variations = [
  AgentProgressVariation1,
  AgentProgressVariation2,
  AgentProgressVariation3,
];

export function AgentProgress() {
  const [currentVariation, setCurrentVariation] = useState(0);

  const CurrentVariation = variations[currentVariation];

  const handlePrevious = () => {
    setCurrentVariation((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentVariation((prev) => Math.min(variations.length - 1, prev + 1));
  };

  return (
    <div className="lab-item">
      <div className="h-[280px] flex items-center justify-center">
        <CurrentVariation key={currentVariation} />
      </div>
      <div className="w-full max-w-[500px] flex items-start justify-between">
        <LabItemFooter
          title="Agent workflow progress"
          description="Neat animations to show an AI agent's progress."
        />
        <VariationsSwitch
          current={currentVariation + 1}
          total={variations.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
