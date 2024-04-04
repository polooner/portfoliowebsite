import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Filip Wojda',
  description: 'I like to build.',
};

export default async function Home() {
  return (
    <main className='flex w-full items-center justify-center min-h-screen gap-4 p-2'>
      <div>
        <BackgroundGradient className='rounded-[22px] max-w-sm p-4  bg-white'>
          <p className='text-lg  object-contain z-20 text-black py-8'>
            hey, my name is Filip. i honestly just build and learn stuff.
            interests include deep learning, AI, design, building online
            products and philosophy.
          </p>
        </BackgroundGradient>
      </div>
    </main>
  );
}
