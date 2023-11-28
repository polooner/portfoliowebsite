'use client';

import clsx from 'clsx';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent, ReactNode } from 'react';

export default function GradientFollowCard({
  topTitle,
  title,
  content,
}: {
  topTitle: string;
  title: string;
  content: ReactNode;
}) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={clsx(
        'relative max-w-md px-8 py-16 bg-black/10 border shadow-2xl group rounded-xl border-white/10'
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className='absolute transition duration-300 opacity-0 pointer-events-none -inset-px rounded-xl group-hover:opacity-100'
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div>
        <h3 className='text-base font-semibold leading-7 '>{topTitle}</h3>
        <div className='flex items-center mt-2 gap-x-2'>
          <span className='text-5xl font-bold tracking-tight text-white'>
            {title}
          </span>
        </div>
        <p className='mt-6 text-base leading-7 text-gray-300'>{content}</p>
      </div>
    </div>
  );
}
