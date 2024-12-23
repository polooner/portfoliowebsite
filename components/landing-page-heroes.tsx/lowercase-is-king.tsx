import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadingGrids } from "../ui/bg-patterns/fading-grids";
import { Instruction } from "@/types";

export const LandingPage = () => {
  return (
    <div className="w-full h-[80dvh] flex items-center justify-center">
      <div className="flex flex-col items-start max-w-2xl mx-auto text-start">
        <h1 className="text-4xl font-bold tracking-tight">lowercase is king</h1>
        <h2 className="text-4xl font-light tracking-tight z-50">
          lowercase is king
        </h2>
        <div className="flex flex-row items-start w-full relative">
          <p className="text-md text-muted-foreground font-extralight tracking-wide sm:w-1/2 pt-8">
            Combine this with a memorable mission statement, and this is a
            perfect template for a consumer product.
          </p>
          <FadingGrids className="mr-auto self-start absolute ml-auto right-5">{`{your product's picture}`}</FadingGrids>
        </div>
        <Link
          href="/"
          className="flex items-center text-md font-semibold text-primary flex-row hover:underline pt-2"
        >
          voilà <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export const LowercaseIsKingCode = `import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadingGrids } from "../ui/bg-patterns/fading-grids";

export const LandingPage = () => {
  return (
    <div className="w-full h-[80dvh] flex items-center justify-center">
      <div className="flex flex-col items-start max-w-2xl mx-auto text-start">
        <h1 className="text-4xl font-bold tracking-tight">lowercase is king</h1>
        <h2 className="text-4xl font-light tracking-tight z-50">
          lowercase is king
        </h2>
        <div className="flex flex-row items-start w-full relative">
          <p className="text-md text-muted-foreground font-extralight tracking-wide sm:w-1/2 pt-8">
            Combine this with a memorable mission statement, and this is a
            perfect template for a consumer product.
          </p>
          <FadingGrids className="mr-auto self-start absolute ml-auto right-5">{{your product's picture}}</FadingGrids>
        </div>
        <Link
          href="/"
          className="flex items-center text-md font-semibold text-primary flex-row hover:underline pt-2"
        >
          voilà <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
};`;

export const LowercaseIsKingInstructions: Instruction[] = [
  { code: LowercaseIsKingCode, file: "ui/LandingPage.tsx" },
];
