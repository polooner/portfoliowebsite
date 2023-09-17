import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';
import './globals.css';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { getCurrentUser } from '@/lib/session';
import { NextAuthProvider } from './providers';
import { Noto_Serif } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Wojda Labs',
  description: 'A founder working on a faster world',
};

export const notoserif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const isAuthenticated = user ? true : false;

  return (
    <html lang='en'>
      <body className='flex flex-col p-4 space-y-2 sm:px-10 sm:py-4'>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <NextAuthProvider>
          <Header isAuthenticated={isAuthenticated} />
          {children}
          <Footer />
        </NextAuthProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
