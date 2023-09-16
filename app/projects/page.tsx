import BlogPreviewCard from '@/components/BlogPreviewCard';

import { Fragment } from 'react';
import { getAllIds, getContent } from '@/lib/get-content';
import { formatDate } from '@/lib/utils';
import { A } from '@/components/mdx-components';
import { Icons } from '@/components/ui/icons';

async function getData(id: string) {
  const { title, updated } = await getContent(id);
  return { id, title, updated };
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
      <p className='text-gray-500'>Source code sometimes included.</p>

      <div className='flex flex-row flex-wrap items-baseline justify-center gap-6 space-y-20 mt-14'>
        <>
          {entries.map(({ id, title, updated }) => (
            <Fragment key={id}>
              <hr />
              <div className='-my-12 not-prose'>
                <A
                  href={`projects/${id}`}
                  className='flex flex-col gap-2 p-8 rounded-xl ring-1 ring-stone-200'
                >
                  <Icons.lightbulb />
                  <h3 className='text-lg font-medium'>{title}</h3>
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
        {/* {posts.map((post) => {
          return (
            <BlogPreviewCard
              isAuthenticated={isAuthenticated}
              datePublished={post.createdAt}
              title={post.title}
              VisualComponent={
                <iframe
                  style={{ overflow: 'clip' }}
                  src={post.projectUrl as string | undefined}
                  title='Project Preview'
                  className='w-full h-full'
                />
              }
              href={'/projects/' + post.id}
              content={post.content}
              key={post.id}
              id={post.id}
            />
          );
        })} */}
      </div>
    </main>
  );
}
