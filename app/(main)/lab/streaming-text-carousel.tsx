'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const texts = [
  'The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.',
  'Design is not just what it looks like',
  'Simplicity is the ultimate sophistication',
  'Less is more, but more is fun',
  'Code is poetry in motion',
  'Every pixel tells a story',
];

interface StreamingConfig {
  streamingSpeed: number; // ms per word
  maxWidth: number; // px
  maxLines: number; // max completed lines to show
  scaleFactorPerLine: number; // scale reduction per line
}

interface CompletedLine {
  text: string;
  id: number;
}

const DEFAULT_CONFIG: StreamingConfig = {
  streamingSpeed: 100,
  maxWidth: 400,
  maxLines: 4,
  scaleFactorPerLine: 0.85,
};

function useTextStreaming(text: string, config: StreamingConfig = DEFAULT_CONFIG) {
  const [currentLine, setCurrentLine] = useState('');
  const [completedLines, setCompletedLines] = useState<CompletedLine[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const measureRef = useRef<HTMLSpanElement>(null);
  const wordsRef = useRef<string[]>([]);
  const currentWordIndexRef = useRef(0);
  const lineIdCounterRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const currentLineRef = useRef(''); // Store current line in ref to avoid re-render loops

  // Measure if adding a word would exceed max width
  const wouldExceedWidth = useCallback(
    (currentText: string, newWord: string): boolean => {
      if (!measureRef.current) return false;

      const testText = currentText ? `${currentText} ${newWord}` : newWord;
      measureRef.current.textContent = testText;
      const width = measureRef.current.offsetWidth;

      return width > config.maxWidth;
    },
    [config.maxWidth]
  );

  // Reset streaming when text changes
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Reset state
    setCurrentLine('');
    currentLineRef.current = '';
    setCompletedLines([]);
    setIsComplete(false);
    setIsStreaming(true);

    // Prepare words
    wordsRef.current = text.split(/\s+/).filter(word => word.length > 0);
    currentWordIndexRef.current = 0;
    lineIdCounterRef.current = 0;

    // Complete the current line and move it up
    const completeLine = () => {
      const lineToComplete = currentLineRef.current;
      if (lineToComplete.trim()) {
        setCompletedLines(prev => {
          const newLines = [{ text: lineToComplete, id: lineIdCounterRef.current++ }, ...prev];
          // Keep only maxLines
          return newLines.slice(0, config.maxLines);
        });
        setCurrentLine('');
        currentLineRef.current = '';
      }
    };

    // Stream next word
    const streamNextWord = () => {
      if (currentWordIndexRef.current >= wordsRef.current.length) {
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

      const nextWord = wordsRef.current[currentWordIndexRef.current];
      const currentText = currentLineRef.current;

      // Check if adding this word would exceed width
      if (currentText && wouldExceedWidth(currentText, nextWord)) {
        // Complete current line first, then add word to new line
        completeLine();
        // Don't increment word index - we'll add this word in the next cycle
        return;
      }

      // Add word to current line
      const newLine = currentText ? `${currentText} ${nextWord}` : nextWord;
      currentLineRef.current = newLine;
      setCurrentLine(newLine);
      currentWordIndexRef.current++;
    };

    // Start streaming
    if (wordsRef.current.length > 0) {
      timerRef.current = window.setInterval(() => {
        streamNextWord();
      }, config.streamingSpeed);
    }

    // Cleanup
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text, config.streamingSpeed, config.maxLines, wouldExceedWidth]);

  return {
    currentLine,
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

  // Progressive blur - increases with each line index
  const blurAmount = index * 3; // 0px, 3px, 6px, 9px...

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

  const { currentLine, completedLines, measureRef } = useTextStreaming(
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
              'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.05) 100%)',
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
              {currentLine}
              {currentLine && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="inline-block w-0.5 h-6 bg-current ml-1 align-middle"
                />
              )}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handlePrevious}
          className="px-6 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors text-sm font-medium"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors text-sm font-medium"
        >
          Next
        </button>
      </div>

      <div className="flex gap-2">
        {texts.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-neutral-900 dark:bg-neutral-100 w-6'
                : 'bg-neutral-300 dark:bg-neutral-700'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
