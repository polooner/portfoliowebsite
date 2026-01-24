'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import '../agent-progress.css';

type StepStatus = 'pending' | 'in-progress' | 'completed';

interface Step {
  active: string;
  completed: string;
}

const steps: Step[] = [
  { active: 'Reproduce error', completed: 'Reproduced error' },
  { active: 'Identify root cause', completed: 'Identified root cause' },
  { active: 'Apply fix', completed: 'Applied fix' },
  { active: 'Verify fix', completed: 'Verified fix' },
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

const AnimatedTaskIcon = ({ className }: { className?: string }) => {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCycle((prev) => prev + 1);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const shiftDelay = 0.15;
  const shiftDuration = 0.25;
  const drawDelay = shiftDelay + shiftDuration + 0.1;
  const drawDuration = 0.4;
  const ease = [0.4, 0, 0.2, 1];

  return (
    <svg
      key={cycle}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="linesClip">
          <rect x="12" y="3" width="10" height="18" />
        </clipPath>
        <clipPath id="checksClip">
          <rect x="0" y="3" width="12" height="18" />
        </clipPath>
      </defs>

      {/* Left side: 2 checkmarks that shift up */}
      <g clipPath="url(#checksClip)">
        <motion.g
          initial={{ y: 0 }}
          animate={{ y: -10 }}
          transition={{ duration: shiftDuration, ease, delay: shiftDelay }}
        >
          {/* Check at y=7 shifts up and out */}
          <path d="m3 7 2 2 4-4" />
          {/* Check at y=17 shifts up to y=7 position */}
          <path d="m3 17 2 2 4-4" />
        </motion.g>

        {/* New checkmark draws at bottom */}
        <motion.path
          d="m3 17 2 2 4-4"
          strokeDasharray="12"
          initial={{ strokeDashoffset: 12 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: drawDuration, ease, delay: drawDelay }}
        />
      </g>

      {/* Right side: 3 lines that shift up */}
      <g clipPath="url(#linesClip)">
        <motion.g
          initial={{ y: 0 }}
          animate={{ y: -7 }}
          transition={{ duration: shiftDuration, ease, delay: shiftDelay }}
        >
          <path d="M13 5h8" />
          <path d="M13 12h8" />
          <path d="M13 19h8" />
        </motion.g>

        {/* New line draws at bottom simultaneously with checkmark */}
        <motion.path
          d="M13 19h8"
          strokeDasharray="8"
          initial={{ strokeDashoffset: 8 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: drawDuration, ease, delay: drawDelay }}
        />
      </g>
    </svg>
  );
};

const ConnectingLine = ({
  status,
  nextStatus,
}: {
  status: StepStatus;
  nextStatus: StepStatus;
}) => {
  const shouldAnimate = status === 'completed' && nextStatus === 'in-progress';
  const showSolid = status === 'completed' && nextStatus !== 'pending';

  return (
    <div className="px-1 pl-[16px]">
      <div className="h-3 relative">
        <div className="w-px h-full border-l border-dashed border-neutral-300" />
        {showSolid && (
          <motion.div
            className="w-px bg-neutral-300 absolute top-0 left-0"
            initial={shouldAnimate ? { height: 0 } : { height: '100%' }}
            animate={{ height: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        )}
      </div>
    </div>
  );
};

const AgentStepBase = ({
  status,
  step,
}: {
  status: StepStatus;
  step: Step;
}) => {
  return (
    <div className="flex flex-row items-center gap-2 p-2 rounded-xl">
      <div className="size-4 flex items-center justify-center text-neutral-500">
        {status === 'pending' && <PendingIcon />}
        {status === 'in-progress' && <SpinnerIcon />}
        {status === 'completed' && <CheckmarkIcon />}
      </div>
      <span
        className={`text-xs ${status === 'completed' ? 'text-neutral-400' : 'text-neutral-500'}`}
      >
        {status === 'completed' ? step.completed : step.active}
      </span>
    </div>
  );
};

const AgentStepOverlay = ({
  status,
  step,
}: {
  status: StepStatus;
  step: Step;
}) => {
  return (
    <div className="flex flex-row items-center gap-2 p-2 rounded-xl">
      <div className="size-4 flex items-center justify-center text-neutral-500">
        {status === 'pending' && <PendingIcon />}
        {status === 'in-progress' && <SpinnerIcon />}
        {status === 'completed' && <CheckmarkIcon />}
      </div>
      <span className="text-xs text-neutral-800">
        {status === 'completed' ? step.completed : step.active}
      </span>
    </div>
  );
};

export function AgentProgressVariation3() {
  const [currentStep, setCurrentStep] = useState(0);
  const clipPathRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  useEffect(() => {
    const clipPathContainer = clipPathRef.current;
    const highlightBox = highlightRef.current;
    const activeStepElement = stepRefs.current[currentStep];

    if (clipPathContainer && activeStepElement && currentStep < steps.length) {
      const containerHeight = clipPathContainer.offsetHeight;
      const stepTop = activeStepElement.offsetTop;
      const stepHeight = activeStepElement.offsetHeight;

      const clipTop = (stepTop / containerHeight) * 100;
      const clipBottom = 100 - ((stepTop + stepHeight) / containerHeight) * 100;

      clipPathContainer.style.clipPath = `inset(${clipTop.toFixed(1)}% 0 ${clipBottom.toFixed(1)}% 0 round 12px)`;

      // Position the highlight box
      if (highlightBox) {
        highlightBox.style.transform = `translateY(${stepTop}px)`;
        highlightBox.style.height = `${stepHeight}px`;
        highlightBox.style.opacity = '1';
      }
    } else if (currentStep >= steps.length) {
      // Hide overlay when all steps are completed
      if (clipPathContainer) {
        clipPathContainer.style.clipPath = `inset(100% 0 0% 0 round 12px)`;
      }
      if (highlightBox) {
        highlightBox.style.opacity = '0';
      }
    }
  }, [currentStep]);

  const getStatus = (index: number): StepStatus => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'in-progress';
    return 'pending';
  };

  return (
    <div className="border border-neutral-200/90 p-1 rounded-[1rem] w-44 m-10 bg-neutral-100 flex flex-col">
      <span className='tracking-tight font-medium text-neutral-700 text-xs p-1 pb-2 items-center flex flex-row gap-1'><AnimatedTaskIcon className='size-3' /> Plan: fix bug</span>
      <div className="relative rounded-xl">
        {/* Highlight box - moves to current step */}
        <div
          ref={highlightRef}
          className="absolute inset-x-0 top-0 bg-neutral-50 border border-neutral-200 rounded-xl transition-all duration-300 ease-out pointer-events-none"
          style={{ opacity: 0, height: 0 }}
        />

        {/* Base layer - muted styling */}
        <div className="rounded-xl">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => { stepRefs.current[index] = el; }}
            >
              <AgentStepBase status={getStatus(index)} step={step} />
            </div>
          ))}
        </div>

        {/* Overlay layer - darker text revealed by clip-path */}
        <div
          ref={clipPathRef}
          aria-hidden
          className="absolute inset-0 rounded-xl transition-[clip-path] duration-300 ease-out pointer-events-none"
          style={{ clipPath: 'inset(0% 0 100% 0 round 12px)' }}
        >
          {steps.map((step, index) => (
            <div key={index}>
              <AgentStepOverlay status={getStatus(index)} step={step} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
