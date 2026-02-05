'use client';

import { Code } from 'lucide-react';

const ICON_SIZE = 14;

interface ViewCodeButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * Button to toggle the code panel visibility.
 */
export function ViewCodeButton({ isOpen, onToggle }: ViewCodeButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex h-8 items-center gap-2 rounded-lg border px-3 text-xs transition-colors active:scale-95 ${
        isOpen
          ? 'border-white/20 bg-neutral-600/50 text-neutral-200'
          : 'border-white/10 bg-neutral-700/50 text-neutral-300 hover:bg-neutral-600/50'
      }`}
    >
      <Code size={ICON_SIZE} />
      <span>Code</span>
    </button>
  );
}
