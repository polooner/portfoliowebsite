import NavBar from "@/components/ui/NavBar";
import Image from "next/image";

const artworks = {
  distortedOcean: {
    src: "/distorted_ocean.png",
    alt: "distorted ocean",
    title: "how does it feel to know?"
  },
  bridgeFoundation: {
    src: "/bridges.jpg",
    alt: "bridges",
    title: "bridges",
  }
};

export default function Artworks() {
  return (
    <div className="flex flex-col gap-y-10 w-full self-center items-center">
      <NavBar />
      <div className="flex flex-col items-center max-w-4xl mx-auto px-4 gap-14">
        {Object.values(artworks).map((artwork) => (
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
    </div>
  );
}
