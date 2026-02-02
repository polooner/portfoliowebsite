export interface StarRevealProps {
  /** Container width in pixels */
  width?: number;
  /** Container height in pixels */
  height?: number;
  /** Blur amount for soft edges - lower = sharper tips */
  blurAmount?: number;
  /** Outer radius of the star (length to tips) */
  outerRadius?: number;
  /** Inner radius of the star (length to valleys) - lower = sharper points */
  innerRadius?: number;
  /** Number of star points */
  points?: number;
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
