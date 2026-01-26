import { useRef, useCallback } from 'react';
import { Vector3 } from 'three';
import type { InfluencePoint } from './dot-matrix-grid-types';
import { CURSOR_FADE_SPEED } from './dot-matrix-grid-constants';

/** How long cursor is considered "active" after last movement (ms) */
const CURSOR_ACTIVE_THRESHOLD = 50;

/** Fixed drift distance in pixels when cursor stops */
const DRIFT_DISTANCE = 40;

/** How fast the drift happens (pixels per second) */
const DRIFT_SPEED = 40;

/**
 * Hook for managing cursor-based influence with smooth fade in/out and momentum.
 * When cursor stops moving, the influence drifts a fixed distance in the last movement direction.
 */
export function useCursorInfluence() {
  const cursorPointRef = useRef<InfluencePoint | null>(null);
  const lastMoveTimeRef = useRef(0);
  const isInsideRef = useRef(false);

  // Track cursor position for direction calculation
  const lastCursorPosRef = useRef<{ x: number; y: number } | null>(null);

  // Normalized direction of last movement
  const directionRef = useRef({ x: 0, y: 0 });

  // The rendered position (continues moving after cursor stops)
  const renderPosRef = useRef({ x: 0, y: 0 });

  // How much drift distance remains
  const remainingDriftRef = useRef(0);

  const updateCursorPosition = useCallback((x: number, y: number) => {
    const now = performance.now();

    // Calculate movement direction (normalized)
    if (lastCursorPosRef.current) {
      const dx = x - lastCursorPosRef.current.x;
      const dy = y - lastCursorPosRef.current.y;
      const magnitude = Math.sqrt(dx * dx + dy * dy);

      if (magnitude > 0.5) {
        // Smooth the direction
        const newDirX = dx / magnitude;
        const newDirY = dy / magnitude;
        directionRef.current.x = directionRef.current.x * 0.6 + newDirX * 0.4;
        directionRef.current.y = directionRef.current.y * 0.6 + newDirY * 0.4;
      }
    }

    lastCursorPosRef.current = { x, y };
    lastMoveTimeRef.current = now;
    isInsideRef.current = true;

    // Snap render position to cursor while moving
    renderPosRef.current = { x, y };
    remainingDriftRef.current = DRIFT_DISTANCE;

    if (!cursorPointRef.current) {
      cursorPointRef.current = {
        id: -1,
        position: new Vector3(x, y, 0),
        velocity: new Vector3(0, 0, 0),
        radius: 0,
        strength: 0,
        type: 'cursor',
        birthTime: now,
        lifetime: Infinity,
      };
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

      // Update position directly from cursor
      point.position.set(renderPosRef.current.x, renderPosRef.current.y, 0);
    } else {
      // Cursor has stopped or left - apply drift in last direction
      if (remainingDriftRef.current > 0) {
        const driftThisFrame = Math.min(DRIFT_SPEED * deltaTime, remainingDriftRef.current);
        renderPosRef.current.x += directionRef.current.x * driftThisFrame;
        renderPosRef.current.y += directionRef.current.y * driftThisFrame;
        remainingDriftRef.current -= driftThisFrame;
      }

      // Update position
      point.position.set(renderPosRef.current.x, renderPosRef.current.y, 0);

      // Animate out towards 0
      point.strength -= deltaTime * CURSOR_FADE_SPEED;
    }

    // Remove point when fully faded out
    if (point.strength <= 0) {
      cursorPointRef.current = null;
      remainingDriftRef.current = 0;
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
