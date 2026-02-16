'use client';

import { memo, useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGridAnimatorStore } from '../_store/grid-animator-store';
import { ResizeCorner } from '../_types/grid-animator-types';
import { computeInstanceBounds, computeGroupBounds } from '../_utils/snap-utils';
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
  const selectedIds = useGridAnimatorStore(
    useShallow((state) => state.selectedIds)
  );
  const instances = useGridAnimatorStore((state) => state.instances);

  const handleCornerMouseDown = useCallback(
    (corner: ResizeCorner, e: React.MouseEvent) => {
      e.stopPropagation();
      onResizeStart(corner, e.clientX, e.clientY);
    },
    [onResizeStart]
  );

  const groupBounds = useMemo(() => {
    if (selectedIds.length === 0) return null;
    return computeGroupBounds(selectedIds, instances);
  }, [selectedIds, instances]);

  if (selectedIds.length === 0 || !groupBounds) return null;

  const inverseScale = 1 / zoomScale;
  const handleSize = HANDLE_SIZE_PX * inverseScale;
  const halfHandle = handleSize / 2;
  const strokeWidth = STROKE_WIDTH * inverseScale;

  const isMultiSelect = selectedIds.length > 1;

  const cornerPositions = {
    [ResizeCorner.TopLeft]: { x: groupBounds.left - halfHandle, y: groupBounds.top - halfHandle },
    [ResizeCorner.TopRight]: { x: groupBounds.right - halfHandle, y: groupBounds.top - halfHandle },
    [ResizeCorner.BottomLeft]: { x: groupBounds.left - halfHandle, y: groupBounds.bottom - halfHandle },
    [ResizeCorner.BottomRight]: { x: groupBounds.right - halfHandle, y: groupBounds.bottom - halfHandle },
  };

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 overflow-visible"
      style={{ width: 1, height: 1 }}
    >
      {/* Individual instance outlines */}
      {selectedIds.map((id) => {
        const inst = instances[id];
        if (!inst) return null;
        const bounds = computeInstanceBounds(inst);

        return (
          <rect
            key={id}
            x={bounds.left}
            y={bounds.top}
            width={bounds.width}
            height={bounds.height}
            fill="none"
            stroke={SELECTION_COLOR}
            strokeWidth={strokeWidth}
          />
        );
      })}

      {/* Group bounding box (only when multi-selecting) */}
      {isMultiSelect && (
        <rect
          x={groupBounds.left}
          y={groupBounds.top}
          width={groupBounds.width}
          height={groupBounds.height}
          fill="none"
          stroke={SELECTION_COLOR}
          strokeWidth={strokeWidth}
          strokeDasharray={`${4 * inverseScale} ${4 * inverseScale}`}
        />
      )}

      {/* Resize handles on the group bounding box */}
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
