import { StreamingTextCarousel } from '@/app/(main)/lab/components/streaming-text-carousel/streaming-text-carousel';
import { WarpSlider } from '@/app/(main)/lab/components/warp-slider/warp-slider';

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-2 sm:p-4 md:p-8 max-w-full overflow-x-hidden">
      <StreamingTextCarousel />
      <WarpSlider />
    </div>
  );
}
