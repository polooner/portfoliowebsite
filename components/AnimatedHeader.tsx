'use client';

import { motion } from 'framer-motion';

export default function AnimatedHeader() {
  const parent = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };
  const sentence =
    'I am Filip, founder creating tools that fast-track businesses to sustainable solutions while easing go-to-market times.';

  const words = sentence.split(/\s+/);
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
    <div className='flex flex-col w-screen h-screen '>
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
  );
}
