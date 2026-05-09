'use client';

import Image from 'next/image';
import { Link } from 'next-view-transitions';

export function ArenaDockCard() {
  return (
    <div className="flex flex-col gap-1">
      <Link href="/arenadock" className="group block">
        <div
          className="relative w-full aspect-square overflow-hidden cursor-help transition-transform duration-200 ease-out group-hover:scale-95"
          style={{ viewTransitionName: 'arenadock-image' }}
        >
          <Image
            src="/arenadock1.png"
            alt="ArenaDock app icon"
            fill
            className="object-cover transition-opacity duration-300 ease-out group-hover:opacity-0"
          />
          <Image
            src="/arenadock2.png"
            alt="ArenaDock app interface"
            fill
            className="object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          />
        </div>
      </Link>

      <div className="flex flex-row justify-between">
        <span className="font-bold text-2xl">ARE.NA DOCK</span>
      </div>
      <i className="font-thin text-xs text-neutral-500">web, design, engineering</i>
    </div>
  );
}
