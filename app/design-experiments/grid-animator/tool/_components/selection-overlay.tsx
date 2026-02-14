'use client';

import { memo, useCallback } from 'react';
import { useGridAnimatorStore } from '../_store/grid-animator-store';
import { ResizeCorner } from '../_types/grid-animator-types';
import { computeInstanceBounds } from '../_utils/snap-utils';
import {
  SELECTION_COLOR,
  HANDLE_SIZE_PX,
} from '../_constants/grid-animator-constants';

const STROKE_WIDTH = 1.5;

const CORNER_HANDLES = [
  { corner: ResizeCorner.TopLeft, cursor: 'nwse-resize' },
  { corner: ResizeCorner.TopRight, cursor: 'nesw-resize' },
  { corner: ResizeCorner.BottomLeft, cursor: 'nesw-resize' },
  { corner: ResizeCorner.BottomRight, cursor: 'nwse-resize' },
] as const;

interface SelectionOverlayProps {
  zoomScale: number;
  onResizeStart: (corner: ResizeCorner, screenX: number, screenY: number) => void;
}

function SelectionOverlayInner({ zoomScale, onResizeStart }: SelectionOverlayProps) {
  const selectedId = useGridAnimatorStore((state) => state.selectedId);
  const instance = useGridAnimatorStore(
    (state) => (state.selectedId ? state.instances[state.selectedId] : null)
  );

  const handleCornerMouseDown = useCallback(
    (corner: ResizeCorner, e: React.MouseEvent) => {
      e.stopPropagation();
      onResizeStart(corner, e.clientX, e.clientY);
    },
    [onResizeStart]
  );

  if (!selectedId || !instance) return null;

  const bounds = computeInstanceBounds(instance);
  const inverseScale = 1 / zoomScale;
  const handleSize = HANDLE_SIZE_PX * inverseScale;
  const halfHandle = handleSize / 2;
  const strokeWidth = STROKE_WIDTH * inverseScale;

  const cornerPositions = {
    [ResizeCorner.TopLeft]: { x: bounds.left - halfHandle, y: bounds.top - halfHandle },
    [ResizeCorner.TopRight]: { x: bounds.right - halfHandle, y: bounds.top - halfHandle },
    [ResizeCorner.BottomLeft]: { x: bounds.left - halfHandle, y: bounds.bottom - halfHandle },
    [ResizeCorner.BottomRight]: { x: bounds.right - halfHandle, y: bounds.bottom - halfHandle },
  };

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 overflow-visible"
      style={{ width: 1, height: 1 }}
    >
      {/* Selection outline */}
      <rect
        x={bounds.left}
        y={bounds.top}
        width={bounds.width}
        height={bounds.height}
        fill="none"
        stroke={SELECTION_COLOR}
        strokeWidth={strokeWidth}
      />

      {/* Corner resize handles */}
      {CORNER_HANDLES.map(({ corner, cursor }) => {
        const pos = cornerPositions[corner];
        return (
          <rect
            key={corner}
            x={pos.x}
            y={pos.y}
            width={handleSize}
            height={handleSize}
            fill="white"
            stroke={SELECTION_COLOR}
            strokeWidth={strokeWidth}
            className="pointer-events-auto"
            style={{ cursor }}
            onMouseDown={(e) => handleCornerMouseDown(corner, e)}
          />
        );
      })}

    </svg>
  );
}

export const SelectionOverlay = memo(SelectionOverlayInner);
