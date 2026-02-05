import { create } from 'zustand';

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
  fillColor: string;
  fillOpacity: number;
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
  setFillColor: (value: string) => void;
  setFillOpacity: (value: number) => void;
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
  fillColor: '#ffffff',
  fillOpacity: 100,
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
  reset: () => set(DEFAULT_CONFIG),
}));
