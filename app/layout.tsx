import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { ViewTransitions } from 'next-view-transitions';
import { booton } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Filip Wojda',
  description: 'a creator',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" className={booton.variable}>
        <body className="antialiased tracking-tighter font-booton">
          <link rel="icon" href="/favicon.ico" sizes="any" />

          <div className="flex flex-col min-h-screen w-full">
            <main className="flex-grow">{children}</main>
          </div>
          <Toaster theme="dark" />
        </body>
      </html>
    </ViewTransitions>
  );
}
