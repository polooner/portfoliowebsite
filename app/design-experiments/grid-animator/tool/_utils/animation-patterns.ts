import { AnimationPattern, Direction } from '../_types/grid-animator-types';
import {
  SPINNER_ACTIVE_FRACTION,
  BREATHE_CYCLE_MULTIPLIER,
  BREATHE_OPACITY_MIN,
  BREATHE_OPACITY_MAX,
} from '../_constants/grid-animator-constants';

/**
 * Computes a normalized delay (0-1) for a cell based on the animation pattern.
 * Only active cells are considered for spinner; for other patterns all grid positions are used.
 */
export function computeCellDelay(
  row: number,
  col: number,
  activeCells: boolean[][],
  rows: number,
  cols: number,
  pattern: AnimationPattern,
  direction: Direction
): number {
  switch (pattern) {
    case AnimationPattern.Spinner:
      return computeSpinnerDelay(row, col, activeCells, rows, cols);
    case AnimationPattern.WaveDiagonal:
      return computeWaveDiagonalDelay(row, col, rows, cols);
    case AnimationPattern.WaveHorizontal:
      return computeWaveHorizontalDelay(col, cols);
    case AnimationPattern.WaveVertical:
      return computeWaveVerticalDelay(row, rows);
    case AnimationPattern.Blink:
      return 0;
    case AnimationPattern.Linear:
      return computeLinearDelay(row, col, rows, cols);
    case AnimationPattern.Directional:
      return computeDirectionalDelay(row, col, rows, cols, direction);
    default:
      return 0;
  }
}

/** Spinner: sort active cells by angle from center, delay = sorted index / total */
function computeSpinnerDelay(
  row: number,
  col: number,
  activeCells: boolean[][],
  rows: number,
  cols: number
): number {
  const centerRow = (rows - 1) / 2;
  const centerCol = (cols - 1) / 2;

  // Collect all active cells with their angles
  const activeCellAngles: Array<{ row: number; col: number; angle: number }> = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (activeCells[r]?.[c]) {
        activeCellAngles.push({
          row: r,
          col: c,
          angle: Math.atan2(r - centerRow, c - centerCol),
        });
      }
    }
  }

  if (activeCellAngles.length === 0) return 0;

  // Sort by angle
  activeCellAngles.sort((a, b) => a.angle - b.angle);

  // Find the index of this cell
  const index = activeCellAngles.findIndex((c) => c.row === row && c.col === col);
  if (index === -1) return 0;

  return index / activeCellAngles.length;
}

/** Wave diagonal: delay = (row + col) / max diagonal distance */
function computeWaveDiagonalDelay(
  row: number,
  col: number,
  rows: number,
  cols: number
): number {
  const maxDist = rows - 1 + (cols - 1);
  return maxDist === 0 ? 0 : (row + col) / maxDist;
}

/** Wave horizontal: delay = col / (cols - 1) */
function computeWaveHorizontalDelay(col: number, cols: number): number {
  return cols <= 1 ? 0 : col / (cols - 1);
}

/** Wave vertical: delay = row / (rows - 1) */
function computeWaveVerticalDelay(row: number, rows: number): number {
  return rows <= 1 ? 0 : row / (rows - 1);
}

/** Linear: reading order, delay = (row * cols + col) / (totalCells - 1) */
function computeLinearDelay(
  row: number,
  col: number,
  rows: number,
  cols: number
): number {
  const totalCells = rows * cols;
  return totalCells <= 1 ? 0 : (row * cols + col) / (totalCells - 1);
}

/** Directional: delay based on distance along the chosen direction axis */
function computeDirectionalDelay(
  row: number,
  col: number,
  rows: number,
  cols: number,
  direction: Direction
): number {
  switch (direction) {
    case Direction.Right:
      return cols <= 1 ? 0 : col / (cols - 1);
    case Direction.Left:
      return cols <= 1 ? 0 : (cols - 1 - col) / (cols - 1);
    case Direction.Down:
      return rows <= 1 ? 0 : row / (rows - 1);
    case Direction.Up:
      return rows <= 1 ? 0 : (rows - 1 - row) / (rows - 1);
    default:
      return 0;
  }
}

/**
 * Computes the intensity (0-1) for an active cell at time t,
 * phase-shifted by its computed delay. Uses a sine wave to create
 * a smooth pulsing effect where each cell peaks at a different time.
 */
export function computeCellIntensity(t: number, delay: number): number {
  const phase = (t - delay + 1) % 1;
  // Create a peak around the active fraction
  if (phase < SPINNER_ACTIVE_FRACTION) {
    // Smoothly ramp up and down using a sine curve
    return Math.sin((phase / SPINNER_ACTIVE_FRACTION) * Math.PI);
  }
  return 0;
}

/**
 * Computes the breathe intensity for inactive cells.
 * A slow sine wave that oscillates between min and max opacity.
 */
export function computeBreatheIntensity(t: number): number {
  const breathePhase = (t * BREATHE_CYCLE_MULTIPLIER) % 1;
  const sineValue = (Math.sin(breathePhase * Math.PI * 2) + 1) / 2;
  return BREATHE_OPACITY_MIN + sineValue * (BREATHE_OPACITY_MAX - BREATHE_OPACITY_MIN);
}
