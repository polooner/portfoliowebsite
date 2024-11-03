import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";

export const TiltedShadowButton = () => {
  return (
    <Button variant="tiltingShadow" size="minimal">
      Tilted Shadow
      <ArrowRightIcon className="size-4 text-white" />
    </Button>
  );
};

// TODO: make a multistep view for buttons since we will be just copying variants

export const TiltedShadowButtonCode = ``;
