import { useRef, useCallback } from 'react';
import { Vector3 } from 'three';
import type { InfluencePoint } from './dot-matrix-grid-types';
import {
  INFLUENCE_CONFIG,
  ANIMATION_CONFIG,
  CONTAINER_WIDTH,
  CONTAINER_HEIGHT,
} from './dot-matrix-grid-constants';
import { easeOutCubic, easeInCubic, randomRange } from './sdf-utils';

let nextId = 0;

/**
 * Hook for managing influence point spawning and animation
 */
export function useInfluencePoints() {
  const pointsRef = useRef<InfluencePoint[]>([]);
  const lastSpawnTimeRef = useRef(0);
  const nextSpawnIntervalRef = useRef(
    randomRange(INFLUENCE_CONFIG.spawnIntervalMin, INFLUENCE_CONFIG.spawnIntervalMax)
  );

  const spawnPoint = useCallback(() => {
    const x = randomRange(-CONTAINER_WIDTH / 2 + 40, CONTAINER_WIDTH / 2 - 40);
    const y = randomRange(-CONTAINER_HEIGHT / 2 + 30, CONTAINER_HEIGHT / 2 - 30);

    const point: InfluencePoint = {
      id: nextId++,
      position: new Vector3(x, y, 0),
      radius: randomRange(INFLUENCE_CONFIG.minRadius, INFLUENCE_CONFIG.maxRadius),
      strength: 0,
      phase: 'fadeIn',
      phaseStartTime: performance.now(),
      holdDuration: randomRange(
        ANIMATION_CONFIG.holdDurationMin,
        ANIMATION_CONFIG.holdDurationMax
      ),
    };

    pointsRef.current.push(point);
  }, []);

  const updatePoints = useCallback((currentTime: number) => {
    // Check if we should spawn a new point
    if (
      currentTime - lastSpawnTimeRef.current > nextSpawnIntervalRef.current &&
      pointsRef.current.length < INFLUENCE_CONFIG.maxActivePoints
    ) {
      spawnPoint();
      lastSpawnTimeRef.current = currentTime;
      nextSpawnIntervalRef.current = randomRange(
        INFLUENCE_CONFIG.spawnIntervalMin,
        INFLUENCE_CONFIG.spawnIntervalMax
      );
    }

    // Update each point's strength based on phase
    pointsRef.current = pointsRef.current.filter((point) => {
      const elapsed = currentTime - point.phaseStartTime;

      switch (point.phase) {
        case 'fadeIn': {
          const progress = Math.min(elapsed / ANIMATION_CONFIG.fadeInDuration, 1);
          point.strength = easeOutCubic(progress);
          if (progress >= 1) {
            point.phase = 'hold';
            point.phaseStartTime = currentTime;
          }
          break;
        }
        case 'hold': {
          point.strength = 1;
          if (elapsed >= point.holdDuration) {
            point.phase = 'fadeOut';
            point.phaseStartTime = currentTime;
          }
          break;
        }
        case 'fadeOut': {
          const progress = Math.min(elapsed / ANIMATION_CONFIG.fadeOutDuration, 1);
          point.strength = 1 - easeInCubic(progress);
          if (progress >= 1) {
            return false; // Remove this point
          }
          break;
        }
      }

      return true;
    });

    return pointsRef.current;
  }, [spawnPoint]);

  return { updatePoints, pointsRef };
}
