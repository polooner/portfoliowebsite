import getPosts, { getPost } from '@/lib/get-posts';
import { PostBody } from '../mdx/components/post-body';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage() {
  const posts = await getPosts();

  return (
    <div className='flex flex-col space-y-8'>
      {posts.map((post) => {
        return (
          <Link
            className='px-4 border-l-4 hover:underline'
            href={`blog/${post.slug}`}
            key={post.title}
          >
            {post.title}
          </Link>
        );
      })}
    </div>
  );
}
