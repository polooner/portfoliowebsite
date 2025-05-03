import Image from 'next/image';

const artworks = {
  drawing1: {
    src: '/2022drawings/2022_1.JPG',
    alt: 'drawing 1',
    title: 'untitled 1',
  },
  drawing2: {
    src: '/2022drawings/2022_2.JPG',
    alt: 'drawing 2',
    title: 'untitled 2',
  },
  drawing3: {
    src: '/2022drawings/2022_3.JPG',
    alt: 'drawing 3',
    title: 'untitled 3',
  },
  drawing4: {
    src: '/2022drawings/2022_4.JPG',
    alt: 'drawing 4',
    title: 'untitled 4',
  },
  drawing5: {
    src: '/2022drawings/2022_5.JPG',
    alt: 'drawing 5',
    title: 'untitled 5',
  },
};

export default function Drawings2022() {
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto px-4 gap-14">
      {Object.values(artworks).map(artwork => (
        <div key={artwork.src} className="w-full max-w-3xl overflow-hidden">
          <Image
            src={artwork.src}
            alt={artwork.alt}
            width={1200}
            height={800}
            className="w-full h-auto object-cover"
            priority
          />
          {artwork.title}
        </div>
      ))}
    </div>
  );
}
