'use client';

import { useEffect } from 'react';

// Marks each brand header with data-stuck when it is actually pinned (its sentinel — the
// element right before it — has scrolled above the sticky line), so the separator can fade
// in only then. 56px = the sticky top bar's height (top-14).
export function StickySeparators() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const header = entry.target.nextElementSibling as HTMLElement | null;
          if (!header) continue;
          header.dataset.stuck =
            !entry.isIntersecting && entry.boundingClientRect.top < 57 ? '1' : '0';
        }
      },
      { rootMargin: '-57px 0px 0px 0px', threshold: 0 },
    );
    document.querySelectorAll('[data-brand-sentinel]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
