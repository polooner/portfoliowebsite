import { StreamingTextCarousel } from '@/app/(main)/lab/components/streaming-text-carousel/streaming-text-carousel';
import { WarpSlider } from '@/app/(main)/lab/components/warp-slider/warp-slider';
import { Timer } from '@/app/(main)/lab/components/timer/timer';
import { ClipPathReveal } from '@/app/(main)/lab/components/clippath-reveal/clippath-reveal';
import { EaseCarousel } from '@/app/(main)/lab/components/ease-carousel/ease-carousel';
import { AgentProgress } from '@/app/(main)/lab/components/agent-progress';
import { InkBleedDemo } from '@/app/(main)/lab/components/ink-bleed-demo';
import { DotMatrixGrid } from '@/app/(main)/lab/components/dot-matrix-grid/dot-matrix-grid';

export default function Page() {
  return (
    <div className="flex flex-col gap-20 p-2 sm:p-4 md:p-8 max-w-full overflow-x-hidden">
      <DotMatrixGrid />
      <InkBleedDemo />
      <StreamingTextCarousel />
      <WarpSlider />
      <Timer />
      <EaseCarousel />
      <ClipPathReveal />
      <AgentProgress />
    </div>
  );
}
