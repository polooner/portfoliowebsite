'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface TimerProps {
  duration?: number;
}

export function Timer({ duration = 10000 }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formattedTime = formatTime(timeRemaining);

  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const next = prev - 1000;
        if (next <= 0) {
          setIsRunning(false);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const handleStartPause = useCallback(() => {
    if (timeRemaining <= 0) {
      setTimeRemaining(duration);
    }
    setIsRunning(prev => !prev);
  }, [duration, timeRemaining]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTimeRemaining(duration);
  }, [duration]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-8 w-full self-center">
      <div className="relative h-48 flex items-center justify-center w-full max-w-[500px] bg-neutral-50 rounded-2xl">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-0">
            {formattedTime.split('').map((char, index) => (
              <div
                key={index}
                className="relative h-32 flex items-center justify-center overflow-hidden"
                style={{ width: char === ':' ? '1rem' : '2rem' }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={char}
                    initial={{
                      y: -40,
                      scale: 0.5,
                      filter: 'blur(8px)',
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      scale: 1,
                      filter: 'blur(0px)',
                      opacity: 1,
                    }}
                    exit={{
                      y: 40,
                      scale: 0.5,
                      filter: 'blur(8px)',
                      opacity: 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                      bounce: 0.5,
                    }}
                    className="absolute inset-0 flex items-center justify-center text-5xl font-mono font-medium text-neutral-900"
                  >
                    {char}
                  </motion.div>
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex gap-3 -mt-4">
            <Button variant="outline" size="sm" onClick={handleStartPause} className="min-w-[80px]">
              {isRunning ? 'Pause' : timeRemaining <= 0 ? 'Restart' : 'Start'}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[500px] text-left flex flex-col">
        <span className="font-mono font-medium">Animated countdown timer</span>
        <span className="text-xs">
          Numbers cascade and blur as they change, creating a smooth carousel effect.
        </span>
      </div>
    </div>
  );
}
