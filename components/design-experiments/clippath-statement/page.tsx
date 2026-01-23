"use client";

import { useEffect, useRef, useState } from "react";

export default function Page() {
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
    // Disable transitions
    setTransitionsEnabled(false);
    setAnimate(false);

    // Force reflow, then re-enable transitions and animate
    requestAnimationFrame(() => {
      overlayRef.current?.getBoundingClientRect();
      setTransitionsEnabled(true);
      requestAnimationFrame(() => {
        setAnimate(true);
        setTimeout(() => setShowButton(true), 1000);
      });
    });
  };

  const statement = "a new era requires a new creative class.";

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      {/* Card container */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Base layer - black background with white text (revealed) */}
        <div className="p-10 py-20">
          <h1
            className="font-greed text-center text-[clamp(2rem,6vw,5rem)] font-medium lowercase leading-[0.95] tracking-tight text-white"
            style={{
              transform: animate ? "scale(1)" : "scale(0.95)",
              transition: transitionsEnabled ? "transform 1000ms cubic-bezier(0.22, 1, 0.36, 0.95)" : "none",
            }}
          >
            {statement}
          </h1>
        </div>

        {/* Top layer - white background with outlined text (clips away) */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-white p-10 py-20"
          style={{
            clipPath: animate ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
            transition: transitionsEnabled ? "clip-path 1000ms cubic-bezier(0.22, 1, 0.36, 0.95)" : "none",
          }}
        >
          <h1
            className="font-greed text-center text-[clamp(2rem,6vw,5rem)] font-medium lowercase leading-[0.95] tracking-tight text-black"
            style={{
              transform: animate ? "scale(1)" : "scale(0.95)",
              transition: transitionsEnabled ? "transform 1000ms cubic-bezier(0.22, 1, 0.36, 0.95)" : "none",
            }}
          >
            {statement}
          </h1>
        </div>

        {/* Replay button */}
        {showButton && (
          <button
            onClick={replay}
            className="font-greed absolute bottom-3 right-3 rounded-full bg-white/10 px-4 py-1.5 text-xs lowercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            replay
          </button>
        )}
      </div>
    </div>
  );
}
