import { DEFAULT_CONFIG } from '@/app/(main)/lab/components/streaming-text-carousel/streaming-text-carousel-constants';
import {
  AnimatedChar,
  CompletedLine,
  StreamingConfig,
} from '@/app/(main)/lab/components/streaming-text-carousel/streaming-text-carousel-types';
import { useState, useEffect, useRef, useCallback } from 'react';

export function useTextStreaming(text: string, config: StreamingConfig = DEFAULT_CONFIG) {
  const [currentLineChars, setCurrentLineChars] = useState<AnimatedChar[]>([]);
  const [completedLines, setCompletedLines] = useState<CompletedLine[]>([]);
  const [resetKey, setResetKey] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const measureRef = useRef<HTMLSpanElement>(null);
  const charactersRef = useRef<string[]>([]);
  const currentCharIndexRef = useRef(0);
  const lineIdCounterRef = useRef(0);
  const charIdCounterRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const currentLineRef = useRef('');

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

  const getNextWord = useCallback((startIndex: number): string => {
    let word = '';
    let i = startIndex;

    while (i < charactersRef.current.length && /\s/.test(charactersRef.current[i])) {
      i++;
    }

    while (i < charactersRef.current.length && !/\s/.test(charactersRef.current[i])) {
      word += charactersRef.current[i];
      i++;
    }

    return word;
  }, []);

  useEffect(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setCurrentLineChars([]);
    currentLineRef.current = '';
    setCompletedLines([]);
    setIsComplete(false);

    charactersRef.current = text.split('');
    currentCharIndexRef.current = 0;
    lineIdCounterRef.current = 0;
    charIdCounterRef.current = 0;

    const completeLine = () => {
      const lineToComplete = currentLineRef.current;
      if (lineToComplete.trim()) {
        setCompletedLines(prev => {
          const newLines = [{ text: lineToComplete, id: lineIdCounterRef.current++ }, ...prev];
          return newLines.slice(0, config.maxLines);
        });
        setCurrentLineChars([]);
        currentLineRef.current = '';
      }
    };

    const streamNextCharacter = () => {
      if (currentCharIndexRef.current >= charactersRef.current.length) {
        if (timerRef.current !== null) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setIsComplete(true);
        return;
      }

      const nextChar = charactersRef.current[currentCharIndexRef.current];
      const currentText = currentLineRef.current;

      const isStartOfWord =
        !/\s/.test(nextChar) &&
        (currentCharIndexRef.current === 0 ||
          /\s/.test(charactersRef.current[currentCharIndexRef.current - 1]));

      if (isStartOfWord && currentText.length > 0) {
        const nextWord = getNextWord(currentCharIndexRef.current);

        if (nextWord && wouldExceedWidth(currentText, nextWord)) {
          completeLine();
          return;
        }
      }

      if (currentText && wouldExceedWidth(currentText, nextChar)) {
        completeLine();
        return;
      }

      const newLine = currentText + nextChar;
      currentLineRef.current = newLine;

      setCurrentLineChars(prev => [...prev, { char: nextChar, id: charIdCounterRef.current++ }]);

      currentCharIndexRef.current++;
    };

    if (charactersRef.current.length > 0) {
      timerRef.current = window.setInterval(() => {
        streamNextCharacter();
      }, config.streamingSpeed);
    }

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text, config.streamingSpeed, config.maxLines, wouldExceedWidth, getNextWord, resetKey]);

  const reset = useCallback(() => {
    setResetKey(k => k + 1);
  }, []);

  return {
    currentLineChars,
    completedLines,
    measureRef,
    reset,
    isComplete,
  };
}
