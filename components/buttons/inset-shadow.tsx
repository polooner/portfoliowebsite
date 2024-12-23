import { getExampleButtonUsageCode } from "@/lib/utils";
import { Button } from "../ui/button";

export function InsetShadowButton() {
  return <Button variant={"insetShadow"}>Get Started</Button>;
}

export const InsetShadowButtonCode = `const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        ...
        insetShadow:
          "items-center justify-center whitespace-nowrap flex flex-row text-sm font-medium hover:bg-gradient-to-b hover:from-neutral-600 hover:via-neutral-800 hover:to-neutral-950 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border border-primary-800 text-white shadow-smInset active:outline active:outline-2 active:outline-primary-500/50 active:bg-primary-900 active:from-primary-900 active:via-primary-900 active:to-primary-900 active:shadow-none h-10 rounded-lg px-4 group relative gap-2 overflow-hidden translate-y-[-1rem] [--animation-delay:600ms] transform-gpu ring-offset-current transition-all hover:ring-2 hover:ring-neutral-400 duration-300 hover:transition-all w-fit",
        ...
      },
      ...
    },
    ...
  }
);
`;

export const InsetShadowButtonDisplay = {
  component: InsetShadowButton,
  instructions: [
    {
      file: "ui/button.tsx",
      code: InsetShadowButtonCode,
      description: "First add this variant to your shadcn buttonVariants:",
    },
    {
      file: "[...]/YourComponent.tsx",
      code: getExampleButtonUsageCode("insetShadow"),
      description: "Then in any component of your choice:",
    },
  ],
};
