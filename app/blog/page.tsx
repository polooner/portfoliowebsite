import { A } from '@/components/mdx-components';
import { getAllIds, getContent } from '@/lib/get-content';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { Fragment } from 'react';
import { headers } from 'next/headers';

//TODO: add metadata

async function getData(id: string) {
  const PAGE = headers().get('x-pathname');

  const { title, updated, company, img } = await getContent(
    id,
    PAGE as string
  );
  return { id, title, updated, company, img };
}

export default async function Blog() {
  const PAGE = headers().get('x-pathname');
  const ids = getAllIds(PAGE as string);
  const entries = await Promise.all(ids.map(getData)).then((entries) =>
    entries.sort((a, b) => a.title.localeCompare(b.title))
  );

  return (
    // TODO: add tags
    // TODO: add sorting
    <main className='flex flex-col'>
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
