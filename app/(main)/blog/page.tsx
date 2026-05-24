import { Link } from "next-view-transitions";
import { getBlogPosts } from "app/db/blog";

export const metadata = {
  title: "Writing",
  description: "Read my thoughts on arts, software, and more.",
};

export default function BlogPage() {
  const posts = getBlogPosts()
    .filter((post) => post.metadata.publishedAt)
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    });

  return (
    <div className="flex items-center justify-center md:fixed md:inset-0 md:p-8 md:pointer-events-none">
      <div className="md:pointer-events-auto flex flex-col gap-8 items-center text-center">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex flex-col gap-1 items-center hover:underline underline-offset-4 decoration-dotted decoration-1"
          >
            <p className="text-2xl leading-tight text-black">
              {post.metadata.title}
            </p>
            <span className="text-xs uppercase text-neutral-500">
              {post.metadata.publishedAt}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
