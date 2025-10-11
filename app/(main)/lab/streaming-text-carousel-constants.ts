import type { StreamingConfig } from './streaming-text-carousel-types';

export const blurInAnimation = `
@keyframes ft-blurIn {
  from {
    opacity: 0;
    filter: blur(0.3px);
    transform: translateX(2px) translateZ(0);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateX(0) translateZ(0);
  }
}
`;

export const texts = [
  'Until you make the unconscious conscious, it will direct your life and you will call it fate. Your visions will become clear only when you can look into your own heart. Who looks outside, dreams; who looks inside, awakes.',
];

export const DEFAULT_CONFIG: StreamingConfig = {
  streamingSpeed: 30,
  maxWidth: 400,
  maxLines: 4,
  scaleFactorPerLine: 0.85,
};
