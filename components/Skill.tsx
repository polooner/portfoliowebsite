import React, { JSXElementConstructor, ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {};

interface CardProps {
  icon: React.ReactElement;
  title: string;
}

export default function Skill({ icon, title }: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -20 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      className='font-bold text-xs bg-white md:text-lg md:h-36 md:w-40 h-32 w-20 flex flex-col justify-center items-center shadow-2xl hover:shadow-slate-600 p-2 md:p-4 shadow-slate-100 rounded-xl'
    >
      <div className='card-icon'>{icon}</div>
      <h1 className='p-3'>{title}</h1>
    </motion.div>
  );
}
