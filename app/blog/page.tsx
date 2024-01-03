import Link from 'next/link';
// import { getViewsCount } from 'app/db/queries';
import { getBlogPosts } from 'app/db/blog';
import { ReaderIcon } from '@radix-ui/react-icons';

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  return (
    <section className='flex flex-col items-center text-start'>
      <h1 className='mb-8 text-2xl font-medium tracking-tighter'>
        read my blog. thoughts, quick guides and more...
      </h1>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className='flex flex-col mb-4 space-y-1 hover:underline cl'
            href={`/blog/${post.slug}`}
          >
            <div className='flex flex-col w-full'>
              <div className='flex flex-row items-center w-full space-x-2'>
                <ReaderIcon />
                <p className='tracking-tight text-white '>
                  {post.metadata.title}
                </p>
              </div>
              {/* <Suspense fallback={<p className='h-6' />}>
                <Views slug={post.slug} />
              </Suspense> */}
            </div>
          </Link>
        ))}
    </section>
  );
}

// async function Views({ slug }: { slug: string }) {
//   let views = await getViewsCount();

//   return <ViewCounter allViews={views} slug={slug} />;
// }
