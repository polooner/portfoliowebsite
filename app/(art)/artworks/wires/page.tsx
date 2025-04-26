import Image from 'next/image';

const artworks = {
  distortedOcean: {
    src: '/distorted_ocean.png',
    alt: 'distorted ocean',
    title: 'how does it feel to know?',
  },
  bridgeFoundation: {
    src: '/bridges.jpg',
    alt: 'bridges',
    title: 'bridges',
  },
  running: {
    src: '/running.png',
    alt: 'running',
    title: 'running',
  },
};

export default function Wires() {
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
