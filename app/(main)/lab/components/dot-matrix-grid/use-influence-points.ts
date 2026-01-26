import { useRef, useCallback } from 'react';
import { Vector3 } from 'three';
import type { InfluencePoint, WaveType } from './dot-matrix-grid-types';
import {
  WAVE_CONFIG,
  CONTAINER_WIDTH,
  CONTAINER_HEIGHT,
} from './dot-matrix-grid-constants';
import { randomRange, easeOutCubic, easeInCubic } from './sdf-utils';

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

  const spawnComet = useCallback(() => {
    // Random angle for comet direction
    const angle = randomRange(0, Math.PI * 2);
    const speed = WAVE_CONFIG.cometSpeed;

    // Start from edge, move inward
    const startFromEdge = Math.random() > 0.5;
    let x: number, y: number;

    if (startFromEdge) {
      // Start from left or right edge
      const fromLeft = Math.random() > 0.5;
      x = fromLeft ? -CONTAINER_WIDTH / 2 - 50 : CONTAINER_WIDTH / 2 + 50;
      y = randomRange(-CONTAINER_HEIGHT / 2, CONTAINER_HEIGHT / 2);
    } else {
      // Start from top or bottom edge
      const fromTop = Math.random() > 0.5;
      x = randomRange(-CONTAINER_WIDTH / 2, CONTAINER_WIDTH / 2);
      y = fromTop ? CONTAINER_HEIGHT / 2 + 50 : -CONTAINER_HEIGHT / 2 - 50;
    }

    // Velocity toward center with some randomness
    const targetX = randomRange(-CONTAINER_WIDTH / 4, CONTAINER_WIDTH / 4);
    const targetY = randomRange(-CONTAINER_HEIGHT / 4, CONTAINER_HEIGHT / 4);
    const dir = new Vector3(targetX - x, targetY - y, 0).normalize();

    const point: InfluencePoint = {
      id: nextId++,
      position: new Vector3(x, y, 0),
      velocity: dir.multiplyScalar(speed),
      radius: 0,
      strength: 0,
      tailLength: 0,
      type: 'comet',
      birthTime: performance.now(),
      lifetime: 5000,
    };

    pointsRef.current.push(point);
  }, []);

  const spawnRipple = useCallback(() => {
    const x = randomRange(-CONTAINER_WIDTH / 3, CONTAINER_WIDTH / 3);
    const y = randomRange(-CONTAINER_HEIGHT / 3, CONTAINER_HEIGHT / 3);

    const point: InfluencePoint = {
      id: nextId++,
      position: new Vector3(x, y, 0),
      velocity: new Vector3(WAVE_CONFIG.rippleExpandSpeed, 0, 0),
      radius: 0,
      strength: 1,
      tailLength: 0,
      type: 'ripple',
      birthTime: performance.now(),
      lifetime: 3000,
    };

    pointsRef.current.push(point);
  }, []);

  const spawnSweep = useCallback(() => {
    const isHorizontal = Math.random() > 0.5;
    const fromStart = Math.random() > 0.5;

    let x: number, y: number;
    let vx: number, vy: number;

    if (isHorizontal) {
      x = fromStart ? -CONTAINER_WIDTH / 2 - 30 : CONTAINER_WIDTH / 2 + 30;
      y = 0;
      vx = fromStart ? WAVE_CONFIG.sweepSpeed : -WAVE_CONFIG.sweepSpeed;
      vy = 0;
    } else {
      x = 0;
      y = fromStart ? -CONTAINER_HEIGHT / 2 - 30 : CONTAINER_HEIGHT / 2 + 30;
      vx = 0;
      vy = fromStart ? WAVE_CONFIG.sweepSpeed : -WAVE_CONFIG.sweepSpeed;
    }

    const point: InfluencePoint = {
      id: nextId++,
      position: new Vector3(x, y, 0),
      velocity: new Vector3(vx, vy, 0),
      radius: 20,
      strength: 0.6,
      tailLength: 0,
      type: 'sweep',
      birthTime: performance.now(),
      lifetime: 6000,
    };

    pointsRef.current.push(point);
  }, []);

  const spawnPoint = useCallback(() => {
    const rand = Math.random();
    if (rand < 0.6) {
      spawnComet();
    } else if (rand < 0.85) {
      spawnRipple();
    } else {
      spawnSweep();
    }
  }, [spawnComet, spawnRipple, spawnSweep]);

  const updatePoints = useCallback((deltaTime: number, currentTime: number) => {
    // Check if we should spawn a new point
    if (
      currentTime - lastSpawnTimeRef.current > nextSpawnIntervalRef.current &&
      pointsRef.current.length < WAVE_CONFIG.maxActivePoints
    ) {
      spawnPoint();
      lastSpawnTimeRef.current = currentTime;
      nextSpawnIntervalRef.current = randomRange(
        WAVE_CONFIG.spawnIntervalMin,
        WAVE_CONFIG.spawnIntervalMax
      );
    }

    // Update each point
    pointsRef.current = pointsRef.current.filter((point) => {
      const age = currentTime - point.birthTime;

      // Remove if fully expired
      if (age > point.lifetime) {
        return false;
      }

      // Always move first - movement never stops
      if (point.type === 'comet' || point.type === 'sweep') {
        point.position.x += point.velocity.x * deltaTime;
        point.position.y += point.velocity.y * deltaTime;
      } else if (point.type === 'ripple') {
        point.radius += point.velocity.x * deltaTime;
      }

      // Lifecycle phases with smooth transitions
      const fadeInDuration = 400;
      const growDuration = 1500;
      const fadeOutDuration = 1000;
      const fadeOutStart = point.lifetime - fadeOutDuration;

      if (age < fadeInDuration) {
        // Phase 1: Fade in and initial stretch
        const t = age / fadeInDuration;
        const eased = easeOutCubic(t);
        point.strength = eased;

        if (point.type === 'comet') {
          // Streak starts small and stretches out
          point.tailLength = WAVE_CONFIG.cometTailLength * 0.3 * eased;
          point.radius = WAVE_CONFIG.cometRadiusMin * eased;
        }
      } else if (age < fadeInDuration + growDuration && point.type === 'comet') {
        // Phase 2: Continue growing/stretching while moving
        const t = (age - fadeInDuration) / growDuration;
        const eased = easeOutCubic(t);
        point.strength = 1;
        point.tailLength = WAVE_CONFIG.cometTailLength * (0.3 + 0.7 * eased);
        point.radius = WAVE_CONFIG.cometRadiusMin + (WAVE_CONFIG.cometRadiusMax - WAVE_CONFIG.cometRadiusMin) * eased * 0.5;
      } else if (age > fadeOutStart) {
        // Phase 3: Dissolve while still moving
        const t = (age - fadeOutStart) / fadeOutDuration;
        const eased = easeInCubic(t);
        point.strength = 1 - eased;

        if (point.type === 'comet') {
          // Shrink from tail first, then head
          point.tailLength = point.tailLength * (1 - eased * 0.9);
          point.radius = point.radius * (1 - eased * 0.7);
        } else if (point.type === 'sweep') {
          point.radius = point.radius * (1 - eased * 0.6);
        }
      } else {
        point.strength = 1;
      }

      return true;
    });

    return pointsRef.current;
  }, [spawnPoint]);

  return { updatePoints, pointsRef };
}
