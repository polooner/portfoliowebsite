'use client';

import { Play, Pause, ChevronDown, Plus, Copy, Trash2 } from 'lucide-react';
import { CopyButton } from './copy-button';
import { ViewCodeButton } from './view-code-button';
import { ColorPicker } from './color-picker';
import GridBuilder from './grid-builder';
import { useGridAnimatorStore } from '../_store/grid-animator-store';
import { generateComponentCode } from '../_utils/generate-component-code';
import {
  CellShape,
  AnimationPattern,
  Direction,
} from '../_types/grid-animator-types';
import {
  GRID_ROWS_MIN,
  GRID_ROWS_MAX,
  GRID_COLS_MIN,
  GRID_COLS_MAX,
  CELL_SIZE_MIN,
  CELL_SIZE_MAX,
  GAP_MIN,
  GAP_MAX,
  CORNER_RADIUS_MIN,
  CORNER_RADIUS_MAX,
  FPS_MIN,
  FPS_MAX,
  GLOW_RADIUS_MIN,
  GLOW_RADIUS_MAX,
  LABEL_FONT_SIZE_MIN,
  LABEL_FONT_SIZE_MAX,
  LABEL_SPACING_MIN,
  LABEL_SPACING_MAX,
  CELL_SHAPE_OPTIONS,
  ANIMATION_PATTERN_OPTIONS,
  ANIMATION_STYLE_OPTIONS,
  BACKGROUND_STYLE_OPTIONS,
  SECTION_COLOR,
  SECTION_EFFECTS,
} from '../_constants/grid-animator-constants';

// --- Shared sub-components ---

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

interface SelectRowProps<T extends string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: string }>;
}

function SelectRow<T extends string>({
  label,
  value,
  onChange,
  options,
}: SelectRowProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-neutral-400">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-7 rounded-md border border-white/10 bg-neutral-700/50 px-2 text-xs text-neutral-200 outline-none transition-colors hover:bg-neutral-600/50 [color-scheme:dark]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface CollapsibleSectionProps {
  id: string;
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function CollapsibleSection({
  title,
  expanded,
  onToggle,
  children,
}: CollapsibleSectionProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="mb-3 flex w-full items-center justify-between"
      >
        <h3 className="text-[10px] font-medium uppercase tracking-wider text-neutral-500/80">
          {title}
        </h3>
        <ChevronDown
          size={12}
          className={`text-neutral-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      {expanded && children}
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

// --- Empty State ---

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4 text-center">
      <p className="text-xs text-neutral-500">Select or add a grid</p>
    </div>
  );
}

// --- Main Component ---

interface RightPanelProps {
  isCodePanelOpen: boolean;
  onToggleCodePanel: () => void;
}

export default function RightPanel({
  isCodePanelOpen,
  onToggleCodePanel,
}: RightPanelProps) {
  const selectedId = useGridAnimatorStore((state) => state.selectedIds[0] ?? null);
  const instance = useGridAnimatorStore(
    (state) => {
      const pid = state.selectedIds[0];
      return pid ? state.instances[pid] : null;
    }
  );
  const expandedSections = useGridAnimatorStore((state) => state.expandedSections);

  const {
    setGridRows,
    setGridCols,
    setGrid,
    clearAllCells,
    fillAllCells,
    setAnimation,
    setColor,
    setEffects,
    setLabel,
    setLabelFontSize,
    setLabelSpacing,
    togglePlaying,
    toggleSection,
    reset,
    addInstance,
    removeInstance,
    duplicateInstance,
  } = useGridAnimatorStore();

  const grid = instance?.config.grid;
  const activeCells = instance?.config.activeCells;
  const animation = instance?.config.animation;
  const color = instance?.config.color;
  const effects = instance?.config.effects;
  const isPlaying = instance?.isPlaying ?? false;

  return (
    <aside className="fixed bottom-4 right-4 top-4 z-50 flex w-64 flex-col rounded-2xl border border-white/10 bg-neutral-800/90 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <h2 className="text-xs font-medium text-neutral-100">Grid Animator</h2>
        <button
          onClick={reset}
          className="rounded-md px-2 py-1 text-[10px] text-neutral-500 transition-colors hover:bg-neutral-700/50 hover:text-neutral-300"
        >
          Reset
        </button>
      </div>

      {/* Instance management bar */}
      <div className="flex items-center gap-1 border-b border-white/10 px-3 py-2">
        <button
          onClick={() => addInstance({ x: 0, y: 0 })}
          className="flex items-center gap-1 rounded-md border border-white/10 bg-neutral-700/50 px-2 py-1 text-[10px] text-neutral-300 transition-colors hover:bg-neutral-600/50"
        >
          <Plus size={10} />
          Add
        </button>
        {selectedId && (
          <>
            <button
              onClick={() => duplicateInstance(selectedId)}
              className="flex items-center gap-1 rounded-md border border-white/10 bg-neutral-700/50 px-2 py-1 text-[10px] text-neutral-300 transition-colors hover:bg-neutral-600/50"
            >
              <Copy size={10} />
              Duplicate
            </button>
            <button
              onClick={() => removeInstance(selectedId)}
              className="flex items-center gap-1 rounded-md border border-white/10 bg-neutral-700/50 px-2 py-1 text-[10px] text-red-400 transition-colors hover:bg-red-900/30"
            >
              <Trash2 size={10} />
              Delete
            </button>
          </>
        )}
      </div>

      {!selectedId || !instance ? (
        <EmptyState />
      ) : (
        <>
          <div className="flex-1 space-y-6 overflow-y-auto p-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            {/* GRID */}
            <div>
              <SectionHeader>Grid</SectionHeader>
              <div className="space-y-4">
                <SliderRow
                  label="Rows"
                  value={grid!.rows}
                  onChange={setGridRows}
                  min={GRID_ROWS_MIN}
                  max={GRID_ROWS_MAX}
                />
                <SliderRow
                  label="Columns"
                  value={grid!.cols}
                  onChange={setGridCols}
                  min={GRID_COLS_MIN}
                  max={GRID_COLS_MAX}
                />
                <SelectRow
                  label="Cell Shape"
                  value={grid!.cellShape}
                  onChange={(v) => setGrid({ cellShape: v as CellShape })}
                  options={CELL_SHAPE_OPTIONS}
                />
                <SliderRow
                  label="Cell Size"
                  value={grid!.cellSize}
                  onChange={(v) => setGrid({ cellSize: v })}
                  min={CELL_SIZE_MIN}
                  max={CELL_SIZE_MAX}
                />
                <SliderRow
                  label="Gap"
                  value={grid!.gap}
                  onChange={(v) => setGrid({ gap: v })}
                  min={GAP_MIN}
                  max={GAP_MAX}
                />
                {grid!.cellShape === CellShape.RoundedRect && (
                  <SliderRow
                    label="Corner Radius"
                    value={grid!.cornerRadius}
                    onChange={(v) => setGrid({ cornerRadius: v })}
                    min={CORNER_RADIUS_MIN}
                    max={CORNER_RADIUS_MAX}
                  />
                )}
              </div>
            </div>

            {/* BUILDER */}
            <div>
              <SectionHeader>Builder</SectionHeader>
              <div className="space-y-3">
                <GridBuilder />
                <div className="flex gap-2">
                  <button
                    onClick={clearAllCells}
                    className="flex-1 rounded-md border border-white/10 bg-neutral-700/50 px-2 py-1.5 text-[10px] text-neutral-400 transition-colors hover:bg-neutral-600/50 hover:text-neutral-300"
                  >
                    Clear
                  </button>
                  <button
                    onClick={fillAllCells}
                    className="flex-1 rounded-md border border-white/10 bg-neutral-700/50 px-2 py-1.5 text-[10px] text-neutral-400 transition-colors hover:bg-neutral-600/50 hover:text-neutral-300"
                  >
                    Fill
                  </button>
                </div>
                <button
                  onClick={togglePlaying}
                  className="flex w-full items-center justify-center gap-1.5 rounded-md border border-white/10 bg-neutral-700/50 px-2 py-1.5 text-xs text-neutral-300 transition-colors hover:bg-neutral-600/50"
                >
                  {isPlaying ? (
                    <>
                      <Pause size={12} /> Pause
                    </>
                  ) : (
                    <>
                      <Play size={12} /> Play
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* LABEL */}
            <div>
              <SectionHeader>Label</SectionHeader>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-neutral-400">Text</label>
                  <input
                    type="text"
                    value={instance.label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Enter label..."
                    className="h-7 rounded-md border border-white/10 bg-neutral-700/50 px-2 text-xs text-neutral-200 outline-none transition-colors placeholder:text-neutral-600 hover:bg-neutral-600/50 focus:border-white/20 [color-scheme:dark]"
                  />
                </div>
                <SliderRow
                  label="Font Size"
                  value={instance.labelFontSize}
                  onChange={setLabelFontSize}
                  min={LABEL_FONT_SIZE_MIN}
                  max={LABEL_FONT_SIZE_MAX}
                />
                <SliderRow
                  label="Spacing"
                  value={instance.labelSpacing}
                  onChange={setLabelSpacing}
                  min={LABEL_SPACING_MIN}
                  max={LABEL_SPACING_MAX}
                />
              </div>
            </div>

            {/* ANIMATION */}
            <div>
              <SectionHeader>Animation</SectionHeader>
              <div className="space-y-4">
                <SelectRow
                  label="Pattern"
                  value={animation!.pattern}
                  onChange={(v) => setAnimation({ pattern: v as AnimationPattern })}
                  options={ANIMATION_PATTERN_OPTIONS}
                />
                {animation!.pattern === AnimationPattern.Directional && (
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-neutral-400">Direction</label>
                    <div className="grid grid-cols-4 gap-1">
                      {[Direction.Left, Direction.Right, Direction.Up, Direction.Down].map(
                        (dir) => (
                          <button
                            key={dir}
                            onClick={() => setAnimation({ direction: dir })}
                            className={`rounded-md border px-2 py-1 text-[10px] capitalize transition-colors ${
                              animation!.direction === dir
                                ? 'border-white/20 bg-neutral-600/50 text-neutral-200'
                                : 'border-white/10 bg-neutral-700/50 text-neutral-400 hover:bg-neutral-600/50'
                            }`}
                          >
                            {dir}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
                <SliderRow
                  label="FPS"
                  value={animation!.fps}
                  onChange={(v) => setAnimation({ fps: v })}
                  min={FPS_MIN}
                  max={FPS_MAX}
                />
                <SelectRow
                  label="Style"
                  value={animation!.style}
                  onChange={(v) => setAnimation({ style: v as any })}
                  options={ANIMATION_STYLE_OPTIONS}
                />
                <SelectRow
                  label="Background"
                  value={animation!.backgroundStyle}
                  onChange={(v) => setAnimation({ backgroundStyle: v as any })}
                  options={BACKGROUND_STYLE_OPTIONS}
                />
              </div>
            </div>

            {/* COLOR (collapsible) */}
            <CollapsibleSection
              id={SECTION_COLOR}
              title="Color"
              expanded={expandedSections[SECTION_COLOR] ?? false}
              onToggle={() => toggleSection(SECTION_COLOR)}
            >
              <div className="space-y-4">
                <ColorPicker
                  label="Active"
                  color={color!.activeColor}
                  opacity={color!.activeOpacity}
                  onColorChange={(v) => setColor({ activeColor: v })}
                  onOpacityChange={(v) => setColor({ activeOpacity: v })}
                />
                <ColorPicker
                  label="Inactive"
                  color={color!.inactiveColor}
                  opacity={color!.inactiveOpacity}
                  onColorChange={(v) => setColor({ inactiveColor: v })}
                  onOpacityChange={(v) => setColor({ inactiveOpacity: v })}
                />
                <ColorPicker
                  label="Background"
                  color={color!.backgroundColor}
                  opacity={color!.backgroundOpacity}
                  onColorChange={(v) => setColor({ backgroundColor: v })}
                  onOpacityChange={(v) => setColor({ backgroundOpacity: v })}
                />
              </div>
            </CollapsibleSection>

            {/* EFFECTS (collapsible) */}
            <CollapsibleSection
              id={SECTION_EFFECTS}
              title="Effects"
              expanded={expandedSections[SECTION_EFFECTS] ?? false}
              onToggle={() => toggleSection(SECTION_EFFECTS)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-neutral-400">Glow</label>
                  <button
                    onClick={() => setEffects({ glowEnabled: !effects!.glowEnabled })}
                    className={`relative h-5 w-9 rounded-full transition-colors ${
                      effects!.glowEnabled
                        ? 'bg-neutral-400'
                        : 'bg-neutral-600'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                        effects!.glowEnabled ? 'translate-x-4' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
                {effects!.glowEnabled && (
                  <>
                    <SliderRow
                      label="Glow Radius"
                      value={effects!.glowRadius}
                      onChange={(v) => setEffects({ glowRadius: v })}
                      min={GLOW_RADIUS_MIN}
                      max={GLOW_RADIUS_MAX}
                    />
                    <ColorPicker
                      label="Glow Color"
                      color={effects!.glowColor}
                      opacity={effects!.glowOpacity}
                      onColorChange={(v) => setEffects({ glowColor: v })}
                      onOpacityChange={(v) => setEffects({ glowOpacity: v })}
                    />
                  </>
                )}
              </div>
            </CollapsibleSection>
          </div>

          {/* Footer */}
          <div className="flex gap-2 border-t border-white/10 p-3">
            <ViewCodeButton isOpen={isCodePanelOpen} onToggle={onToggleCodePanel} />
            <CopyButton
              getText={() =>
                generateComponentCode(instance.config)
              }
            />
          </div>
        </>
      )}
    </aside>
  );
}
