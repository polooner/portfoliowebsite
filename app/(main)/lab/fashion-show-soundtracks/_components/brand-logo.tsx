import Image, { StaticImageData } from 'next/image';

import balmain from '@/public/fashion-show-soundtracks/logos/balmain.png';
import celine from '@/public/fashion-show-soundtracks/logos/celine.png';
import dior from '@/public/fashion-show-soundtracks/logos/dior.png';
import enfantsRichesDeprimes from '@/public/fashion-show-soundtracks/logos/enfants-riches-deprimes.svg';
import isabelMarant from '@/public/fashion-show-soundtracks/logos/isabel-marant.png';
import maisonMargiela from '@/public/fashion-show-soundtracks/logos/maison-margiela.png';
import rickOwens from '@/public/fashion-show-soundtracks/logos/rick-owens.png';
import saintLaurent from '@/public/fashion-show-soundtracks/logos/saint-laurent.png';

// Every source file is normalized to the same pixel height, so the per-logo height classes here
// are pure optical correction: single-line wordmarks read much larger than two-line lockups at
// equal height. Adding a brand's logo = process the file into public/fashion-show-soundtracks/logos
// and add one entry; brands without an entry fall back to a Figma-style text header.
//
// Keyed by the DB's brand_slug (see BRAND_ORDER in _lib/data.ts), not a hand-cleaned slug —
// enfants-riches-deprimes's real brand_slug is "enfants-riches-d-prim-s" (the ingest slugifier
// mangles accented characters).
type LogoEntry = { src: StaticImageData; className: string; unoptimized?: boolean };

const LOGOS: Record<string, LogoEntry> = {
  celine: { src: celine, className: 'h-8 sm:h-10 md:h-12' },
  dior: { src: dior, className: 'h-8 sm:h-10 md:h-12' },
  'rick-owens': { src: rickOwens, className: 'h-7 sm:h-8 md:h-10' },
  balmain: { src: balmain, className: 'h-10 sm:h-12 md:h-14' },
  'saint-laurent': { src: saintLaurent, className: 'h-10 sm:h-12 md:h-14' },
  'isabel-marant': { src: isabelMarant, className: 'h-10 sm:h-12 md:h-14' },
  'maison-margiela': { src: maisonMargiela, className: 'h-10 sm:h-12 md:h-14' },
  // SVG: skip the raster optimizer — it's vector, already minimal, and Next blocks SVGs through
  // it by default anyway (dangerouslyAllowSVG isn't set project-wide for one logo's sake).
  'enfants-riches-d-prim-s': { src: enfantsRichesDeprimes, className: 'h-10 sm:h-12 md:h-14', unoptimized: true },
};

export function BrandLogo({ slug, name, priority }: { slug: string; name: string; priority?: boolean }) {
  const logo = LOGOS[slug];
  if (!logo) {
    return (
      <span className="block text-[clamp(1.5rem,3vw,2.25rem)] font-light uppercase leading-[0.95] tracking-[0.08em] text-black">
        {name}
      </span>
    );
  }
  return (
    <Image
      src={logo.src}
      alt={name}
      priority={priority}
      unoptimized={logo.unoptimized}
      sizes="(max-width: 768px) 85vw, 720px"
      className={`${logo.className} w-auto max-w-full object-contain object-left`}
    />
  );
}
