import { cn } from "@/lib/utils";

type ScreenBorderPulseProps = {
  active?: boolean;
  variant?: "default" | "rainbow";
  className?: string;
};

export function ScreenBorderPulse({
  active = true,
  variant = "default",
  className,
}: ScreenBorderPulseProps) {
  if (!active) return null;

  const isRainbow = variant === "rainbow";
  const fill = isRainbow ? "url(#rainbow-gradient)" : "#707070";
  const cornerFill = isRainbow ? "url(#rainbow-gradient-radial)" : "#707070";

  const shimmerGradient = isRainbow
    ? `linear-gradient(
        180deg,
        transparent 0%,
        rgba(120,30,30,0.25) 20%,
        rgba(120,80,20,0.3) 35%,
        rgba(20,100,50,0.35) 50%,
        rgba(20,60,120,0.3) 65%,
        rgba(80,20,120,0.25) 80%,
        transparent 100%
      )`
    : `linear-gradient(
        180deg,
        transparent 0%,
        rgba(120,120,120,0.2) 45%,
        rgba(120,120,120,0.3) 50%,
        rgba(120,120,120,0.2) 55%,
        transparent 100%
      )`;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-9999 animate-border-glow",
        className
      )}
    >
      {/* Base glow - all edges */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="blur-border" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="60" result="blur" />
          </filter>
          {isRainbow && (
            <>
              <linearGradient id="rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(140,40,40)" />
                <stop offset="20%" stopColor="rgb(140,90,30)" />
                <stop offset="40%" stopColor="rgb(30,120,60)" />
                <stop offset="60%" stopColor="rgb(30,80,140)" />
                <stop offset="80%" stopColor="rgb(100,30,140)" />
                <stop offset="100%" stopColor="rgb(140,40,70)" />
              </linearGradient>
              <radialGradient id="rainbow-gradient-radial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(100,50,50)" />
                <stop offset="50%" stopColor="rgb(50,80,120)" />
                <stop offset="100%" stopColor="rgb(90,40,110)" />
              </radialGradient>
            </>
          )}
        </defs>
        {/* Top edge */}
        <ellipse
          cx="50%"
          cy="0"
          rx="60%"
          ry="150"
          fill={fill}
          fillOpacity={isRainbow ? "0.35" : "0.2"}
          filter="url(#blur-border)"
        />
        {/* Bottom edge */}
        <ellipse
          cx="50%"
          cy="100%"
          rx="60%"
          ry="150"
          fill={fill}
          fillOpacity={isRainbow ? "0.35" : "0.2"}
          filter="url(#blur-border)"
        />
        {/* Left edge */}
        <ellipse
          cx="0"
          cy="50%"
          rx="150"
          ry="60%"
          fill={fill}
          fillOpacity={isRainbow ? "0.35" : "0.2"}
          filter="url(#blur-border)"
        />
        {/* Right edge */}
        <ellipse
          cx="100%"
          cy="50%"
          rx="150"
          ry="60%"
          fill={fill}
          fillOpacity={isRainbow ? "0.35" : "0.2"}
          filter="url(#blur-border)"
        />
        {/* Corners for fuller coverage */}
        <ellipse
          cx="0"
          cy="0"
          rx="200"
          ry="200"
          fill={cornerFill}
          fillOpacity={isRainbow ? "0.3" : "0.15"}
          filter="url(#blur-border)"
        />
        <ellipse
          cx="100%"
          cy="0"
          rx="200"
          ry="200"
          fill={cornerFill}
          fillOpacity={isRainbow ? "0.3" : "0.15"}
          filter="url(#blur-border)"
        />
        <ellipse
          cx="0"
          cy="100%"
          rx="200"
          ry="200"
          fill={cornerFill}
          fillOpacity={isRainbow ? "0.3" : "0.15"}
          filter="url(#blur-border)"
        />
        <ellipse
          cx="100%"
          cy="100%"
          rx="200"
          ry="200"
          fill={cornerFill}
          fillOpacity={isRainbow ? "0.3" : "0.15"}
          filter="url(#blur-border)"
        />
      </svg>

      {/* Shimmer layer - animated gradient sweep, masked to edges only */}
      <div
        className="absolute inset-[-100px] animate-border-shimmer"
        style={{
          backgroundImage: shimmerGradient,
          backgroundSize: "100% 300%",
          filter: "blur(40px)",
          maskImage: `radial-gradient(ellipse 50% 50% at center, transparent 0%, transparent 70%, black 100%)`,
          WebkitMaskImage: `radial-gradient(ellipse 50% 50% at center, transparent 0%, transparent 70%, black 100%)`,
        }}
      />
    </div>
  );
}
