'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useCanvasTransform } from '@/hooks/use-canvas-transform';
import CanvasContent from './canvas-content';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

/**
 * Pannable and zoomable canvas container for the shadow preview.
 */
export default function ToolCanvas() {
  const {
    transform,
    isPanning,
    spacePressed,
    isContentOutOfBounds,
    containerRef,
    handlers,
    resetTransform,
  } = useCanvasTransform({
    minScale: 0.25,
    maxScale: 3,
    contentWidth: CANVAS_WIDTH,
    contentHeight: CANVAS_HEIGHT,
  });

  const toastIdRef = useRef<string | number | null>(null);

  // Show/dismiss toast when content goes out of bounds
  useEffect(() => {
    if (isContentOutOfBounds && !toastIdRef.current) {
      toastIdRef.current = toast('Canvas out of view', {
        duration: Infinity,
        position: 'top-center',
        unstyled: true,
        classNames: {
          toast: 'flex items-center gap-3 rounded-lg bg-neutral-800/80 px-3 py-2 backdrop-blur-sm',
          title: 'text-xs text-neutral-400',
          actionButton: 'rounded-md bg-neutral-700/80 px-2 py-1 text-xs text-neutral-300 hover:bg-neutral-600/80 transition-colors',
        },
        action: {
          label: 'Pan to content',
          onClick: resetTransform,
        },
      });
    } else if (!isContentOutOfBounds && toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }
  }, [isContentOutOfBounds, resetTransform]);

  // Determine cursor style based on pan state
  const getCursorClass = () => {
    if (isPanning) return 'cursor-grabbing';
    if (spacePressed) return 'cursor-grab';
    return 'cursor-default';
  };

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full touch-none overflow-hidden ${getCursorClass()}`}
      {...handlers}
    >
      {/* Transformed canvas content */}
      <div
        className="absolute will-change-transform"
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          left: '50%',
          top: '50%',
          marginLeft: -CANVAS_WIDTH / 2,
          marginTop: -CANVAS_HEIGHT / 2,
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
          transformOrigin: '0 0',
        }}
      >
        <CanvasContent />
      </div>

      {/* Pan/zoom hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-neutral-800/80 px-3 py-2 text-xs text-neutral-400 backdrop-blur-sm">
        <span className="text-neutral-300">Scroll</span> to pan · <span className="text-neutral-300">Pinch</span> to zoom
      </div>
    </div>
  );
}
