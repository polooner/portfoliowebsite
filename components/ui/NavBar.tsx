import { Pencil1Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function NavBar({ children }: { children?: React.ReactNode }) {
  return (
    <nav className="flex flex-row justify-center items-center w-full pt-4 px-2">
      <div className="flex-row text-sm items-center text-start justify-start top-10 flex z-50 bg-white/50">
        {children}
        <Link
          href="/"
          className="flex hover:bg-black text-black hover:text-white flex-row items-center px-4"
        >
          <p>home</p>
        </Link>
        <Link
          href="/blog"
          className="flex hover:bg-black text-black hover:text-white flex-row items-center px-4"
        >
          <p>braindump</p>
        </Link>
        <Link
          href="/ui"
          className="flex hover:bg-black text-black hover:text-white flex-row items-center px-4"
        >
          <p>ui</p>
        </Link>
        <Link
          href="/lab"
          className="flex hover:bg-black text-black hover:text-white flex-row items-center px-4"
        >
          <p>lab</p>
        </Link>
        <Link
          href="/artworks"
          className="flex hover:bg-black text-black hover:text-white flex-row items-center px-4"
        >
          <p>artworks</p>
        </Link>
      </div>
    </nav>
  );
}
