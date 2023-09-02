import BlogPreviewCard from '@/components/BlogPreviewCard';
import Post from '@/components/BlogPreviewCard';
import PostContent from '@/components/PostContent';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

export default async function Projects() {
  const posts = await db.post.findMany();
  const session = await getServerSession();
  const isAuthenticated = session ? true : false;

  return (
    <main className='flex flex-col'>
      <h1 className='heading'>A collection of my projects.</h1>
      <p className='text-gray-500'>Source code sometimes included.</p>
      {isAuthenticated && <PostContent />}
      <div className='flex flex-col mt-14 flex-1 flex-wrap items-center'>
        {posts.map((post) => {
          return (
            <BlogPreviewCard
              isAuthenticated={isAuthenticated}
              datePublished={post.createdAt.toISOString()}
              title={post.title}
              href={'/projects/' + post.id}
              content={post.content}
              key={post.id}
              id={"'" + post.id + "'"}
            />
          );
        })}
      </div>
    </main>
  );
}
