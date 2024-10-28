import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export const AllYouNeed = () => {
  return (
    <div className="w-full h-[80dvh] flex items-center justify-center">
      <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
        <h1 className="sm:text-6xl text-4xl font-black tracking-tight mb-6">
          All You Need
        </h1>
        <p className="text-md text-muted-foreground font-medium mb-8 sm:w-7/12 w-9/12">
          Stressing over the details? Realistically, you don't need to. This is
          all you need. Product speaks for itself. Focus on shipping, you can
          never go wrong with simple looks.
        </p>
        <Button className="rounded-3xl font-semibold h-12">
          Join now <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export const AllYouNeedCode = `import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export const AllYouNeed = () => {
  return (
    <div className="w-full h-[80dvh] flex items-center justify-center">
      <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
        <h1 className="sm:text-6xl text-4xl font-black tracking-tight mb-6">
          All You Need
        </h1>
        <p className="text-md text-muted-foreground font-medium mb-8 sm:w-7/12 w-9/12">
          Stressing over the details? Realistically, you don't need to. This is
          all you need. Product speaks for itself. Focus on shipping, you can
          never go wrong with simple looks.
        </p>
        <Button className="rounded-3xl font-semibold h-12">
          Join now <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
`;
