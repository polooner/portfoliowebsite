'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShikiHighlighter } from 'react-shiki';
import { useShadowStore } from '../_store/shadow-store';
import { generateComponentCode } from '../_utils/generate-component-code';

interface LeftPanelProps {
  isOpen: boolean;
}

const CHECKMARK_PATH = 'M4 12l5 5L20 6';
const CHECKMARK_PATH_LENGTH = 24;
const SUCCESS_DISPLAY_DURATION_MS = 2000;

/**
 * Code panel displaying syntax-highlighted TSX component code.
 * Updates reactively based on shadow store values.
 * Preloads ShikiHighlighter on mount for instant panel opening.
 */
export default function LeftPanel({ isOpen }: LeftPanelProps) {
  const [copied, setCopied] = useState(false);

  const {
    columns,
    rows,
    paneWidth,
    paneHeight,
    gapX,
    gapY,
    skewX,
    skewY,
    blur,
    fillColor,
    fillOpacity,
    backgroundColor,
    backgroundOpacity,
  } = useShadowStore();

  // Generate code when config changes
  const generatedCode = useMemo(
    () =>
      generateComponentCode({
        columns,
        rows,
        paneWidth,
        paneHeight,
        gapX,
        gapY,
        skewX,
        skewY,
        blur,
        fillColor,
        fillOpacity,
        backgroundColor,
        backgroundOpacity,
      }),
    [
      columns,
      rows,
      paneWidth,
      paneHeight,
      gapX,
      gapY,
      skewX,
      skewY,
      blur,
      fillColor,
      fillOpacity,
      backgroundColor,
      backgroundOpacity,
    ]
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
      {/* Hidden preload - renders ShikiHighlighter immediately to load the bundle */}
      {!isOpen && <div className="sr-only">{codeBlock}</div>}

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-4 left-4 top-4 z-50 flex w-[360px] flex-col rounded-2xl border border-white/10 bg-neutral-800/90 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
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
            <div className="flex-1 overflow-auto">{codeBlock}</div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
