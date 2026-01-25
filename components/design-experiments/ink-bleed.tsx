import React, { forwardRef } from 'react';
import { type InkBleedIntensity, type InkBleedConfig } from '@/lib/ink-bleed-utils';
import { useInkBleed, type UseInkBleedOptions } from '@/hooks/use-ink-bleed';
import { cn } from '@/lib/utils';

export interface InkBleedProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: InkBleedIntensity;
  customConfig?: Partial<InkBleedConfig>;
  enabled?: boolean;
  animated?: boolean;
  animateTurbulence?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

export const InkBleed = forwardRef<HTMLDivElement, InkBleedProps>(
  (
    {
      intensity = 'normal',
      customConfig,
      enabled = true,
      animated = false,
      animateTurbulence = false,
      asChild = false,
      className,
      style: styleProp,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const { ref: internalRef, style: inkBleedStyle } = useInkBleed({
      intensity,
      customConfig,
      enabled,
      animated,
      animateTurbulence,
    });

    // Merge refs
    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef, internalRef]
    );

    const mergedStyle = { ...inkBleedStyle, ...styleProp };

    if (asChild) {
      // Clone child and merge props
      const child = React.Children.only(children) as React.ReactElement<
        React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
      >;
      return React.cloneElement(child, {
        ref: mergedRef,
        style: { ...child.props.style, ...mergedStyle },
        className: cn(child.props.className, className),
        ...props,
      } as React.HTMLAttributes<HTMLElement>);
    }

    return (
      <div
        ref={mergedRef}
        className={className}
        style={mergedStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InkBleed.displayName = 'InkBleed';
