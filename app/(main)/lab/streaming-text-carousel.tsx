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

export function StreamingTextCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % texts.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + texts.length) % texts.length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-8 w-full">
      <div className="relative h-48 flex items-center justify-center w-[500px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
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
              y: -50,
              scale: 0.8,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p className="text-2xl font-medium text-center px-8 w-[400px] min-w-full ">
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
              setDirection(index > currentIndex ? 1 : -1);
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
