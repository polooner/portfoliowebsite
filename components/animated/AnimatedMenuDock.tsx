'use client';

import { motion } from 'framer-motion';
import { MoreVertical, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import PopoverSocials from '../PopoverSocials';

let tabs: { id: string; label: string | JSX.Element }[] = [
  { id: '/', label: 'home' },
  { id: 'projects', label: 'projects' },
  { id: 'posts', label: 'posts' },
  { id: 'bookacall', label: 'book' },
];

export default function AnimatedMenuDock() {
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className='fixed bottom-0 z-50 flex self-center p-4 mb-4 space-x-1 bg-black rounded-2xl '>
      {tabs.map((tab) => (
        <Link
          href={tab.id}
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`${
            activeTab === tab.id ? '' : 'hover:text-white/60'
          } relative rounded-xl px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
          style={{
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId='bubble'
              className='absolute inset-0 z-10 bg-white rounded-xl mix-blend-difference'
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </Link>
      ))}
      <PopoverSocials />
    </div>
  );
}
