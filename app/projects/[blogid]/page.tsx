import BlogCard from '@/components/BlogCard';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function BlogPost({
  params,
}: {
  params: { blogid: string };
}) {
  const post = await db.project.findUnique({
    where: {
      id: params.blogid,
    },
  });
  if (!post) {
    redirect('/projects');
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
