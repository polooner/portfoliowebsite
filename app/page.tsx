'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CodeCard } from '@/components/CodeCard';
import { getUserData } from '@/lib/getGitHubData';
import { getTotalContributionsForYears } from '@/lib/getTotalContributionsForYears';

export default function Home() {
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

  const userData = async () => {
    const res = await getUserData();
    return res;
  };
  const contributions = async () => {
    const res = await getTotalContributionsForYears();
    return res;
  };

  return (
    <main className='flex flex-col items-center justify-center w-full min-h-full gap-6 sm:gap-10 sm:flex-row'>
      <div className='flex flex-col '>
        <motion.div
          className='max-w-6xl mx-auto mt-10 text-4xl tracking-tight sm:text-6xl '
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
      </div>
      <CodeCard userData={userData} contributions={contributions} />
    </main>
  );
}
