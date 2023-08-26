import Header from '@/components/Header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { ParallaxProvider } from 'react-scroll-parallax';

export const metadata: Metadata = {
  title: 'Wojda Labs',
  description: 'The ultimate consulting solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='sm:px-10 sm:py-4 p-4'>
        <Header />
        {children}
      </body>
    </html>
  );
}
