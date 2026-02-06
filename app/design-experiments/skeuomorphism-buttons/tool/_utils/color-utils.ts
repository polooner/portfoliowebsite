import type { OklchColor } from '../_types/button-config';

/** Converts OklchColor to CSS oklch() string with full precision */
export function oklchToCss(color: OklchColor): string {
  const l = color.l.toFixed(4);
  const c = color.c.toFixed(4);
  const h = color.h.toFixed(2);
  return `oklch(${l}% ${c} ${h}deg)`;
}

/** Converts OklchColor + opacity to a CSS oklch() string with alpha */
export function oklchToCssAlpha(color: OklchColor, opacity: number): string {
  const l = color.l.toFixed(4);
  const c = color.c.toFixed(4);
  const h = color.h.toFixed(2);
  const a = (opacity / 100).toFixed(2);
  return `oklch(${l}% ${c} ${h}deg / ${a})`;
}

/**
 * Converts OKLCH to sRGB hex for fallback/display purposes.
 * Uses the official conversion matrices from CSS Color Level 4 spec.
 */
export function oklchToHex(color: OklchColor): string {
  const { l, c, h } = color;

  const hRad = (h * Math.PI) / 180;
  const L = l / 100;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  const lr = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const lg = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const lb = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

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

  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(bVal)}`;
}

/** Adjusts lightness of an OklchColor by a given amount */
export function adjustLightness(color: OklchColor, amount: number): OklchColor {
  return {
    ...color,
    l: Math.max(0, Math.min(100, color.l + amount)),
  };
}
