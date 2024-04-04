'use client';

import { cn } from '@/lib/utils/cn';
import { motion } from 'framer-motion';
import React from 'react';

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: '0 50%',
    },
    animate: {
      backgroundPosition: ['0, 50%', '100% 50%', '0 50%'],
    },
  };
  return (
    <div className={cn('relative p-[4px] group', containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? 'initial' : undefined}
        animate={animate ? 'animate' : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? '400% 400%' : undefined,
        }}
        className={cn(
          'absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl  transition duration-500 will-change-transform',
          ' bg-[radial-gradient(circle_farthest-side_at_0_100%,#f8f8f8,transparent),radial-gradient(circle_farthest-side_at_100%_0,#f0f0f0,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#a6a8a6,transparent),radial-gradient(circle_farthest-side_at_0_0,#cbcccb,#141316)]'
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? 'initial' : undefined}
        animate={animate ? 'animate' : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? '400% 400%' : undefined,
        }}
        className={cn(
          'absolute inset-0 rounded-3xl z-[1] will-change-transform',
          'bg-[radial-gradient(circle_farthest-side_at_0_100%,#080808,transparent),radial-gradient(circle_farthest-side_at_100%_0,#686b69,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#cfd0cf,transparent),radial-gradient(circle_farthest-side_at_0_0,#f0f0f0,#141316)]'
        )}
      />

      <div className={cn('relative z-10', className)}>{children}</div>
    </div>
  );
};
