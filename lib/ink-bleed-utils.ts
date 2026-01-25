// Threshold table values for discrete transfer function
// Lower numbers = more bleed visible, higher = sharper cutoff
export const THRESHOLD_TABLE: Record<number, string> = {
  0: '1',
  10: '0 1 1 1 1 1 1 1 1 1',
  20: '0 0 1 1 1 1 1 1 1 1',
  30: '0 0 0 1 1 1 1 1 1 1',
  40: '0 0 0 0 1 1 1 1 1 1',
  50: '0 1',
  60: '0 0 0 0 0 0 1 1 1 1',
  70: '0 0 0 0 0 0 0 1 1 1',
  80: '0 0 0 0 0 0 0 0 1 1',
  90: '0 0 0 0 0 0 0 0 0 1',
  100: '0',
};

export interface InkBleedConfig {
  blur: number;              // Blur amount in pixels
  thresholdTable: string;    // Discrete transfer table values
  filterId?: string;
}

// CSS value generators
export function getBlurValue(blur: number): string {
  return `${blur}px`;
}

export function getFilterValue(blur: number, filterId: string): string {
  return `blur(${blur}px) url(#${filterId})`;
}
