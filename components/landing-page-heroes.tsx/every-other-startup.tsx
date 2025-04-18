import { Instruction } from "@/types";

export const LandingPage = () => {
  return (
    <div className="w-full h-[80dvh] flex items-center justify-center">
      <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          every other startup
        </h1>
      </div>
    </div>
  );
};

export const EveryOtherStatupCode = `export const LandingPage = () => {
  return (
    <div className="w-full h-[80dvh] flex items-center justify-center">
      <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          every other startup
        </h1>
      </div>
    </div>
  );
};`;

export const EveryOtherStartupInstructions: Instruction[] = [
  { code: EveryOtherStatupCode, file: "ui/EveryOtherStartupCode.tsx" },
];
