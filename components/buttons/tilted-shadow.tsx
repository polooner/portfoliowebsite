import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { getExampleButtonUsageCode } from "@/lib/utils";

export const TiltedShadowButton = () => {
  return (
    <Button variant="tiltingShadow" size="minimal">
      Tilted Shadow
      <ArrowRightIcon className="size-4 text-white" />
    </Button>
  );
};

export const TiltedShadowButtonCode = `const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        ...
        tiltingShadow:
          "content-center items-center cursor-pointer flex flex-row flex-nowrap gap-1  justify-center overflow-visible relative decoration-0 rounded-lg bg-[rgb(56,56,56)] shadow-[rgb(73,73,73)_0px_-2.4px_0px_0px_inset,_rgba(40,40,40,0.2)_0px_1px_3px_0px,_rgb(45,45,45)_0px_0px_0px_1px] hover:shadow-inner transition-all duration-300 ease-in-out text-xs font-sans cursor-pointer box-border antialiased content-center items-center flex flex-none flex-row flex-nowrap gap-2.5 h-min justify-center overflow-hidden px-1 relative w-min rounded-lg opacity-100 text-white hover:bg-[rgb(70,70,70)]",
        ...
      },
      ...
    },
    ...
  }
);
`;

export const TiltedShadowButtonDisplay = {
  component: TiltedShadowButton,
  instructions: [
    {
      file: "ui/button.tsx",
      code: TiltedShadowButtonCode,
      description: "First add this variant to your shadcn buttonVariants:",
    },
    {
      file: "[...]/YourComponent.tsx",
      code: getExampleButtonUsageCode("tiltingShadow"),
      description: "Then in any component of your choice:",
    },
  ],
};
