import { CONTAINER_WIDTH, CONTAINER_HEIGHT, GRID_CONFIG } from './plus-matrix-constants';
import type { ImageMaskInput, MaskResult } from './plus-matrix-types';
import { MaskFitMode } from './plus-matrix-types';

/**
 * Loads an image from a URL
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Calculates dimensions and position for fitting an image into a container
 */
function calculateFitDimensions(
  imgWidth: number,
  imgHeight: number,
  containerWidth: number,
  containerHeight: number,
  fit: MaskFitMode
): { width: number; height: number; x: number; y: number } {
  const imgAspect = imgWidth / imgHeight;
  const containerAspect = containerWidth / containerHeight;

  let width: number;
  let height: number;

  switch (fit) {
    case MaskFitMode.Fill:
      width = containerWidth;
      height = containerHeight;
      break;

    case MaskFitMode.Cover:
      if (imgAspect > containerAspect) {
        height = containerHeight;
        width = height * imgAspect;
      } else {
        width = containerWidth;
        height = width / imgAspect;
      }
      break;

    case MaskFitMode.Contain:
    default:
      if (imgAspect > containerAspect) {
        width = containerWidth;
        height = width / imgAspect;
      } else {
        height = containerHeight;
        width = height * imgAspect;
      }
      break;
  }

  const x = (containerWidth - width) / 2;
  const y = (containerHeight - height) / 2;

  return { width, height, x, y };
}

/**
 * Samples canvas pixel data at grid positions to create mask intensities
 */
function sampleCanvasAtGridPositions(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number
): MaskResult {
  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  const pixels = imageData.data;

  const cols = Math.floor(canvasWidth / GRID_CONFIG.spacing);
  const rows = Math.floor(canvasHeight / GRID_CONFIG.spacing);
  const totalWidth = (cols - 1) * GRID_CONFIG.spacing;
  const totalHeight = (rows - 1) * GRID_CONFIG.spacing;
  const offsetX = (canvasWidth - totalWidth) / 2;
  const offsetY = (canvasHeight - totalHeight) / 2;

  const intensities = new Float32Array(cols * rows);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const dotIndex = row * cols + col;

      const canvasX = Math.round(offsetX + col * GRID_CONFIG.spacing);
      // Flip Y: canvas Y=0 is top, but grid row=0 maps to bottom in Three.js
      const canvasY = Math.round(offsetY + (rows - 1 - row) * GRID_CONFIG.spacing);

      const pixelIndex = (canvasY * canvasWidth + canvasX) * 4;
      const r = pixels[pixelIndex];
      const g = pixels[pixelIndex + 1];
      const b = pixels[pixelIndex + 2];

      // Calculate luminance (perceived brightness)
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      // Invert: dark areas = high intensity (visible mask)
      intensities[dotIndex] = 1 - luminance;
    }
  }

  return { intensities, cols, rows };
}

/**
 * Creates an offscreen canvas with white background
 */
function createOffscreenCanvas(): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
} {
  const canvas = document.createElement('canvas');
  canvas.width = CONTAINER_WIDTH;
  canvas.height = CONTAINER_HEIGHT;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to create canvas context');
  }

  // White background (will be sampled as "no mask")
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CONTAINER_WIDTH, CONTAINER_HEIGHT);

  return { canvas, ctx };
}

/**
 * Creates an empty mask result (all zeros)
 */
function createEmptyMaskResult(): MaskResult {
  const cols = Math.floor(CONTAINER_WIDTH / GRID_CONFIG.spacing);
  const rows = Math.floor(CONTAINER_HEIGHT / GRID_CONFIG.spacing);
  return {
    intensities: new Float32Array(cols * rows),
    cols,
    rows,
  };
}

/**
 * Creates a mask from an image source
 */
export async function createImageMask(
  input: ImageMaskInput | undefined
): Promise<MaskResult> {
  if (!input) {
    return createEmptyMaskResult();
  }

  const img = await loadImage(input.src);
  const { ctx } = createOffscreenCanvas();

  const { width, height, x, y } = calculateFitDimensions(
    img.width,
    img.height,
    CONTAINER_WIDTH,
    CONTAINER_HEIGHT,
    input.fit ?? MaskFitMode.Contain
  );

  ctx.drawImage(img, x, y, width, height);

  return sampleCanvasAtGridPositions(ctx, CONTAINER_WIDTH, CONTAINER_HEIGHT);
}
