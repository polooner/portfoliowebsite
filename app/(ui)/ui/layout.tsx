"use client";

import MobileUISheetTrigger from "@/components/ui/mobile-ui-sheet-trigger";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const items = [
  {
    title: "Landing Page Heroes",
    href: "/ui/landing-page-heroes",
  },
  {
    title: "Buttons",
    href: "/ui/buttons",
  },
  {
    title: "Cards",
    href: "/ui/cards",
  },
  {
    title: "Navigation Bars",
    href: "/ui/navigation-bars",
  },
  {
    title: "Patterns",
    href: "/ui/patterns",
  },
];

export default function UILayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-4 w-full">
      <nav className="flex flex-row items-center w-full pt-4 px-2">
        <MobileUISheetTrigger />
        <div className="flex flex-row items-center text-start justify-center sm:gap-x-4 gap-x-2 top-10 px-8 flex-grow z-50 bg-white/50">
          <Link
            href="/"
            className="flex underline flex-row gap-x-1 items-center"
          >
            <p>home</p>
          </Link>
          <Link
            href="/blog"
            className="flex underline flex-row gap-x-1 items-center"
          >
            <p>blog</p>
            <Pencil1Icon />
          </Link>
        </div>
      </nav>
      <div className="w-full flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block py-8 pl-4">
          <ScrollArea>
            <div style={{ minWidth: "100%", display: "table" }}>
              <div className="w-full pb-20">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center p-2 gap-2 ${
                      pathname === item.href
                        ? "bg-stone-200 rounded-md "
                        : "hover:underline"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="pb-4"></div>
              </div>
            </div>
          </ScrollArea>
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8 2xl:grid 2xl:grid-cols-[1fr_300px] w-full md:pr-8 px-4 md:px-0">
          {children}
        </main>
      </div>
    </div>
  );
}
