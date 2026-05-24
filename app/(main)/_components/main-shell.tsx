'use client';

import { usePathname } from 'next/navigation';
import { PageShell } from './page-shell';

type Props = {
  children: React.ReactNode;
};

export function MainShell({ children }: Props) {
  const pathname = usePathname();

  if (
    pathname === '/' ||
    (pathname.startsWith('/blog/') && pathname !== '/blog') ||
    pathname === '/lab' ||
    pathname.startsWith('/lab/')
  ) {
    return <div className="w-full">{children}</div>;
  }

  return <PageShell>{children}</PageShell>;
}
