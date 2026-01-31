'use client';

import { useRef, useMemo, useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  InstancedMesh,
  Object3D,
  Vector3,
  ShaderMaterial,
  InstancedBufferAttribute,
  Color,
  Shape,
  ShapeGeometry,
} from 'three';
import {
  GRID_CONFIG,
  CONTAINER_WIDTH,
  CONTAINER_HEIGHT,
  PLUS_THICKNESS_RATIO,
  PLUS_SIZE_MULTIPLIER,
} from './plus-matrix-constants';
import { calculateInfluence } from './plus-matrix-utils';
import { useInfluencePoints } from './use-influence-points';
import { useCursorInfluence } from './use-cursor-influence';
import { createImageMask } from './plus-matrix-mask';
import type { ImageMaskInput, MaskResult } from './plus-matrix-types';

// Re-export types for consumers
export type { ImageMaskInput } from './plus-matrix-types';
export { MaskFitMode } from './plus-matrix-types';

export interface PlusMatrixHandle {
  updateCursorPosition: (x: number, y: number) => void;
  handleMouseLeave: () => void;
}

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

/** Creates a plus/cross shape geometry */
function createPlusGeometry(): ShapeGeometry {
  const size = GRID_CONFIG.baseRadius * PLUS_SIZE_MULTIPLIER;
  const halfSize = size / 2;
  const halfThickness = PLUS_THICKNESS_RATIO * halfSize;

  const shape = new Shape();
  // Draw plus shape clockwise starting from top of vertical bar
  shape.moveTo(-halfThickness, halfSize);
  shape.lineTo(halfThickness, halfSize);
  shape.lineTo(halfThickness, halfThickness);
  shape.lineTo(halfSize, halfThickness);
  shape.lineTo(halfSize, -halfThickness);
  shape.lineTo(halfThickness, -halfThickness);
  shape.lineTo(halfThickness, -halfSize);
  shape.lineTo(-halfThickness, -halfSize);
  shape.lineTo(-halfThickness, -halfThickness);
  shape.lineTo(-halfSize, -halfThickness);
  shape.lineTo(-halfSize, halfThickness);
  shape.lineTo(-halfThickness, halfThickness);
  shape.closePath();

  return new ShapeGeometry(shape);
}

interface PlusMatrixSceneProps {
  mask?: ImageMaskInput;
}

const PlusMatrixScene = forwardRef<PlusMatrixHandle, PlusMatrixSceneProps>(
  function PlusMatrixScene({ mask }, ref) {
    const meshRef = useRef<InstancedMesh>(null);
    const dummy = useMemo(() => new Object3D(), []);
    const { updatePoints } = useInfluencePoints();
    const {
      updateCursorPosition,
      handleMouseLeave,
      updateCursorInfluence,
    } = useCursorInfluence();
    const [maskResult, setMaskResult] = useState<MaskResult | null>(null);

    useImperativeHandle(ref, () => ({
      updateCursorPosition,
      handleMouseLeave,
    }), [updateCursorPosition, handleMouseLeave]);

    // Create mask on client side
    useEffect(() => {
      let cancelled = false;

      createImageMask(mask).then((result) => {
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

    const geometry = useMemo(() => createPlusGeometry(), []);

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

      // Update and include cursor influence
      const cursorPoint = updateCursorInfluence(delta);
      const allPoints = cursorPoint ? [...activePoints, cursorPoint] : activePoints;

      positions.forEach((pos, i) => {
        const influence = calculateInfluence(pos, allPoints);
        const maskIntensity = maskResult?.intensities[i] ?? 0;
        const baseScale = 1 + maskIntensity * 0.6;
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
);

export interface PlusMatrixProps {
  /** Image to use as mask - dark areas will be highlighted */
  mask?: ImageMaskInput;
  /** Container width in pixels */
  width?: number;
  /** Container height in pixels */
  height?: number;
  /** Additional class names for the container */
  className?: string;
}

export function PlusMatrix({
  mask,
  width = CONTAINER_WIDTH,
  height = CONTAINER_HEIGHT,
  className,
}: PlusMatrixProps) {
  const sceneRef = useRef<PlusMatrixHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !sceneRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - width / 2;
    const y = -(e.clientY - rect.top - height / 2);

    sceneRef.current.updateCursorPosition(x, y);
  }, [width, height]);

  const handleMouseLeave = useCallback(() => {
    sceneRef.current?.handleMouseLeave();
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        orthographic
        camera={{
          zoom: 1,
          position: [0, 0, 100],
          near: 0.1,
          far: 1000,
        }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <PlusMatrixScene ref={sceneRef} mask={mask} />
      </Canvas>
    </div>
  );
}
