import AnimatedHeader from '@/components/animated/AnimatedHeader';
import GradientFollowCard from '@/components/animated/GradientFollowCard';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Filip Wojda',
  description: 'I like to bring impact.',
};

const items = [
  {
    topTitle: 'student, developer.',
    title: 'Filip Wojda',
    content: `I am a Computer Science student with many passions. 
      I hope to change the world some day. I like to work with non-profits`,
  },
  {
    topTitle: 'Innovative Researcher',
    title: 'Exploring New Frontiers',
    content: 'Dedicated to uncovering insights through cutting-edge research.',
  },
  {
    topTitle: 'Open-Source Contributor',
    title: 'Coding for Community',
    content: 'Building tools that empower developers and advance technology.',
  },
  {
    topTitle: 'Professional Opportunities',
    title: 'Got Work for Me?',
    content: (
      <Link className='z-50 hover:mr-4' href={'/bookacall'}>
        Book a call with me &rarr;
      </Link>
    ),
  },
];

export default async function Home() {
  return (
    <main className='flex w-full min-h-screen gap-4 p-4 '>
      <div className='flex flex-col items-center w-full space-y-4'>
        <div className='flex flex-col sm:grid sm:grid-cols-[1fr_0.7fr] gap-4'>
          {items.slice(0, 2).map((item, index) => (
            <GradientFollowCard
              key={index}
              topTitle={item.topTitle}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
        <div className='flex flex-col sm:grid sm:grid-cols-[0.7fr_1fr] gap-4'>
          {items.slice(2, 4).map((item, index) => (
            <GradientFollowCard
              key={index}
              topTitle={item.topTitle}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
