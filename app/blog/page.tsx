import BlogPreviewCard from '@/components/BlogPreviewCard';
import PostContentBlog from '@/components/PostContentBlog';

import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

//TODO: add metadata

export default async function Blog() {
  const posts = await db.post.findMany();
  const session = await getServerSession();
  const isAuthenticated = session ? true : false;

  return (
    // TODO: add tags
    // TODO: add sorting
    <main className='flex flex-col'>
      <h1 className='heading'>A collection of my projects.</h1>
      <p className='text-gray-500'>Source code sometimes included.</p>
      {isAuthenticated && <PostContentBlog />}
      <div className='flex flex-row items-center justify-center flex-1 gap-6 pt-14'>
        {posts.map((post) => {
          return (
            <BlogPreviewCard
              isAuthenticated={isAuthenticated}
              datePublished={post.createdAt}
              title={post.title}
              href={'/blog/' + post.id}
              content={post.content}
              VisualComponent={
                <img src={post.bannerUrl as string | undefined} />
              }
              key={post.id}
              id={post.id}
            />
          );
        })}
      </div>
    </main>
  );
}
