'use client';

import { useButtonStore } from '../../_store/button-store';
import { CollapsibleSection } from '../collapsible-section';
import { SliderRow } from '../slider-row';
import {
  PADDING_MIN,
  PADDING_MAX,
  MIN_WIDTH_MIN,
  MIN_WIDTH_MAX,
} from '../../_constants/defaults';

export function ShapeSection() {
  const shape = useButtonStore((s) => s.config.shape);
  const setShape = useButtonStore((s) => s.setShape);

  return (
    <CollapsibleSection id="shape" title="Shape">
      <div className="space-y-4">
        <SliderRow
          label="Padding X"
          value={shape.paddingX}
          onChange={(v) => setShape({ paddingX: v })}
          min={PADDING_MIN}
          max={PADDING_MAX}
          suffix="px"
        />
        <SliderRow
          label="Padding Y"
          value={shape.paddingY}
          onChange={(v) => setShape({ paddingY: v })}
          min={PADDING_MIN}
          max={PADDING_MAX}
          suffix="px"
        />
        <SliderRow
          label="Min Width"
          value={shape.minWidth}
          onChange={(v) => setShape({ minWidth: v })}
          min={MIN_WIDTH_MIN}
          max={MIN_WIDTH_MAX}
          suffix="px"
        />
      </div>
    </CollapsibleSection>
  );
}
