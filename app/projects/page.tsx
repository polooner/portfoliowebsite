import BlogPreviewCard from '@/components/BlogPreviewCard';
import Post from '@/components/BlogPreviewCard';
import PostContent from '@/components/PostContent';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useId } from 'react';

export default async function Projects() {
  // const posts = await db.post.findMany();
  const session = await getServerSession();

  return (
    <main className='flex flex-col'>
      <h1 className='heading'>A collection of my projects.</h1>
      <p className='text-gray-500'>Source code sometimes included.</p>
      {session?.user && <PostContent />}
      <div className='flex flex-col mt-14 flex-1 flex-wrap items-center'>
        {/* {posts.map((post) => {
          return (
            <BlogPreviewCard
              datePublished={post.createdAt.toISOString()}
              title={post.title}
              href={'/projects/' + post.id}
              content={post.content}
              key={post.id}
            />
          );
        })} */}
      </div>
    </main>
  );
}
