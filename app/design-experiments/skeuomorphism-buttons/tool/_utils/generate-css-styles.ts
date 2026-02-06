import {
  BackgroundMode,
  BorderMode,
  OverlayType,
  ShadowType,
  type ButtonConfig,
  type ShadowLayer,
  type OverlayLayer,
} from '../_types/button-config';
import { oklchToCssAlpha } from './color-utils';

// ── Box Shadow ───────────────────────────────────────────────────────────

/** Generates a single box-shadow CSS value from a ShadowLayer */
function shadowLayerToCss(layer: ShadowLayer): string {
  const inset = layer.type === ShadowType.Inset ? 'inset ' : '';
  const color = oklchToCssAlpha(layer.color, layer.opacity);
  return `${inset}${layer.offsetX}px ${layer.offsetY}px ${layer.blur}px ${layer.spread}px ${color}`;
}

/** Generates the full box-shadow value from all visible layers */
export function generateBoxShadow(shadows: ShadowLayer[]): string {
  const visible = shadows.filter((s) => s.visible);
  if (visible.length === 0) return 'none';
  return visible.map(shadowLayerToCss).join(', ');
}

// ── Background ───────────────────────────────────────────────────────────

/** Generates the background CSS value from a ButtonConfig */
export function generateBackground(config: ButtonConfig): string {
  const { background } = config;

  switch (background.mode) {
    case BackgroundMode.Solid:
      return oklchToCssAlpha(background.solidColor, background.solidOpacity);

    case BackgroundMode.LinearGradient: {
      const stops = background.gradientStops
        .sort((a, b) => a.position - b.position)
        .map((s) => `${oklchToCssAlpha(s.color, s.opacity)} ${s.position}%`)
        .join(', ');
      return `linear-gradient(${background.gradientAngle}deg, ${stops})`;
    }

    case BackgroundMode.RadialGradient: {
      const stops = background.gradientStops
        .sort((a, b) => a.position - b.position)
        .map((s) => `${oklchToCssAlpha(s.color, s.opacity)} ${s.position}%`)
        .join(', ');
      return `radial-gradient(circle at ${background.gradientCenterX}% ${background.gradientCenterY}%, ${stops})`;
    }

    default:
      return oklchToCssAlpha(background.solidColor, background.solidOpacity);
  }
}

// ── Border ───────────────────────────────────────────────────────────────

/** Generates border-related CSS properties */
export function generateBorderStyles(config: ButtonConfig): React.CSSProperties {
  const { border } = config;
  const styles: React.CSSProperties = {
    borderRadius: `${border.topLeftRadius}px ${border.topRightRadius}px ${border.bottomRightRadius}px ${border.bottomLeftRadius}px`,
  };

  if (border.width === 0) {
    styles.border = 'none';
    return styles;
  }

  if (border.mode === BorderMode.Uniform) {
    styles.border = `${border.width}px solid ${oklchToCssAlpha(border.uniformColor, border.uniformOpacity)}`;
  } else {
    // Beveled: different colors per side
    const highlight = oklchToCssAlpha(border.bevelHighlightColor, border.bevelHighlightOpacity);
    const shadow = oklchToCssAlpha(border.bevelShadowColor, border.bevelShadowOpacity);
    styles.borderWidth = `${border.width}px`;
    styles.borderStyle = 'solid';
    styles.borderTopColor = highlight;
    styles.borderLeftColor = highlight;
    styles.borderBottomColor = shadow;
    styles.borderRightColor = shadow;
  }

  return styles;
}

// ── Text Shadow ──────────────────────────────────────────────────────────

/** Generates text-shadow CSS value */
export function generateTextShadow(config: ButtonConfig): string {
  const { textShadows } = config.text;
  if (textShadows.length === 0) return 'none';
  return textShadows
    .map(
      (ts) =>
        `${ts.offsetX}px ${ts.offsetY}px ${ts.blur}px ${oklchToCssAlpha(ts.color, ts.opacity)}`
    )
    .join(', ');
}

// ── Overlay Styles ───────────────────────────────────────────────────────

/** Generates the inline style for an overlay layer */
export function generateOverlayStyle(overlay: OverlayLayer): React.CSSProperties {
  if (!overlay.visible) return { display: 'none' };

  const base: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    mixBlendMode: overlay.blendMode as React.CSSProperties['mixBlendMode'],
    opacity: overlay.opacity / 100,
  };

  switch (overlay.type) {
    case OverlayType.Shimmer:
      return {
        ...base,
        background: `linear-gradient(${overlay.shimmerAngle}deg, transparent 0%, rgba(255,255,255,0.3) ${overlay.shimmerWidth}%, transparent 100%)`,
      };

    case OverlayType.Specular:
      return {
        ...base,
        background: `radial-gradient(circle at ${overlay.specularX}% ${overlay.specularY}%, rgba(255,255,255,0.4) 0%, transparent ${overlay.specularRadius}%)`,
      };

    case OverlayType.Noise:
      return {
        ...base,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
        opacity: overlay.noiseIntensity / 100,
      };

    default:
      return base;
  }
}

// ── Full Button Style ────────────────────────────────────────────────────

/** Generates the complete inline style object for a button */
export function generateButtonStyles(config: ButtonConfig): React.CSSProperties {
  const bg = generateBackground(config);
  const boxShadow = generateBoxShadow(config.shadows);
  const borderStyles = generateBorderStyles(config);
  const textShadow = generateTextShadow(config);

  return {
    // Shape
    paddingLeft: config.shape.paddingX,
    paddingRight: config.shape.paddingX,
    paddingTop: config.shape.paddingY,
    paddingBottom: config.shape.paddingY,
    minWidth: config.shape.minWidth || undefined,

    // Background
    background: bg,

    // Shadows
    boxShadow,

    // Border
    ...borderStyles,

    // Text
    color: oklchToCssAlpha(config.text.color, config.text.opacity),
    fontSize: config.text.fontSize,
    fontWeight: config.text.fontWeight,
    letterSpacing: config.text.letterSpacing,
    textShadow,

    // Interaction readiness
    position: 'relative',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: `all ${config.hover.transitionDuration}ms ease`,
    outline: 'none',
    lineHeight: 1.2,
  };
}

// ── Hover & Active CSS ───────────────────────────────────────────────────

/** Generates hover state modifications as a CSS rule body */
export function generateHoverCss(config: ButtonConfig): string {
  const { hover, shadows } = config;
  if (!hover.enabled) return '';

  const parts: string[] = [];

  if (hover.translateY !== 0) {
    parts.push(`transform: translateY(${hover.translateY}px);`);
  }

  // Intensify shadows
  if (hover.shadowIntensityMultiplier !== 1) {
    const hoverShadows = shadows.filter((s) => s.visible).map((s) => ({
      ...s,
      blur: Math.round(s.blur * hover.shadowIntensityMultiplier),
      spread: Math.round(s.spread * hover.shadowIntensityMultiplier),
      opacity: Math.min(100, Math.round(s.opacity * hover.shadowIntensityMultiplier)),
    }));
    parts.push(`box-shadow: ${generateBoxShadow(hoverShadows)};`);
  }

  if (hover.backgroundLighten > 0) {
    parts.push(`filter: brightness(${1 + hover.backgroundLighten / 100});`);
  }

  return parts.join(' ');
}

/** Generates active state modifications as a CSS rule body */
export function generateActiveCss(config: ButtonConfig): string {
  const { active, shadows } = config;
  if (!active.enabled) return '';

  const parts: string[] = [];

  if (active.translateY !== 0) {
    parts.push(`transform: translateY(${active.translateY}px);`);
  }

  // Flatten shadows
  const flattenFactor = 1 - active.shadowFlattenAmount / 100;
  const flatShadows = shadows.filter((s) => s.visible).map((s) => ({
    ...s,
    offsetY: Math.round(s.offsetY * flattenFactor),
    blur: Math.round(s.blur * flattenFactor),
    spread: Math.round(s.spread * flattenFactor),
    opacity: Math.round(s.opacity * flattenFactor),
  }));

  if (active.addInsetShadow) {
    flatShadows.push({
      id: 'active-inset',
      type: ShadowType.Inset,
      offsetX: 0,
      offsetY: 2,
      blur: active.insetShadowBlur,
      spread: 0,
      color: active.insetShadowColor,
      opacity: active.insetShadowOpacity,
      visible: true,
    });
  }

  parts.push(`box-shadow: ${generateBoxShadow(flatShadows)};`);

  if (active.backgroundDarken > 0) {
    parts.push(`filter: brightness(${1 - active.backgroundDarken / 100});`);
  }

  parts.push(`transition-duration: ${active.transitionDuration}ms;`);

  return parts.join(' ');
}
