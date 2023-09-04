import BlogCard from '@/components/BlogCard';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

//TODO: add metadata

export default async function BlogPost({
  params,
}: {
  params: { blogid: string };
}) {
  const post = await db.post.findUnique({
    where: {
      id: params.blogid,
    },
  });
  if (!post) {
    redirect('/blog');
  }

  return (
    <main>
      <BlogCard
        key={post?.id}
        title={post?.title}
        bannerUrl={post?.bannerUrl}
        content={post.content}
      />
    </main>
  );
}
