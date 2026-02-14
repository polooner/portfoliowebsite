'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

const MIN_SCALE_DEFAULT = 0.25;
const MAX_SCALE_DEFAULT = 3;
const ZOOM_SENSITIVITY = 0.002;
/** Multiplier applied per Cmd+/Cmd- press */
const KEYBOARD_ZOOM_STEP = 1.2;

interface Transform {
  x: number;
  y: number;
  scale: number;
}

interface UseCanvasTransformOptions {
  minScale?: number;
  maxScale?: number;
  contentWidth?: number;
  contentHeight?: number;
}

interface PanStart {
  x: number;
  y: number;
  transformX: number;
  transformY: number;
}

/**
 * Hook for managing pannable/zoomable canvas transformations.
 * Supports space+drag to pan, 2-finger scroll to pan, and pinch to zoom.
 */
export function useCanvasTransform({
  minScale = MIN_SCALE_DEFAULT,
  maxScale = MAX_SCALE_DEFAULT,
  contentWidth = 0,
  contentHeight = 0,
}: UseCanvasTransformOptions = {}) {
  const [transform, setTransform] = useState<Transform>({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const [spacePressed, setSpacePressed] = useState(false);
  const [isContentOutOfBounds, setIsContentOutOfBounds] = useState(false);

  const panStartRef = useRef<PanStart | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Check if content is completely outside the visible area.
   * Called only on interaction end events for performance.
   */
  const checkBounds = useCallback(
    (currentTransform: Transform) => {
      const container = containerRef.current;
      if (!container || !contentWidth || !contentHeight) {
        setIsContentOutOfBounds(false);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const scaledWidth = contentWidth * currentTransform.scale;
      const scaledHeight = contentHeight * currentTransform.scale;

      // Content position (centered by default, then transformed)
      const contentLeft = containerRect.width / 2 - contentWidth / 2 + currentTransform.x;
      const contentTop = containerRect.height / 2 - contentHeight / 2 + currentTransform.y;
      const contentRight = contentLeft + scaledWidth;
      const contentBottom = contentTop + scaledHeight;

      // Check if content is completely outside viewport
      const outOfBounds =
        contentRight < 0 ||
        contentLeft > containerRect.width ||
        contentBottom < 0 ||
        contentTop > containerRect.height;

      setIsContentOutOfBounds(outOfBounds);
    },
    [contentWidth, contentHeight]
  );

  /**
   * Handle zoom toward a specific point (usually cursor position).
   */
  const handleZoom = useCallback(
    (deltaY: number, clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const cursorX = clientX - containerRect.left;
      const cursorY = clientY - containerRect.top;

      setTransform((prev) => {
        const scaleFactor = 1 - deltaY * ZOOM_SENSITIVITY;
        const newScale = Math.min(maxScale, Math.max(minScale, prev.scale * scaleFactor));

        // Zoom toward cursor position
        const scaleRatio = newScale / prev.scale;
        const newX = cursorX - (cursorX - prev.x) * scaleRatio;
        const newY = cursorY - (cursorY - prev.y) * scaleRatio;

        return {
          x: newX,
          y: newY,
          scale: newScale,
        };
      });
    },
    [minScale, maxScale]
  );

  /**
   * Start panning operation.
   */
  const startPan = useCallback((clientX: number, clientY: number) => {
    setIsPanning(true);
    panStartRef.current = {
      x: clientX,
      y: clientY,
      transformX: transform.x,
      transformY: transform.y,
    };
  }, [transform.x, transform.y]);

  /**
   * Update pan position during drag.
   */
  const updatePan = useCallback(
    (clientX: number, clientY: number) => {
      if (!panStartRef.current) return;

      const deltaX = clientX - panStartRef.current.x;
      const deltaY = clientY - panStartRef.current.y;

      const newX = panStartRef.current.transformX + deltaX;
      const newY = panStartRef.current.transformY + deltaY;

      setTransform((prev) => ({
        ...prev,
        x: newX,
        y: newY,
      }));
    },
    []
  );

  /**
   * End panning operation and check bounds.
   */
  const endPan = useCallback(() => {
    setIsPanning(false);
    panStartRef.current = null;
    // Check bounds after drag ends
    setTransform((current) => {
      checkBounds(current);
      return current;
    });
  }, [checkBounds]);

  /**
   * Zoom in or out by a fixed step, centered on the viewport.
   * @param direction 1 to zoom in, -1 to zoom out
   */
  const zoomByStep = useCallback(
    (direction: 1 | -1) => {
      setTransform((prev) => {
        const factor = direction === 1 ? KEYBOARD_ZOOM_STEP : 1 / KEYBOARD_ZOOM_STEP;
        const newScale = Math.min(maxScale, Math.max(minScale, prev.scale * factor));
        const scaleRatio = newScale / prev.scale;

        return {
          x: prev.x * scaleRatio,
          y: prev.y * scaleRatio,
          scale: newScale,
        };
      });
    },
    [minScale, maxScale]
  );

  /**
   * Reset transform to initial state.
   */
  const resetTransform = useCallback(() => {
    setTransform({ x: 0, y: 0, scale: 1 });
    setIsContentOutOfBounds(false);
  }, []);

  // Handle keyboard events: space (pan), Cmd+/- (zoom), Cmd+0 (reset)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        setSpacePressed(true);
        return;
      }

      // Zoom shortcuts — capture phase + preventDefault to override browser zoom
      if (e.metaKey || e.ctrlKey) {
        if (e.key === '=' || e.key === '+') {
          e.preventDefault();
          zoomByStep(1);
        } else if (e.key === '-') {
          e.preventDefault();
          zoomByStep(-1);
        } else if (e.key === '0') {
          e.preventDefault();
          resetTransform();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setSpacePressed(false);
        endPan();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [endPan, zoomByStep, resetTransform]);

  // Handle mouse events
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (spacePressed) {
        e.preventDefault();
        startPan(e.clientX, e.clientY);
      }
    },
    [spacePressed, startPan]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        updatePan(e.clientX, e.clientY);
      }
    },
    [isPanning, updatePan]
  );

  const handleMouseUp = useCallback(() => {
    endPan();
  }, [endPan]);

  const handleMouseLeave = useCallback(() => {
    endPan();
  }, [endPan]);

  // Handle wheel events with passive: false to prevent browser defaults
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const WHEEL_IDLE_DELAY = 150;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Prevents browser navigation and zoom

      // Clear any pending bounds check
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      if (e.ctrlKey || e.metaKey) {
        // Pinch-to-zoom (ctrlKey) or Cmd+scroll (metaKey)
        handleZoom(e.deltaY, e.clientX, e.clientY);
      } else {
        // 2-finger scroll = pan
        setTransform((prev) => ({
          ...prev,
          x: prev.x - e.deltaX,
          y: prev.y - e.deltaY,
        }));
      }

      // Debounced bounds check after wheel events stop
      wheelTimeoutRef.current = setTimeout(() => {
        setTransform((current) => {
          checkBounds(current);
          return current;
        });
      }, WHEEL_IDLE_DELAY);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [handleZoom, checkBounds]);

  return {
    transform,
    isPanning,
    spacePressed,
    isContentOutOfBounds,
    containerRef,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
    },
    resetTransform,
    zoomByStep,
  };
}
