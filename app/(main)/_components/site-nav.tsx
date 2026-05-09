'use client';

import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'home', href: '/' },
  { label: 'braindump', href: '/blog' },
  { label: 'ui', href: '/ui' },
  { label: 'lab', href: '/lab' },
];

const BASE_LINK_CLASS =
  'w-fit text-2xl leading-tight underline decoration-dotted decoration-1 underline-offset-4';
const INACTIVE_CLASS = 'decoration-neutral-400 hover:decoration-black';
const ACTIVE_CLASS = 'decoration-black';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col">
      {NAV_LINKS.map((n) => {
        const active = isActive(pathname, n.href);
        return (
          <Link
            key={n.label}
            href={n.href}
            className={`${BASE_LINK_CLASS} ${active ? ACTIVE_CLASS : INACTIVE_CLASS}`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
