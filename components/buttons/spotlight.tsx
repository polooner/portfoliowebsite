import Image from "next/image";
import { Button } from "../ui/button";
import { getExampleButtonUsageCode } from "@/lib/utils";

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

const SpotlightButtonCode = `export function SpotlightButton() {
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
}`;

export const SpotlightButtonVariantCode = `const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        ...
        spotlight:
          "border border-2 border-neutral-800 rounded-xl text-secondary bg-neutral-900 p-3.5 text-sm font-medium overflow-clip relative group/spotlight hover:ring-4 ring-offset-0 ring-offset-neutral-900 duration-300 transform-gpu hover:transition-all hover:ring-neutral-300",
        ...
      },
      ...
    },
    ...
  }
);
`;

export const SpotlightButtonDisplay = {
  component: SpotlightButton,
  instructions: [
    {
      file: "ui/button.tsx",
      code: SpotlightButtonVariantCode,
      description: "First add this variant to your shadcn buttonVariants:",
    },
    {
      file: "[...]/YourComponent.tsx",
      code: SpotlightButtonCode,
      description: "Then in any component of your choice:",
    },
  ],
};
