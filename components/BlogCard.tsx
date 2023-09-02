'use client';

import Image from 'next/image';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface BlogCardProps {
  htmlContent: string;
  title: string | undefined;
  bannerUrl: string | undefined | null;
}

const BlogCard = (
  props: ComponentPropsWithoutRef<'div'> & BlogCardProps
) => {
  return (
    <div className='w-full h-full'>
      <div className='bg-gradient-to-tr   from-white via-red-200 to-yellow-400'>
        {props.bannerUrl && (
          <Image
            className=' '
            alt={props.title as string}
            src={props.bannerUrl as string}
            width={400}
            height={400}
          />
        )}
      </div>
      <h1 className='sm:text-6xl text-3xl font-bold self-center sm:p-10 bg-white rounded-md p-4'>
        {props.title}
      </h1>

      <ReactMarkdown
        className='markdown'
        // @ts-expect-error
        rehypePlugins={[rehypeRaw]}
      >
        {props.content as string}
      </ReactMarkdown>
    </div>
  );
};

export default BlogCard;
