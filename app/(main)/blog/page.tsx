import Link from "next/link";
// import { getViewsCount } from 'app/db/queries';
import { ReaderIcon } from "@radix-ui/react-icons";
import { getBlogPosts } from "app/db/blog";

export const metadata = {
  title: "Blog",
  description: "Read my thoughts on arts, software, and more.",
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  return (
    <section className="flex flex-col space-y-8 items-center text-start">
      <h1 className="tracking-tighter">sometimes i write</h1>
      <div className="flex flex-col items-start space-y-8 ">
        {allBlogs
          .filter((post) => post.metadata.publishedAt)
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 items-baseline justify-center hover:underline"
              href={`/blog/${post.slug}`}
            >
              <div className="flex text-start items-start flex-col w-full">
                <div className="flex flex-row text-start items-center w-full space-x-2">
                  <p className="tracking-tight text-start text-black">
                    {post.metadata.title}
                  </p>
                </div>
                <span className="text-xs opacity-80">
                  {post.metadata.publishedAt}
                </span>
                {/* <Suspense fallback={<p className='h-6' />}>
                <Views slug={post.slug} />
              </Suspense> */}
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}

// async function Views({ slug }: { slug: string }) {
//   let views = await getViewsCount();

//   return <ViewCounter allViews={views} slug={slug} />;
// }
