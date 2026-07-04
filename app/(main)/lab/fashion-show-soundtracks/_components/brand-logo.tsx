import Image, { StaticImageData } from 'next/image';

import balmain from '@/public/fashion-show-soundtracks/logos/balmain.png';
import celine from '@/public/fashion-show-soundtracks/logos/celine.png';
import dior from '@/public/fashion-show-soundtracks/logos/dior.png';
import isabelMarant from '@/public/fashion-show-soundtracks/logos/isabel-marant.png';
import maisonMargiela from '@/public/fashion-show-soundtracks/logos/maison-margiela.png';
import rickOwens from '@/public/fashion-show-soundtracks/logos/rick-owens.png';
import saintLaurent from '@/public/fashion-show-soundtracks/logos/saint-laurent.png';

// Every source file is normalized to the same pixel height, so the per-logo height classes here
// are pure optical correction: single-line wordmarks read much larger than two-line lockups at
// equal height. Adding a brand's logo = process the file into public/fashion-show-soundtracks/logos
// and add one entry; brands without an entry fall back to a Figma-style text header.
const LOGOS: Record<string, { src: StaticImageData; className: string }> = {
  celine: { src: celine, className: 'h-12 sm:h-16 md:h-20' },
  dior: { src: dior, className: 'h-12 sm:h-16 md:h-20' },
  'rick-owens': { src: rickOwens, className: 'h-10 sm:h-12 md:h-16' },
  balmain: { src: balmain, className: 'h-14 sm:h-20 md:h-24' },
  'saint-laurent': { src: saintLaurent, className: 'h-14 sm:h-20 md:h-24' },
  'isabel-marant': { src: isabelMarant, className: 'h-14 sm:h-20 md:h-24' },
  'maison-margiela': { src: maisonMargiela, className: 'h-14 sm:h-20 md:h-24' },
};

export function BrandLogo({ slug, name, priority }: { slug: string; name: string; priority?: boolean }) {
  const logo = LOGOS[slug];
  if (!logo) {
    return (
      <span className="block text-[clamp(2.75rem,9vw,6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-black">
        {name}
      </span>
    );
  }
  return (
    <Image
      src={logo.src}
      alt={name}
      priority={priority}
      sizes="(max-width: 768px) 85vw, 720px"
      className={`${logo.className} w-auto max-w-full object-contain object-left`}
    />
  );
}
