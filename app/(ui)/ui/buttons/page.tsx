import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function ButtonsPage() {
  return (
    <div className="flex flex-col gap-12 items-center">
      <SlightShadowButton />
    </div>
  );
}

const SlightShadowButton = () => {
  return (
    <Button variant="tiltingShadow" size="minimal">
      Tilted Shadow
      <ArrowRightIcon className="size-4 text-white" />
    </Button>
  );
};
