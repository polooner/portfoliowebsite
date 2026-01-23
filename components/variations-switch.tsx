"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VariationsSwitchProps {
  current: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

export function VariationsSwitch({
  current,
  total,
  onPrevious,
  onNext,
  className = "",
}: VariationsSwitchProps) {
  return (
    <div className={`flex items-center p-1 gap-2 bg-neutral-50 rounded-nest-xl-1 ${className}`}>
      <Button
        onClick={onPrevious}
        variant={"ghost"}
        size={"icon"}
        disabled={current === 1}
        className="p-1 opacity-40 hover:opacity-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-nest-xl-2 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed size-7"
        aria-label="Previous variation"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <span className="font-mono text-xs min-w-[3ch]  text-center select-none">
        {current}/{total}
      </span>

      <Button
        onClick={onNext}
        disabled={current === total}
        variant={"ghost"}
        size={"icon"}
        className="p-1 opacity-40 hover:opacity-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-opacity disabled:opacity-20 disabled:cursor-not-allowed size-7"
        aria-label="Next variation"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
