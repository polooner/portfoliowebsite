import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import ArrowIcon from "@/components/ui/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Filip Wojda",
  description: "a creator",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable + " " + GeistMono.variable}>
      <body className="antialiased tracking-tighter">
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <div className="flex flex-col min-h-screen w-full">
          <main className="flex-grow">{children}</main>
          <footer className="flex flex-row items-center justify-center py-8 gap-4 mt-auto border-t  border-black/10 dark:border-white">
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
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
