import { create } from 'zustand';

export interface OklchColor {
  l: number; // Lightness: 0-1 (stored as decimal for precision)
  c: number; // Chroma: 0-0.4
  h: number; // Hue: 0-360
}

/** Converts OklchColor to CSS oklch() string with full precision */
export function oklchToCss(color: OklchColor): string {
  // Using the standard CSS Color Level 4 oklch() syntax
  // L as percentage, C as decimal, H in degrees
  const l = color.l.toFixed(4);
  const c = color.c.toFixed(4);
  const h = color.h.toFixed(2);
  return `oklch(${l}% ${c} ${h}deg)`;
}

/**
 * Converts OKLCH to sRGB hex for fallback/display purposes.
 * Uses the official conversion matrices from CSS Color Level 4 spec.
 */
export function oklchToHex(color: OklchColor): string {
  const { l, c, h } = color;

  // Convert OKLCH to OKLAB
  const hRad = (h * Math.PI) / 180;
  const L = l / 100; // Convert percentage to 0-1
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  // OKLAB to linear RGB via LMS
  // Using the official matrices from the CSS Color Level 4 specification
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  // LMS to linear sRGB
  const lr = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const lg = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const lb = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

  // Linear RGB to sRGB (gamma correction)
  const toSrgb = (x: number): number => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return x <= 0.0031308
      ? 12.92 * x
      : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
  };

  const r = Math.round(toSrgb(lr) * 255);
  const g = Math.round(toSrgb(lg) * 255);
  const bVal = Math.round(toSrgb(lb) * 255);

  // Clamp and convert to hex
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(bVal)}`;
}

interface ShadowConfig {
  columns: number;
  rows: number;
  paneWidth: number;
  paneHeight: number;
  gapX: number;
  gapY: number;
  skewX: number;
  skewY: number;
  blur: number;
  fillColor: OklchColor;
  fillOpacity: number;
  backgroundColor: OklchColor;
  backgroundOpacity: number;
}

interface ShadowStore extends ShadowConfig {
  setColumns: (value: number) => void;
  setRows: (value: number) => void;
  setPaneWidth: (value: number) => void;
  setPaneHeight: (value: number) => void;
  setGapX: (value: number) => void;
  setGapY: (value: number) => void;
  setSkewX: (value: number) => void;
  setSkewY: (value: number) => void;
  setBlur: (value: number) => void;
  setFillColor: (value: OklchColor) => void;
  setFillOpacity: (value: number) => void;
  setBackgroundColor: (value: OklchColor) => void;
  setBackgroundOpacity: (value: number) => void;
  reset: () => void;
}

const DEFAULT_CONFIG: ShadowConfig = {
  columns: 2,
  rows: 4,
  paneWidth: 180,
  paneHeight: 180,
  gapX: 20,
  gapY: 15,
  skewX: 5,
  skewY: 20,
  blur: 15,
  fillColor: { l: 100, c: 0, h: 0 },
  fillOpacity: 100,
  backgroundColor: { l: 86, c: 0, h: 0 },
  backgroundOpacity: 100,
};

export const useShadowStore = create<ShadowStore>((set) => ({
  ...DEFAULT_CONFIG,
  setColumns: (value) => set({ columns: value }),
  setRows: (value) => set({ rows: value }),
  setPaneWidth: (value) => set({ paneWidth: value }),
  setPaneHeight: (value) => set({ paneHeight: value }),
  setGapX: (value) => set({ gapX: value }),
  setGapY: (value) => set({ gapY: value }),
  setSkewX: (value) => set({ skewX: value }),
  setSkewY: (value) => set({ skewY: value }),
  setBlur: (value) => set({ blur: value }),
  setFillColor: (value) => set({ fillColor: value }),
  setFillOpacity: (value) => set({ fillOpacity: value }),
  setBackgroundColor: (value) => set({ backgroundColor: value }),
  setBackgroundOpacity: (value) => set({ backgroundOpacity: value }),
  reset: () => set(DEFAULT_CONFIG),
}));
