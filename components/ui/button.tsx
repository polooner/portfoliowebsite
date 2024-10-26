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
          "relative z-[1] inline-block min-w-[147px] text-black border rounded-[40px] font-['code-saver',sans-serif] text-[calc(13.5px+.125vw)] leading-[1] tracking-[1px] outline-0 text-center no-underline uppercase transition-all duration-250 ease-in-out cursor-pointer align-middle overflow-hidden before:content-[''] before:absolute before:z-[-1] before:left-0 before:top-0 before:w-full before:h-full before:bg-[var(--fill)] before:rounded-0 before:transition-[.5s_cubic-bezier(.215,.61,.355,1)] text-center items-center justify-center text-[var(--text-fill)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
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
