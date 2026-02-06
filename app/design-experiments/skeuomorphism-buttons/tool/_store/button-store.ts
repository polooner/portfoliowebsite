import { create } from 'zustand';
import {
  CanvasBackground,
  ShadowType,
  type ButtonConfig,
  type ShadowLayer,
  type TextShadowLayer,
  type GradientStop,
  type OverlayLayer,
  type ShapeConfig,
  type BackgroundConfig,
  type BorderConfig,
  type TextConfig,
  type HoverStateConfig,
  type ActiveStateConfig,
} from '../_types/button-config';
import { DEFAULT_BUTTON_CONFIG, NEW_SHADOW_TEMPLATE } from '../_constants/defaults';

// ── ID Generation ────────────────────────────────────────────────────────

let idCounter = 100;
const nextId = (prefix: string) => `${prefix}-${++idCounter}`;

// ── Store Types ──────────────────────────────────────────────────────────

interface ButtonStore {
  config: ButtonConfig;
  canvasBackground: CanvasBackground;
  expandedSections: Record<string, boolean>;

  // Shape
  setShape: (partial: Partial<ShapeConfig>) => void;

  // Background
  setBackground: (partial: Partial<BackgroundConfig>) => void;
  addGradientStop: () => void;
  removeGradientStop: (id: string) => void;
  updateGradientStop: (id: string, partial: Partial<GradientStop>) => void;

  // Shadows
  addShadow: () => void;
  removeShadow: (id: string) => void;
  updateShadow: (id: string, partial: Partial<ShadowLayer>) => void;
  duplicateShadow: (id: string) => void;
  toggleShadowVisibility: (id: string) => void;
  reorderShadows: (fromIndex: number, toIndex: number) => void;

  // Border
  setBorder: (partial: Partial<BorderConfig>) => void;

  // Overlays
  addOverlay: (layer: OverlayLayer) => void;
  removeOverlay: (id: string) => void;
  updateOverlay: (id: string, partial: Partial<OverlayLayer>) => void;
  toggleOverlayVisibility: (id: string) => void;

  // Text
  setText: (partial: Partial<TextConfig>) => void;
  addTextShadow: () => void;
  removeTextShadow: (id: string) => void;
  updateTextShadow: (id: string, partial: Partial<TextShadowLayer>) => void;

  // States
  setHover: (partial: Partial<HoverStateConfig>) => void;
  setActive: (partial: Partial<ActiveStateConfig>) => void;

  // UI
  setCanvasBackground: (bg: CanvasBackground) => void;
  toggleSection: (sectionId: string) => void;

  // Presets
  loadPreset: (config: ButtonConfig) => void;
  reset: () => void;
}

// ── Default Expanded Sections ────────────────────────────────────────────

const DEFAULT_EXPANDED_SECTIONS: Record<string, boolean> = {
  presets: true,
  background: true,
  shadows: true,
  shape: false,
  border: false,
  overlays: false,
  text: false,
  states: false,
};

// ── Store ────────────────────────────────────────────────────────────────

export const useButtonStore = create<ButtonStore>((set) => ({
  config: structuredClone(DEFAULT_BUTTON_CONFIG),
  canvasBackground: CanvasBackground.Light,
  expandedSections: { ...DEFAULT_EXPANDED_SECTIONS },

  // ── Shape ──────────────────────────────────────────────────────────────

  setShape: (partial) =>
    set((state) => ({
      config: { ...state.config, shape: { ...state.config.shape, ...partial } },
    })),

  // ── Background ─────────────────────────────────────────────────────────

  setBackground: (partial) =>
    set((state) => ({
      config: {
        ...state.config,
        background: { ...state.config.background, ...partial },
      },
    })),

  addGradientStop: () =>
    set((state) => {
      const stops = state.config.background.gradientStops;
      const newStop: GradientStop = {
        id: nextId('gs'),
        position: 50,
        color: { l: 80, c: 0, h: 0 },
        opacity: 100,
      };
      return {
        config: {
          ...state.config,
          background: {
            ...state.config.background,
            gradientStops: [...stops, newStop],
          },
        },
      };
    }),

  removeGradientStop: (id) =>
    set((state) => ({
      config: {
        ...state.config,
        background: {
          ...state.config.background,
          gradientStops: state.config.background.gradientStops.filter(
            (s) => s.id !== id
          ),
        },
      },
    })),

  updateGradientStop: (id, partial) =>
    set((state) => ({
      config: {
        ...state.config,
        background: {
          ...state.config.background,
          gradientStops: state.config.background.gradientStops.map((s) =>
            s.id === id ? { ...s, ...partial } : s
          ),
        },
      },
    })),

  // ── Shadows ────────────────────────────────────────────────────────────

  addShadow: () =>
    set((state) => {
      const newShadow: ShadowLayer = {
        ...NEW_SHADOW_TEMPLATE,
        id: nextId('sh'),
      };
      return {
        config: {
          ...state.config,
          shadows: [...state.config.shadows, newShadow],
        },
      };
    }),

  removeShadow: (id) =>
    set((state) => ({
      config: {
        ...state.config,
        shadows: state.config.shadows.filter((s) => s.id !== id),
      },
    })),

  updateShadow: (id, partial) =>
    set((state) => ({
      config: {
        ...state.config,
        shadows: state.config.shadows.map((s) =>
          s.id === id ? { ...s, ...partial } : s
        ),
      },
    })),

  duplicateShadow: (id) =>
    set((state) => {
      const shadow = state.config.shadows.find((s) => s.id === id);
      if (!shadow) return state;
      const dup: ShadowLayer = { ...shadow, id: nextId('sh') };
      const idx = state.config.shadows.indexOf(shadow);
      const shadows = [...state.config.shadows];
      shadows.splice(idx + 1, 0, dup);
      return { config: { ...state.config, shadows } };
    }),

  toggleShadowVisibility: (id) =>
    set((state) => ({
      config: {
        ...state.config,
        shadows: state.config.shadows.map((s) =>
          s.id === id ? { ...s, visible: !s.visible } : s
        ),
      },
    })),

  reorderShadows: (fromIndex, toIndex) =>
    set((state) => {
      const shadows = [...state.config.shadows];
      const [moved] = shadows.splice(fromIndex, 1);
      shadows.splice(toIndex, 0, moved);
      return { config: { ...state.config, shadows } };
    }),

  // ── Border ─────────────────────────────────────────────────────────────

  setBorder: (partial) =>
    set((state) => {
      const newBorder = { ...state.config.border, ...partial };
      // If radiusLinked and any corner changes, sync all corners
      if (newBorder.radiusLinked && partial.topLeftRadius !== undefined) {
        newBorder.topRightRadius = partial.topLeftRadius;
        newBorder.bottomRightRadius = partial.topLeftRadius;
        newBorder.bottomLeftRadius = partial.topLeftRadius;
      }
      return {
        config: { ...state.config, border: newBorder },
      };
    }),

  // ── Overlays ───────────────────────────────────────────────────────────

  addOverlay: (layer) =>
    set((state) => ({
      config: {
        ...state.config,
        overlays: [...state.config.overlays, layer],
      },
    })),

  removeOverlay: (id) =>
    set((state) => ({
      config: {
        ...state.config,
        overlays: state.config.overlays.filter((o) => o.id !== id),
      },
    })),

  updateOverlay: (id, partial) =>
    set((state) => ({
      config: {
        ...state.config,
        overlays: state.config.overlays.map((o) =>
          o.id === id ? { ...o, ...partial } : o
        ),
      },
    })),

  toggleOverlayVisibility: (id) =>
    set((state) => ({
      config: {
        ...state.config,
        overlays: state.config.overlays.map((o) =>
          o.id === id ? { ...o, visible: !o.visible } : o
        ),
      },
    })),

  // ── Text ───────────────────────────────────────────────────────────────

  setText: (partial) =>
    set((state) => ({
      config: { ...state.config, text: { ...state.config.text, ...partial } },
    })),

  addTextShadow: () =>
    set((state) => {
      const newTs: TextShadowLayer = {
        id: nextId('ts'),
        offsetX: 0,
        offsetY: 1,
        blur: 2,
        color: { l: 0, c: 0, h: 0 },
        opacity: 30,
      };
      return {
        config: {
          ...state.config,
          text: {
            ...state.config.text,
            textShadows: [...state.config.text.textShadows, newTs],
          },
        },
      };
    }),

  removeTextShadow: (id) =>
    set((state) => ({
      config: {
        ...state.config,
        text: {
          ...state.config.text,
          textShadows: state.config.text.textShadows.filter((t) => t.id !== id),
        },
      },
    })),

  updateTextShadow: (id, partial) =>
    set((state) => ({
      config: {
        ...state.config,
        text: {
          ...state.config.text,
          textShadows: state.config.text.textShadows.map((t) =>
            t.id === id ? { ...t, ...partial } : t
          ),
        },
      },
    })),

  // ── States ─────────────────────────────────────────────────────────────

  setHover: (partial) =>
    set((state) => ({
      config: { ...state.config, hover: { ...state.config.hover, ...partial } },
    })),

  setActive: (partial) =>
    set((state) => ({
      config: {
        ...state.config,
        active: { ...state.config.active, ...partial },
      },
    })),

  // ── UI ─────────────────────────────────────────────────────────────────

  setCanvasBackground: (bg) => set({ canvasBackground: bg }),

  toggleSection: (sectionId) =>
    set((state) => ({
      expandedSections: {
        ...state.expandedSections,
        [sectionId]: !state.expandedSections[sectionId],
      },
    })),

  // ── Presets ────────────────────────────────────────────────────────────

  loadPreset: (config) => set({ config: structuredClone(config) }),

  reset: () =>
    set({
      config: structuredClone(DEFAULT_BUTTON_CONFIG),
      expandedSections: { ...DEFAULT_EXPANDED_SECTIONS },
    }),
}));
