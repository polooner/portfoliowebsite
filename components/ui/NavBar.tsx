import { Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function NavBar({ children }: { children?: React.ReactNode }) {
  return (
    <nav className="flex flex-row justify-center items-center w-full pt-4 px-2">
      <div className=" flex-row  items-center text-start justify-start sm:gap-x-4 gap-x-2 top-10 px-8 flex z-50 bg-white/50 ">
        {children}
        <Link href="/" className="flex underline flex-row gap-x-1 items-center">
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
          href="/ui"
          className="flex underline flex-row gap-x-1 items-center"
        >
          <p>ui</p>
        </Link>
      </div>
    </nav>
  );
}
