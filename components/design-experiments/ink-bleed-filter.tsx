'use client';

import { type InkBleedConfig } from '@/lib/ink-bleed-utils';

interface InkBleedFilterProps {
  config: InkBleedConfig;
}

export function InkBleedFilter({ config }: InkBleedFilterProps) {
  const { threshold, turbulence, filterId } = config;

  if (!filterId) return null;

  return (
    <svg
      aria-hidden="true"
      className="absolute w-0 h-0 overflow-hidden pointer-events-none"
      style={{ position: 'absolute', width: 0, height: 0 }}
    >
      <defs>
        <filter id={filterId} colorInterpolationFilters="sRGB">
          {turbulence && (
            <feTurbulence
              type="fractalNoise"
              baseFrequency={turbulence.baseFrequency}
              numOctaves={turbulence.numOctaves}
              seed={turbulence.seed ?? 0}
              result="turbulence"
            />
          )}
          {turbulence && (
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale={turbulence.scale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          )}
          <feComponentTransfer in={turbulence ? 'displaced' : 'SourceGraphic'}>
            <feFuncR type="linear" slope={threshold[1]} intercept={threshold[0]} />
            <feFuncG type="linear" slope={threshold[2]} intercept={threshold[0]} />
            <feFuncB type="linear" slope={threshold[3]} intercept={threshold[0]} />
            <feFuncA type="linear" slope={1.5} intercept={0} />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
