import type { GridAnimatorInstance } from '../_types/grid-animator-types';
import { computeInstanceBounds } from './snap-utils';

interface CanvasPoint {
  x: number;
  y: number;
}

interface CanvasTransform {
  x: number;
  y: number;
  scale: number;
}

/**
 * Converts screen coordinates to canvas-space coordinates,
 * accounting for the transform layer's centering + translate + scale.
 */
export function screenToCanvas(
  screenX: number,
  screenY: number,
  transform: CanvasTransform,
  containerRect: DOMRect
): CanvasPoint {
  // The transform layer is centered via left:50% top:50% with negative margins,
  // then translated + scaled. Reverse that to get canvas coords.
  const relativeX = screenX - containerRect.left;
  const relativeY = screenY - containerRect.top;

  // The transform origin is at the center of the container, offset by transform.x/y
  const centerX = containerRect.width / 2;
  const centerY = containerRect.height / 2;

  // Canvas point = (screen point - container center - translate) / scale
  const canvasX = (relativeX - centerX - transform.x) / transform.scale;
  const canvasY = (relativeY - centerY - transform.y) / transform.scale;

  return { x: canvasX, y: canvasY };
}

/**
 * Hit tests instances in reverse z-order (topmost first).
 * Returns the ID of the first instance whose bounds contain the point, or null.
 */
export function hitTestInstances(
  canvasPoint: CanvasPoint,
  instances: Record<string, GridAnimatorInstance>,
  instanceOrder: string[]
): string | null {
  // Iterate in reverse for topmost-first hit testing
  for (let i = instanceOrder.length - 1; i >= 0; i--) {
    const id = instanceOrder[i];
    const instance = instances[id];
    if (!instance) continue;

    const bounds = computeInstanceBounds(instance);

    if (
      canvasPoint.x >= bounds.left &&
      canvasPoint.x <= bounds.right &&
      canvasPoint.y >= bounds.top &&
      canvasPoint.y <= bounds.bottom
    ) {
      return id;
    }
  }

  return null;
}
