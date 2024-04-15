import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { ViewTransitions } from 'next-view-transitions';

import ArrowIcon from '@/components/ui/icons';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import './globals.css';

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
    <ViewTransitions>
      <html lang='en' className={GeistSans.variable + ' ' + GeistMono.variable}>
        <body className='antialiased tracking-tighter'>
          <link rel='icon' href='/favicon.ico' sizes='any' />
          <div className='flex text-start space-y-10 flex-col justify-center items-center py-20 sm:px-80 px-8 sans'>
            <nav className='flex flex-row  items-start text-start justify-start gap-x-4'>
              <Link
                href='/blog'
                className='flex underline flex-row gap-x-1 items-center'
              >
                <p>blog</p>
                <ArrowIcon />
              </Link>
              <Link
                target='_blank'
                href='https://twitter.com/filipwojda'
                className='flex underline flex-row gap-x-1 items-center'
              >
                <p>x</p>
                <ArrowIcon />
              </Link>
              <Link
                target='_blank'
                href='https://www.linkedin.com/in/filip-wojda/'
                className='flex flex-row gap-x-1 underline items-center'
              >
                <p>linkedin</p>
                <ArrowIcon />
              </Link>
              <Link
                href='https://github.com/polooner'
                className='flex underline flex-row gap-x-1 items-center'
              >
                <p>github</p>
                <ArrowIcon />
              </Link>
              <Link
                href='mailto:wojdafilipdev@gmail.com'
                className='flex underline flex-row gap-x-1 items-center'
              >
                <p>email</p>
                <ArrowIcon />
              </Link>
            </nav>
            {children}
          </div>
          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  );
}
