'use client';

import SnapEaseCarousel from '@/components/design-experiments/snap-ease-carousel';
import ColumnCarousel from '@/components/design-experiments/column-carousel';
import { LabItemFooter } from '@/app/(main)/lab/components/lab-item-footer';

export function EaseCarousel() {
  return (
    <div className="lab-item">
      <div className="relative flex flex-col items-center justify-center gap-6 w-full max-w-[500px] bg-neutral-50 rounded-2xl py-8 px-4">
        {/* Snap ease carousel */}
        <div className="flex items-center gap-2 text-xl select-none font-medium">
          <span>generational</span>
          <SnapEaseCarousel
            words={['design', 'clarity', 'speed', 'details']}
            height={30}
            pauseMs={800}
            className="w-20"
          />
        </div>

        {/* Column carousel with visible lines */}
        <div className="relative flex items-center gap-2 text-xl select-none font-medium bg-white rounded-xl px-4 py-2 overflow-hidden">
          <span>generational</span>
          <ColumnCarousel
            words={['design', 'clarity', 'speed', 'details']}
            lineHeight={28}
            visibleLines={3}
            pauseMs={800}
            activeColor="rgb(23 23 23)"
            inactiveColor="rgb(200 200 200)"
            className="w-20"
          />
        </div>
      </div>

      <LabItemFooter
        title="Snap-ease text carousel"
        description="Custom easing with slow-fast-slow transitions. Top: single word swap. Bottom: column with visible neighbors."
      />
    </div>
  );
}
