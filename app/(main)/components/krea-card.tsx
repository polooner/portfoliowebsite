import Link from 'next/link';
import { KreaLogo } from '@/components/ui/krea-logo';

export function KreaCard() {
  return (
    <div className="flex flex-col gap-1">
      <Link
        href="https://www.krea.ai"
        target="_blank"
        className="group block"
      >
        <div className="flex items-center justify-center w-full aspect-square bg-black transition-transform duration-200 ease-out group-hover:scale-95">
          <div className="text-white scale-[4]">
            <KreaLogo />
          </div>
        </div>
      </Link>

      <div className="flex flex-row justify-between">
        <span className="font-bold text-2xl">KREA</span>
        <i className="font-thin text-xs">current</i>
      </div>
      <i className="font-thin text-xs text-neutral-500">web, design, engineering</i>
    </div>
  );
}
