import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { ViewTransitions } from "next-view-transitions";

import ArrowIcon from "@/components/ui/icons";
import { Pencil1Icon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";
import { Toaster } from "sonner";
import "./globals.css";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Filip Wojda",
  description: "A founder working on a faster world",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" className={GeistSans.variable + " " + GeistMono.variable}>
        <body className="antialiased tracking-tighter">
          <link rel="icon" href="/favicon.ico" sizes="any" />

          <div className="flex text-start space-y-10 flex-col justify-center items-center sans w-full">
            <nav className="flex flex-col self-start pl-4 pt-4 sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="focus:ring-0 focus:outline-none active:ring-0 active:outline-none focus-visible:ring-0 focus-visible:outline-none"
                  >
                    <Menu className="size-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="shadow-none mt-4 sm:hidden"
                  side="right"
                >
                  <DropdownMenuItem>
                    <Link
                      href="/"
                      className="flex  flex-row gap-x-1 items-center"
                    >
                      <p>home</p>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/blog"
                      className="flex  flex-row gap-x-1 items-center"
                    >
                      <p>blog</p>
                      <Pencil1Icon />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      target="_blank"
                      href="https://twitter.com/filipwojda"
                      className="flex  flex-row gap-x-1 items-center"
                    >
                      <p>x</p>
                      <ArrowIcon />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      target="_blank"
                      href="https://www.linkedin.com/in/filip-wojda/"
                      className="flex flex-row gap-x-1  items-center"
                    >
                      <p>linkedin</p>
                      <ArrowIcon />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="https://github.com/polooner"
                      className="flex  flex-row gap-x-1 items-center"
                    >
                      <p>github</p>
                      <ArrowIcon />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="mailto:wojdafilipdev@gmail.com"
                      className="flex  flex-row gap-x-1 items-center"
                    >
                      <p>email</p>
                      <ArrowIcon />
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
            <nav className=" flex-row  items-center text-start justify-start sm:gap-x-4 gap-x-2 top-10 px-8 sm:flex hidden z-50 bg-white/50 ">
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
              <Link
                target="_blank"
                href="https://twitter.com/filipwojda"
                className="flex underline flex-row gap-x-1 items-center"
              >
                <p>x</p>
                <ArrowIcon />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/filip-wojda/"
                className="flex flex-row gap-x-1 underline items-center"
              >
                <p>linkedin</p>
                <ArrowIcon />
              </Link>
              <Link
                href="https://github.com/polooner"
                className="flex underline flex-row gap-x-1 items-center"
              >
                <p>github</p>
                <ArrowIcon />
              </Link>
              <Link
                href="mailto:wojdafilipdev@gmail.com"
                className="flex underline flex-row gap-x-1 items-center"
              >
                <p>email</p>
                <ArrowIcon />
              </Link>
            </nav>
            {children}
          </div>
          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  );
}
