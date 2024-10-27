import { cn } from "@/lib/utils";

export function FadingGrids({
  gridColor,
  children,
  className,
}: {
  gridColor?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute h-[200px] w-1/3 relative flex items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Main grid container */}
      <div className="absolute inset-0 dark:bg-black bg-white dark:bg-grid-white/[0.3] bg-grid-black/[0.4]">
        {/* Horizontal fade mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-100 to-transparent opacity-20" />
        {/* Vertical fade mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-100 to-transparent opacity-20" />
      </div>

      {/* Content mask */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white dark:from-black dark:to-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-black dark:to-black" />
      </div>

      {/* Content */}
      <p className="text-lg italic font-light tracking-tighter z-20 text-black dark:text-white py-8">
        {children}
      </p>
    </div>
  );
}
