// Type definitions
export type InkBleedIntensity = 'subtle' | 'normal' | 'strong' | 'extreme';
export type ThresholdValues = [number, number, number, number];

export interface TurbulenceConfig {
  baseFrequency: number;  // 0.01-0.1 range
  numOctaves: number;     // 1-4 range
  scale: number;          // 0-10 range
  seed?: number;          // Optional for animation
}

export interface InkBleedConfig {
  blur: number;
  threshold: ThresholdValues;
  turbulence?: TurbulenceConfig;
  filterId?: string;
}

export interface InkBleedPreset {
  blur: number;
  threshold: ThresholdValues;
  turbulence: TurbulenceConfig;
  description: string;
}

// Preset configurations
export const INK_BLEED_PRESETS: Record<InkBleedIntensity, InkBleedPreset> = {
  subtle: {
    blur: 0.5,
    threshold: [0, 1, 1, 1],
    turbulence: {
      baseFrequency: 0.02,
      numOctaves: 1,
      scale: 1
    },
    description: 'Light bleed effect'
  },
  normal: {
    blur: 1,
    threshold: [0, 1, 1, 1],
    turbulence: {
      baseFrequency: 0.04,
      numOctaves: 2,
      scale: 2
    },
    description: 'Standard ink bleed'
  },
  strong: {
    blur: 1.5,
    threshold: [0, 1, 1, 1],
    turbulence: {
      baseFrequency: 0.06,
      numOctaves: 2,
      scale: 3.5
    },
    description: 'Heavy bleed effect'
  },
  extreme: {
    blur: 2.5,
    threshold: [0, 1, 1, 1],
    turbulence: {
      baseFrequency: 0.08,
      numOctaves: 3,
      scale: 5
    },
    description: 'Maximum bleed'
  }
};

// Utility functions
export function getInkBleedConfig(
  intensity: InkBleedIntensity = 'normal'
): InkBleedConfig {
  const preset = INK_BLEED_PRESETS[intensity];
  return {
    blur: preset.blur,
    threshold: preset.threshold,
    turbulence: preset.turbulence,
    filterId: `ink-bleed-${intensity}`
  };
}

export function createCustomConfig(
  blur: number,
  threshold: ThresholdValues,
  turbulence?: TurbulenceConfig
): InkBleedConfig {
  return { blur, threshold, turbulence };
}

export function generateFilterId(prefix = 'ink-bleed'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

// CSS value generators
export function getBlurValue(blur: number): string {
  return `${blur}px`;
}

export function getFilterValue(blur: number, filterId: string): string {
  return `blur(${blur}px) url(#${filterId})`;
}
