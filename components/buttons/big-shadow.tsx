import { getExampleButtonUsageCode } from "@/lib/utils";
import { Button } from "../ui/button";

export function BigShadowButton() {
  return <Button variant="bigShadow">Big hover</Button>;
}

export const BigShadowButtonCode = ``;

export const BigShadowButtonDisplay = {
  component: BigShadowButton,
  instructions: [
    {
      file: "ui/button.tsx",
      code: BigShadowButtonCode,
      description: "First add this variant to your shadcn buttonVariants:",
    },
    {
      file: "[...]/YourComponent.tsx",
      code: getExampleButtonUsageCode("bigShadow"),
      description: "Then in any component of your choice:",
    },
  ],
};
