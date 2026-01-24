'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import '../agent-progress.css';

type StepStatus = 'pending' | 'in-progress' | 'completed';

interface StreamingChar {
    id: string;
    char: string;
    index: number;
}

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

const stepThoughts: Record<number, string> = {
    0: "Running the test suite to trigger the reported error. Checking console output and stack traces to understand the failure pattern and reproduction steps.",
    1: "Analyzing the stack trace and examining the relevant code paths. The error seems to originate from an unhandled edge case in the input validation logic.",
    2: "Adding proper null checks and input validation to handle the edge case. Updating the error handling to provide clearer feedback when invalid input is detected.",
    3: "Re-running the test suite to confirm the fix works. All tests passing now. Checking for any potential regression in related functionality.",
};

function useBlurRevealStreaming(text: string, isActive: boolean, speed = 25) {
    const [cursorIndex, setCursorIndex] = useState(-1);
    const [isStreaming, setIsStreaming] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const instanceIdRef = useRef(0);

    const characters: StreamingChar[] = text
        .slice(0, cursorIndex + 1)
        .split('')
        .map((char, index) => ({
            id: `${instanceIdRef.current}-${index}`,
            char,
            index,
        }));

    const isComplete = cursorIndex >= text.length - 1;

    const reset = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        instanceIdRef.current += 1;
        setCursorIndex(-1);
        setIsStreaming(false);
    }, []);

    useEffect(() => {
        if (isActive && cursorIndex === -1 && !isStreaming) {
            setIsStreaming(true);
        }
        if (!isActive) {
            reset();
        }
    }, [isActive, cursorIndex, isStreaming, reset]);

    useEffect(() => {
        if (!isStreaming) return;

        intervalRef.current = setInterval(() => {
            setCursorIndex((prev) => {
                const next = prev + 1;
                if (next >= text.length - 1) {
                    setIsStreaming(false);
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                }
                return next;
            });
        }, speed);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isStreaming, speed, text.length]);

    return { characters, cursorIndex, isComplete };
}

const BlurRevealThoughts = ({
    text,
    isActive,
    onExitComplete,
}: {
    text: string;
    isActive: boolean;
    onExitComplete?: () => void;
}) => {
    const { characters, cursorIndex, isComplete } = useBlurRevealStreaming(text, isActive);
    const containerRef = useRef<HTMLDivElement>(null);
    const [shouldShow, setShouldShow] = useState(false);
    const maxBlur = 6;
    const blurWindowSize = 5;

    useEffect(() => {
        if (isActive && characters.length > 0) {
            setShouldShow(true);
        }
    }, [isActive, characters.length]);

    // Handle exit
    useEffect(() => {
        if (!isActive && shouldShow) {
            setShouldShow(false);
            onExitComplete?.();
        }
    }, [isActive, shouldShow, onExitComplete]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [characters.length]);

    const calculateBlur = (charIndex: number): number => {
        if (isComplete) return 0;
        const distance = cursorIndex - charIndex;
        if (distance < 0) return maxBlur;
        if (distance >= blurWindowSize) return 0;
        return maxBlur * (1 - distance / blurWindowSize);
    };

    if (!shouldShow) return null;

    // TEST: No height animation at all - just height: auto
    return (
        <div
            ref={containerRef}
            className="thoughts-scroll mt-1 ml-6 mr-2 max-h-[3.75rem] overflow-hidden"
            style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}
        >
            <div className="flex flex-wrap">
                {characters.map((char) => {
                    const blurAmount = calculateBlur(char.index);
                    const blurRatio = blurAmount / maxBlur;
                    const opacity = blurAmount > 0 ? 1 - blurRatio : 1;

                    return (
                        <span
                            key={char.id}
                            className="inline-block whitespace-pre text-[10px] leading-tight text-neutral-500 transition-[filter,opacity] duration-150 ease-out"
                            style={{
                                filter: `blur(${blurAmount}px)`,
                                opacity,
                            }}
                        >
                            {char.char}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

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



const AgentStepBase = ({
    status,
    step,
    stepIndex,
    isExiting,
    onExitComplete,
}: {
    status: StepStatus;
    step: Step;
    stepIndex: number;
    isExiting?: boolean;
    onExitComplete?: () => void;
}) => {
    return (
        <div className="flex flex-col p-2 rounded-xl">
            <div className="flex flex-row items-center gap-2">
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
            <BlurRevealThoughts
                text={stepThoughts[stepIndex]}
                isActive={status === 'in-progress' && !isExiting}
                onExitComplete={onExitComplete}
            />
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

export function AgentProgressVariation4() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const clipPathRef = useRef<HTMLDivElement>(null);
    const highlightRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const outerContainerRef = useRef<HTMLDivElement>(null);
    const innerContentRef = useRef<HTMLDivElement>(null);

    // Animate outer container height
    useEffect(() => {
        const innerContent = innerContentRef.current;
        const outerContainer = outerContainerRef.current;
        if (!innerContent || !outerContainer) return;

        let frameId: number | null = null;

        const updateContainerHeight = () => {
            // Cancel any pending update
            if (frameId) cancelAnimationFrame(frameId);

            // Double rAF to skip Framer Motion's measurement spike
            // when animating to height: 'auto'
            frameId = requestAnimationFrame(() => {
                frameId = requestAnimationFrame(() => {
                    const height = innerContent.offsetHeight;
                    outerContainer.style.height = `${height + 8}px`; // +8 for p-1 padding
                    frameId = null;
                });
            });
        };

        const resizeObserver = new ResizeObserver(updateContainerHeight);
        resizeObserver.observe(innerContent);

        // Set initial height immediately (no delay needed for initial render)
        outerContainer.style.height = `${innerContent.offsetHeight + 8}px`;

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
            resizeObserver.disconnect();
        };
    }, []);

    // Start exit animation after delay
    useEffect(() => {
        if (currentStep >= steps.length || isExiting) return;

        const timer = setTimeout(() => {
            setIsExiting(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, [currentStep, isExiting]);

    // Handle exit complete - advance to next step
    const handleExitComplete = useCallback(() => {
        setIsExiting(false);
        setCurrentStep((prev) => prev + 1);
    }, []);

    useEffect(() => {
        const clipPathContainer = clipPathRef.current;
        const highlightBox = highlightRef.current;
        const activeStepElement = stepRefs.current[currentStep];

        const updateHighlight = () => {
            if (clipPathContainer && activeStepElement && currentStep < steps.length) {
                const containerHeight = clipPathContainer.offsetHeight;
                const stepTop = activeStepElement.offsetTop;
                const stepHeight = activeStepElement.offsetHeight;

                // Get only the title row height for clip-path (first child is the title row)
                const titleRowElement = activeStepElement.querySelector('.flex.flex-row');
                const titleRowHeight = titleRowElement
                    ? (titleRowElement as HTMLElement).offsetHeight + 16 // +16 for p-2 padding
                    : 36; // fallback

                const clipTop = (stepTop / containerHeight) * 100;
                const clipBottom = 100 - ((stepTop + titleRowHeight) / containerHeight) * 100;

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
        };

        updateHighlight();

        // Watch for height changes on the active step element
        let resizeObserver: ResizeObserver | null = null;
        if (activeStepElement && currentStep < steps.length) {
            resizeObserver = new ResizeObserver(updateHighlight);
            resizeObserver.observe(activeStepElement);
        }

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [currentStep]);

    const getStatus = (index: number): StepStatus => {
        if (index < currentStep) return 'completed';
        if (index === currentStep) return 'in-progress';
        return 'pending';
    };

    return (
        <div className='justify-start items-start'>
            <div
                ref={outerContainerRef}
                className="border border-neutral-200/90 p-1 rounded-[1rem] w-44 m-10 bg-neutral-100 flex flex-col origin-top top-0 mb-auto mx-auto absolute -translate-x-1/2 overflow-hidden transition-[height] duration-300 ease-out"
            >
                <div ref={innerContentRef}>
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
                                    <AgentStepBase
                                        status={getStatus(index)}
                                        step={step}
                                        stepIndex={index}
                                        isExiting={index === currentStep && isExiting}
                                        onExitComplete={index === currentStep ? handleExitComplete : undefined}
                                    />
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
                                    <AgentStepOverlay
                                        status={getStatus(index)}
                                        step={step}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
