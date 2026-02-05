'use client';

import { useShadowStore } from '../_store/shadow-store';

interface SliderRowProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}

function getSliderProgress(value: number, min: number, max: number): string {
  return `${((value - min) / (max - min)) * 100}%`;
}

function SliderRow({ label, value, onChange, min, max, step = 1 }: SliderRowProps) {
  const progress = getSliderProgress(value, min, max);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-xs text-neutral-400">{label}</label>
        <span className="font-mono text-xs text-neutral-500">{value}</span>
      </div>
      <div className="group relative h-6 w-full">
        <input
          type="range"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="slider-input absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [color-scheme:dark]"
          style={{ '--slider-progress': progress } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 text-[10px] font-medium uppercase tracking-wider text-neutral-500/80">
      {children}
    </h3>
  );
}

export default function RightPanel() {
  const {
    columns,
    rows,
    paneWidth,
    paneHeight,
    gapX,
    gapY,
    skewX,
    skewY,
    blur,
    setColumns,
    setRows,
    setPaneWidth,
    setPaneHeight,
    setGapX,
    setGapY,
    setSkewX,
    setSkewY,
    setBlur,
    reset,
  } = useShadowStore();

  return (
    <aside className="fixed bottom-4 right-4 top-4 z-50 flex w-64 flex-col rounded-2xl border border-white/10 bg-neutral-800/90 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <h2 className="text-xs font-medium text-neutral-100">Shadow</h2>
        <button
          onClick={reset}
          className="rounded-md px-2 py-1 text-[10px] text-neutral-500 transition-colors hover:bg-neutral-700/50 hover:text-neutral-300"
        >
          Reset
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        {/* Grid */}
        <div>
          <SectionHeader>Grid</SectionHeader>
          <div className="space-y-4">
            <SliderRow
              label="Columns"
              value={columns}
              onChange={setColumns}
              min={1}
              max={8}
            />
            <SliderRow
              label="Rows"
              value={rows}
              onChange={setRows}
              min={1}
              max={8}
            />
          </div>
        </div>

        {/* Pane Size */}
        <div>
          <SectionHeader>Pane Size</SectionHeader>
          <div className="space-y-4">
            <SliderRow
              label="Width"
              value={paneWidth}
              onChange={setPaneWidth}
              min={50}
              max={400}
            />
            <SliderRow
              label="Height"
              value={paneHeight}
              onChange={setPaneHeight}
              min={50}
              max={400}
            />
          </div>
        </div>

        {/* Gaps */}
        <div>
          <SectionHeader>Gaps</SectionHeader>
          <div className="space-y-4">
            <SliderRow
              label="Horizontal"
              value={gapX}
              onChange={setGapX}
              min={0}
              max={100}
            />
            <SliderRow
              label="Vertical"
              value={gapY}
              onChange={setGapY}
              min={0}
              max={100}
            />
          </div>
        </div>

        {/* Transform */}
        <div>
          <SectionHeader>Transform</SectionHeader>
          <div className="space-y-4">
            <SliderRow
              label="Skew X"
              value={skewX}
              onChange={setSkewX}
              min={-45}
              max={45}
            />
            <SliderRow
              label="Skew Y"
              value={skewY}
              onChange={setSkewY}
              min={-45}
              max={45}
            />
          </div>
        </div>

        {/* Blur */}
        <div>
          <SectionHeader>Blur</SectionHeader>
          <SliderRow
            label="Amount"
            value={blur}
            onChange={setBlur}
            min={0}
            max={50}
          />
        </div>
      </div>
    </aside>
  );
}
