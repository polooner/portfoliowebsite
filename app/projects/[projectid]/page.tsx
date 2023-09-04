import BlogCard from '@/components/BlogCard';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

//TODO: add metadata

export default async function BlogPost({
  params,
}: {
  params: { projectid: string };
}) {
  const post = await db.project.findUnique({
    where: {
      id: params.projectid,
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
        // TODO: come up with a reusable name for this prop
        bannerUrl={post?.projectUrl}
        content={post.content}
      />
    </main>
  );
}
