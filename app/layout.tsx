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

import { haffer } from "./fonts";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={haffer.variable}>
      <body className="antialiased tracking-tighter">
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <div className="flex flex-col min-h-screen w-full">
          <main className="flex-grow">{children}</main>
          
        </div>
        <Toaster />
      </body>
    </html>
  );
}
