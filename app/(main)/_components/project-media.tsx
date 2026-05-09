import Image from 'next/image';
import { KreaLogo } from '@/components/ui/krea-logo';
import type { MediaFit, ProjectMedia } from '../_data/projects';

type Props = {
  media: ProjectMedia;
};

const FIT_CLASS: Record<MediaFit, string> = {
  contain: 'object-contain',
  cover: 'object-cover',
};

function fitClass(fit: MediaFit | undefined) {
  return FIT_CLASS[fit ?? 'contain'];
}

export function ProjectMediaTile({ media }: Props) {
  if (media.type === 'image') {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        className={`w-full h-full block ${fitClass(media.fit)}`}
      />
    );
  }

  if (media.type === 'video') {
    const isMov = media.src.toLowerCase().endsWith('.mov');
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`w-full h-full block ${fitClass(media.fit)}`}
      >
        {isMov && <source src={media.src} type="video/quicktime" />}
        <source src={media.src} type={media.mime ?? 'video/mp4'} />
      </video>
    );
  }

  if (media.key === 'krea') {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="text-white scale-[3]">
          <KreaLogo />
        </div>
      </div>
    );
  }

  return null;
}
