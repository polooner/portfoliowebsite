import {
  BackgroundMode,
  BlendMode,
  BorderMode,
  ShadowType,
  TextEffectType,
  TextGradientMode,
  type BackgroundConfig,
  type BorderConfig,
  type ShapeConfig,
  type TextConfig,
  type EngravedConfig,
  type EmbossedConfig,
  type TextGradientConfig,
  type TextShimmerConfig,
  type TextStrokeConfig,
  type HoverStateConfig,
  type ActiveStateConfig,
  type ButtonConfig,
  type OklchColor,
  type ShadowLayer,
} from '../_types/button-config';

// ── Color Defaults ───────────────────────────────────────────────────────

export const DEFAULT_WHITE: OklchColor = { l: 100, c: 0, h: 0 };
export const DEFAULT_BLACK: OklchColor = { l: 0, c: 0, h: 0 };
export const DEFAULT_GRAY: OklchColor = { l: 50, c: 0, h: 0 };
export const DEFAULT_LIGHT_GRAY: OklchColor = { l: 90, c: 0, h: 0 };
export const DEFAULT_DARK_GRAY: OklchColor = { l: 20, c: 0, h: 0 };

// ── Slider Bounds ────────────────────────────────────────────────────────

export const SHADOW_OFFSET_MIN = -50;
export const SHADOW_OFFSET_MAX = 50;
export const SHADOW_BLUR_MIN = 0;
export const SHADOW_BLUR_MAX = 100;
export const SHADOW_SPREAD_MIN = -20;
export const SHADOW_SPREAD_MAX = 40;

export const BORDER_WIDTH_MIN = 0;
export const BORDER_WIDTH_MAX = 10;
export const BORDER_RADIUS_MIN = 0;
export const BORDER_RADIUS_MAX = 100;

export const PADDING_MIN = 0;
export const PADDING_MAX = 60;
export const MIN_WIDTH_MIN = 0;
export const MIN_WIDTH_MAX = 400;

export const FONT_SIZE_MIN = 10;
export const FONT_SIZE_MAX = 48;
export const LETTER_SPACING_MIN = -2;
export const LETTER_SPACING_MAX = 8;

export const GRADIENT_ANGLE_MIN = 0;
export const GRADIENT_ANGLE_MAX = 360;

export const OVERLAY_OPACITY_MIN = 0;
export const OVERLAY_OPACITY_MAX = 100;

export const TRANSITION_DURATION_MIN = 0;
export const TRANSITION_DURATION_MAX = 500;

export const TEXT_SHIMMER_WIDTH_MIN = 10;
export const TEXT_SHIMMER_WIDTH_MAX = 90;
export const TEXT_SHIMMER_SPEED_MIN = 0.5;
export const TEXT_SHIMMER_SPEED_MAX = 5;
export const TEXT_STROKE_WIDTH_MIN = 0;
export const TEXT_STROKE_WIDTH_MAX = 3;

export const TEXT_EFFECT_OFFSET_MIN = -5;
export const TEXT_EFFECT_OFFSET_MAX = 5;
export const TEXT_EFFECT_BLUR_MIN = 0;
export const TEXT_EFFECT_BLUR_MAX = 5;

export const HOVER_TRANSLATE_MIN = -8;
export const HOVER_TRANSLATE_MAX = 0;
export const ACTIVE_TRANSLATE_MIN = 0;
export const ACTIVE_TRANSLATE_MAX = 8;
export const SHADOW_INTENSITY_MIN = 0.5;
export const SHADOW_INTENSITY_MAX = 2;
export const LIGHTEN_DARKEN_MIN = 0;
export const LIGHTEN_DARKEN_MAX = 20;
export const SHADOW_FLATTEN_MIN = 0;
export const SHADOW_FLATTEN_MAX = 100;
export const INSET_BLUR_MIN = 0;
export const INSET_BLUR_MAX = 30;

// ── Section Defaults ─────────────────────────────────────────────────────

export const DEFAULT_SHAPE: ShapeConfig = {
  paddingX: 24,
  paddingY: 12,
  minWidth: 120,
};

export const DEFAULT_BACKGROUND: BackgroundConfig = {
  mode: BackgroundMode.Solid,
  solidColor: { l: 99, c: 0, h: 0 },
  solidOpacity: 100,
  gradientAngle: 180,
  gradientCenterX: 50,
  gradientCenterY: 30,
  gradientStops: [
    { id: 'gs-1', position: 0, color: { l: 99, c: 0, h: 0 }, opacity: 100 },
    { id: 'gs-2', position: 100, color: { l: 88, c: 0, h: 0 }, opacity: 100 },
  ],
};

const DEFAULT_OUTER_SHADOW: ShadowLayer = {
  id: 'sh-1',
  type: ShadowType.Outer,
  offsetX: 0,
  offsetY: 4,
  blur: 12,
  spread: -2,
  color: { l: 0, c: 0, h: 0 },
  opacity: 15,
  visible: true,
};

const DEFAULT_CRISP_SHADOW: ShadowLayer = {
  id: 'sh-2',
  type: ShadowType.Outer,
  offsetX: 0,
  offsetY: 1,
  blur: 3,
  spread: 0,
  color: { l: 0, c: 0, h: 0 },
  opacity: 10,
  visible: true,
};

export const DEFAULT_SHADOWS: ShadowLayer[] = [
  DEFAULT_OUTER_SHADOW,
  DEFAULT_CRISP_SHADOW,
];

export const DEFAULT_BORDER: BorderConfig = {
  width: 1,
  mode: BorderMode.Uniform,
  uniformColor: { l: 80, c: 0, h: 0 },
  uniformOpacity: 40,
  bevelHighlightColor: { l: 100, c: 0, h: 0 },
  bevelHighlightOpacity: 50,
  bevelShadowColor: { l: 0, c: 0, h: 0 },
  bevelShadowOpacity: 15,
  topLeftRadius: 12,
  topRightRadius: 12,
  bottomRightRadius: 12,
  bottomLeftRadius: 12,
  radiusLinked: true,
};

export const DEFAULT_TEXT_GRADIENT: TextGradientConfig = {
  mode: TextGradientMode.Linear,
  angle: 180,
  centerX: 50,
  centerY: 50,
  stops: [
    { id: 'tg-1', position: 0, color: { l: 90, c: 0, h: 0 }, opacity: 100 },
    { id: 'tg-2', position: 35, color: { l: 70, c: 0, h: 0 }, opacity: 100 },
    { id: 'tg-3', position: 65, color: { l: 85, c: 0, h: 0 }, opacity: 100 },
    { id: 'tg-4', position: 100, color: { l: 60, c: 0, h: 0 }, opacity: 100 },
  ],
};

export const DEFAULT_TEXT_SHIMMER: TextShimmerConfig = {
  enabled: false,
  angle: 120,
  width: 40,
  speed: 2,
  color: { l: 100, c: 0, h: 0 },
  opacity: 60,
};

export const DEFAULT_TEXT_STROKE: TextStrokeConfig = {
  enabled: false,
  width: 1,
  color: { l: 0, c: 0, h: 0 },
  opacity: 30,
};

export const DEFAULT_TEXT_ENGRAVED: EngravedConfig = {
  highlightColor: { l: 100, c: 0, h: 0 },
  highlightOpacity: 50,
  highlightOffsetX: 0,
  highlightOffsetY: 1,
  highlightBlur: 1,
};

export const DEFAULT_TEXT_EMBOSSED: EmbossedConfig = {
  highlightColor: { l: 100, c: 0, h: 0 },
  highlightOpacity: 40,
  highlightOffsetX: -1,
  highlightOffsetY: -1,
  highlightBlur: 1,
  shadowColor: { l: 0, c: 0, h: 0 },
  shadowOpacity: 30,
  shadowOffsetX: 1,
  shadowOffsetY: 1,
  shadowBlur: 1,
};

export const DEFAULT_TEXT: TextConfig = {
  content: 'Get Started',
  color: { l: 20, c: 0, h: 0 },
  opacity: 100,
  fontSize: 15,
  fontWeight: 500,
  letterSpacing: 0,
  textShadows: [],
  effect: TextEffectType.None,
  engraved: DEFAULT_TEXT_ENGRAVED,
  embossed: DEFAULT_TEXT_EMBOSSED,
  gradientFill: DEFAULT_TEXT_GRADIENT,
  shimmer: DEFAULT_TEXT_SHIMMER,
  stroke: DEFAULT_TEXT_STROKE,
};

export const DEFAULT_HOVER: HoverStateConfig = {
  enabled: true,
  shadowIntensityMultiplier: 1.3,
  translateY: -1,
  backgroundLighten: 2,
  transitionDuration: 150,
};

export const DEFAULT_ACTIVE: ActiveStateConfig = {
  enabled: true,
  translateY: 1,
  shadowFlattenAmount: 50,
  addInsetShadow: false,
  insetShadowColor: { l: 0, c: 0, h: 0 },
  insetShadowOpacity: 10,
  insetShadowBlur: 4,
  backgroundDarken: 2,
  transitionDuration: 50,
};

// ── Full Default ─────────────────────────────────────────────────────────

export const DEFAULT_BUTTON_CONFIG: ButtonConfig = {
  shape: DEFAULT_SHAPE,
  background: DEFAULT_BACKGROUND,
  shadows: DEFAULT_SHADOWS,
  border: DEFAULT_BORDER,
  overlays: [],
  text: DEFAULT_TEXT,
  hover: DEFAULT_HOVER,
  active: DEFAULT_ACTIVE,
};

// ── New Layer Templates ──────────────────────────────────────────────────

export const NEW_SHADOW_TEMPLATE: Omit<ShadowLayer, 'id'> = {
  type: ShadowType.Outer,
  offsetX: 0,
  offsetY: 4,
  blur: 8,
  spread: 0,
  color: { l: 0, c: 0, h: 0 },
  opacity: 20,
  visible: true,
};
