export interface StarPosition {
  x: number;
  y: number;
}

export interface StarConfig {
  /** Size of the star (outer radius in pixels) */
  size: number;
  /** Position of the star center. Defaults to container center */
  position?: StarPosition;
  /** Number of star points. Defaults to 5 */
  points?: number;
  /** Ratio of inner radius to outer radius (0-1). Defaults to 0.4 */
  innerRadiusRatio?: number;
  /** Blur amount for soft edges. Auto-calculated if not provided */
  blurAmount?: number;
}

export interface StarRevealProps {
  /** Container width in pixels */
  width?: number;
  /** Container height in pixels */
  height?: number;
  /** Star configuration */
  star: StarConfig;
  /** Color of the overlay that hides the pattern */
  overlayColor?: string;
  /** Additional CSS classes */
  className?: string;
}

export interface PlusPatternProps {
  /** Grid gap between plus signs */
  gap?: number;
  /** Size of each plus sign */
  size?: number;
  /** Thickness of the plus arms */
  thickness?: number;
  /** Color of the plus signs */
  color?: string;
}
