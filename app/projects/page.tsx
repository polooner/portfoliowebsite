import BlogPreviewCard from '@/components/BlogPreviewCard';
import PostContentProject from '@/components/PostContentProject';

import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

//TODO: add metadata

export default async function Projects() {
  const posts = await db.project.findMany();
  const session = await getServerSession();
  const isAuthenticated = session ? true : false;

  3;

  return (
    // TODO: add tags
    // TODO: add sorting
    <main className='flex flex-col w-full h-full'>
      <h1 className='heading'>A collection of my projects.</h1>
      <p className='text-gray-500'>Source code sometimes included.</p>
      {isAuthenticated && <PostContentProject />}
      <div className='flex flex-row flex-wrap items-baseline justify-center gap-6 space-y-20 mt-14'>
        {posts.map((post) => {
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
        })}
      </div>
    </main>
  );
}
