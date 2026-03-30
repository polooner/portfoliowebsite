'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ArrowIcon from '@/components/ui/icons';

export default function NavBar({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav className="fixed left-0 top-0 z-50 flex h-full w-48 flex-col justify-between px-6 py-10">
      <div className="flex flex-col gap-6">
        <div>
          <strong className="text-lg">Filip Wojda</strong>
          <p className="text-sm">design eng (in SF/NYC)</p>
          <p className="text-sm text-neutral-500">I like tools for thought</p>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          {children}
          {!isHome && (
            <Link
              href="/"
              className="px-3 py-1 text-black hover:bg-black hover:text-white transition-colors"
            >
              home
            </Link>
          )}
          <Link
            href="/blog"
            className="px-3 py-1 text-black hover:bg-black hover:text-white transition-colors"
          >
            braindump
          </Link>
          <Link
            href="/ui"
            className="px-3 py-1 text-black hover:bg-black hover:text-white transition-colors"
          >
            ui
          </Link>
          <Link
            href="/lab"
            className="px-3 py-1 text-black hover:bg-black hover:text-white transition-colors"
          >
            lab
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-1 text-sm">
        <span className="font-bold px-3">Contact</span>
        <Link
          target="_blank"
          href="https://twitter.com/filipwojda"
          className="flex flex-row gap-x-1 items-center px-3 py-0.5 hover:underline"
        >
          twitter (x)
          <ArrowIcon />
        </Link>
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/filip-wojda/"
          className="flex flex-row gap-x-1 items-center px-3 py-0.5 hover:underline"
        >
          linkedin
          <ArrowIcon />
        </Link>
        <Link
          href="https://github.com/polooner"
          className="flex flex-row gap-x-1 items-center px-3 py-0.5 hover:underline"
        >
          github
          <ArrowIcon />
        </Link>
        <Link
          href="mailto:wojdafilipdev@gmail.com"
          className="flex flex-row gap-x-1 items-center px-3 py-0.5 hover:underline"
        >
          email
          <ArrowIcon />
        </Link>
      </div>
    </nav>
  );
}
