'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// CSS animation for character fade-in
const blurInAnimation = `
@keyframes ft-blurIn {
  from {
    opacity: 0;
    filter: blur(0.3px);
    transform: translateX(2px) translateZ(0);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateX(0) translateZ(0);
  }
}
`;

const texts = [
  'Until you make the unconscious conscious, it will direct your life and you will call it fate. Your visions will become clear only when you can look into your own heart. Who looks outside, dreams; who looks inside, awakes.',
];

interface StreamingConfig {
  streamingSpeed: number; // ms per character
  maxWidth: number; // px
  maxLines: number; // max completed lines to show
  scaleFactorPerLine: number; // scale reduction per line
}

interface CompletedLine {
  text: string;
  id: number;
}

interface AnimatedChar {
  char: string;
  id: number;
}

const DEFAULT_CONFIG: StreamingConfig = {
  streamingSpeed: 30,
  maxWidth: 400,
  maxLines: 4,
  scaleFactorPerLine: 0.85,
};

function useTextStreaming(text: string, config: StreamingConfig = DEFAULT_CONFIG) {
  const [currentLineChars, setCurrentLineChars] = useState<AnimatedChar[]>([]);
  const [completedLines, setCompletedLines] = useState<CompletedLine[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const measureRef = useRef<HTMLSpanElement>(null);
  const charactersRef = useRef<string[]>([]);
  const currentCharIndexRef = useRef(0);
  const lineIdCounterRef = useRef(0);
  const charIdCounterRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const currentLineRef = useRef(''); // Store current line text for width measurement

  // Measure if adding text would exceed max width
  const wouldExceedWidth = useCallback(
    (currentText: string, additionalText: string): boolean => {
      if (!measureRef.current) return false;

      const testText = currentText + additionalText;
      measureRef.current.textContent = testText;
      const width = measureRef.current.offsetWidth;

      return width > config.maxWidth;
    },
    [config.maxWidth]
  );

  // Get the next complete word starting from the current character index
  const getNextWord = useCallback((startIndex: number): string => {
    let word = '';
    let i = startIndex;

    // Skip leading spaces
    while (i < charactersRef.current.length && /\s/.test(charactersRef.current[i])) {
      i++;
    }

    // Collect word characters
    while (i < charactersRef.current.length && !/\s/.test(charactersRef.current[i])) {
      word += charactersRef.current[i];
      i++;
    }

    return word;
  }, []);

  // Reset streaming when text changes
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Reset state
    setCurrentLineChars([]);
    currentLineRef.current = '';
    setCompletedLines([]);
    setIsComplete(false);
    setIsStreaming(true);

    // Prepare characters
    charactersRef.current = text.split('');
    currentCharIndexRef.current = 0;
    lineIdCounterRef.current = 0;
    charIdCounterRef.current = 0;

    // Complete the current line and move it up
    const completeLine = () => {
      const lineToComplete = currentLineRef.current;
      if (lineToComplete.trim()) {
        setCompletedLines(prev => {
          const newLines = [{ text: lineToComplete, id: lineIdCounterRef.current++ }, ...prev];
          // Keep only maxLines
          return newLines.slice(0, config.maxLines);
        });
        setCurrentLineChars([]);
        currentLineRef.current = '';
      }
    };

    // Stream next character
    const streamNextCharacter = () => {
      if (currentCharIndexRef.current >= charactersRef.current.length) {
        // Streaming complete
        if (currentLineRef.current.trim()) {
          completeLine();
        }
        setIsStreaming(false);
        setIsComplete(true);
        if (timerRef.current !== null) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        return;
      }

      const nextChar = charactersRef.current[currentCharIndexRef.current];
      const currentText = currentLineRef.current;

      // If we're at the start of a word (not a space and either at start or previous was space)
      const isStartOfWord =
        !/\s/.test(nextChar) &&
        (currentCharIndexRef.current === 0 ||
          /\s/.test(charactersRef.current[currentCharIndexRef.current - 1]));

      // If starting a new word, check if the entire word fits
      if (isStartOfWord && currentText.length > 0) {
        const nextWord = getNextWord(currentCharIndexRef.current);

        // If the word won't fit, complete the line first
        if (nextWord && wouldExceedWidth(currentText, nextWord)) {
          completeLine();
          return; // Don't increment - add this word on the next cycle
        }
      }

      // Check if adding just this character would exceed width (safety check)
      if (currentText && wouldExceedWidth(currentText, nextChar)) {
        completeLine();
        return;
      }

      // Add character to current line
      const newLine = currentText + nextChar;
      currentLineRef.current = newLine;

      // Add animated character
      setCurrentLineChars(prev => [...prev, { char: nextChar, id: charIdCounterRef.current++ }]);

      currentCharIndexRef.current++;
    };

    // Start streaming
    if (charactersRef.current.length > 0) {
      timerRef.current = window.setInterval(() => {
        streamNextCharacter();
      }, config.streamingSpeed);
    }

    // Cleanup
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text, config.streamingSpeed, config.maxLines, wouldExceedWidth, getNextWord]);

  return {
    currentLineChars,
    completedLines,
    isStreaming,
    isComplete,
    measureRef,
  };
}

// Memoized completed line component for performance
const CompletedLineComponent = ({
  line,
  index,
  scaleFactor,
}: {
  line: CompletedLine;
  index: number;
  scaleFactor: number;
}) => {
  // Calculate position along circular path
  const scale = Math.pow(scaleFactor, index + 1);
  const yOffset = -40 - index * 20; // Stack lines upward
  const opacity = Math.max(0, 0.3 - index * 1.5); // Fade older lines more aggressively

  const blurAmount = (index + 1) * 3.5; // 2.5px, 5px, 7.5px, 10px...

  // Only new lines (index 0) should start from center, others continue from their position
  const isNewLine = index === 0;

  // New lines get delayed scale curve for arc effect, existing lines get immediate scaling
  const scaleEasing = isNewLine ? [0.65, 0, 0.35, 1] : [0.2, 0.25, 0.4, 0.8];

  return (
    <motion.div
      key={line.id}
      layout // Enable layout animations for smooth transitions
      initial={
        isNewLine
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
            }
          : false // Don't use initial for existing lines, let them animate from current position
      }
      animate={{
        opacity,
        y: yOffset,
        scale,
        filter: `blur(${blurAmount}px)`,
        transition: {
          duration: 0.4,
          y: { ease: [0.22, 1, 0.36, 1] }, // Smooth upward motion
          scale: { ease: scaleEasing as any }, // Conditional: delayed for new, immediate for existing
          opacity: { ease: 'easeOut' },
          filter: { ease: 'easeOut', duration: 0.4 }, // Smooth blur transition
        },
      }}
      exit={{
        opacity: 0,
        filter: 'blur(12px)',
        transition: {
          duration: 0.2,
          filter: { ease: 'easeIn' },
        },
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <p className="text-2xl font-medium text-center px-8">{line.text}</p>
    </motion.div>
  );
};

export function StreamingTextCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0); // Force remount on navigation

  const { currentLineChars, completedLines, measureRef } = useTextStreaming(
    texts[currentIndex],
    DEFAULT_CONFIG
  );

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % texts.length);
    setKey(prev => prev + 1); // Force streaming reset
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + texts.length) % texts.length);
    setKey(prev => prev + 1); // Force streaming reset
  };

  const handleDotClick = (index: number) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
      setKey(prev => prev + 1);
    }
  };

  return (
    <>
      {/* Inject CSS animation */}
      <style dangerouslySetInnerHTML={{ __html: blurInAnimation }} />

      <div className="flex flex-col items-center justify-center min-h-[300px] gap-8 w-full">
        <div className="relative h-64 flex items-center justify-center w-[500px]">
          {/* Hidden measurement element */}
          <span
            ref={measureRef}
            className="absolute invisible text-2xl font-medium px-8 whitespace-nowrap"
            aria-hidden="true"
          />
          {/* Gradient overlay for additional blur depth */}
          <div
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.01) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.01) 100%)',
              maskImage:
                'linear-gradient(to bottom, black 0%, transparent 30%, transparent 70%, black 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, transparent 30%, transparent 70%, black 100%)',
            }}
          />

          <AnimatePresence mode="sync">
            {/* Completed lines stack */}
            {completedLines.map((line, index) => (
              <CompletedLineComponent
                key={line.id}
                line={line}
                index={index}
                scaleFactor={DEFAULT_CONFIG.scaleFactorPerLine}
              />
            ))}

            {/* Current streaming line */}
            <motion.div
              key={`streaming-${key}`}
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
              <p className="text-2xl font-medium text-center px-8 w-[400px] min-h-[2.5rem]">
                {currentLineChars.map(({ char, id }) => (
                  <span
                    key={id}
                    style={{
                      animationName: 'ft-blurIn',
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
      </div>
    </>
  );
}
