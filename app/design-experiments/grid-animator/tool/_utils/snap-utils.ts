import {
  type GridAnimatorInstance,
  type InstanceBounds,
  type SnapLine,
  type ActiveSnap,
  SnapAxis,
} from '../_types/grid-animator-types';
import { SNAP_THRESHOLD_PX } from '../_constants/grid-animator-constants';

/** Approximate character width as fraction of font size for label width estimation */
const CHAR_WIDTH_RATIO = 0.6;

/** Computes the axis-aligned bounding box for an instance (grid + label). */
export function computeInstanceBounds(instance: GridAnimatorInstance): InstanceBounds {
  const { grid, effects } = instance.config;
  const { rows, cols, cellSize, gap } = grid;

  const gridContentWidth = cols * cellSize + Math.max(0, cols - 1) * gap;
  const gridContentHeight = rows * cellSize + Math.max(0, rows - 1) * gap;

  const padding = Math.max(gap, 8);
  const glowPadding = effects.glowEnabled ? effects.glowRadius * 3 : 0;

  const gridBoxWidth = gridContentWidth + padding * 2 + glowPadding * 2;
  const gridBoxHeight = gridContentHeight + padding * 2 + glowPadding * 2;

  // Estimate label width
  let labelWidth = 0;
  if (instance.label) {
    labelWidth = instance.labelSpacing + instance.label.length * instance.labelFontSize * CHAR_WIDTH_RATIO;
  }

  const totalWidth = gridBoxWidth + labelWidth;
  const totalHeight = gridBoxHeight;

  return {
    left: instance.x,
    top: instance.y,
    right: instance.x + totalWidth,
    bottom: instance.y + totalHeight,
    centerX: instance.x + totalWidth / 2,
    centerY: instance.y + totalHeight / 2,
    width: totalWidth,
    height: totalHeight,
  };
}

/** Precomputes snap lines from all instances except the one being dragged. */
export function precomputeSnapLines(
  instances: Record<string, GridAnimatorInstance>,
  excludeId: string
): SnapLine[] {
  const lines: SnapLine[] = [];

  for (const id in instances) {
    if (id === excludeId) continue;

    const bounds = computeInstanceBounds(instances[id]);

    // Vertical snap lines (x-axis positions)
    lines.push({ axis: SnapAxis.Vertical, value: bounds.left, sourceId: id });
    lines.push({ axis: SnapAxis.Vertical, value: bounds.right, sourceId: id });
    lines.push({ axis: SnapAxis.Vertical, value: bounds.centerX, sourceId: id });

    // Horizontal snap lines (y-axis positions)
    lines.push({ axis: SnapAxis.Horizontal, value: bounds.top, sourceId: id });
    lines.push({ axis: SnapAxis.Horizontal, value: bounds.bottom, sourceId: id });
    lines.push({ axis: SnapAxis.Horizontal, value: bounds.centerY, sourceId: id });
  }

  return lines;
}

/** Computes snapped position from proposed position against precomputed snap lines. */
export function computeSnappedPosition(
  proposedX: number,
  proposedY: number,
  draggedWidth: number,
  draggedHeight: number,
  snapLines: SnapLine[],
  zoomScale: number
): { x: number; y: number; activeSnaps: ActiveSnap[] } {
  const threshold = SNAP_THRESHOLD_PX / zoomScale;
  const activeSnaps: ActiveSnap[] = [];

  // Dragged item edges
  const dragLeft = proposedX;
  const dragRight = proposedX + draggedWidth;
  const dragCenterX = proposedX + draggedWidth / 2;
  const dragTop = proposedY;
  const dragBottom = proposedY + draggedHeight;
  const dragCenterY = proposedY + draggedHeight / 2;

  let bestXSnap: { delta: number; snap: ActiveSnap } | null = null;
  let bestYSnap: { delta: number; snap: ActiveSnap } | null = null;

  for (const line of snapLines) {
    if (line.axis === SnapAxis.Vertical) {
      // Check dragged x-edges against this vertical line
      const edges: Array<{ value: number; edge: ActiveSnap['matchedEdge'] }> = [
        { value: dragLeft, edge: 'left' },
        { value: dragRight, edge: 'right' },
        { value: dragCenterX, edge: 'centerX' },
      ];

      for (const { value, edge } of edges) {
        const delta = Math.abs(value - line.value);
        if (delta < threshold && (!bestXSnap || delta < bestXSnap.delta)) {
          bestXSnap = { delta, snap: { line, matchedEdge: edge } };
        }
      }
    } else {
      // Check dragged y-edges against this horizontal line
      const edges: Array<{ value: number; edge: ActiveSnap['matchedEdge'] }> = [
        { value: dragTop, edge: 'top' },
        { value: dragBottom, edge: 'bottom' },
        { value: dragCenterY, edge: 'centerY' },
      ];

      for (const { value, edge } of edges) {
        const delta = Math.abs(value - line.value);
        if (delta < threshold && (!bestYSnap || delta < bestYSnap.delta)) {
          bestYSnap = { delta, snap: { line, matchedEdge: edge } };
        }
      }
    }
  }

  let finalX = proposedX;
  let finalY = proposedY;

  if (bestXSnap) {
    const { snap } = bestXSnap;
    const lineValue = snap.line.value;

    if (snap.matchedEdge === 'left') finalX = lineValue;
    else if (snap.matchedEdge === 'right') finalX = lineValue - draggedWidth;
    else if (snap.matchedEdge === 'centerX') finalX = lineValue - draggedWidth / 2;

    activeSnaps.push(snap);
  }

  if (bestYSnap) {
    const { snap } = bestYSnap;
    const lineValue = snap.line.value;

    if (snap.matchedEdge === 'top') finalY = lineValue;
    else if (snap.matchedEdge === 'bottom') finalY = lineValue - draggedHeight;
    else if (snap.matchedEdge === 'centerY') finalY = lineValue - draggedHeight / 2;

    activeSnaps.push(snap);
  }

  return { x: finalX, y: finalY, activeSnaps };
}
