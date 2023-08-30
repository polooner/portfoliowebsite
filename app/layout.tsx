import Header from '@/components/Header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { ParallaxProvider } from 'react-scroll-parallax';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { getCurrentUser } from '@/lib/session';
import { NextAuthProvider } from './providers';

export const metadata: Metadata = {
  title: 'Wojda Labs',
  description: 'The ultimate consulting solutions',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const isAuthenticated = user ? true : false;

  return (
    <html lang='en'>
      <body className='sm:px-10 sm:py-4 p-4'>
        <NextAuthProvider>
          <Header isAuthenticated={isAuthenticated} />
          {children}
          <Footer />
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
