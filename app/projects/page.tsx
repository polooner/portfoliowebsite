import BlogPreviewCard from '@/components/BlogPreviewCard';

import PostContent from '@/components/PostContent';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

export default async function Projects() {
  const posts = await db.project.findMany();
  const session = await getServerSession();
  const isAuthenticated = session ? true : false;

  return (
    // TODO: add tags
    // TODO: add sorting
    <main className='flex flex-col'>
      <h1 className='heading'>A collection of my projects.</h1>
      <p className='text-gray-500'>Source code sometimes included.</p>
      {isAuthenticated && <PostContent />}
      <div className='flex flex-row items-center justify-center flex-1 gap-6 pt-14'>
        {posts.map((post) => {
          return (
            <BlogPreviewCard
              isAuthenticated={isAuthenticated}
              datePublished={post.createdAt}
              title={post.title}
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
