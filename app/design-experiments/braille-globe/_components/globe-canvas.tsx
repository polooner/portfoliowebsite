'use client';

import { useRef, useEffect, useCallback } from 'react';
import type { CursorPosition, DragState, RotationMatrix, SpherePoint3D } from '../_types/globe-types';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  DOT_COUNT,
  DRAG_ROTATION_SENSITIVITY,
  DRAG_MOMENTUM_DECAY,
  DRAG_MOMENTUM_THRESHOLD,
  PLACEHOLDER_IMAGE_URL,
} from '../_constants/globe-config';
import { generateFibonacciSphere } from '../_utils/sphere-distribution';
import { projectAllPoints } from '../_utils/sphere-projection';
import {
  IDENTITY_MATRIX,
  axisAngleToMatrix,
  multiplyMatrices,
  rotateAllPoints,
} from '../_utils/sphere-rotation';
import { renderGlobe } from './globe-renderer';

export default function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const basePoints = useRef<SpherePoint3D[]>([]);
  const rotationMatrix = useRef<RotationMatrix>([...IDENTITY_MATRIX]);
  const cursor = useRef<CursorPosition | null>(null);
  const drag = useRef<DragState>({
    isDragging: false,
    lastX: 0,
    lastY: 0,
    momentumDx: 0,
    momentumDy: 0,
  });
  const imageRef = useRef<HTMLImageElement | null>(null);
  const rafId = useRef<number>(0);

  const applyRotationDelta = useCallback((dx: number, dy: number) => {
    const angle = Math.sqrt(dx * dx + dy * dy) * DRAG_ROTATION_SENSITIVITY;
    if (angle < 1e-6) return;

    // Rotation axis is perpendicular to drag direction
    const delta = axisAngleToMatrix(-dy, dx, 0, angle);
    rotationMatrix.current = multiplyMatrices(delta, rotationMatrix.current);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = PLACEHOLDER_IMAGE_URL;
    img.onload = () => { imageRef.current = img; };

    basePoints.current = generateFibonacciSphere(DOT_COUNT);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = CANVAS_HEIGHT * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;

    function tick() {
      // Apply momentum when not dragging
      if (!drag.current.isDragging) {
        const { momentumDx, momentumDy } = drag.current;
        const speed = Math.sqrt(momentumDx * momentumDx + momentumDy * momentumDy);

        if (speed > DRAG_MOMENTUM_THRESHOLD) {
          applyRotationDelta(momentumDx, momentumDy);
          drag.current.momentumDx *= DRAG_MOMENTUM_DECAY;
          drag.current.momentumDy *= DRAG_MOMENTUM_DECAY;
        }
      }

      const rotated = rotateAllPoints(basePoints.current, rotationMatrix.current);
      const projected = projectAllPoints(rotated, centerX, centerY);
      renderGlobe(
        ctx!,
        projected,
        cursor.current,
        CANVAS_WIDTH,
        CANVAS_HEIGHT,
        imageRef.current,
        rotationMatrix.current
      );

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId.current);
  }, [applyRotationDelta]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const scaleX = CANVAS_WIDTH / rect.width;
      const scaleY = CANVAS_HEIGHT / rect.height;

      cursor.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };

      if (drag.current.isDragging) {
        const dx = e.clientX - drag.current.lastX;
        const dy = e.clientY - drag.current.lastY;

        applyRotationDelta(dx, dy);

        drag.current.momentumDx = dx;
        drag.current.momentumDy = dy;
        drag.current.lastX = e.clientX;
        drag.current.lastY = e.clientY;
      }
    },
    [applyRotationDelta]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    drag.current.isDragging = true;
    drag.current.lastX = e.clientX;
    drag.current.lastY = e.clientY;
    drag.current.momentumDx = 0;
    drag.current.momentumDy = 0;
  }, []);

  const handleMouseUp = useCallback(() => {
    drag.current.isDragging = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    cursor.current = null;
    drag.current.isDragging = false;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-grab active:cursor-grabbing"
      style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    />
  );
}
