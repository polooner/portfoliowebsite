import { getAllIds, getContent } from '@/lib/get-content';
import { formatDate } from '@/lib/utils';
import { A } from '@/components/mdx-components';
import Image from 'next/image';
import { GlowEffect } from '@/components/TiltGlowEffect';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A display of my projects, from academic and personal adventures.',
};

async function getData(id: string) {
  const { title, updated, company, img } = await getContent(id);
  return { id, title, updated, company, img };
}

//TODO: add metadata

export default async function Projects() {
  const ids = getAllIds();
  const entries = await Promise.all(
    ids.filter((id) => id.startsWith('projects')).map(getData)
  ).then((entries) => entries.sort((a, b) => a.title.localeCompare(b.title)));

  return (
    // TODO: add tags
    // TODO: add sorting
    <main className='flex flex-col w-full h-full pb-20'>
      <h1 className='heading'>A collection of my projects.</h1>

      <div className='flex flex-row justify-center gap-10 mt-14'>
        <>
          {entries.map(({ id, title, updated, company, img }) => (
            <GlowEffect
              key={id}
              className='flex flex-col ring-1 ring-stone-100 rounded-xl justify-center items-baseline gap-6 p-8 duration-150 w-[450px] h-[700px] text-center'
            >
              <A
                href={`projects/${id}`}
                className='flex flex-col items-center justify-between gap-4'
              >
                <Image
                  alt={title}
                  className='max-w-fit max-h-fit'
                  width={300}
                  height={300}
                  src={img as string}
                />
                <h1 className='text-2xl font-bold sm:text-6xl '>{company}</h1>
                <h3 className='text-lg '>{title}</h3>
                <div className='text-sm text-daw-zinc-600'>
                  <time title={updated.toISOString()}>
                    {formatDate(updated)}
                  </time>
                </div>
              </A>
            </GlowEffect>
          ))}
        </>
      </div>
    </main>
  );
}
