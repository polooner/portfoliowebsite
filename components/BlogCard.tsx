import Image from 'next/image';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

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
      <div className='bg-gradient-to-tr  from-white via-red-200 to-yellow-400'>
        {props.bannerUrl && (
          <Image
            className='relative'
            alt={props.title as string}
            src={props.bannerUrl as string}
            width={400}
            height={400}
          />
        )}
      </div>
      <h1 className='absolute self-center sm:p-10 bg-white rounded-md p-4'>
        {props.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: props.htmlContent }} />
    </div>
  );
};

export default BlogCard;
