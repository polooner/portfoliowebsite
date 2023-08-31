'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Image from 'next/image';
import { Button } from './ui/button';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const navItems: { name: string; href: string }[] = [
  { name: 'projects', href: '/projects' },
  { name: 'contact', href: '/contact' },
  { name: 'blog', href: '/blog' },
  { name: 'products', href: '/products' },
  { name: 'book a call', href: '/bookacall' },
];

const components: { title: string; href: string; description: string }[] =
  [
    {
      title: 'Alert Dialog',
      href: '/docs/primitives/alert-dialog',
      description:
        'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
      title: 'Hover Card',
      href: '/docs/primitives/hover-card',
      description:
        'For sighted users to preview content available behind a link.',
    },
    {
      title: 'Progress',
      href: '/docs/primitives/progress',
      description:
        'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
      title: 'Scroll-area',
      href: '/docs/primitives/scroll-area',
      description: 'Visually or semantically separates content.',
    },
    {
      title: 'Tabs',
      href: '/docs/primitives/tabs',
      description:
        'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
      title: 'Tooltip',
      href: '/docs/primitives/tooltip',
      description:
        'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
  ];

const Header = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const path = usePathname();
  const { data: session } = useSession();

  return (
    <NavigationMenu>
      <NavigationMenuItem asChild>
        <Link
          href={'/'}
          passHref
          className='items-center hover:cursor-pointer flex justify-center tracking-tight hover:font-normal duration-100 font-thin sm:text-6xl text-3xl font-noto'
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

      {isAuthenticated == true && (
        <NavigationMenuItem asChild>
          <Button onClick={() => signOut()}>sign out</Button>
        </NavigationMenuItem>
      )}
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
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default Header;
