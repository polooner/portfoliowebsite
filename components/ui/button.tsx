import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        tiltingShadow:
          "content-center items-center cursor-pointer flex flex-row flex-nowrap gap-1  justify-center overflow-visible relative decoration-0 rounded-lg bg-[rgb(56,56,56)] shadow-[rgb(73,73,73)_0px_-2.4px_0px_0px_inset,_rgba(40,40,40,0.2)_0px_1px_3px_0px,_rgb(45,45,45)_0px_0px_0px_1px] hover:shadow-inner transition-all duration-300 ease-in-out text-xs font-sans cursor-pointer box-border antialiased content-center items-center flex flex-none flex-row flex-nowrap gap-2.5 h-min justify-center overflow-hidden px-1 relative w-min rounded-lg opacity-100 text-white hover:bg-[rgb(70,70,70)]",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        marketingAgency:
          "relative z-[1] inline-block min-w-[147px] text-black border rounded-[40px] text-[calc(13.5px+.125vw)] leading-[1] tracking-[1px] outline-0 text-center no-underline uppercase transition-all duration-250 ease-in-out cursor-pointer align-middle overflow-hidden before:content-[''] before:absolute before:z-[-1] before:left-0 before:top-0 before:w-full before:h-full before:bg-[var(--fill)] before:rounded-0 before:transition-[.5s_cubic-bezier(.215,.61,.355,1)] text-center items-center justify-center text-[var(--text-fill)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        insetShadow:
          "items-center justify-center whitespace-nowrap flex flex-row text-sm font-medium hover:bg-gradient-to-b hover:from-neutral-600 hover:via-neutral-800 hover:to-neutral-950 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border border-primary-800 text-white shadow-smInset active:outline active:outline-2 active:outline-primary-500/50 active:bg-primary-900 active:from-primary-900 active:via-primary-900 active:to-primary-900 active:shadow-none h-10 rounded-lg px-4 group relative gap-2 overflow-hidden translate-y-[-1rem] [--animation-delay:600ms] transform-gpu ring-offset-current transition-all hover:ring-2 hover:ring-neutral-400 duration-300 hover:transition-all w-fit",
        spotlight:
          "border border-2 border-neutral-800 rounded-xl text-secondary bg-neutral-900 p-3.5 text-sm font-medium overflow-clip relative group/spotlight hover:ring-4 ring-offset-0 ring-offset-neutral-900 duration-300 transform-gpu hover:transition-all hover:ring-neutral-300",
        bigShadow:
          " bg-neutral-900 text-white hover:shadow-[0_0_30px_20px_rgba(0,0,0,0.2)] transition-all duration-300 rounded-xl transform-gpu",
        threeDAngledShadowScale:
          "rounded-xl border border-[#2E2D2E] bg-gradient-to-b from-[#3E3D3E] via-[#403E40] via-[79.91%] to-[#5E5D5E] shadow-[inset_0px_-2px_2px_0.5px_#000,inset_0px_0px_2px_1.5px_rgba(255,255,255,0.50)] text-white hover:shadow-[inset_0px_-2px_5px_0px_#000,inset_0px_0px_1px_1.5px_rgba(255,255,255,0.50)] transition-all duration-200 active:scale-95 origin-center",
        pillShadows:
          "rounded-xl border border-[#2E2D2E] bg-gradient-to-b from-[#3E3D3E] via-[#403E40] via-[79.91%] to-[#5E5D5E] text-white shadow-[inset_0px_-1px_2px_0.5px_#000,inset_0px_1px_2px_1.5px_rgba(255,255,255,0.50)] transition-shadow duration-200",
        bottomStep:
          "rounded-xl border border-[#2E2D2E] bg-gradient-to-b from-[#3E3D3E] via-[#403E40] via-[79.91%] to-[#5E5D5E] text-white shadow-[inset_0px_20px_2px_0.5px_#000,inset_0px_1px_2px_1.5px_rgba(255,255,255,0.50)] transition-shadow duration-200",
        bottomHighlight:
          "rounded-xl border border-[#2E2D2E] bg-gradient-to-b from-[#3E3D3E] via-[#403E40] via-[79.91%] to-[#5E5D5E] text-white shadow-[inset_0px_10px_20px_0.5px_#000,inset_0px_1px_2px_1.5px_rgba(255,255,255,0.50)] transition-shadow duration-200",
        flatPill:
          "rounded-xl border border-[#2E2D2E] bg-gradient-to-b from-[#3E3D3E] via-[#403E40] via-[79.91%] to-[#5E5D5E] shadow-[inset_0px_-2px_2px_0.5px_#000,inset_0px_0px_2px_1.5px_rgba(255,255,255,0.50)] text-white hover:shadow-[inset_0px_-2px_0px_0.5px_#000,inset_0px_0px_2px_1.5px_rgba(255,255,255,0.50)] transition-shadow duration-200",
      },
      size: {
        default: "h-9 px-4 py-2",
        minimal: "h-min px-3 py-2 w-min",
        marketingAgency: "h-12 rounded-3xl px-8",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
