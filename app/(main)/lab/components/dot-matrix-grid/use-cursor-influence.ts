import { useRef, useCallback } from 'react';
import { Vector3 } from 'three';
import type { InfluencePoint } from './dot-matrix-grid-types';
import { CURSOR_FADE_SPEED } from './dot-matrix-grid-constants';

/** How long cursor is considered "active" after last movement (ms) */
const CURSOR_ACTIVE_THRESHOLD = 50;

/**
 * Hook for managing cursor-based influence with smooth fade in/out.
 * Influence animates in while cursor is active, animates out when idle or leaving.
 */
export function useCursorInfluence() {
  const cursorPointRef = useRef<InfluencePoint | null>(null);
  const lastMoveTimeRef = useRef(0);
  const isInsideRef = useRef(false);

  const updateCursorPosition = useCallback((x: number, y: number) => {
    lastMoveTimeRef.current = performance.now();
    isInsideRef.current = true;

    if (!cursorPointRef.current) {
      cursorPointRef.current = {
        id: -1,
        position: new Vector3(x, y, 0),
        velocity: new Vector3(0, 0, 0),
        radius: 0,
        strength: 0,
        type: 'cursor',
        birthTime: performance.now(),
        lifetime: Infinity,
      };
    } else {
      cursorPointRef.current.position.set(x, y, 0);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    isInsideRef.current = false;
  }, []);

  const updateCursorInfluence = useCallback((deltaTime: number): InfluencePoint | null => {
    const point = cursorPointRef.current;
    if (!point) return null;

    const now = performance.now();
    const timeSinceMove = now - lastMoveTimeRef.current;
    const isActive = isInsideRef.current && timeSinceMove < CURSOR_ACTIVE_THRESHOLD;

    if (isActive) {
      // Animate in towards 1
      point.strength += deltaTime * CURSOR_FADE_SPEED;
      point.strength = Math.min(point.strength, 1);
    } else {
      // Animate out towards 0
      point.strength -= deltaTime * CURSOR_FADE_SPEED;
    }

    // Remove point when fully faded out
    if (point.strength <= 0) {
      cursorPointRef.current = null;
      return null;
    }

    return point;
  }, []);

  return {
    updateCursorPosition,
    handleMouseLeave,
    updateCursorInfluence,
  };
}
