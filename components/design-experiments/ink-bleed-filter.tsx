'use client';

import { type InkBleedConfig } from '@/lib/ink-bleed-utils';

interface InkBleedFilterProps {
  config: InkBleedConfig;
}

export function InkBleedFilter({ config }: InkBleedFilterProps) {
  const { thresholdTable, filterId } = config;

  if (!filterId) return null;

  return (
    <svg
      aria-hidden="true"
      className="absolute w-0 h-0 overflow-hidden pointer-events-none"
      style={{ position: 'absolute', width: 0, height: 0 }}
    >
      <defs>
        <filter id={filterId} colorInterpolationFilters="sRGB">
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues={thresholdTable} />
            <feFuncG type="discrete" tableValues={thresholdTable} />
            <feFuncB type="discrete" tableValues={thresholdTable} />
            <feFuncA type="discrete" tableValues={thresholdTable} />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
