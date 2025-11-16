import { WarpSlider } from '@/app/(main)/lab/components/warp-slider';
import { StreamingTextCarousel } from './streaming-text-carousel';

export default function Page() {
  return (
    <div className="flex flex-col gap-8 p-2 sm:p-4 md:p-8 max-w-full overflow-x-hidden">
      <StreamingTextCarousel />
      <WarpSlider />
    </div>
  );
}
