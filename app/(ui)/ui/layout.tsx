'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageShell } from '@/app/(main)/_components/page-shell';

export const items = [
  { title: 'Landing Page Heroes', href: '/ui/landing-page-heroes' },
  { title: 'Buttons', href: '/ui/buttons' },
  { title: 'Cards', href: '/ui/cards' },
  { title: 'Inputs', href: '/ui/inputs' },
  { title: 'Navigation Bars', href: '/ui/navigation-bars' },
  { title: 'Patterns', href: '/ui/patterns' },
];

function UiSubNav() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col">
      <div className="text-2xl leading-tight text-neutral-500 mb-2">UI</div>
      <ul className="flex flex-col">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-2xl leading-tight transition-colors ${
                  active ? 'text-black' : 'text-neutral-500 hover:text-black'
                }`}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function UILayout({ children }: { children: React.ReactNode }) {
  return <PageShell sidebarExtra={<UiSubNav />}>{children}</PageShell>;
}
