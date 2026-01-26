'use client';

import { Canvas } from '@react-three/fiber';
import { LabItemFooter } from '../lab-item-footer';
import { DotMatrixScene } from './dot-matrix-scene';
import { CONTAINER_WIDTH, CONTAINER_HEIGHT } from './dot-matrix-grid-constants';
import type { MaskInput } from './dot-matrix-grid-types';

// Re-export mask types for consumers
export type { MaskInput, ImageMaskInput, TextMaskInput, RenderMaskInput } from './dot-matrix-grid-types';
export { MaskFitMode } from './dot-matrix-grid-types';

interface DotMatrixGridProps {
  mask?: MaskInput;
}

export function DotMatrixGrid({ mask }: DotMatrixGridProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative bg-white rounded-2xl overflow-hidden"
        style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
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
          <DotMatrixScene mask={mask} />
        </Canvas>
      </div>
      <LabItemFooter
        title="SDF dot matrix"
        description="GPU-instanced dots with signed distance field influence mapping."
      />
    </div>
  );
}
