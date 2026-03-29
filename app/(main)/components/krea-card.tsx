import Link from 'next/link';
import { KreaLogo } from '@/components/ui/krea-logo';

export function KreaCard() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row justify-between">
        <span className="font-bold">KREA</span>
        <i className="font-thin text-xs">current</i>
      </div>

      <Link
        href="https://www.krea.ai"
        target="_blank"
        className="group block"
      >
        <div className="flex items-center justify-center w-full aspect-square rounded-2xl bg-black transition-transform duration-200 ease-out group-hover:scale-95">
          <div className="text-white scale-[4]">
            <KreaLogo />
          </div>
        </div>
      </Link>
    </div>
  );
}
