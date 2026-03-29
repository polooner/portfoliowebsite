'use client';

import { useRef, useState } from 'react';

const VIDEO_SRC =
  'https://bkjyaeduksegxtarnyzz.supabase.co/storage/v1/object/public/public-assets/arenadock/demo.mp4';

export function DemoVideo() {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-neutral-100 aspect-video">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  );
}
