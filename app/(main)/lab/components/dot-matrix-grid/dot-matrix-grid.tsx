'use client';

import { useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { LabItemFooter } from '../lab-item-footer';
import { DotMatrixScene, DotMatrixSceneHandle } from './dot-matrix-scene';
import { CONTAINER_WIDTH, CONTAINER_HEIGHT } from './dot-matrix-grid-constants';
import type { MaskInput } from './dot-matrix-grid-types';

// Re-export mask types for consumers
export type { MaskInput, ImageMaskInput, TextMaskInput, RenderMaskInput } from './dot-matrix-grid-types';
export { MaskFitMode } from './dot-matrix-grid-types';

interface DotMatrixGridProps {
  mask?: MaskInput;
}

export function DotMatrixGrid({ mask }: DotMatrixGridProps) {
  const sceneRef = useRef<DotMatrixSceneHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
          <DotMatrixScene ref={sceneRef} mask={mask} />
        </Canvas>
      </div>
      <LabItemFooter
        title="SDF dot matrix"
        description="GPU-instanced dots with signed distance field influence mapping."
      />
    </div>
  );
}
