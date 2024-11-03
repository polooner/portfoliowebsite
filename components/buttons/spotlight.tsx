import Image from "next/image";
import { Button } from "../ui/button";

export function SpotlightButton() {
  return (
    <Button variant="spotlight">
      Wow, a star!
      <Image
        src="/ui/spotlight.webp"
        alt="star"
        width={98}
        height={64}
        className="z-10 min-w-full h-16 absolute inset-y-[-20px] inset-x-0 group-hover/spotlight:opacity-100 opacity-80 transition-opacity duration-300"
      />
    </Button>
  );
}

export const SpotlightButtonCode = ``;
