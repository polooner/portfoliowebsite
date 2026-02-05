import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingContent() {
  return (
    <div className="fixed inset-0 z-10 flex">
      {/* Left side - Text content */}
      <div className="flex w-[55%] flex-col justify-between px-12 py-8">
        {/* Top section with hero text */}
        <div className="flex flex-col gap-6 pt-24">
          <h1 className="text-5xl font-light tracking-tight text-black md:text-6xl">
            Drop Sunlight
            <br />
            <span className="text-neutral-400">Into Your UI.</span>
          </h1>
          <p className="max-w-md text-base text-neutral-500">
            Create beautiful, realistic window shadows for your landing pages,
            portfolios, and dashboards in seconds.
          </p>
          <div className="flex flex-row gap-3 pt-2">
            <Link href="/design-experiments/sunlight-drop/tool">
              <Button
                variant="threeDAngledShadowScale"
                size="lg"
                className="rounded-full px-6 py-5 text-sm"
              >
                Go to App
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom section - feature highlights */}
        <div className="flex flex-col gap-4 pb-8">
          <div className="flex flex-row items-center gap-6 text-sm text-neutral-500">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              Copy-paste CSS
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              Fully customizable
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              Free forever
            </span>
          </div>
        </div>
      </div>

      {/* Right side - Full height card */}
      <div className="w-[45%] p-4">
        <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-xl">
          <Image
            src="/bgs/columnsshadowcast.jpg"
            alt="Architectural shadow"
            fill
            className="object-cover"
            priority
          />
          {/* Demo screenshot overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <Image
              src="/sunlight-drop-demo.png"
              alt="Demo screenshot"
              width={800}
              height={900}
              className="h-auto max-h-[85%] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
