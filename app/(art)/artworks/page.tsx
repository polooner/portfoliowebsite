import NavBar from "@/components/ui/NavBar";
import Image from "next/image";

export default function Artworks() {
  return (
    <div className="flex flex-col gap-y-10 w-full self-center items-center">
      <NavBar />
      <div className="flex flex-col items-center max-w-4xl mx-auto px-4">
        <div className="w-full max-w-3xl overflow-hidden ">
          <Image
            src="/distorted_ocean.png"
            alt="Distorted Ocean"
            width={1200}
            height={800}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
        how does it feel to know?
      </div>
    </div>
  );
}
