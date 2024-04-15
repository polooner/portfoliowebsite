import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Filip Wojda',
  description: 'I like to build.',
};

export default function Home() {
  return (
    <section className='flex flex-col gap-y-10 max-w-[500px]'>
      <div className='inline-flex'>
        hey, my name is <h2 className='font-bold'>&nbsp;Filip.</h2>
      </div>
      <div>I am a CS student and an indie-hacker based out of NYC.</div>
      <div>
        currently building{' '}
        <Link
          className='font-bold hover:underline'
          target='_blank'
          href='https://www.makeklips.ai'
        >
          makeklips.ai
        </Link>
      </div>
    </section>
  );
}
