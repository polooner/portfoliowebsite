'use client';

import dynamic from 'next/dynamic';
import { LazyMount } from './lazy-mount';

// Deferred with ssr:false so heavy chunks (three.js, framer-motion demos)
// download only once a demo approaches the viewport.
const DotMatrixGrid = dynamic(
  () => import('./dot-matrix-grid/dot-matrix-grid').then((m) => m.DotMatrixGrid),
  { ssr: false }
);
const InkBleedDemo = dynamic(
  () => import('./ink-bleed-demo').then((m) => m.InkBleedDemo),
  { ssr: false }
);
const StreamingTextCarousel = dynamic(
  () =>
    import('./streaming-text-carousel/streaming-text-carousel').then(
      (m) => m.StreamingTextCarousel
    ),
  { ssr: false }
);
const WarpSlider = dynamic(
  () => import('./warp-slider/warp-slider').then((m) => m.WarpSlider),
  { ssr: false }
);
const Timer = dynamic(() => import('./timer/timer').then((m) => m.Timer), {
  ssr: false,
});
const EaseCarousel = dynamic(
  () => import('./ease-carousel/ease-carousel').then((m) => m.EaseCarousel),
  { ssr: false }
);
const ClipPathReveal = dynamic(
  () => import('./clippath-reveal/clippath-reveal').then((m) => m.ClipPathReveal),
  { ssr: false }
);
const AgentProgress = dynamic(
  () => import('./agent-progress').then((m) => m.AgentProgress),
  { ssr: false }
);
const ButtonsSection = dynamic(
  () => import('./ui-sections/buttons').then((m) => m.ButtonsSection),
  { ssr: false }
);
const CardsSection = dynamic(
  () => import('./ui-sections/cards').then((m) => m.CardsSection),
  { ssr: false }
);

// Placeholder heights measured from the mounted demos at the desktop content
// width (736px), so the reserved box matches the real height and nothing shifts.
const LAZY_DEMOS = [
  { id: 'dot-matrix-grid', Demo: DotMatrixGrid, placeholderClass: 'min-h-[236px]' },
  { id: 'ink-bleed', Demo: InkBleedDemo, placeholderClass: 'min-h-[432px]' },
  { id: 'streaming-text-carousel', Demo: StreamingTextCarousel, placeholderClass: 'min-h-[250px]' },
  { id: 'warp-slider', Demo: WarpSlider, placeholderClass: 'min-h-[260px]' },
  { id: 'timer', Demo: Timer, placeholderClass: 'min-h-[250px]' },
  { id: 'ease-carousel', Demo: EaseCarousel, placeholderClass: 'min-h-[286px]' },
  { id: 'clippath-reveal', Demo: ClipPathReveal, placeholderClass: 'min-h-[250px]' },
  { id: 'agent-progress', Demo: AgentProgress, placeholderClass: 'min-h-[332px]' },
  { id: 'buttons', Demo: ButtonsSection, placeholderClass: 'min-h-[302px]' },
  { id: 'cards', Demo: CardsSection, placeholderClass: 'min-h-[553px]' },
];

export function LazyLabDemos() {
  return (
    <div className="flex flex-col gap-20">
      {LAZY_DEMOS.map(({ id, Demo, placeholderClass }) => (
        <LazyMount key={id} className={placeholderClass}>
          <Demo />
        </LazyMount>
      ))}
    </div>
  );
}
