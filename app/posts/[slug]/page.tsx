import getPosts, { getPost } from '@/lib/get-posts';
import { PostBody } from '@/app/mdx/components/post-body';
import { notFound } from 'next/navigation';

export default async function PostPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = await getPost(params.slug);
  // notFound is a Next.js utility
  if (!post) return notFound();
  // Pass the post contents to MDX

  return (
    <div className='p-4'>
      <PostBody>{post?.body}</PostBody>
    </div>
  );
}
