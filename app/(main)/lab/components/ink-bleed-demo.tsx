'use client';

import { LabItemFooter } from '@/app/(main)/lab/components/lab-item-footer';
import { InkBleed } from '@/components/design-experiments/ink-bleed';
import { InkBleedFilter } from '@/components/design-experiments/ink-bleed-filter';
import { getInkBleedConfig } from '@/lib/ink-bleed-utils';

export function InkBleedDemo() {
  const config = getInkBleedConfig('extreme');

  return (
    <div className="lab-item relative">
      <InkBleedFilter config={config} />
      <div className="h-[280px] flex items-center justify-center">
        <InkBleed intensity="extreme">
          <span className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight select-none">
            Ink Bleed
          </span>
        </InkBleed>
      </div>
      <LabItemFooter
        title="Ink bleed text"
        description="SVG filter effect that simulates ink bleeding on paper."
      />
    </div>
  );
}
