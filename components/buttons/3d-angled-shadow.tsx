import { getExampleButtonUsageCode } from "@/lib/utils";
import { Button } from "../ui/button";

export function ThreeDAngledShadowButton() {
  return <Button variant="threeDAngledShadowScale">3D Angled Shadow</Button>;
}

export const ThreeDAngledShadowButtonVariantCode = `const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        ...
        threeDAngledShadowScale: "rounded-xl border border-[#2E2D2E] bg-gradient-to-b from-[#3E3D3E] via-[#403E40] via-[79.91%] to-[#5E5D5E] shadow-[inset_0px_-2px_2px_0.5px_#000,inset_0px_0px_2px_1.5px_rgba(255,255,255,0.50)] text-white hover:shadow-[inset_0px_-2px_5px_0px_#000,inset_0px_0px_1px_1.5px_rgba(255,255,255,0.50)] transition-all duration-200 active:scale-95 origin-center"
        ...
      },
      ...
    },
    ...
  }
);
`;

export const ThreeDAngledShadowButtonDisplay = {
  component: ThreeDAngledShadowButton,
  instructions: [
    {
      file: "ui/button.tsx",
      code: ThreeDAngledShadowButtonVariantCode,
      description: "First add this variant to your shadcn buttonVariants:",
    },
    {
      file: "[...]/YourComponent.tsx",
      code: getExampleButtonUsageCode("threeDAngledShadowScale"),
      description: "Then in any component of your choice:",
    },
  ],
};
