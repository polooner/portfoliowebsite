import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {};

function Header({}: Props) {
  return (
    <nav
      id="navbar"
      className="min-w-full sticky top-0 z-50 flex items-center justify-between shadow-lg bg-black text-white shadow-zinc-300 md:py-8 py-6 md:px-12 px-6"
    >
      <div className="text-lg md:text-2xl font-bold justify-center text-center duration-300 hover:cursor-default">
        Filip Wojda
      </div>

      <motion.div
        initial={{ x: -300, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="list-none flex flex-row justify-center lg:gap-12 gap-2"
      >
        <Link href="#about">
          <button className="md:text-md text-sm hover:border-x-8 hover:border-white active:text-transparent duration-300 p-2">
            About
          </button>
        </Link>
        <Link href="#projects">
          <button className="md:text-md text-sm hover:border-x-8 hover:border-white active:text-transparent duration-300 p-2">
            Projects
          </button>
        </Link>
        <Link href="#skills">
          <button className="md:text-md text-sm hover:border-x-8 hover:border-white active:text-transparent duration-300 p-2">
            Skills
          </button>
        </Link>
        <Link href="#contact">
          <button className="md:text-md text-sm hover:border-x-8 hover:border-white active:text-transparent duration-300 p-2">
            Contact
          </button>
        </Link>
      </motion.div>
    </nav>
  );
}

export default Header;
