'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'projects', href: '/projects' },
  { name: 'contact', href: '/contact' },
  { name: 'blog', href: '/blog' },
  { name: 'products', href: '/products' },
];

const Header = () => {
  const path = usePathname();

  return (
    <nav className='p-2 mb-24 !justify-between flex items-center flex-row '>
      <Link
        href={'/'}
        className='items-center flex justify-center tracking-tight font-black text-4xl'
      >
        <Image
          alt='midjourney_logo'
          height={100}
          width={100}
          src={'/logo.png'}
          unoptimized
        />
      </Link>

      <div className='flex flex-row sm:gap-10 gap-4 items-center text-md justify-between'>
        {navItems.map((item) => {
          return (
            <Link
              key={item.name}
              className={clsx(
                'hover:underline underline-offset-2 decoration-2 duration-100 ',
                item.href === path ? 'text-black' : 'text-stone-500'
              )}
              href={item.href}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Header;
