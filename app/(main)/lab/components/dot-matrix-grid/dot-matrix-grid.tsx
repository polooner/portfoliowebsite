'use client';

import { useRef, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { LabItemFooter } from '../lab-item-footer';
import { VariationsSwitch } from '@/components/variations-switch';
import { DotMatrixScene, DotMatrixSceneHandle } from './dot-matrix-scene';
import { CONTAINER_WIDTH, CONTAINER_HEIGHT } from './dot-matrix-grid-constants';
import type { MaskInput } from './dot-matrix-grid-types';
import { GridShape } from './dot-matrix-grid-types';

// Re-export mask types for consumers
export type { MaskInput, ImageMaskInput, TextMaskInput, RenderMaskInput } from './dot-matrix-grid-types';
export { MaskFitMode, GridShape } from './dot-matrix-grid-types';

interface Variation {
  mask: MaskInput;
  shape: GridShape;
  title: string;
  description: string;
}

const VARIATIONS: Variation[] = [
  {
    mask: { type: 'text', content: 'grid core' },
    shape: GridShape.Circle,
    title: 'SDF dot matrix',
    description: 'GPU-instanced dots with signed distance field influence mapping.',
  },
  {
    mask: { type: 'text', content: 'grid core' },
    shape: GridShape.Square,
    title: 'SDF square matrix',
    description: 'GPU-instanced squares with signed distance field influence mapping.',
  },
  {
    mask: { type: 'text', content: 'grid core' },
    shape: GridShape.Diamond,
    title: 'SDF diamond matrix',
    description: 'GPU-instanced diamonds with signed distance field influence mapping.',
  },
  {
    mask: { type: 'text', content: 'grid core' },
    shape: GridShape.Plus,
    title: 'SDF plus matrix',
    description: 'GPU-instanced plus signs with signed distance field influence mapping.',
  },
];

export function DotMatrixGrid() {
  const sceneRef = useRef<DotMatrixSceneHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [variationIndex, setVariationIndex] = useState(0);

  const currentVariation = VARIATIONS[variationIndex];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !sceneRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    // Convert DOM coordinates to Three.js world coordinates
    // DOM: (0,0) at top-left, Y increases downward
    // Three.js: (0,0) at center, Y increases upward
    const x = e.clientX - rect.left - CONTAINER_WIDTH / 2;
    const y = -(e.clientY - rect.top - CONTAINER_HEIGHT / 2);

    sceneRef.current.updateCursorPosition(x, y);
  }, []);

  const handleMouseLeave = useCallback(() => {
    sceneRef.current?.handleMouseLeave();
  }, []);

  const handlePrevious = useCallback(() => {
    setVariationIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setVariationIndex((prev) => Math.min(VARIATIONS.length - 1, prev + 1));
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={containerRef}
        className="relative bg-white rounded-2xl overflow-hidden"
        style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
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
          <DotMatrixScene ref={sceneRef} mask={currentVariation.mask} shape={currentVariation.shape} />
        </Canvas>
      </div>
      <LabItemFooter
        title={currentVariation.title}
        description={currentVariation.description}
        actions={
          <VariationsSwitch
            current={variationIndex + 1}
            total={VARIATIONS.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        }
      />
    </div>
  );
}
