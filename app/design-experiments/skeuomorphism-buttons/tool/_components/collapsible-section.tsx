'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useButtonStore } from '../_store/button-store';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  badge?: string | number;
  children: React.ReactNode;
}

export function CollapsibleSection({
  id,
  title,
  badge,
  children,
}: CollapsibleSectionProps) {
  const isExpanded = useButtonStore((s) => s.expandedSections[id] ?? false);
  const toggleSection = useButtonStore((s) => s.toggleSection);

  return (
    <div>
      <button
        onClick={() => toggleSection(id)}
        className="flex w-full items-center justify-between py-2"
      >
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <ChevronRight size={12} className="text-neutral-500" />
          </motion.span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500/80">
            {title}
          </span>
        </div>
        {badge !== undefined && (
          <span className="rounded bg-neutral-700/50 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500">
            {badge}
          </span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
