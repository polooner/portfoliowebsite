import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadingGrids } from "../ui/bg-patterns/fading-grids";

export const LowercaseIsKing = () => {
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

export const LowercaseIsKingCode =
  "import { ArrowRight } from 'lucide-react';\n" +
  "import Link from 'next/link';\n" +
  "import { FadingGrids } from '../ui/bg-patterns/fading-grids';\n" +
  "export const LowercaseIsKing = () => {\n" +
  "    return (\n" +
  "        <div className='w-full h-[80dvh] flex items-center justify-center'>\n" +
  "            <div className='flex flex-col items-start max-w-2xl mx-auto text-start'>\n" +
  "                <h1 className='text-4xl font-bold tracking-tight'>lowercase is king</h1>\n" +
  "                <h2 className='text-4xl font-light tracking-tight z-50'>lowercase is king</h2>\n" +
  "                <div className='flex flex-row items-start w-full relative'>\n" +
  "                    <p className='text-md text-muted-foreground font-extralight tracking-wide sm:w-1/2 pt-8'>\nCombine this with a memorable mission statement, and this is a perfect template for a consumer product.\n" +
  "                    </p>\n" +
  "                    <FadingGrids className='mr-auto self-start absolute ml-auto right-5'>{`{your product's picture}`}</FadingGrids>\n" +
  "                </div>\n" +
  "                <Link\n" +
  '                    href="#"\n' +
  '                    className="flex items-center text-md font-semibold text-primary flex-row hover:underline pt-2"\n' +
  "                >\n" +
  '                    voilà <ArrowRight className="w-4 h-4 ml-2" />\n' +
  "                </Link>\n" +
  "            </div>\n" +
  "        </div>\n" +
  ");\n" +
  "};\n";

{
  /* <LeftGradient
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,black,transparent,transparent)] bg-zinc-100/90 z-0 rounded-xl"
        )}
      /> */
}
