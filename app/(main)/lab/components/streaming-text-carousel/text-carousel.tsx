'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const texts = [
  'The quick brown fox jumps over the lazy dog',
  'Design is not just what it looks like',
  'Simplicity is the ultimate sophistication',
  'Less is more, but more is fun',
  'Code is poetry in motion',
  'Every pixel tells a story',
];

export function TextCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  const handleNext = () => {
    setPreviousIndex(currentIndex);
    setCurrentIndex(prev => (prev + 1) % texts.length);
  };

  const handlePrevious = () => {
    setPreviousIndex(currentIndex);
    setCurrentIndex(prev => (prev - 1 + texts.length) % texts.length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 w-full">
      <div className="relative h-64 flex items-center justify-center w-[500px]">
        <AnimatePresence mode="popLayout">
          {previousIndex !== null && (
            <motion.div
              key={`prev-${previousIndex}`}
              initial={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              animate={{
                opacity: 0.4,
                y: -80,
                scale: 0.7,
                transition: {
                  duration: 0.3,
                  y: { ease: [0.22, 1, 0.36, 1] }, // Smooth upward motion
                  scale: { ease: [0.65, 0, 0.35, 1] }, // Delayed scale creates arc effect
                  opacity: { ease: 'easeOut' },
                },
              }}
              exit={{
                opacity: 0,
                y: -80,
                scale: 0.7,
                transition: {
                  duration: 0.15,
                  ease: 'easeOut',
                },
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <p className="text-2xl font-medium text-center px-8 w-[400px] min-w-full">
                {texts[previousIndex]}
              </p>
            </motion.div>
          )}

          <motion.div
            key={`current-${currentIndex}`}
            initial={{
              opacity: 0,
              y: 10,
              scale: 1,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0 },
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p className="text-2xl font-medium text-center px-8 w-[400px] min-w-full">
              {texts[currentIndex]}
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
            onClick={() => {
              setCurrentIndex(index);
            }}
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
