import { Pencil1Icon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Filip Wojda",
  description: "a creator",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex text-start space-y-10 flex-col justify-center items-center sans w-full">
      <nav className="flex flex-row justify-center items-center w-full pt-4 px-2">
        <div className=" flex-row  items-center text-start justify-start sm:gap-x-4 gap-x-2 top-10 px-8 flex z-50 bg-white/50 ">
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

      {children}
    </div>
  );
}
