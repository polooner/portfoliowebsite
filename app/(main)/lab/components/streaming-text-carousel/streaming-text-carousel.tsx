'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { texts, DEFAULT_CONFIG } from './streaming-text-carousel-constants';
import { CompletedLineComponent } from '@/app/(main)/lab/components/streaming-text-carousel/completed-line-component';
import { useTextStreaming } from '@/app/(main)/lab/hooks/use-text-streaming';
import { LabItemFooter } from '@/app/(main)/lab/components/lab-item-footer';

const MAX_BLUR = 6;
const BLUR_WINDOW_SIZE = 5;

export function StreamingTextCarousel() {
  const { currentLineChars, completedLines, measureRef, reset, isComplete } = useTextStreaming(
    texts[0],
    DEFAULT_CONFIG
  );

  const cursorIndex = currentLineChars.length - 1;

  const calculateBlur = (charIndex: number): number => {
    if (isComplete) return 0;
    const distance = cursorIndex - charIndex;
    if (distance < 0) return MAX_BLUR;
    if (distance >= BLUR_WINDOW_SIZE) return 0;
    return MAX_BLUR * (1 - distance / BLUR_WINDOW_SIZE);
  };

  return (
    <div className="lab-item">
      <div className="relative h-48 flex items-center justify-center min-w-[150px] w-full max-w-[500px] bg-neutral-50 rounded-2xl">
        <span
          ref={measureRef}
          className="absolute invisible text-xs sm:text-base font-medium sm:px-8 px-2 whitespace-nowrap"
          aria-hidden="true"
        />

        <AnimatePresence mode="sync">
          {completedLines.map((line, index) => (
            <CompletedLineComponent
              key={line.id}
              line={line}
              index={index}
              scaleFactor={DEFAULT_CONFIG.scaleFactorPerLine}
              maxVisibleCompletedLines={DEFAULT_CONFIG.maxVisibleCompletedLines}
            />
          ))}

          <motion.div
            key="streaming"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p className="font-medium text-left px-2 sm:px-8 w-[400px] text-xs sm:text-base min-h-[2.5rem]">
              {currentLineChars.map(({ char, id }, index) => {
                const blurAmount = calculateBlur(index);
                const blurRatio = blurAmount / MAX_BLUR;
                const opacity = blurAmount > 0 ? 1 - blurRatio * 0.5 : 1;

                return (
                  <span
                    key={id}
                    className="inline-block whitespace-pre transition-[filter,opacity] duration-150 ease-out"
                    style={{
                      filter: `blur(${blurAmount}px)`,
                      opacity,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </p>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={reset}
          className="absolute bottom-3 right-3 rounded-full bg-black/5 px-3 py-1 text-[10px] lowercase tracking-widest text-neutral-500 transition-colors hover:bg-black/10 hover:text-neutral-700"
        >
          replay
        </button>
      </div>
      <LabItemFooter
        title="Blurred streaming carousel"
        description="Perfect for AI thinking sections"
      />
    </div>
  );
}
