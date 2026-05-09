'use client';

import { Link } from 'next-view-transitions';

export function FloraCard() {
  return (
    <div className="flex flex-col gap-1">
      <Link href="/flora" className="block">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full cursor-help transition-transform duration-200 ease-out hover:scale-95"
          style={{ viewTransitionName: 'flora-video' }}
        >
          <source src="/2022drawings/florafeatures.mov" type="video/quicktime" />
          <source src="/2022drawings/florafeatures.mov" type="video/mp4" />
        </video>
      </Link>

      <div className="flex flex-row justify-between">
        <span className="font-bold text-2xl">FLORA</span>
        <i className="font-thin text-xs">2025-2026</i>
      </div>
      <i className="font-thin text-xs text-neutral-500">web, design, engineering</i>
    </div>
  );
}
