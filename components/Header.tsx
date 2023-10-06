'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const navItems: { name: string; href: string }[] = [
  { name: 'projects', href: '/projects' },
  { name: 'contact', href: '/contact' },
  { name: 'blog', href: '/blog' },
  { name: 'products', href: '/products' },
  { name: 'book a call', href: '/bookacall' },
];

const Header = () => {
  return (
    <NavigationMenu>
      <NavigationMenuItem asChild>
        <Link
          href={'/'}
          passHref
          className='flex items-center justify-center text-3xl font-thin tracking-tight duration-100 hover:cursor-pointer hover:font-normal sm:text-6xl font-noto'
        >
          W
        </Link>
      </NavigationMenuItem>
      <NavigationMenuList>
        {navItems.map((item) => {
          return (
            <NavigationMenuItem key={item.name}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                >
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='text-sm leading-snug line-clamp-2 text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default Header;
