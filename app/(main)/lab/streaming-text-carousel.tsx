'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { texts, DEFAULT_CONFIG } from './streaming-text-carousel-constants';
import { useTextStreaming } from './use-text-streaming';
import { CompletedLineComponent } from './completed-line-component';

export function StreamingTextCarousel() {
  const { currentLineChars, completedLines, measureRef } = useTextStreaming(
    texts[0],
    DEFAULT_CONFIG
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[250px] gap-8 w-full self-center ">
        <div className="relative h-48 flex items-center justify-center min-w-[250px] w-[500px] bg-neutral-50 rounded-2xl">
          <span
            ref={measureRef}
            className="absolute invisible text-base font-medium px-8 whitespace-nowrap"
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
              <p className="text-base font-medium text-center px-8 w-[400px] min-h-[2.5rem]">
                {currentLineChars.map(({ char, id }) => (
                  <span
                    key={id}
                    style={{
                      animationName: 'blurIn',
                      animationDuration: '0.2s',
                      animationTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
                      animationIterationCount: '1',
                      animationFillMode: 'both',
                      whiteSpace: 'pre',
                      display: 'inline-block',
                      willChange: 'opacity, filter, transform',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      transition: 'transform 0.08s ease-out',
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
    </>
  );
}
