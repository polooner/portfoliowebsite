'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ParallaxComponent from '@/components/ParallaxText';
import { ParallaxProvider } from 'react-scroll-parallax';

export default function Home() {
  const [windowSize, setWindowSize] = useState([0, 0]);

  useEffect(() => {
    // This code will only run in the browser environment, after the component mounts
    const updateSize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', updateSize);
    updateSize(); // Set the initial size

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const parent = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };
  const sntnc =
    'I am Filip, founder creating tools that fast-track businesses to sustainable solutions while easing go-to-market times.';

  const words = sntnc.split(/\s+/);
  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-full'>
      <div className='grid grid-cols-5 gap-4 '>
        <motion.div
          className='max-w-4xl col-span-2 col-start-2 mx-auto text-2xl tracking-tight sm:text-6xl '
          variants={parent}
          initial='hidden'
          animate='visible'
        >
          {words.map((wordText, i) => (
            <motion.span key={i} variants={child}>
              {wordText + ' '}
            </motion.span>
          ))}
        </motion.div>
        <div className='...'></div>
        <div className='...'></div>
        <Image
          className='col-span-2 col-start-4 sm:-mt-44'
          alt='motto flag'
          src={'/main.gif'}
          width={windowSize[0]}
          height={windowSize[1]}
        />
      </div>
    </main>
  );
}

//my fav drop-shadow: drop-shadow-[10px_10px_1.2px_rgba(0,0,0,0.2)]
