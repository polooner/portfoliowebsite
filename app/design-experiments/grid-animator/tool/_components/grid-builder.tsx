'use client';

import { useState, useCallback } from 'react';
import { useGridAnimatorStore } from '../_store/grid-animator-store';

/**
 * Interactive grid builder widget with paint-drag support.
 * Reads from the currently selected instance.
 */
export default function GridBuilder() {
  const instance = useGridAnimatorStore(
    (state) => (state.selectedId ? state.instances[state.selectedId] : null)
  );
  const setCell = useGridAnimatorStore((state) => state.setCell);

  const [isPainting, setIsPainting] = useState(false);
  const [paintValue, setPaintValue] = useState(true);

  const rows = instance?.config.grid.rows ?? 0;
  const cols = instance?.config.grid.cols ?? 0;
  const activeCells = instance?.config.activeCells ?? [];

  const handleMouseDown = useCallback(
    (row: number, col: number) => {
      const currentValue = activeCells[row]?.[col] ?? false;
      const newValue = !currentValue;
      setPaintValue(newValue);
      setIsPainting(true);
      setCell(row, col, newValue);
    },
    [activeCells, setCell]
  );

  const handleMouseEnter = useCallback(
    (row: number, col: number) => {
      if (isPainting) {
        setCell(row, col, paintValue);
      }
    },
    [isPainting, paintValue, setCell]
  );

  const handleMouseUp = useCallback(() => {
    setIsPainting(false);
  }, []);

  if (!instance) return null;

  return (
    <div
      className="flex flex-col items-center gap-1 select-none"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} className="flex gap-1">
          {Array.from({ length: cols }, (_, c) => {
            const isActive = activeCells[r]?.[c] ?? false;
            return (
              <button
                key={c}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleMouseDown(r, c);
                }}
                onMouseEnter={() => handleMouseEnter(r, c)}
                className={`h-5 w-5 rounded-sm transition-colors ${
                  isActive
                    ? 'bg-white shadow-sm shadow-white/20'
                    : 'bg-neutral-600/50 hover:bg-neutral-500/50'
                }`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
