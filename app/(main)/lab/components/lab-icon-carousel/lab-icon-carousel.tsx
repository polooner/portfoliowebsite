'use client';

import { LabIconCarouselCore } from './lab-icon-carousel-core';
import { LabItemFooter } from '../lab-item-footer';
import {
  LAB_CONTAINER_WIDTH,
  LAB_CONTAINER_HEIGHT,
  LAB_ITEM_TITLE,
  LAB_ITEM_DESCRIPTION,
} from './lab-icon-carousel-constants';

export function LabIconCarousel() {
  return (
    <div className="flex flex-col items-center gap-2">
      <LabIconCarouselCore
        width={LAB_CONTAINER_WIDTH}
        height={LAB_CONTAINER_HEIGHT}
        className="rounded-2xl overflow-hidden"
      />
      <LabItemFooter title={LAB_ITEM_TITLE} description={LAB_ITEM_DESCRIPTION} />
    </div>
  );
}
