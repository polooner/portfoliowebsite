// ── 3D Point on Unit Sphere ──────────────────────────────────────────────

export interface SpherePoint3D {
  x: number;
  y: number;
  z: number;
}

// ── Projected 2D Dot (ready to draw) ────────────────────────────────────

export interface ProjectedDot {
  screenX: number;
  screenY: number;
  radius: number;
  opacity: number;
  z: number;
}

// ── Drag Interaction State ──────────────────────────────────────────────

export interface DragState {
  isDragging: boolean;
  lastX: number;
  lastY: number;
  momentumDx: number;
  momentumDy: number;
}

// ── 3x3 Rotation Matrix (row-major) ────────────────────────────────────

export type RotationMatrix = [
  number, number, number,
  number, number, number,
  number, number, number,
];

// ── Cursor Position (screen-space relative to canvas) ───────────────────

export interface CursorPosition {
  x: number;
  y: number;
}
