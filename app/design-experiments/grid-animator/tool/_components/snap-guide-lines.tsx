'use client';

import { memo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGridAnimatorStore } from '../_store/grid-animator-store';
import { SnapAxis } from '../_types/grid-animator-types';
import { SELECTION_COLOR } from '../_constants/grid-animator-constants';

/** Large extent for snap guide lines to span the visible canvas area */
const LINE_EXTENT = 10000;

function SnapGuideLinesInner() {
  const activeSnaps = useGridAnimatorStore(
    useShallow((state) => state.dragState?.activeSnaps ?? [])
  );

  if (activeSnaps.length === 0) return null;

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 overflow-visible"
      style={{ width: 1, height: 1 }}
    >
      {activeSnaps.map((snap, i) => {
          const { axis, value } = snap.line;

          if (axis === SnapAxis.Vertical) {
            return (
              <line
                key={i}
                x1={value}
                y1={-LINE_EXTENT}
                x2={value}
                y2={LINE_EXTENT}
                stroke={SELECTION_COLOR}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            );
          }

          return (
            <line
              key={i}
              x1={-LINE_EXTENT}
              y1={value}
              x2={LINE_EXTENT}
              y2={value}
              stroke={SELECTION_COLOR}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
    </svg>
  );
}

export const SnapGuideLines = memo(SnapGuideLinesInner);
