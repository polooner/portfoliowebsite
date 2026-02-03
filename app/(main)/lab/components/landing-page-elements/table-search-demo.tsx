'use client';

import { TableSearchAnimation } from './table-search';
import { LabItemFooter } from '../lab-item-footer';

const LAB_ITEM_TITLE = 'Table Search';
const LAB_ITEM_DESCRIPTION = 'Animated search input with expanding table results';

export function TableSearchDemo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-full max-w-[500px] min-h-[280px] rounded-2xl p-4">
        <TableSearchAnimation />
      </div>
      <LabItemFooter title={LAB_ITEM_TITLE} description={LAB_ITEM_DESCRIPTION} />
    </div>
  );
}
