import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getExampleButtonUsageCode = (
  variant: string
) => `<Button variant="${variant}" size="minimal">
  Click me
  <ArrowRightIcon className="size-4 text-white" />
</Button>`;
