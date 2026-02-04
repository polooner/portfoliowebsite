import type { ReactNode } from 'react';

export interface CarouselIcon {
  id: string;
  label: string;
  icon: ReactNode;
}

export interface IconCarouselProps {
  icons?: CarouselIcon[];
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
  width?: number;
  height?: number;
  className?: string;
  showMinervaLogo?: boolean;
}

export interface IconPosition {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  t: number;
}
