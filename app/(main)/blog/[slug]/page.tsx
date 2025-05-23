import { CustomMDX } from "app/components/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
// import { getViewsCount } from 'app/db/queries';
import { getBlogPosts } from "app/db/blog";
// import { increment } from 'app/db/actions';

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? `https://filipwojda.dev${image}`
    : `https://filipwojda.dev/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://filipwojda.dev/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

function formatDate(date: string) {
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  //TODO: make years ago/days ago/months ago
  let daysDifference = currentDate.getDate() - targetDate.getDate();
  let isYearsAgo = daysDifference > 365 ? true : false;
  let yearsAgo = isYearsAgo
    ? currentDate.getFullYear() - targetDate.getFullYear()
    : daysDifference;
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate} (${formattedDate})`;
}

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="flex flex-col  items-center p-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://filipwojda.dev${post.metadata.image}`
              : `https://filipwojda.dev/og?title=${post.metadata.title}`,
            url: `https://filipwojda.dev/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Filip Wojda",
            },
          }),
        }}
      />
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <p className="text-sm text-black">
          {formatDate(post.metadata.publishedAt)}
        </p>
        {/* <Suspense fallback={<p className='h-5' />}>
          <Views slug={post.slug} />
        </Suspense> */}
      </div>
      <article className="prose text-black prose-quoteless prose-neutral dark:prose-invert sm:p-10 md:p-20 lg:p-32 max-w-6xl">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}

// let incrementViews = cache(increment);

// async function Views({ slug }: { slug: string }) {
//   let views = await getViewsCount();
//   incrementViews(slug);
//   return <ViewCounter allViews={views} slug={slug} />;
// }
