'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

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

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className='grid grid-cols-5 gap-4 '>
        <h1 className='col-span-2 heading col-start-2'>
          Where accelerated innovation meets design, we&apos;ve mastered
          the intersection of software AI and marketing to transform your
          vision into accomplished results.{' '}
        </h1>
        <div className='...'></div>
        <div className='...'></div>
        <Image
          className='col-span-2 col-start-4 -mt-44'
          alt='motto flag'
          src={'/main.gif'}
          width={windowSize[0] * 0.9}
          height={windowSize[1] * 0.9}
        />
        <h1></h1>
      </div>
    </main>
  );
}
