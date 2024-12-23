import { Instruction } from "@/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function ButtonInside() {
  return (
    <form className="text-sm leading-5 font-normal tracking-[-0.35px] w-3/4 mx-auto">
      <div className="text-muted-foreground flex items-center rounded-lg gap-1 shadow-[0_1px_1px_rgba(0,0,0,0.03)] py-0 px-3 transition-[border-color] duration-[80ms] border-[0.5px] border-solid border-black/15 focus-within:ring-1 focus-within:ring-ring transition-all duration-300 ease-in-out">
        <div className="relative flex-grow h-12 p-[0.5px]">
          <Input
            id="workEmail-input"
            name="workEmail"
            placeholder="Enter your work email"
            variant="ghost"
            type="email"
            autoComplete="email"
            aria-label="Work email"
            className="text-sm leading-5 font-normal tracking-[-0.35px] py-2 text-foreground border-0 h-full w-full bg-transparent text-ellipsis"
          />
        </div>
        <Button className="rounded-lg">Get started</Button>
      </div>
    </form>
  );
}

export const ButtonInsideCode = `import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function ButtonInside() {
  return (
    <form className="text-sm leading-5 font-normal tracking-[-0.35px] w-3/4 mx-auto">
      <div className="text-muted-foreground flex items-center rounded-lg gap-1 shadow-[0_1px_1px_rgba(0,0,0,0.03)] py-0 px-3 transition-[border-color] duration-[80ms] border-[0.5px] border-solid border-black/15 focus-within:ring-1 focus-within:ring-ring transition-all duration-300 ease-in-out">
        <div className="relative flex-grow h-12 p-[0.5px]">
          <Input
            id="workEmail-input"
            name="workEmail"
            placeholder="Enter your work email"
            variant="ghost"
            type="email"
            autoComplete="email"
            aria-label="Work email"
            className="text-sm leading-5 font-normal tracking-[-0.35px] py-2 text-foreground border-0 h-full w-full bg-transparent text-ellipsis"
          />
        </div>
        <Button className="rounded-lg">Get started</Button>
      </div>
    </form>
  );
}`;

export const ButtonInsideInputInstructions: Instruction[] = [
  { code: ButtonInsideCode, file: "ui/ButtonInsideInput.tsx" },
];
