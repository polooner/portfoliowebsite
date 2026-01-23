'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LabItemFooter } from '@/app/(main)/lab/components/lab-item-footer';
import './agent-progress.css';

type StepStatus = 'pending' | 'in-progress' | 'completed';

interface Step {
  active: string;
  completed: string;
}

const steps: Step[] = [
  { active: 'Analyze codebase', completed: 'Analyzed codebase' },
  { active: 'Read files', completed: 'Read files' },
  { active: 'Write changes', completed: 'Wrote changes' },
  { active: 'Run tests', completed: 'Ran tests' },
  { active: 'Commit', completed: 'Committed' },
];

const SpinnerIcon = () => (
  <svg className="size-3.5" viewBox="0 0 16 16" fill="none">
    {[...Array(8)].map((_, i) => (
      <line
        key={i}
        className={`spinner-line spinner-line-${i}`}
        x1="8"
        y1="1"
        x2="8"
        y2="4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    ))}
  </svg>
);

const CheckmarkIcon = () => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(3px)' }}
    animate={{ opacity: 1, filter: 'blur(0px)' }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    className="bg-neutral-200 rounded-xl size-4 self-center items-center flex justify-center"
  >
    <svg className="size-2.5" viewBox="0 0 16 16" fill="none">
      <path
        className="checkmark-path"
        d="M3 8.5L6.5 12L13 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </motion.div>
);

const PendingIcon = () => (
  <div className="size-3.5 flex items-center justify-center">
    <div className="size-2.5 rounded-full border border-dashed border-neutral-400" />
  </div>
);

const AgentStep = ({ status, step }: { status: StepStatus; step: Step }) => {
  return (
    <div className="flex flex-row items-center gap-2 py-1.5">
      <div className="size-4 flex items-center justify-center text-neutral-500">
        {status === 'pending' && <PendingIcon />}
        {status === 'in-progress' && <SpinnerIcon />}
        {status === 'completed' && <CheckmarkIcon />}
      </div>
      <span
        className={`text-xs transition-colors duration-300 ${
          status === 'pending'
            ? 'text-neutral-500'
            : status === 'in-progress'
              ? 'text-neutral-800'
              : 'text-neutral-400'
        }`}
      >
        {status === 'completed' ? step.completed : step.active}
      </span>
    </div>
  );
};

export function AgentProgress() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const getStatus = (index: number): StepStatus => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'in-progress';
    return 'pending';
  };

  return (
    <div className="lab-item">
      <div className="border border-neutral-200/90 p-4 rounded-xl w-40 m-10 bg-neutral-50">
      
        {steps.map((step, index) => (
          <AgentStep key={index} status={getStatus(index)} step={step} />
        ))}
      </div>
      <LabItemFooter
        title="Agent workflow progress"
        description="Neat animations to show an AI agent's progress."
      />
    </div>
  );
}
