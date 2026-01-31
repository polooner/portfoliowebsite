import { useRef, useCallback } from 'react';
import { Vector3 } from 'three';
import type { InfluencePoint } from './plus-matrix-types';
import {
  WAVE_CONFIG,
  CONTAINER_WIDTH,
  CONTAINER_HEIGHT,
} from './plus-matrix-constants';
import { randomRange, easeOutCubic, easeInCubic } from './plus-matrix-utils';

let nextId = 0;

/**
 * Hook for managing influence point spawning and animation
 */
export function useInfluencePoints() {
  const pointsRef = useRef<InfluencePoint[]>([]);
  const lastSpawnTimeRef = useRef(0);
  const nextSpawnIntervalRef = useRef(
    randomRange(WAVE_CONFIG.spawnIntervalMin, WAVE_CONFIG.spawnIntervalMax)
  );

  const spawnRipple = useCallback(() => {
    const x = randomRange(-CONTAINER_WIDTH / 3, CONTAINER_WIDTH / 3);
    const y = randomRange(-CONTAINER_HEIGHT / 3, CONTAINER_HEIGHT / 3);

    const point: InfluencePoint = {
      id: nextId++,
      position: new Vector3(x, y, 0),
      velocity: new Vector3(WAVE_CONFIG.rippleExpandSpeed, 0, 0),
      radius: 0,
      strength: 0,
      type: 'ripple',
      birthTime: performance.now(),
      lifetime: 3500,
    };

    pointsRef.current.push(point);
  }, []);

  const updatePoints = useCallback((deltaTime: number, currentTime: number) => {
    // Check if we should spawn a new point
    if (
      currentTime - lastSpawnTimeRef.current > nextSpawnIntervalRef.current &&
      pointsRef.current.length < WAVE_CONFIG.maxActivePoints
    ) {
      spawnRipple();
      lastSpawnTimeRef.current = currentTime;
      nextSpawnIntervalRef.current = randomRange(
        WAVE_CONFIG.spawnIntervalMin,
        WAVE_CONFIG.spawnIntervalMax
      );
    }

    // Update each point
    pointsRef.current = pointsRef.current.filter((point) => {
      const age = currentTime - point.birthTime;

      // Lifecycle: fade in, then dissolve over most of the expansion
      const fadeInDuration = 300;
      const fadeOutDuration = 2500;
      const fadeOutStart = point.lifetime - fadeOutDuration;

      if (age < fadeInDuration) {
        // Fade in - ensure we never start at exactly 0
        const t = Math.max(age / fadeInDuration, 0.01);
        point.strength = easeOutCubic(t);
      } else if (age > fadeOutStart) {
        // Dissolve while still expanding
        const t = Math.min((age - fadeOutStart) / fadeOutDuration, 1);
        const eased = easeInCubic(t);
        point.strength = 1 - eased;

        // Only remove when fully dissolved
        if (point.strength <= 0.001) {
          return false;
        }
      } else {
        point.strength = 1;
      }

      // Ripples always expand - movement never stops during dissolve
      point.radius += point.velocity.x * deltaTime;

      return true;
    });

    return pointsRef.current;
  }, [spawnRipple]);

  return { updatePoints, pointsRef };
}
