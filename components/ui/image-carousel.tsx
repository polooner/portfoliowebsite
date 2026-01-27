'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AUTOPLAY_DURATION = 5000;

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
  className?: string;
  height?: number;
  label?: React.ReactNode;
}

export function ImageCarousel({ images, className = '', height, label }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setProgress(0);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setProgress(0);
  }, [images.length]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 16 / AUTOPLAY_DURATION;
        if (next >= 1) {
          return 1;
        }
        return next;
      });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 1) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setProgress(0);
    }
  }, [progress, images.length]);

  return (
    <div
      className={`relative group flex items-center justify-center ${className}`}
      style={height ? { height } : undefined}
    >
      <div className="flex flex-col gap-2 items-start">
        {label}

        <div className="relative">
          <AnimatePresence mode="sync" initial={false}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="max-w-full object-contain rounded-2xl"
              style={height ? { maxHeight: height - 80 } : undefined}
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(8px)', position: 'absolute', top: 0, left: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </AnimatePresence>

          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-center items-center gap-2 w-full">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className="relative flex items-center justify-center"
            aria-label={`Go to image ${index + 1}`}
          >
            <motion.div
              className="h-[2px] rounded-full bg-neutral-300 overflow-hidden"
              animate={{
                width: currentIndex === index ? 28 : 8,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
            >
              <motion.div
                className="h-full bg-neutral-700 rounded-full"
                style={{
                  width: currentIndex === index ? `${progress * 100}%` : '0%',
                }}
              />
            </motion.div>
          </button>
        ))}
        </div>
      </div>
    </div>
  );
}
