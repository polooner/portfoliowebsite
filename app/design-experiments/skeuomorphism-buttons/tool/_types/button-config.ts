// ── UI Types ────────────────────────────────────────────────────────────

export type LeftPanelTab = 'code' | 'effects';

// ── Enums ────────────────────────────────────────────────────────────────

export enum ShadowType {
  Outer = 'outer',
  Inset = 'inset',
}

export enum BackgroundMode {
  Solid = 'solid',
  LinearGradient = 'linear-gradient',
  RadialGradient = 'radial-gradient',
}

export enum BorderMode {
  Uniform = 'uniform',
  Beveled = 'beveled',
}

export enum OverlayType {
  Shimmer = 'shimmer',
  Specular = 'specular',
  Noise = 'noise',
}

export enum BlendMode {
  Normal = 'normal',
  Overlay = 'overlay',
  SoftLight = 'soft-light',
  Screen = 'screen',
  Multiply = 'multiply',
}

export enum CanvasBackground {
  Light = 'light',
  Dark = 'dark',
  Checkerboard = 'checkerboard',
}

export enum TextEffectType {
  None = 'none',
  Engraved = 'engraved',
  Embossed = 'embossed',
  GradientFill = 'gradient-fill',
}

export enum TextGradientMode {
  Linear = 'linear',
  Radial = 'radial',
}

// ── Color ────────────────────────────────────────────────────────────────

export interface OklchColor {
  l: number; // Lightness: 0-100 (percentage)
  c: number; // Chroma: 0-0.4
  h: number; // Hue: 0-360
}

// ── Shadow Layers ────────────────────────────────────────────────────────

export interface ShadowLayer {
  id: string;
  type: ShadowType;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: OklchColor;
  opacity: number; // 0-100
  visible: boolean;
}

export interface TextShadowLayer {
  id: string;
  offsetX: number;
  offsetY: number;
  blur: number;
  color: OklchColor;
  opacity: number; // 0-100
}

// ── Gradient ─────────────────────────────────────────────────────────────

export interface GradientStop {
  id: string;
  position: number; // 0-100 (percentage)
  color: OklchColor;
  opacity: number; // 0-100
}

// ── Background ───────────────────────────────────────────────────────────

export interface BackgroundConfig {
  mode: BackgroundMode;
  solidColor: OklchColor;
  solidOpacity: number;
  gradientAngle: number; // 0-360 for linear
  gradientCenterX: number; // 0-100 for radial
  gradientCenterY: number; // 0-100 for radial
  gradientStops: GradientStop[];
}

// ── Border ───────────────────────────────────────────────────────────────

export interface BorderConfig {
  width: number;
  mode: BorderMode;
  uniformColor: OklchColor;
  uniformOpacity: number;
  bevelHighlightColor: OklchColor;
  bevelHighlightOpacity: number;
  bevelShadowColor: OklchColor;
  bevelShadowOpacity: number;
  topLeftRadius: number;
  topRightRadius: number;
  bottomRightRadius: number;
  bottomLeftRadius: number;
  radiusLinked: boolean;
}

// ── Overlays ─────────────────────────────────────────────────────────────

export interface OverlayLayer {
  id: string;
  type: OverlayType;
  visible: boolean;
  blendMode: BlendMode;
  opacity: number; // 0-100
  // Shimmer-specific
  shimmerAngle: number;
  shimmerWidth: number; // percentage of element width
  // Specular-specific
  specularX: number; // 0-100
  specularY: number; // 0-100
  specularRadius: number;
  // Noise-specific
  noiseIntensity: number;
}

// ── Text Effects ────────────────────────────────────────────────────────

export interface EngravedConfig {
  highlightColor: OklchColor;
  highlightOpacity: number;
  highlightOffsetX: number;
  highlightOffsetY: number;
  highlightBlur: number;
}

export interface EmbossedConfig {
  highlightColor: OklchColor;
  highlightOpacity: number;
  highlightOffsetX: number;
  highlightOffsetY: number;
  highlightBlur: number;
  shadowColor: OklchColor;
  shadowOpacity: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowBlur: number;
}

export interface TextGradientConfig {
  mode: TextGradientMode;
  angle: number;
  centerX: number;
  centerY: number;
  stops: GradientStop[];
}

export interface TextShimmerConfig {
  enabled: boolean;
  angle: number;
  width: number;
  speed: number;
  color: OklchColor;
  opacity: number;
}

export interface TextStrokeConfig {
  enabled: boolean;
  width: number;
  color: OklchColor;
  opacity: number;
}

// ── Text ─────────────────────────────────────────────────────────────────

export interface TextConfig {
  content: string;
  color: OklchColor;
  opacity: number;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  textShadows: TextShadowLayer[];
  effect: TextEffectType;
  engraved: EngravedConfig;
  embossed: EmbossedConfig;
  gradientFill: TextGradientConfig;
  shimmer: TextShimmerConfig;
  stroke: TextStrokeConfig;
}

// ── Interactive States ───────────────────────────────────────────────────

export interface HoverStateConfig {
  enabled: boolean;
  shadowIntensityMultiplier: number; // 1.0 = no change
  translateY: number; // negative = lift up
  backgroundLighten: number; // 0-20
  transitionDuration: number; // ms
}

export interface ActiveStateConfig {
  enabled: boolean;
  translateY: number; // positive = push down
  shadowFlattenAmount: number; // 0-100, how much to reduce shadows
  addInsetShadow: boolean;
  insetShadowColor: OklchColor;
  insetShadowOpacity: number;
  insetShadowBlur: number;
  backgroundDarken: number; // 0-20
  transitionDuration: number; // ms
}

// ── Shape ────────────────────────────────────────────────────────────────

export interface ShapeConfig {
  paddingX: number;
  paddingY: number;
  minWidth: number;
}

// ── Full Button Config ───────────────────────────────────────────────────

export interface ButtonConfig {
  shape: ShapeConfig;
  background: BackgroundConfig;
  shadows: ShadowLayer[];
  border: BorderConfig;
  overlays: OverlayLayer[];
  text: TextConfig;
  hover: HoverStateConfig;
  active: ActiveStateConfig;
}
