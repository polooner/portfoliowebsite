import { Button } from '@/components/ui/button';

export default function LandingContent() {
  return (
    <div className="fixed inset-0 z-10 flex">
      {/* Left side - Text content */}
      <div className="flex w-[55%] flex-col justify-between px-12 py-8">
        {/* Top section with hero text */}
        <div className="flex flex-col gap-6 pt-24">
          <h1 className="text-5xl font-light tracking-tight text-black md:text-6xl">
            Built for Creative
            <br />
            <span className="text-neutral-400">Design at Scale.</span>
          </h1>
          <p className="max-w-md text-base text-neutral-500">
            Transform your clean designs into gritty, textured masterpieces
            without switching tools.
          </p>
          <div className="flex flex-row gap-3 pt-2">
            <Button
              variant="threeDAngledShadowScale"
              size="lg"
              className="rounded-full px-6 py-5 text-sm"
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-neutral-300 bg-white px-6 py-5 text-sm text-neutral-700 hover:bg-neutral-100"
            >
              Learn How
            </Button>
          </div>
        </div>

        {/* Bottom section - trust badges placeholder */}
        <div className="flex flex-col gap-3 pb-8">
          <p className="text-sm text-neutral-400">Trusted by leading names</p>
          <div className="flex flex-row items-center gap-8 text-neutral-400">
            <span className="text-lg font-medium">Google</span>
            <span className="text-lg font-medium">Microsoft</span>
            <span className="text-lg font-medium">Stripe</span>
            <span className="text-lg font-medium">Amazon</span>
          </div>
        </div>
      </div>

      {/* Right side - Full height card */}
      <div className="w-[45%] p-4">
        <div className="h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300 shadow-xl">
          {/* Placeholder content */}
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-neutral-400">Image placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
}
