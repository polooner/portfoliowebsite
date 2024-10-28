"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  BookIcon,
  DollarSign,
  PlaneIcon,
  RocketIcon,
} from "lucide-react";

const items = [
  {
    image: <PlaneIcon className="size-4" />,
    title: "Product",
    href: "#",
    description: "All the features you need to get your work done.",
  },
  {
    image: <BookIcon className="size-4" />,
    title: "Resources",
    href: "#",
    description: "Learn how to use Skiff.",
  },
  {
    title: "Pricing",
    href: "#",
    description: "Find the perfect plan for your needs.",
    image: <DollarSign className="size-4" />,
  },
];

export default function SkiffNavigationBar() {
  return (
    <div className="h-[30dvh] flex items-start justify-center">
      <NavigationMenu
        className="z-[9999] flex w-full items-center justify-center text-xs duration-75"
        disableAnimation
      >
        <NavigationMenuList className="mt-4 flex w-11/12 rounded-2xl border border-solid border-stone-700 bg-stone-800 p-1 shadow-xl md:w-fit text-white duration-75 self-center h-11">
          <a rel="noreferrer, noopener" href="/">
            <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500">
              <div style={{ transform: "none" }}>
                <RocketIcon className="size-4" />
              </div>
            </div>
          </a>
          <NavigationMenuItem className="duration-75 p-1">
            <NavigationMenuTrigger className="bg-transparent focus:text-white data-[active]:bg-transparent data-[state=open]:bg-transparent data-[active]:text-white hover:text-white duration-75 p-1 active:text-white active:bg-transparent focus:bg-transparent hover:bg-transparent">
              Product
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className="rounded-2xl bg-stone-800"
              disableAnimation
            >
              <ul className="grid gap-3 p-6 w-fit min-w-[200px] md:max-w-[400px]">
                <ListItem
                  href="#"
                  title="yessir"
                  image={<PlaneIcon className="size-4" />}
                >
                  Item 1
                </ListItem>
                <ListItem
                  href="#"
                  title="yessir!"
                  image={<BookIcon className="size-4" />}
                >
                  Item 2
                </ListItem>
                <ListItem
                  href="#"
                  title="YES "
                  image={<RocketIcon className="size-4" />}
                >
                  Item 3
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="bg-transparent hover:bg-transparent p-1">
            <NavigationMenuTrigger className="bg-transparent focus:text-white data-[active]:bg-transparent data-[state=open]:bg-transparent data-[active]:text-white hover:text-white duration-75 p-1 active:text-white active:bg-transparent focus:bg-transparent hover:bg-transparent">
              Components
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className="rounded-2xl bg-stone-800"
              disableAnimation
            >
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {items.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                    image={item.image}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="p-1 px-0">
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent hover:bg-transparent  focus:text-white data-[active]:bg-transparent data-[state=open]:bg-transparent data-[active]:text-white hover:text-white duration-75 p-1 active:text-white active:bg-transparent focus:bg-transparent "
                )}
              >
                Documentation <ArrowUpRight className="ml-2 size-4" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { image?: React.ReactNode }
>(({ className, title, children, image, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:bg-stone-700  focus:bg-accent focus:text-accent-foreground rounded-xl text-white flex-row items-center gap-3",
            className
          )}
          {...props}
        >
          <span className="bg-stone-500 rounded-lg p-2">{image}</span>

          <div className="flex flex-col">
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground text-stone-400">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export const SkiffNavigationBarCode = `"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  BookIcon,
  DollarSign,
  PlaneIcon,
  RocketIcon,
} from "lucide-react";

const items = [
  {
    image: <PlaneIcon className="size-4" />,
    title: "Product",
    href: "#",
    description: "All the features you need to get your work done.",
  },
  {
    image: <BookIcon className="size-4" />,
    title: "Resources",
    href: "#",
    description: "Learn how to use Skiff.",
  },
  {
    title: "Pricing",
    href: "#",
    description: "Find the perfect plan for your needs.",
    image: <DollarSign className="size-4" />,
  },
];

export default function SkiffNavigationBar() {
  return (
    <div className="h-[30dvh] flex items-start justify-center">
      <NavigationMenu
        className="z-[9999] flex w-full items-center justify-center text-xs duration-75"
        disableAnimation
      >
        <NavigationMenuList className="mt-4 flex w-11/12 rounded-2xl border border-solid border-stone-700 bg-stone-800 p-1 shadow-xl md:w-fit text-white duration-75 self-center h-11">
          <a rel="noreferrer, noopener" href="/">
            <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500">
              <div style={{ transform: "none" }}>
                <RocketIcon className="size-4" />
              </div>
            </div>
          </a>
          <NavigationMenuItem className="duration-75 p-1">
            <NavigationMenuTrigger className="bg-transparent focus:text-white data-[active]:bg-transparent data-[state=open]:bg-transparent data-[active]:text-white hover:text-white duration-75 p-1 active:text-white active:bg-transparent focus:bg-transparent hover:bg-transparent">
              Product
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className="rounded-2xl bg-stone-800"
              disableAnimation
            >
              <ul className="grid gap-3 p-6 w-fit min-w-[200px] md:max-w-[400px]">
                <ListItem
                  href="#"
                  title="yessir"
                  image={<PlaneIcon className="size-4" />}
                >
                  Item 1
                </ListItem>
                <ListItem
                  href="#"
                  title="yessir!"
                  image={<BookIcon className="size-4" />}
                >
                  Item 2
                </ListItem>
                <ListItem
                  href="#"
                  title="YES "
                  image={<RocketIcon className="size-4" />}
                >
                  Item 3
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="bg-transparent hover:bg-transparent p-1">
            <NavigationMenuTrigger className="bg-transparent focus:text-white data-[active]:bg-transparent data-[state=open]:bg-transparent data-[active]:text-white hover:text-white duration-75 p-1 active:text-white active:bg-transparent focus:bg-transparent hover:bg-transparent">
              Components
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className="rounded-2xl bg-stone-800"
              disableAnimation
            >
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {items.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                    image={item.image}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="p-1 px-0">
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent hover:bg-transparent  focus:text-white data-[active]:bg-transparent data-[state=open]:bg-transparent data-[active]:text-white hover:text-white duration-75 p-1 active:text-white active:bg-transparent focus:bg-transparent "
                )}
              >
                Documentation <ArrowUpRight className="ml-2 size-4" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { image?: React.ReactNode }
>(({ className, title, children, image, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:bg-stone-700  focus:bg-accent focus:text-accent-foreground rounded-xl text-white flex-row items-center gap-3",
            className
          )}
          {...props}
        >
          <span className="bg-stone-500 rounded-lg p-2">{image}</span>

          <div className="flex flex-col">
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground text-stone-400">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
`;
