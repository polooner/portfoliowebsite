import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

import AnimatedMenuDock from '@/components/animated/AnimatedMenuDock';
import { cx } from 'class-variance-authority';
import { GeistMono } from 'geist/font/mono';

export const metadata: Metadata = {
  title: 'Filip Wojda',
  description: 'A founder working on a faster world',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={cx(GeistMono.variable)}>
      <body className='flex antialiased tracking-tighter flex-col space-y-2 font-mono text-black bg-white '>
        <link rel='icon' href='/favicon.ico' sizes='any' />

        <AnimatedMenuDock />
        <div className='pb-20'>{children}</div>
        <Footer />

        <Toaster />
      </body>
    </html>
  );
}
