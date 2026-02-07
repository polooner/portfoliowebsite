import {
  BackgroundMode,
  BlendMode,
  BorderMode,
  OverlayType,
  ShadowType,
  TextEffectType,
  TextGradientMode,
  type ButtonConfig,
} from '../_types/button-config';
import {
  DEFAULT_TEXT_ENGRAVED,
  DEFAULT_TEXT_EMBOSSED,
  DEFAULT_TEXT_GRADIENT,
  DEFAULT_TEXT_SHIMMER,
  DEFAULT_TEXT_STROKE,
} from './defaults';

export interface PresetEntry {
  name: string;
  config: ButtonConfig;
}

// ── 1. Raised White ──────────────────────────────────────────────────────

const RAISED_WHITE: ButtonConfig = {
  shape: { paddingX: 24, paddingY: 12, minWidth: 120 },
  background: {
    mode: BackgroundMode.LinearGradient,
    solidColor: { l: 99, c: 0, h: 0 },
    solidOpacity: 100,
    gradientAngle: 180,
    gradientCenterX: 50,
    gradientCenterY: 30,
    gradientStops: [
      { id: 'gs-1', position: 0, color: { l: 100, c: 0, h: 0 }, opacity: 100 },
      { id: 'gs-2', position: 100, color: { l: 93, c: 0, h: 0 }, opacity: 100 },
    ],
  },
  shadows: [
    { id: 'sh-1', type: ShadowType.Outer, offsetX: 0, offsetY: 6, blur: 16, spread: -3, color: { l: 0, c: 0, h: 0 }, opacity: 12, visible: true },
    { id: 'sh-2', type: ShadowType.Outer, offsetX: 0, offsetY: 1, blur: 3, spread: 0, color: { l: 0, c: 0, h: 0 }, opacity: 8, visible: true },
  ],
  border: {
    width: 1,
    mode: BorderMode.Uniform,
    uniformColor: { l: 85, c: 0, h: 0 },
    uniformOpacity: 50,
    bevelHighlightColor: { l: 100, c: 0, h: 0 },
    bevelHighlightOpacity: 50,
    bevelShadowColor: { l: 0, c: 0, h: 0 },
    bevelShadowOpacity: 15,
    topLeftRadius: 12,
    topRightRadius: 12,
    bottomRightRadius: 12,
    bottomLeftRadius: 12,
    radiusLinked: true,
  },
  overlays: [],
  text: {
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
  },
  hover: { enabled: true, shadowIntensityMultiplier: 1.4, translateY: -1, backgroundLighten: 2, transitionDuration: 150 },
  active: { enabled: true, translateY: 1, shadowFlattenAmount: 60, addInsetShadow: false, insetShadowColor: { l: 0, c: 0, h: 0 }, insetShadowOpacity: 10, insetShadowBlur: 4, backgroundDarken: 3, transitionDuration: 50 },
};

// ── 2. Glossy Dark ───────────────────────────────────────────────────────

const GLOSSY_DARK: ButtonConfig = {
  shape: { paddingX: 28, paddingY: 14, minWidth: 140 },
  background: {
    mode: BackgroundMode.LinearGradient,
    solidColor: { l: 25, c: 0, h: 0 },
    solidOpacity: 100,
    gradientAngle: 180,
    gradientCenterX: 50,
    gradientCenterY: 30,
    gradientStops: [
      { id: 'gs-1', position: 0, color: { l: 32, c: 0, h: 0 }, opacity: 100 },
      { id: 'gs-2', position: 100, color: { l: 18, c: 0, h: 0 }, opacity: 100 },
    ],
  },
  shadows: [
    { id: 'sh-1', type: ShadowType.Outer, offsetX: 0, offsetY: 8, blur: 24, spread: -4, color: { l: 0, c: 0, h: 0 }, opacity: 40, visible: true },
    { id: 'sh-2', type: ShadowType.Inset, offsetX: 0, offsetY: 1, blur: 0, spread: 0, color: { l: 60, c: 0, h: 0 }, opacity: 15, visible: true },
  ],
  border: {
    width: 1,
    mode: BorderMode.Beveled,
    uniformColor: { l: 40, c: 0, h: 0 },
    uniformOpacity: 40,
    bevelHighlightColor: { l: 55, c: 0, h: 0 },
    bevelHighlightOpacity: 25,
    bevelShadowColor: { l: 0, c: 0, h: 0 },
    bevelShadowOpacity: 30,
    topLeftRadius: 14,
    topRightRadius: 14,
    bottomRightRadius: 14,
    bottomLeftRadius: 14,
    radiusLinked: true,
  },
  overlays: [
    { id: 'ol-1', type: OverlayType.Shimmer, visible: true, blendMode: BlendMode.SoftLight, opacity: 20, shimmerAngle: 135, shimmerWidth: 60, specularX: 50, specularY: 30, specularRadius: 60, noiseIntensity: 5 },
  ],
  text: {
    content: 'Book a call',
    color: { l: 95, c: 0, h: 0 },
    opacity: 100,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: 0.3,
    textShadows: [
      { id: 'ts-1', offsetX: 0, offsetY: 1, blur: 2, color: { l: 0, c: 0, h: 0 }, opacity: 40 },
    ],
    effect: TextEffectType.None,
    engraved: DEFAULT_TEXT_ENGRAVED,
    embossed: DEFAULT_TEXT_EMBOSSED,
    gradientFill: DEFAULT_TEXT_GRADIENT,
    shimmer: DEFAULT_TEXT_SHIMMER,
    stroke: DEFAULT_TEXT_STROKE,
  },
  hover: { enabled: true, shadowIntensityMultiplier: 1.3, translateY: -1, backgroundLighten: 3, transitionDuration: 150 },
  active: { enabled: true, translateY: 1, shadowFlattenAmount: 50, addInsetShadow: true, insetShadowColor: { l: 0, c: 0, h: 0 }, insetShadowOpacity: 15, insetShadowBlur: 6, backgroundDarken: 3, transitionDuration: 50 },
};

// ── 3. Colored Raised ────────────────────────────────────────────────────

const COLORED_RAISED: ButtonConfig = {
  shape: { paddingX: 28, paddingY: 14, minWidth: 140 },
  background: {
    mode: BackgroundMode.LinearGradient,
    solidColor: { l: 65, c: 0.2, h: 40 },
    solidOpacity: 100,
    gradientAngle: 180,
    gradientCenterX: 50,
    gradientCenterY: 30,
    gradientStops: [
      { id: 'gs-1', position: 0, color: { l: 72, c: 0.22, h: 50 }, opacity: 100 },
      { id: 'gs-2', position: 100, color: { l: 60, c: 0.2, h: 35 }, opacity: 100 },
    ],
  },
  shadows: [
    { id: 'sh-1', type: ShadowType.Outer, offsetX: 0, offsetY: 6, blur: 20, spread: -3, color: { l: 55, c: 0.18, h: 40 }, opacity: 35, visible: true },
    { id: 'sh-2', type: ShadowType.Outer, offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: { l: 0, c: 0, h: 0 }, opacity: 10, visible: true },
  ],
  border: {
    width: 0,
    mode: BorderMode.Uniform,
    uniformColor: { l: 60, c: 0.18, h: 40 },
    uniformOpacity: 40,
    bevelHighlightColor: { l: 100, c: 0, h: 0 },
    bevelHighlightOpacity: 50,
    bevelShadowColor: { l: 0, c: 0, h: 0 },
    bevelShadowOpacity: 15,
    topLeftRadius: 14,
    topRightRadius: 14,
    bottomRightRadius: 14,
    bottomLeftRadius: 14,
    radiusLinked: true,
  },
  overlays: [],
  text: {
    content: 'Book a call',
    color: { l: 100, c: 0, h: 0 },
    opacity: 100,
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 0.3,
    textShadows: [
      { id: 'ts-1', offsetX: 0, offsetY: 1, blur: 2, color: { l: 0, c: 0, h: 0 }, opacity: 25 },
    ],
    effect: TextEffectType.None,
    engraved: DEFAULT_TEXT_ENGRAVED,
    embossed: DEFAULT_TEXT_EMBOSSED,
    gradientFill: DEFAULT_TEXT_GRADIENT,
    shimmer: DEFAULT_TEXT_SHIMMER,
    stroke: DEFAULT_TEXT_STROKE,
  },
  hover: { enabled: true, shadowIntensityMultiplier: 1.4, translateY: -2, backgroundLighten: 3, transitionDuration: 150 },
  active: { enabled: true, translateY: 1, shadowFlattenAmount: 60, addInsetShadow: false, insetShadowColor: { l: 0, c: 0, h: 0 }, insetShadowOpacity: 10, insetShadowBlur: 4, backgroundDarken: 5, transitionDuration: 50 },
};

// ── 4. Neumorphic ────────────────────────────────────────────────────────

const NEUMORPHIC: ButtonConfig = {
  shape: { paddingX: 28, paddingY: 14, minWidth: 140 },
  background: {
    mode: BackgroundMode.Solid,
    solidColor: { l: 90, c: 0, h: 0 },
    solidOpacity: 100,
    gradientAngle: 180,
    gradientCenterX: 50,
    gradientCenterY: 30,
    gradientStops: [
      { id: 'gs-1', position: 0, color: { l: 92, c: 0, h: 0 }, opacity: 100 },
      { id: 'gs-2', position: 100, color: { l: 88, c: 0, h: 0 }, opacity: 100 },
    ],
  },
  shadows: [
    { id: 'sh-1', type: ShadowType.Outer, offsetX: 6, offsetY: 6, blur: 16, spread: 0, color: { l: 0, c: 0, h: 0 }, opacity: 12, visible: true },
    { id: 'sh-2', type: ShadowType.Outer, offsetX: -6, offsetY: -6, blur: 16, spread: 0, color: { l: 100, c: 0, h: 0 }, opacity: 70, visible: true },
  ],
  border: {
    width: 0,
    mode: BorderMode.Uniform,
    uniformColor: { l: 88, c: 0, h: 0 },
    uniformOpacity: 0,
    bevelHighlightColor: { l: 100, c: 0, h: 0 },
    bevelHighlightOpacity: 50,
    bevelShadowColor: { l: 0, c: 0, h: 0 },
    bevelShadowOpacity: 15,
    topLeftRadius: 16,
    topRightRadius: 16,
    bottomRightRadius: 16,
    bottomLeftRadius: 16,
    radiusLinked: true,
  },
  overlays: [],
  text: {
    content: 'Press Me',
    color: { l: 40, c: 0, h: 0 },
    opacity: 100,
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 0.5,
    textShadows: [
      { id: 'ts-1', offsetX: 1, offsetY: 1, blur: 1, color: { l: 100, c: 0, h: 0 }, opacity: 80 },
    ],
    effect: TextEffectType.None,
    engraved: DEFAULT_TEXT_ENGRAVED,
    embossed: DEFAULT_TEXT_EMBOSSED,
    gradientFill: DEFAULT_TEXT_GRADIENT,
    shimmer: DEFAULT_TEXT_SHIMMER,
    stroke: DEFAULT_TEXT_STROKE,
  },
  hover: { enabled: true, shadowIntensityMultiplier: 1.2, translateY: 0, backgroundLighten: 1, transitionDuration: 200 },
  active: { enabled: true, translateY: 0, shadowFlattenAmount: 90, addInsetShadow: true, insetShadowColor: { l: 0, c: 0, h: 0 }, insetShadowOpacity: 8, insetShadowBlur: 8, backgroundDarken: 2, transitionDuration: 100 },
};

// ── 5. App Icon ──────────────────────────────────────────────────────────

const APP_ICON: ButtonConfig = {
  shape: { paddingX: 20, paddingY: 20, minWidth: 64 },
  background: {
    mode: BackgroundMode.LinearGradient,
    solidColor: { l: 65, c: 0.25, h: 145 },
    solidOpacity: 100,
    gradientAngle: 160,
    gradientCenterX: 50,
    gradientCenterY: 30,
    gradientStops: [
      { id: 'gs-1', position: 0, color: { l: 72, c: 0.25, h: 150 }, opacity: 100 },
      { id: 'gs-2', position: 100, color: { l: 55, c: 0.22, h: 140 }, opacity: 100 },
    ],
  },
  shadows: [
    { id: 'sh-1', type: ShadowType.Outer, offsetX: 0, offsetY: 12, blur: 32, spread: -4, color: { l: 55, c: 0.2, h: 145 }, opacity: 40, visible: true },
  ],
  border: {
    width: 0,
    mode: BorderMode.Uniform,
    uniformColor: { l: 60, c: 0.2, h: 145 },
    uniformOpacity: 0,
    bevelHighlightColor: { l: 100, c: 0, h: 0 },
    bevelHighlightOpacity: 50,
    bevelShadowColor: { l: 0, c: 0, h: 0 },
    bevelShadowOpacity: 15,
    topLeftRadius: 20,
    topRightRadius: 20,
    bottomRightRadius: 20,
    bottomLeftRadius: 20,
    radiusLinked: true,
  },
  overlays: [
    { id: 'ol-1', type: OverlayType.Specular, visible: true, blendMode: BlendMode.SoftLight, opacity: 30, shimmerAngle: 135, shimmerWidth: 60, specularX: 50, specularY: 25, specularRadius: 70, noiseIntensity: 5 },
  ],
  text: {
    content: '$',
    color: { l: 100, c: 0, h: 0 },
    opacity: 100,
    fontSize: 32,
    fontWeight: 700,
    letterSpacing: 0,
    textShadows: [
      { id: 'ts-1', offsetX: 0, offsetY: 2, blur: 4, color: { l: 0, c: 0, h: 0 }, opacity: 30 },
    ],
    effect: TextEffectType.None,
    engraved: DEFAULT_TEXT_ENGRAVED,
    embossed: DEFAULT_TEXT_EMBOSSED,
    gradientFill: DEFAULT_TEXT_GRADIENT,
    shimmer: DEFAULT_TEXT_SHIMMER,
    stroke: DEFAULT_TEXT_STROKE,
  },
  hover: { enabled: true, shadowIntensityMultiplier: 1.3, translateY: -2, backgroundLighten: 3, transitionDuration: 200 },
  active: { enabled: true, translateY: 1, shadowFlattenAmount: 50, addInsetShadow: false, insetShadowColor: { l: 0, c: 0, h: 0 }, insetShadowOpacity: 10, insetShadowBlur: 4, backgroundDarken: 4, transitionDuration: 50 },
};

// ── 6. Recessed Dark ─────────────────────────────────────────────────────

const RECESSED_DARK: ButtonConfig = {
  shape: { paddingX: 20, paddingY: 10, minWidth: 100 },
  background: {
    mode: BackgroundMode.Solid,
    solidColor: { l: 22, c: 0, h: 0 },
    solidOpacity: 100,
    gradientAngle: 180,
    gradientCenterX: 50,
    gradientCenterY: 30,
    gradientStops: [
      { id: 'gs-1', position: 0, color: { l: 25, c: 0, h: 0 }, opacity: 100 },
      { id: 'gs-2', position: 100, color: { l: 18, c: 0, h: 0 }, opacity: 100 },
    ],
  },
  shadows: [
    { id: 'sh-1', type: ShadowType.Inset, offsetX: 0, offsetY: 2, blur: 6, spread: 0, color: { l: 0, c: 0, h: 0 }, opacity: 30, visible: true },
    { id: 'sh-2', type: ShadowType.Inset, offsetX: 0, offsetY: -1, blur: 0, spread: 0, color: { l: 40, c: 0, h: 0 }, opacity: 10, visible: true },
    { id: 'sh-3', type: ShadowType.Outer, offsetX: 0, offsetY: 1, blur: 2, spread: 0, color: { l: 40, c: 0, h: 0 }, opacity: 8, visible: true },
  ],
  border: {
    width: 1,
    mode: BorderMode.Uniform,
    uniformColor: { l: 30, c: 0, h: 0 },
    uniformOpacity: 50,
    bevelHighlightColor: { l: 100, c: 0, h: 0 },
    bevelHighlightOpacity: 50,
    bevelShadowColor: { l: 0, c: 0, h: 0 },
    bevelShadowOpacity: 15,
    topLeftRadius: 10,
    topRightRadius: 10,
    bottomRightRadius: 10,
    bottomLeftRadius: 10,
    radiusLinked: true,
  },
  overlays: [],
  text: {
    content: 'Deep Research',
    color: { l: 75, c: 0, h: 0 },
    opacity: 100,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0,
    textShadows: [],
    effect: TextEffectType.None,
    engraved: DEFAULT_TEXT_ENGRAVED,
    embossed: DEFAULT_TEXT_EMBOSSED,
    gradientFill: DEFAULT_TEXT_GRADIENT,
    shimmer: DEFAULT_TEXT_SHIMMER,
    stroke: DEFAULT_TEXT_STROKE,
  },
  hover: { enabled: true, shadowIntensityMultiplier: 0.8, translateY: 0, backgroundLighten: 3, transitionDuration: 150 },
  active: { enabled: true, translateY: 0, shadowFlattenAmount: 20, addInsetShadow: true, insetShadowColor: { l: 0, c: 0, h: 0 }, insetShadowOpacity: 20, insetShadowBlur: 8, backgroundDarken: 3, transitionDuration: 50 },
};

// ── 7. Pill Subtle ───────────────────────────────────────────────────────

const PILL_SUBTLE: ButtonConfig = {
  shape: { paddingX: 18, paddingY: 8, minWidth: 80 },
  background: {
    mode: BackgroundMode.Solid,
    solidColor: { l: 97, c: 0, h: 0 },
    solidOpacity: 100,
    gradientAngle: 180,
    gradientCenterX: 50,
    gradientCenterY: 30,
    gradientStops: [
      { id: 'gs-1', position: 0, color: { l: 98, c: 0, h: 0 }, opacity: 100 },
      { id: 'gs-2', position: 100, color: { l: 95, c: 0, h: 0 }, opacity: 100 },
    ],
  },
  shadows: [
    { id: 'sh-1', type: ShadowType.Outer, offsetX: 0, offsetY: 1, blur: 3, spread: 0, color: { l: 0, c: 0, h: 0 }, opacity: 6, visible: true },
  ],
  border: {
    width: 1,
    mode: BorderMode.Uniform,
    uniformColor: { l: 85, c: 0, h: 0 },
    uniformOpacity: 60,
    bevelHighlightColor: { l: 100, c: 0, h: 0 },
    bevelHighlightOpacity: 50,
    bevelShadowColor: { l: 0, c: 0, h: 0 },
    bevelShadowOpacity: 15,
    topLeftRadius: 100,
    topRightRadius: 100,
    bottomRightRadius: 100,
    bottomLeftRadius: 100,
    radiusLinked: true,
  },
  overlays: [],
  text: {
    content: 'Search',
    color: { l: 35, c: 0, h: 0 },
    opacity: 100,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0,
    textShadows: [],
    effect: TextEffectType.None,
    engraved: DEFAULT_TEXT_ENGRAVED,
    embossed: DEFAULT_TEXT_EMBOSSED,
    gradientFill: DEFAULT_TEXT_GRADIENT,
    shimmer: DEFAULT_TEXT_SHIMMER,
    stroke: DEFAULT_TEXT_STROKE,
  },
  hover: { enabled: true, shadowIntensityMultiplier: 1.5, translateY: 0, backgroundLighten: 1, transitionDuration: 150 },
  active: { enabled: true, translateY: 0, shadowFlattenAmount: 80, addInsetShadow: false, insetShadowColor: { l: 0, c: 0, h: 0 }, insetShadowOpacity: 10, insetShadowBlur: 4, backgroundDarken: 2, transitionDuration: 50 },
};

// ── 8. Circular Icon ─────────────────────────────────────────────────────

const CIRCULAR_ICON: ButtonConfig = {
  shape: { paddingX: 16, paddingY: 16, minWidth: 0 },
  background: {
    mode: BackgroundMode.Solid,
    solidColor: { l: 98, c: 0, h: 0 },
    solidOpacity: 100,
    gradientAngle: 180,
    gradientCenterX: 50,
    gradientCenterY: 30,
    gradientStops: [
      { id: 'gs-1', position: 0, color: { l: 100, c: 0, h: 0 }, opacity: 100 },
      { id: 'gs-2', position: 100, color: { l: 94, c: 0, h: 0 }, opacity: 100 },
    ],
  },
  shadows: [
    { id: 'sh-1', type: ShadowType.Outer, offsetX: 0, offsetY: 3, blur: 10, spread: -2, color: { l: 0, c: 0, h: 0 }, opacity: 10, visible: true },
    { id: 'sh-2', type: ShadowType.Outer, offsetX: 0, offsetY: 1, blur: 2, spread: 0, color: { l: 0, c: 0, h: 0 }, opacity: 8, visible: true },
  ],
  border: {
    width: 2,
    mode: BorderMode.Uniform,
    uniformColor: { l: 85, c: 0, h: 0 },
    uniformOpacity: 50,
    bevelHighlightColor: { l: 100, c: 0, h: 0 },
    bevelHighlightOpacity: 50,
    bevelShadowColor: { l: 0, c: 0, h: 0 },
    bevelShadowOpacity: 15,
    topLeftRadius: 100,
    topRightRadius: 100,
    bottomRightRadius: 100,
    bottomLeftRadius: 100,
    radiusLinked: true,
  },
  overlays: [],
  text: {
    content: '+',
    color: { l: 30, c: 0, h: 0 },
    opacity: 100,
    fontSize: 20,
    fontWeight: 400,
    letterSpacing: 0,
    textShadows: [],
    effect: TextEffectType.None,
    engraved: DEFAULT_TEXT_ENGRAVED,
    embossed: DEFAULT_TEXT_EMBOSSED,
    gradientFill: DEFAULT_TEXT_GRADIENT,
    shimmer: DEFAULT_TEXT_SHIMMER,
    stroke: DEFAULT_TEXT_STROKE,
  },
  hover: { enabled: true, shadowIntensityMultiplier: 1.4, translateY: -1, backgroundLighten: 0, transitionDuration: 150 },
  active: { enabled: true, translateY: 1, shadowFlattenAmount: 60, addInsetShadow: false, insetShadowColor: { l: 0, c: 0, h: 0 }, insetShadowOpacity: 10, insetShadowBlur: 4, backgroundDarken: 3, transitionDuration: 50 },
};

// ── 9. Engraved Metal ──────────────────────────────────────────────────

const ENGRAVED_METAL: ButtonConfig = {
  shape: { paddingX: 28, paddingY: 14, minWidth: 140 },
  background: {
    mode: BackgroundMode.LinearGradient,
    solidColor: { l: 70, c: 0, h: 0 },
    solidOpacity: 100,
    gradientAngle: 180,
    gradientCenterX: 50,
    gradientCenterY: 30,
    gradientStops: [
      { id: 'gs-1', position: 0, color: { l: 80, c: 0, h: 0 }, opacity: 100 },
      { id: 'gs-2', position: 40, color: { l: 65, c: 0, h: 0 }, opacity: 100 },
      { id: 'gs-3', position: 60, color: { l: 72, c: 0, h: 0 }, opacity: 100 },
      { id: 'gs-4', position: 100, color: { l: 55, c: 0, h: 0 }, opacity: 100 },
    ],
  },
  shadows: [
    { id: 'sh-1', type: ShadowType.Outer, offsetX: 0, offsetY: 4, blur: 12, spread: -2, color: { l: 0, c: 0, h: 0 }, opacity: 25, visible: true },
    { id: 'sh-2', type: ShadowType.Inset, offsetX: 0, offsetY: 1, blur: 0, spread: 0, color: { l: 90, c: 0, h: 0 }, opacity: 15, visible: true },
  ],
  border: {
    width: 1,
    mode: BorderMode.Beveled,
    uniformColor: { l: 60, c: 0, h: 0 },
    uniformOpacity: 40,
    bevelHighlightColor: { l: 85, c: 0, h: 0 },
    bevelHighlightOpacity: 30,
    bevelShadowColor: { l: 30, c: 0, h: 0 },
    bevelShadowOpacity: 30,
    topLeftRadius: 12,
    topRightRadius: 12,
    bottomRightRadius: 12,
    bottomLeftRadius: 12,
    radiusLinked: true,
  },
  overlays: [],
  text: {
    content: 'ENGRAVED',
    color: { l: 50, c: 0, h: 0 },
    opacity: 100,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 2,
    textShadows: [],
    effect: TextEffectType.Engraved,
    engraved: DEFAULT_TEXT_ENGRAVED,
    embossed: DEFAULT_TEXT_EMBOSSED,
    gradientFill: DEFAULT_TEXT_GRADIENT,
    shimmer: DEFAULT_TEXT_SHIMMER,
    stroke: DEFAULT_TEXT_STROKE,
  },
  hover: { enabled: true, shadowIntensityMultiplier: 1.3, translateY: -1, backgroundLighten: 2, transitionDuration: 150 },
  active: { enabled: true, translateY: 1, shadowFlattenAmount: 50, addInsetShadow: false, insetShadowColor: { l: 0, c: 0, h: 0 }, insetShadowOpacity: 10, insetShadowBlur: 4, backgroundDarken: 3, transitionDuration: 50 },
};

// ── 10. Chrome Text ────────────────────────────────────────────────────

const CHROME_TEXT: ButtonConfig = {
  shape: { paddingX: 32, paddingY: 16, minWidth: 160 },
  background: {
    mode: BackgroundMode.LinearGradient,
    solidColor: { l: 15, c: 0, h: 0 },
    solidOpacity: 100,
    gradientAngle: 180,
    gradientCenterX: 50,
    gradientCenterY: 30,
    gradientStops: [
      { id: 'gs-1', position: 0, color: { l: 22, c: 0, h: 0 }, opacity: 100 },
      { id: 'gs-2', position: 100, color: { l: 12, c: 0, h: 0 }, opacity: 100 },
    ],
  },
  shadows: [
    { id: 'sh-1', type: ShadowType.Outer, offsetX: 0, offsetY: 8, blur: 24, spread: -4, color: { l: 0, c: 0, h: 0 }, opacity: 50, visible: true },
  ],
  border: {
    width: 1,
    mode: BorderMode.Uniform,
    uniformColor: { l: 35, c: 0, h: 0 },
    uniformOpacity: 40,
    bevelHighlightColor: { l: 100, c: 0, h: 0 },
    bevelHighlightOpacity: 50,
    bevelShadowColor: { l: 0, c: 0, h: 0 },
    bevelShadowOpacity: 15,
    topLeftRadius: 14,
    topRightRadius: 14,
    bottomRightRadius: 14,
    bottomLeftRadius: 14,
    radiusLinked: true,
  },
  overlays: [],
  text: {
    content: 'CHROME',
    color: { l: 80, c: 0, h: 0 },
    opacity: 100,
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 3,
    textShadows: [],
    effect: TextEffectType.GradientFill,
    engraved: DEFAULT_TEXT_ENGRAVED,
    embossed: DEFAULT_TEXT_EMBOSSED,
    gradientFill: {
      mode: TextGradientMode.Linear,
      angle: 180,
      centerX: 50,
      centerY: 50,
      stops: [
        { id: 'tg-1', position: 0, color: { l: 90, c: 0, h: 0 }, opacity: 100 },
        { id: 'tg-2', position: 30, color: { l: 55, c: 0, h: 0 }, opacity: 100 },
        { id: 'tg-3', position: 50, color: { l: 95, c: 0, h: 0 }, opacity: 100 },
        { id: 'tg-4', position: 70, color: { l: 50, c: 0, h: 0 }, opacity: 100 },
        { id: 'tg-5', position: 100, color: { l: 85, c: 0, h: 0 }, opacity: 100 },
      ],
    },
    shimmer: {
      enabled: true,
      angle: 120,
      width: 35,
      speed: 2.5,
      color: { l: 100, c: 0, h: 0 },
      opacity: 50,
    },
    stroke: DEFAULT_TEXT_STROKE,
  },
  hover: { enabled: true, shadowIntensityMultiplier: 1.3, translateY: -1, backgroundLighten: 2, transitionDuration: 150 },
  active: { enabled: true, translateY: 1, shadowFlattenAmount: 50, addInsetShadow: true, insetShadowColor: { l: 0, c: 0, h: 0 }, insetShadowOpacity: 15, insetShadowBlur: 6, backgroundDarken: 3, transitionDuration: 50 },
};

// ── Exported Presets List ────────────────────────────────────────────────

export const PRESETS: PresetEntry[] = [
  { name: 'Raised White', config: RAISED_WHITE },
  { name: 'Glossy Dark', config: GLOSSY_DARK },
  { name: 'Colored Raised', config: COLORED_RAISED },
  { name: 'Neumorphic', config: NEUMORPHIC },
  { name: 'App Icon', config: APP_ICON },
  { name: 'Recessed Dark', config: RECESSED_DARK },
  { name: 'Pill Subtle', config: PILL_SUBTLE },
  { name: 'Circular Icon', config: CIRCULAR_ICON },
  { name: 'Engraved Metal', config: ENGRAVED_METAL },
  { name: 'Chrome Text', config: CHROME_TEXT },
];
