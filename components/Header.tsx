import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Props = {};

export default function Header({}: Props) {
  return (
    <nav
      id='navbar'
      className='min-w-full sticky top-0 z-50 flex items-center justify-between fill-transparent text-black md:py-8 py-4 md:px-12 px-6'
    >
      <Link
        href='/'
        className='text-sm md:text-3xl font-black justify-center text-center duration-300 hover:cursor-default hover:text-transparent hover:bg-clip-text hover:from-blue-500 hover:to-blue-500 hover:via-purple-500 hover:bg-gradient-to-l'
      >
        Filip Wojda
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className='list-none font-semibold tracking-tight flex flex-row justify-center lg:gap-12 gap-3'
      >
        <Link href='/'>
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className='md:text-md text-xs hover:border-b-2 hover:border-black active:text-transparent'
          >
            Home
          </motion.button>
        </Link>
        <Link href='/about'>
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className='md:text- text-xs hover:border-b-2 hover:border-black active:text-transparent'
          >
            About
          </motion.button>
        </Link>
        <Link href='/projects'>
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className='md:text-md text-xs hover:border-b-2 hover:border-black active:text-transparent '
          >
            Projects
          </motion.button>
        </Link>
        <Link href='/skills'>
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className='md:text-md text-xs hover:border-b-2 hover:border-black active:text-transparent '
          >
            Skills
          </motion.button>
        </Link>
        <Link href='/contact'>
          <motion.button
            whileHover={{ scale: 1.1, x: 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className='md:text-md text-xs hover:border-b-2 hover:border-black active:text-transparent'
          >
            Contact
          </motion.button>
        </Link>
      </motion.div>
    </nav>
  );
}
