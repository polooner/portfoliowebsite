'use client';

import { motion } from 'framer-motion';

export default function AnimatedHeader() {
  const parent = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 * i },
    }),
  };
  const sentence = 'Filip Wojda';

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
    <motion.div
      variants={parent}
      initial='hidden'
      animate='visible'
      className='flex flex-col items-start self-start justify-center gap-2 p-8 text-start bg-neutral-800 rounded-2xl h-fit w-fit '
    >
      <motion.div
        className=' max-w-6xl p-4 items-start rounded-2xl font-semibold text-5xl tracking-tight  h-[64px] sm:text-6xl '
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

      <motion.div className='p-4 h-[64px] items-center text-start border-l-4 border-white '>
        student, engineer. passionate about AI and Open Source, sometimes about
        design.
      </motion.div>
    </motion.div>
  );
}
