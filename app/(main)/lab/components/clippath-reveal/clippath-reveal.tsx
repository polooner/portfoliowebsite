'use client';

import { useEffect, useRef, useState } from 'react';
import { LabItemFooter } from '@/app/(main)/lab/components/lab-item-footer';

export function ClipPathReveal() {
  const [animate, setAnimate] = useState(false);
  const [transitionsEnabled, setTransitionsEnabled] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    const buttonTimer = setTimeout(() => setShowButton(true), 1100);
    return () => {
      clearTimeout(timer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const replay = () => {
    setShowButton(false);
    setTransitionsEnabled(false);
    setAnimate(false);

    requestAnimationFrame(() => {
      overlayRef.current?.getBoundingClientRect();
      setTransitionsEnabled(true);
      requestAnimationFrame(() => {
        setAnimate(true);
        setTimeout(() => setShowButton(true), 1000);
      });
    });
  };

  const statement = 'a new era requires a new creative class.';

  return (
    <div className="lab-item">
      <div className="relative h-48 flex items-center justify-center w-full max-w-[500px] bg-neutral-900 rounded-2xl overflow-hidden">
        <div className="relative overflow-hidden rounded-xl">
          <div className="p-6">
            <h1
              className="text-center text-lg font-medium lowercase leading-tight tracking-tight text-white"
              style={{
                transform: animate ? 'scale(1)' : 'scale(0.95)',
                transition: transitionsEnabled ? 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 0.95)' : 'none',
              }}
            >
              {statement}
            </h1>
          </div>

          <div
            ref={overlayRef}
            className="absolute inset-0 bg-white p-6"
            style={{
              clipPath: animate ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)',
              transition: transitionsEnabled ? 'clip-path 1000ms cubic-bezier(0.22, 1, 0.36, 0.95)' : 'none',
            }}
          >
            <h1
              className="text-center text-lg font-medium lowercase leading-tight tracking-tight text-black"
              style={{
                transform: animate ? 'scale(1)' : 'scale(0.95)',
                transition: transitionsEnabled ? 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 0.95)' : 'none',
              }}
            >
              {statement}
            </h1>
          </div>

        </div>

        {showButton && (
          <button
            onClick={replay}
            className="absolute bottom-3 right-3 rounded-full bg-white/10 px-3 py-1 text-[10px] lowercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            replay
          </button>
        )}
      </div>

      <LabItemFooter
        title="Clip-path reveal"
        description="Text inverts from light to dark using CSS clip-path animation. Clean reveal effect."
      />
    </div>
  );
}
