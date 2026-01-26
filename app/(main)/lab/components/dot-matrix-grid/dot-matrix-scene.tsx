'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  InstancedMesh,
  Object3D,
  Vector3,
  CircleGeometry,
  ShaderMaterial,
  InstancedBufferAttribute,
  Color,
} from 'three';
import {
  GRID_CONFIG,
  CONTAINER_WIDTH,
  CONTAINER_HEIGHT,
} from './dot-matrix-grid-constants';
import { calculateInfluence } from './sdf-utils';
import { useInfluencePoints } from './use-influence-points';
import { createMask } from './grid-mask';
import type { MaskInput, MaskResult } from './dot-matrix-grid-types';

const vertexShader = `
  attribute float influence;
  attribute float maskIntensity;
  varying float vInfluence;
  varying float vMaskIntensity;

  void main() {
    vInfluence = influence;
    vMaskIntensity = maskIntensity;
    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uBaseOpacity;
  uniform float uMaskOpacity;
  uniform float uMaxOpacity;
  varying float vInfluence;
  varying float vMaskIntensity;

  void main() {
    float baseOp = mix(uBaseOpacity, uMaskOpacity, vMaskIntensity);
    float opacity = baseOp + vInfluence * (uMaxOpacity - baseOp);
    gl_FragColor = vec4(uColor, opacity);
  }
`;

interface DotMatrixSceneProps {
  mask?: MaskInput;
}

const DEFAULT_MASK: MaskInput = { type: 'text', content: 'grid core' };

export function DotMatrixScene({ mask = DEFAULT_MASK }: DotMatrixSceneProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const { updatePoints } = useInfluencePoints();
  const [maskResult, setMaskResult] = useState<MaskResult | null>(null);

  // Create mask on client side (async for image support)
  useEffect(() => {
    let cancelled = false;

    createMask(mask).then((result) => {
      if (!cancelled) {
        setMaskResult(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [mask]);

  const { positions, cols, rows } = useMemo(() => {
    const cols = Math.floor(CONTAINER_WIDTH / GRID_CONFIG.spacing);
    const rows = Math.floor(CONTAINER_HEIGHT / GRID_CONFIG.spacing);
    const pos: Vector3[] = [];

    const totalWidth = (cols - 1) * GRID_CONFIG.spacing;
    const totalHeight = (rows - 1) * GRID_CONFIG.spacing;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        pos.push(
          new Vector3(
            col * GRID_CONFIG.spacing - totalWidth / 2,
            row * GRID_CONFIG.spacing - totalHeight / 2,
            0
          )
        );
      }
    }

    return { positions: pos, cols, rows };
  }, []);

  const dotCount = cols * rows;

  const geometry = useMemo(() => {
    return new CircleGeometry(GRID_CONFIG.baseRadius, 16);
  }, []);

  const influenceAttribute = useMemo(() => {
    return new InstancedBufferAttribute(new Float32Array(dotCount), 1);
  }, [dotCount]);

  const maskIntensityAttribute = useMemo(() => {
    return new InstancedBufferAttribute(new Float32Array(dotCount), 1);
  }, [dotCount]);

  // Update mask intensity attribute when mask changes
  useEffect(() => {
    if (maskResult) {
      for (let i = 0; i < dotCount; i++) {
        maskIntensityAttribute.array[i] = maskResult.intensities[i] ?? 0;
      }
    } else {
      maskIntensityAttribute.array.fill(0);
    }
    maskIntensityAttribute.needsUpdate = true;
  }, [maskResult, dotCount, maskIntensityAttribute]);

  const material = useMemo(() => {
    const mat = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor: { value: new Color(0x000000) },
        uBaseOpacity: { value: GRID_CONFIG.baseOpacity },
        uMaskOpacity: { value: 0.95 },
        uMaxOpacity: { value: GRID_CONFIG.maxOpacity },
      },
      transparent: true,
    });
    return mat;
  }, []);

  // Initialize positions
  useMemo(() => {
    if (!meshRef.current) return;

    positions.forEach((pos, i) => {
      dummy.position.copy(pos);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, dummy]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const currentTime = performance.now();
    const activePoints = updatePoints(delta, currentTime);

    positions.forEach((pos, i) => {
      const influence = calculateInfluence(pos, activePoints);
      const maskIntensity = maskResult?.intensities[i] ?? 0;
      const baseScale = 1 + maskIntensity * 0.6; // Scale up for masked areas
      const scale = baseScale + influence * (GRID_CONFIG.maxScale - 1);

      dummy.position.copy(pos);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      influenceAttribute.array[i] = influence;
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    influenceAttribute.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, dotCount]}
      frustumCulled={false}
    >
      <primitive object={geometry} attach="geometry">
        <primitive object={influenceAttribute} attach="attributes-influence" />
        <primitive object={maskIntensityAttribute} attach="attributes-maskIntensity" />
      </primitive>
    </instancedMesh>
  );
}
