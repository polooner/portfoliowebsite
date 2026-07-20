'use client';

import { useEffect, useRef, useState } from 'react';

/** How far below the viewport children start mounting, so they are ready before scrolled into view. */
const PREMOUNT_ROOT_MARGIN = '800px 0px';

type Props = {
  children: React.ReactNode;
  /** Sizing classes reserving the children's rendered height so mounting causes no layout shift. */
  className?: string;
};

export function LazyMount({ children, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!('IntersectionObserver' in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: PREMOUNT_ROOT_MARGIN }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {isNearViewport ? children : null}
    </div>
  );
}
