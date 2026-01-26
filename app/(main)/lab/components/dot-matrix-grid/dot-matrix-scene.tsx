'use client';

import { useRef, useMemo } from 'react';
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

const vertexShader = `
  attribute float influence;
  varying float vInfluence;

  void main() {
    vInfluence = influence;
    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uBaseOpacity;
  uniform float uMaxOpacity;
  varying float vInfluence;

  void main() {
    float opacity = uBaseOpacity + vInfluence * (uMaxOpacity - uBaseOpacity);
    gl_FragColor = vec4(uColor, opacity);
  }
`;

export function DotMatrixScene() {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const { updatePoints } = useInfluencePoints();

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

  const material = useMemo(() => {
    const mat = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor: { value: new Color(0x000000) },
        uBaseOpacity: { value: GRID_CONFIG.baseOpacity },
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

  useFrame(() => {
    if (!meshRef.current) return;

    const currentTime = performance.now();
    const activePoints = updatePoints(currentTime);

    positions.forEach((pos, i) => {
      const influence = calculateInfluence(pos, activePoints);
      const scale = 1 + influence * (GRID_CONFIG.maxScale - 1);

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
      </primitive>
    </instancedMesh>
  );
}
