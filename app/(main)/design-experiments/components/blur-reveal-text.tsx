'use client';

import { motion } from 'framer-motion';
import { useBlurRevealStreaming } from '../hooks/use-blur-reveal-streaming';
import { Button } from '@/components/ui/button';

interface BlurRevealTextProps {
  text: string;
  streamingSpeed?: number;
  blurWindowSize?: number;
  maxBlur?: number;
  className?: string;
}

export function BlurRevealText({
  text,
  streamingSpeed = 35,
  blurWindowSize = 6,
  maxBlur = 8,
  className = '',
}: BlurRevealTextProps) {
  const { characters, cursorIndex, isStreaming, isComplete, start, reset } =
    useBlurRevealStreaming({
      text,
      speed: streamingSpeed,
      autoStart: true,
    });

  const calculateBlur = (charIndex: number): number => {
    if (isComplete) return 0;
    const distance = cursorIndex - charIndex;
    if (distance < 0) return maxBlur;
    if (distance >= blurWindowSize) return 0;
    return maxBlur * (1 - distance / blurWindowSize);
  };

  const handleReplay = () => {
    reset();
    setTimeout(() => start(), 50);
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <div className={`flex flex-wrap justify-start w-[600px] ${className}`}>
        {characters.map((char) => {
          const blurAmount = calculateBlur(char.index);
          const blurRatio = blurAmount / maxBlur;
          const opacity = blurAmount > 0 ? 1 - blurRatio : 1;

          return (
            <motion.span
              key={char.id}
              initial={{ filter: `blur(${maxBlur}px)`, opacity: 0 }}
              animate={{
                filter: `blur(${blurAmount}px)`,
                opacity,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="inline-block whitespace-pre text-2xl font-medium text-neutral-900"
            >
              {char.char}
            </motion.span>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleReplay}
          disabled={isStreaming}
        >
          {isComplete ? 'Replay' : isStreaming ? 'Streaming...' : 'Start'}
        </Button>
      </div>
    </div>
  );
}
