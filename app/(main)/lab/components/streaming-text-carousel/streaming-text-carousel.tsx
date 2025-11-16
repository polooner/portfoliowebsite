'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { texts, DEFAULT_CONFIG } from './streaming-text-carousel-constants';
import { CompletedLineComponent } from '@/app/(main)/lab/components/streaming-text-carousel/completed-line-component';
import { useTextStreaming } from '@/app/(main)/lab/hooks/use-text-streaming';

export function StreamingTextCarousel() {
  const { currentLineChars, completedLines, measureRef } = useTextStreaming(
    texts[0],
    DEFAULT_CONFIG
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] gap-8 w-full self-center ">
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
            <p className="font-medium text-center px-2 sm:px-8 w-[400px] text-xs sm:text-base min-h-[2.5rem]">
              {currentLineChars.map(({ char, id }) => (
                <span
                  key={id}
                  style={{
                    animationName: 'blurIn',
                    animationDuration: '0.35s',
                    animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    animationIterationCount: '1',
                    animationFillMode: 'both',
                    whiteSpace: 'pre',
                    display: 'inline-block',
                    willChange: 'opacity, transform',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                >
                  {char}
                </span>
              ))}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="self-start text-left flex flex-col">
        <span className="font-mono font-medium ">Blurred streaming carousel</span>
        <span className="text-xs">Perfect for AI thinking sections</span>
      </div>
    </div>
  );
}
