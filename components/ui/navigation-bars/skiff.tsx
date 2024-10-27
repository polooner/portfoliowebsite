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
import { RocketIcon } from "lucide-react";

const items = [
  {
    title: "Product",
    href: "#",
    description: "All the features you need to get your work done.",
  },
  {
    title: "Resources",
    href: "#",
    description: "Learn how to use Skiff.",
  },
  {
    title: "Pricing",
    href: "#",
    description: "Find the perfect plan for your needs.",
  },
];

export default function SkiffNavigationBar() {
  return (
    // <div className="fixed z-[9999] flex w-full items-center justify-center">
    <div className="h-[30dvh]">
      {/* <div className="mt-4 flex w-11/12 gap-6 rounded-2xl border border-solid border-gray-700 bg-gray-800 p-1 shadow-xl md:w-fit">
        <div className="flex h-9 w-full items-center justify-between gap-0 md:justify-start">
          <a rel="noreferrer, noopener" href="/">
            <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500">
              <div style={{ transform: "none" }}>
                <RocketIcon className="size-4" />
              </div>
            </div>
          </a>
          <div className="flex h-full w-fit items-center gap-x-2 md:hidden">
            <nav className="flex h-9 w-9 items-center justify-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-gray-700/[0.8]">
                <MenuIcon className="size-4" />
              </div>
            </nav>
          </div>
          <div className=" hidden md:inline">
            <div className="flex cursor-default items-center">
              <span className="body-small flex h-full items-center px-3 text-white">
                Product
              </span>
              <div
                className="-ml-2"
                style={{ transform: "rotate(180deg) translateZ(0px)" }}
              >
                <ChevronDown className="size-3 text-white" />
              </div>
            </div>
          </div>
          <div className=" hidden md:inline">
            <div className="flex cursor-default items-center">
              <span className="body-small flex h-full items-center px-3 text-white">
                Resources
              </span>
              <div
                className="-ml-2"
                style={{ transform: "rotate(180deg) translateZ(0px)" }}
              >
                <ChevronDown className="size-3 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <NavigationMenu
        className="z-[9999] flex w-full items-center justify-center text-xs duration-75"
        disableAnimation
      >
        <NavigationMenuList className="mt-4 flex w-11/12 rounded-2xl border border-solid border-gray-700 bg-gray-800 p-1 shadow-xl md:w-fit text-white duration-75 self-center h-11">
          <a rel="noreferrer, noopener" href="/">
            <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500">
              <div style={{ transform: "none" }}>
                <RocketIcon className="size-4" />
              </div>
            </div>
          </a>
          <NavigationMenuItem className="duration-75 p-1">
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent data-[active]:text-white hover:text-white duration-75 p-1">
              Product
            </NavigationMenuTrigger>
            <NavigationMenuContent className="rounded-3xl" disableAnimation>
              <ul className="grid gap-3 p-6 w-fit min-w-[200px] md:max-w-[400px]">
                <ListItem href="#" title="yessir">
                  Item 1
                </ListItem>
                <ListItem href="#" title="yessir!">
                  Item 2
                </ListItem>
                <ListItem href="#" title="YES ">
                  Item 3
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="bg-transparent hover:bg-transparent p-1">
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent data-[active]:text-white hover:text-white px-0">
              Components
            </NavigationMenuTrigger>
            <NavigationMenuContent className="rounded-3xl" disableAnimation>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {items.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
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
                  "bg-transparent hover:bg-transparent"
                )}
              >
                Documentation
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
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
