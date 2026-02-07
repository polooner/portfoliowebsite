import {
  BorderMode,
  BlendMode,
  OverlayType,
  ShadowType,
  type ButtonConfig,
  type BorderConfig,
  type OverlayLayer,
  type ShadowLayer,
} from '../_types/button-config';
import { oklchToCssAlpha } from './color-utils';
import {
  generateBoxShadow,
  generateBackground,
  generateTextShadow,
} from './generate-css-styles';

// ── Tailwind Helpers ────────────────────────────────────────────────────

/** Escapes spaces to underscores for Tailwind arbitrary value syntax */
function escapeTw(value: string): string {
  return value.replace(/\s+/g, '_');
}

/** Generates a percent-encoded SVG noise data URI safe for Tailwind arbitrary values */
function generateNoiseSvgDataUri(): string {
  const svg = `<svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;
  return `url(data:image/svg+xml,${encodeURIComponent(svg)})`;
}

// ── Border Radius ───────────────────────────────────────────────────────

/** Generates Tailwind border-radius classes */
function generateBorderRadiusTw(border: BorderConfig): string {
  const { topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius } =
    border;

  const allEqual =
    topLeftRadius === topRightRadius &&
    topRightRadius === bottomRightRadius &&
    bottomRightRadius === bottomLeftRadius;

  if (allEqual) {
    return `rounded-[${topLeftRadius}px]`;
  }

  return [
    `rounded-tl-[${topLeftRadius}px]`,
    `rounded-tr-[${topRightRadius}px]`,
    `rounded-br-[${bottomRightRadius}px]`,
    `rounded-bl-[${bottomLeftRadius}px]`,
  ].join(' ');
}

// ── Border ──────────────────────────────────────────────────────────────

/** Generates Tailwind border classes */
function generateBorderTw(border: BorderConfig): string {
  if (border.width === 0) {
    return 'border-none';
  }

  if (border.mode === BorderMode.Uniform) {
    const color = escapeTw(
      oklchToCssAlpha(border.uniformColor, border.uniformOpacity)
    );
    return `border-[${border.width}px] border-solid [border-color:${color}]`;
  }

  // Beveled: different colors per side
  const highlight = escapeTw(
    oklchToCssAlpha(border.bevelHighlightColor, border.bevelHighlightOpacity)
  );
  const shadow = escapeTw(
    oklchToCssAlpha(border.bevelShadowColor, border.bevelShadowOpacity)
  );

  return [
    `border-[${border.width}px]`,
    'border-solid',
    `[border-top-color:${highlight}]`,
    `[border-left-color:${highlight}]`,
    `[border-bottom-color:${shadow}]`,
    `[border-right-color:${shadow}]`,
  ].join(' ');
}

// ── Hover State ─────────────────────────────────────────────────────────

/** Generates Tailwind hover: classes */
function generateHoverTw(config: ButtonConfig): string {
  const { hover, shadows } = config;
  if (!hover.enabled) return '';

  const parts: string[] = [];

  if (hover.translateY !== 0) {
    parts.push(`hover:[transform:translateY(${hover.translateY}px)]`);
  }

  if (hover.shadowIntensityMultiplier !== 1) {
    const hoverShadows = shadows
      .filter((s) => s.visible)
      .map((s) => ({
        ...s,
        blur: Math.round(s.blur * hover.shadowIntensityMultiplier),
        spread: Math.round(s.spread * hover.shadowIntensityMultiplier),
        opacity: Math.min(
          100,
          Math.round(s.opacity * hover.shadowIntensityMultiplier)
        ),
      }));
    const shadowVal = escapeTw(generateBoxShadow(hoverShadows));
    parts.push(`hover:[box-shadow:${shadowVal}]`);
  }

  if (hover.backgroundLighten > 0) {
    const brightness = 1 + hover.backgroundLighten / 100;
    parts.push(`hover:[filter:brightness(${brightness})]`);
  }

  return parts.join(' ');
}

// ── Active State ────────────────────────────────────────────────────────

/** Generates Tailwind active: classes */
function generateActiveTw(config: ButtonConfig): string {
  const { active, shadows } = config;
  if (!active.enabled) return '';

  const parts: string[] = [];

  if (active.translateY !== 0) {
    parts.push(`active:[transform:translateY(${active.translateY}px)]`);
  }

  // Flatten shadows
  const flattenFactor = 1 - active.shadowFlattenAmount / 100;
  const flatShadows: ShadowLayer[] = shadows
    .filter((s) => s.visible)
    .map((s) => ({
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

  const shadowVal = escapeTw(generateBoxShadow(flatShadows));
  parts.push(`active:[box-shadow:${shadowVal}]`);

  if (active.backgroundDarken > 0) {
    const brightness = 1 - active.backgroundDarken / 100;
    parts.push(`active:[filter:brightness(${brightness})]`);
  }

  parts.push(`active:[transition-duration:${active.transitionDuration}ms]`);

  return parts.join(' ');
}

// ── Overlay ─────────────────────────────────────────────────────────────

/** Maps BlendMode enum to Tailwind mix-blend-* class */
function blendModeTw(mode: BlendMode): string {
  switch (mode) {
    case BlendMode.Normal:
      return 'mix-blend-normal';
    case BlendMode.Overlay:
      return 'mix-blend-overlay';
    case BlendMode.SoftLight:
      return 'mix-blend-soft-light';
    case BlendMode.Screen:
      return 'mix-blend-screen';
    case BlendMode.Multiply:
      return 'mix-blend-multiply';
    default:
      return 'mix-blend-normal';
  }
}

/** Generates Tailwind classes for a single overlay div */
function generateOverlayTw(overlay: OverlayLayer): string {
  const base = [
    'absolute',
    'inset-0',
    'rounded-[inherit]',
    'pointer-events-none',
    blendModeTw(overlay.blendMode),
  ];

  switch (overlay.type) {
    case OverlayType.Shimmer: {
      const bg = escapeTw(
        `linear-gradient(${overlay.shimmerAngle}deg,transparent_0%,rgba(255,255,255,0.3)_${overlay.shimmerWidth}%,transparent_100%)`
      );
      base.push(`opacity-[${(overlay.opacity / 100).toFixed(2)}]`);
      base.push(`[background:${bg}]`);
      break;
    }

    case OverlayType.Specular: {
      const bg = escapeTw(
        `radial-gradient(circle_at_${overlay.specularX}%_${overlay.specularY}%,rgba(255,255,255,0.4)_0%,transparent_${overlay.specularRadius}%)`
      );
      base.push(`opacity-[${(overlay.opacity / 100).toFixed(2)}]`);
      base.push(`[background:${bg}]`);
      break;
    }

    case OverlayType.Noise: {
      const uri = generateNoiseSvgDataUri();
      base.push(`opacity-[${(overlay.noiseIntensity / 100).toFixed(2)}]`);
      base.push(`[background-image:${escapeTw(uri)}]`);
      base.push('[background-size:128px_128px]');
      break;
    }
  }

  return base.join(' ');
}

// ── Main Generator ──────────────────────────────────────────────────────

/**
 * Generates a self-contained React component string from a ButtonConfig.
 * The output uses pure Tailwind classes with zero inline styles.
 */
export function generateComponentCode(config: ButtonConfig): string {
  const bg = escapeTw(generateBackground(config));
  const boxShadow = escapeTw(generateBoxShadow(config.shadows));
  const textShadow = generateTextShadow(config);
  const textColor = escapeTw(
    oklchToCssAlpha(config.text.color, config.text.opacity)
  );

  // Assemble button classes
  const classes: string[] = [
    // Layout
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'cursor-pointer',
    'outline-none',
    'leading-[1.2]',

    // Padding & sizing
    `py-[${config.shape.paddingY}px]`,
    `px-[${config.shape.paddingX}px]`,
  ];

  if (config.shape.minWidth) {
    classes.push(`min-w-[${config.shape.minWidth}px]`);
  }

  // Background
  classes.push(`[background:${bg}]`);

  // Box shadow
  if (boxShadow === 'none') {
    classes.push('shadow-none');
  } else {
    classes.push(`[box-shadow:${boxShadow}]`);
  }

  // Border radius & border
  classes.push(generateBorderRadiusTw(config.border));
  classes.push(generateBorderTw(config.border));

  // Text
  classes.push(`[color:${textColor}]`);
  classes.push(`text-[${config.text.fontSize}px]`);
  classes.push(`font-[${config.text.fontWeight}]`);
  classes.push(`tracking-[${config.text.letterSpacing}px]`);

  if (textShadow !== 'none') {
    classes.push(`[text-shadow:${escapeTw(textShadow)}]`);
  }

  // Transition
  classes.push('transition-all');
  classes.push(`duration-[${config.hover.transitionDuration}ms]`);
  classes.push('ease-[ease]');

  // Hover & active
  const hoverTw = generateHoverTw(config);
  if (hoverTw) classes.push(hoverTw);

  const activeTw = generateActiveTw(config);
  if (activeTw) classes.push(activeTw);

  const buttonClasses = classes.join(' ');

  // Overlays
  const visibleOverlays = config.overlays.filter((o) => o.visible);
  const overlayJsx = visibleOverlays
    .map((overlay) => {
      const overlayClasses = generateOverlayTw(overlay);
      return `        <div className="${overlayClasses}" />`;
    })
    .join('\n');

  const hasOverlays = visibleOverlays.length > 0;

  return `'use client';

interface SkeuButtonProps {
  children?: React.ReactNode;
}

export function SkeuButton({ children }: SkeuButtonProps) {
  return (
    <button className="${buttonClasses}">
      {children ?? '${config.text.content}'}${hasOverlays ? `\n${overlayJsx}` : ''}
    </button>
  );
}`;
}
