'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ICON_SIZE = 14;
const CHECKMARK_PATH = 'M4 12l5 5L20 6';
const CHECKMARK_PATH_LENGTH = 24;
const SUCCESS_DISPLAY_DURATION_MS = 2000;

interface CopyButtonProps {
  getText: () => string;
}

/** Animated copy button with icon transition from copy to checkmark. */
export function CopyButton({ getText }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (copied) return;

    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      setTimeout(() => setCopied(false), SUCCESS_DISPLAY_DURATION_MS);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.95 }}
      className="flex h-8 items-center gap-2 rounded-lg border border-white/10 bg-neutral-700/50 px-3 text-xs text-neutral-300 transition-colors hover:bg-neutral-600/50"
    >
      <span className="relative h-[14px] w-[14px]">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.svg
              key="check"
              width={ICON_SIZE}
              height={ICON_SIZE}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(2px)' }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 text-green-400"
            >
              <motion.path
                d={CHECKMARK_PATH}
                strokeDasharray={CHECKMARK_PATH_LENGTH}
                initial={{ strokeDashoffset: CHECKMARK_PATH_LENGTH }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </motion.svg>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, filter: 'blur(2px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(2px)' }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0"
            >
              <Copy size={ICON_SIZE} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span>{copied ? 'Copied!' : 'Copy'}</span>
    </motion.button>
  );
}
