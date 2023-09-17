import BlogPreviewCard from '@/components/BlogPreviewCard';

import { Fragment } from 'react';
import { getAllIds, getContent } from '@/lib/get-content';
import { formatDate } from '@/lib/utils';
import { A } from '@/components/mdx-components';
import Image from 'next/image';

async function getData(id: string) {
  const { title, updated, company, img } = await getContent(id);
  return { id, title, updated, company, img };
}

//TODO: add metadata

export default async function Projects() {
  const ids = getAllIds();
  const entries = await Promise.all(ids.map(getData)).then((entries) =>
    entries.sort((a, b) => a.title.localeCompare(b.title))
  );

  return (
    // TODO: add tags
    // TODO: add sorting
    <main className='flex flex-col w-full h-full'>
      <h1 className='heading'>A collection of my projects.</h1>

      <div className='flex flex-row flex-wrap items-baseline justify-center gap-6 space-y-20 mt-14'>
        <>
          {entries.map(({ id, title, updated, company, img }) => (
            <Fragment key={id}>
              <hr />
              <div className='-my-12 not-prose'>
                <A
                  href={`projects/${id}`}
                  className='flex flex-col items-center gap-6 p-8 rounded-xl ring-1 ring-stone-200'
                >
                  <Image
                    alt={title}
                    width={300}
                    height={300}
                    src={img as string}
                  />
                  <h1 className='text-2xl font-bold sm:text-6xl '>
                    {company}
                  </h1>
                  <h3 className='text-lg '>{title}</h3>
                  <div className='text-sm text-daw-zinc-600'>
                    <time title={updated.toISOString()}>
                      {formatDate(updated)}
                    </time>
                  </div>
                </A>
              </div>
            </Fragment>
          ))}
        </>
      </div>
    </main>
  );
}
