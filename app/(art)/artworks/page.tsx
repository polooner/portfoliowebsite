import Image from 'next/image';
import Link from 'next/link';

const artworksList = [
  {
    id: 'wires',
    title: '"melting ruin"',
    image: '/distorted_ocean.png',
    hoverImage: '/webcombinations.png',
    date: 'April 2025',
  },
  {
    id: '2022drawings',
    title: 'collections of drawings from 2022',
    image: '/2022drawings/2022_4.JPG',
    date: 'January - February 2022',
    hoverImage: '/2022drawings/grid_of_2022drawings.png',
  },
];

export default function Artworks() {
  return (
    <div className="w-96  min-w-96 mx-auto px-4 py-8 gap-12 flex flex-col">
      <h1 className="text-xl text-center">Collections of artworks.</h1>
      <div className="flex flex-col gap-16 w-full">
        {artworksList.map(artwork => (
          <Link key={artwork.id} href={`/artworks/${artwork.id}`} className="group">
            <div className="overflow-hidden">
              <div className="h-72 relative">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover group-hover:opacity-0"
                />
                <Image
                  src={artwork.hoverImage}
                  alt={artwork.title}
                  fill
                  className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100"
                />
              </div>
              <div>
                <div className="w-fit group-hover:bg-black border-black p-1">
                  <p className="font-medium text-lg group-hover:text-white ">{artwork.title}</p>
                  <p className="group-hover:text-neutral-200 text-neutral-600 text-xs">
                    {artwork.date}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
