'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShikiHighlighter } from 'react-shiki';
import { useGridAnimatorStore } from '../_store/grid-animator-store';
import { generateComponentCode } from '../_utils/generate-component-code';

interface LeftPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHECKMARK_PATH = 'M4 12l5 5L20 6';
const CHECKMARK_PATH_LENGTH = 24;
const SUCCESS_DISPLAY_DURATION_MS = 2000;

const MIN_PANEL_WIDTH = 280;
const MAX_PANEL_WIDTH = 800;
const DEFAULT_PANEL_WIDTH = 360;

/** Code panel displaying syntax-highlighted TSX component code. */
export default function LeftPanel({ isOpen, onClose }: LeftPanelProps) {
  const [copied, setCopied] = useState(false);
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH);
  const [isResizing, setIsResizing] = useState(false);

  const instance = useGridAnimatorStore(
    (state) => {
      const pid = state.selectedIds[0];
      return pid ? state.instances[pid] : null;
    }
  );

  const generatedCode = useMemo(
    () => (instance ? generateComponentCode(instance.config) : '// Select an instance to view code'),
    [instance]
  );

  const handleCopy = async () => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), SUCCESS_DISPLAY_DURATION_MS);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = Math.min(
        MAX_PANEL_WIDTH,
        Math.max(MIN_PANEL_WIDTH, e.clientX - 16)
      );
      setPanelWidth(newWidth);
    },
    [isResizing]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const codeBlock = (
    <ShikiHighlighter
      language="tsx"
      theme="github-dark"
      showLineNumbers
      showLanguage={false}
      addDefaultStyles={true}
      className="!bg-transparent !p-2 !m-0 [&_.line]:!text-[10px] [&_.line_span]:!text-[10px] [&_pre_code.has-line-numbers]:!text-[10px] [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
    >
      {generatedCode}
    </ShikiHighlighter>
  );

  return (
    <>
      {!isOpen && <div className="sr-only">{codeBlock}</div>}

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ width: panelWidth }}
            className="fixed bottom-4 left-4 top-4 z-50 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-800/90 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleCopy}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 text-xs font-medium text-neutral-100 transition-colors hover:text-white"
                >
                  <span className="relative h-3.5 w-3.5">
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.svg
                          key="check"
                          width={14}
                          height={14}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ opacity: 0, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, filter: 'blur(4px)' }}
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
                        <motion.svg
                          key="copy"
                          width={14}
                          height={14}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ opacity: 0, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, filter: 'blur(4px)' }}
                          transition={{ duration: 0.15 }}
                          className="absolute inset-0"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </span>
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </motion.button>
                <span className="rounded bg-neutral-700/50 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400">
                  tsx
                </span>
              </div>
              <motion.button
                onClick={onClose}
                whileTap={{ scale: 0.9 }}
                className="flex h-6 w-6 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-700/50 hover:text-neutral-200"
              >
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            <div className="flex-1 overflow-auto pb-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              {codeBlock}
            </div>

            <div
              onMouseDown={handleMouseDown}
              className={`absolute right-0 top-0 bottom-0 w-1 cursor-col-resize rounded-r-2xl transition-colors ${
                isResizing ? 'bg-white/30' : 'hover:bg-white/20'
              }`}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
