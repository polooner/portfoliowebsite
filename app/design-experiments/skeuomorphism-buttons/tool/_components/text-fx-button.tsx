'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const ICON_SIZE = 14;

interface TextFxButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function TextFxButton({ isOpen, onToggle }: TextFxButtonProps) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
      className={`flex h-8 items-center gap-2 rounded-lg border px-3 text-xs transition-colors ${
        isOpen
          ? 'border-white/20 bg-neutral-600/50 text-neutral-200'
          : 'border-white/10 bg-neutral-700/50 text-neutral-300 hover:bg-neutral-600/50'
      }`}
    >
      <Sparkles size={ICON_SIZE} />
      <span>Text FX</span>
    </motion.button>
  );
}
