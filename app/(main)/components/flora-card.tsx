'use client';

import { Link } from 'next-view-transitions';

export function FloraCard() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row justify-between">
        <span className="font-bold">FLORA</span>
        <i className="font-thin text-xs">product engineering</i>
      </div>

      <Link href="/flora" className="block">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-2xl cursor-help transition-transform duration-200 ease-out hover:scale-95"
          style={{ viewTransitionName: 'flora-video' }}
        >
          <source src="/2022drawings/florafeatures.mov" type="video/quicktime" />
          <source src="/2022drawings/florafeatures.mov" type="video/mp4" />
        </video>
      </Link>
    </div>
  );
}
