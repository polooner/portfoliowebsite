import type { StreamingConfig } from './streaming-text-carousel-types';

export const texts = [
  'Until you make the unconscious conscious, it will direct your life and you will call it fate. Your visions will become clear only when you can look into your own heart. Who looks outside, dreams; who looks inside, awakes.',
];

export const DEFAULT_CONFIG: StreamingConfig = {
  streamingSpeed: 30,
  maxWidth: 400,
  maxLines: 4,
  scaleFactorPerLine: 0.85,
};
