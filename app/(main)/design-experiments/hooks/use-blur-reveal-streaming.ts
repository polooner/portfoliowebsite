'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface StreamingChar {
  id: string;
  char: string;
  index: number;
}

interface UseBlurRevealStreamingOptions {
  text: string;
  speed?: number;
  autoStart?: boolean;
}

interface UseBlurRevealStreamingReturn {
  characters: StreamingChar[];
  cursorIndex: number;
  isStreaming: boolean;
  isComplete: boolean;
  start: () => void;
  reset: () => void;
}

export function useBlurRevealStreaming({
  text,
  speed = 35,
  autoStart = true,
}: UseBlurRevealStreamingOptions): UseBlurRevealStreamingReturn {
  const [cursorIndex, setCursorIndex] = useState(-1);
  const [isStreaming, setIsStreaming] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const instanceIdRef = useRef(0);

  const characters: StreamingChar[] = text
    .slice(0, cursorIndex + 1)
    .split('')
    .map((char, index) => ({
      id: `${instanceIdRef.current}-${index}`,
      char,
      index,
    }));

  const isComplete = cursorIndex >= text.length - 1;

  const start = useCallback(() => {
    if (isStreaming) return;
    setIsStreaming(true);
  }, [isStreaming]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    instanceIdRef.current += 1;
    setCursorIndex(-1);
    setIsStreaming(false);
  }, []);

  useEffect(() => {
    if (autoStart && cursorIndex === -1 && !isStreaming) {
      start();
    }
  }, [autoStart, cursorIndex, isStreaming, start]);

  useEffect(() => {
    if (!isStreaming) return;

    intervalRef.current = setInterval(() => {
      setCursorIndex((prev) => {
        const next = prev + 1;
        if (next >= text.length - 1) {
          setIsStreaming(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
        return next;
      });
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isStreaming, speed, text.length]);

  return {
    characters,
    cursorIndex,
    isStreaming,
    isComplete,
    start,
    reset,
  };
}
