import Image from 'next/image';
import Link from 'next/link';

const artworksList = [
  {
    id: 'wires',
    title: 'melting ruin',
    image: '/distorted_ocean.png',
    date: 'April 2025',
  },
];

export default function Artworks() {
  return (
    <div className="w-96  min-w-96 mx-auto px-4 py-8 gap-12 flex flex-col">
      <h1 className="text-xl text-center">Collections of artworks.</h1>
      <div className="flex flex-col gap-16 w-full">
        {artworksList.map(artwork => (
          <Link key={artwork.id} href={`/artworks/${artwork.id}`}>
            <div className="overflow-hidden ">
              <div className="h-72 relative">
                <Image src={artwork.image} alt={artwork.title} fill className="object-cover" />
              </div>
              <div>
                <div className="w-fit bg-black border border-black p-1">
                  <p className="font-medium text-lg text-white ">{artwork.title}</p>
                  <p className="text-neutral-200 text-xs">{artwork.date}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
