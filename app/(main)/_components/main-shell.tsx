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
    pathname.startsWith('/lab/') ||
    // On lab.filipwojda.com the middleware rewrite strips the /lab prefix, so the
    // browser pathname (what usePathname reports) arrives without it.
    pathname === '/fashion-show-soundtracks' ||
    pathname.startsWith('/fashion-show-soundtracks/')
  ) {
    return <div className="w-full">{children}</div>;
  }

  return <PageShell>{children}</PageShell>;
}
