import { A } from '@/components/mdx-components';
import { getAllIds, getContent } from '@/lib/get-content';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { Fragment } from 'react';
import { headers } from 'next/headers';

async function getData(id: string) {
  const { title, updated, company, img } = await getContent(id);
  return { id, title, updated, company, img };
}

export default async function Blog() {
  const ids = getAllIds();
  const entries = await Promise.all(
    ids.filter((id) => id.startsWith('blog')).map(getData)
  ).then((entries) =>
    entries.sort((a, b) => a.title.localeCompare(b.title))
  );

  return (
    // TODO: add tags
    // TODO: add sorting
    <main className='flex flex-col pb-20'>
      <h1 className='heading'>My thoughts and essays.</h1>
      <p className='text-gray-500'>
        Join me on my journeys, hear my stories, share your thoughts.
      </p>

      <div className='flex flex-row flex-wrap items-baseline justify-center gap-6 space-y-20 mt-14'>
        <>
          {entries.map(({ id, title, updated, company, img }) => (
            <Fragment key={id}>
              <hr />
              <div className='-my-12 not-prose'>
                <A
                  href={`blog/${id}`}
                  className='flex flex-col items-center gap-6 p-8 rounded-xl ring-1 ring-stone-200'
                >
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
