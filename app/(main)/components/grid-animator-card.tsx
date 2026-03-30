import Link from 'next/link';

const VIDEO_SRC =
  'https://bkjyaeduksegxtarnyzz.supabase.co/storage/v1/object/public/public-assets/grid-animator/demo.mp4';

export function GridAnimatorCard() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row justify-between">
        <span className="font-bold">GRID ANIMATOR TOOL</span>
      </div>

      <Link
        href="https://tools.filipwojda.com/grid-animator"
        target="_blank"
        className="group block"
      >
        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-neutral-900 p-4 flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-95">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain rounded-xl"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
      </Link>
    </div>
  );
}
