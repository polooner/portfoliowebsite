'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Files } from 'lucide-react';

let tabs: { id: string; label: string | JSX.Element }[] = [
  { id: '/', label: 'home' },
  { id: '/projects', label: 'projects' },
  // { id: '/blog', label: 'blog' },
  { id: '/bookacall', label: 'bookacall' },
  { id: '/blog', label: 'blog' },
];

export default function AnimatedMenuDock() {
  const pathname = usePathname();
  console.log(pathname.split('/')[1]);
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
          {'/' + pathname.split('/')[1] == tab.id ? (
            <motion.span
              layoutId='bubble'
              className='absolute inset-0 z-10 bg-white rounded-xl mix-blend-difference'
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          ) : null}
          {tab.label}
        </Link>
      ))}
      {/* FIXME: Popover pushes down the dock element */}
      {/* <PopoverSocials /> */}
    </div>
  );
}
