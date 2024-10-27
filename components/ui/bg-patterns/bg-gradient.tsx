import { cn } from "@/lib/utils";

interface LeftGradientProps {
  className?: string;
  [key: string]: unknown;
}

export default function LeftGradient({
  className,
  ...props
}: LeftGradientProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full ",
        className
      )}
      {...props}
    ></div>
  );
}
