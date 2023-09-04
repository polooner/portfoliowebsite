import { ComponentPropsWithoutRef } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Separator } from './ui/separator';
import Image from 'next/image';

import { DeleteDialog } from './DeleteDialog';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import { format } from 'date-fns';

interface CardProps {
  id: string;
  title: string;
  content: string;
  datePublished: Date;
  img_src?: string;
  isAuthenticated: boolean;
}

const BlogPreviewCard = (
  props: ComponentPropsWithoutRef<'a'> & CardProps
) => {
  // TODO: make reusable table prop
  const table = 'project';
  return (
    <div className='relative sm:max-w-[500px] sm:w-[400px] w-[300px] sm:h-[450px] h-[350px] !max-h-[450px]'>
      <a href={props.href} target='_blank'>
        <Card>
          <CardHeader className='flex flex-row justify-between'>
            {/* TODO: add editing icon/functionality */}
            {/* TODO: add delete functionality */}
            <CardTitle className='text-2xl'>{props.title}</CardTitle>
          </CardHeader>
          <Separator className='my-4' />
          <CardContent className='flex flex-col items-center'>
            {props.img_src ? (
              <img src={props.img_src} />
            ) : (
              <Image
                width={150}
                height={150}
                src={
                  'https://avatars.githubusercontent.com/u/114031148?v=4'
                }
                alt='wojda%apos;s GitHub avatar'
              />
            )}
            <Separator className='my-4' />
            {/* TODO: Add content preview as markdown */}
            <ReactMarkdown
              className='markdown'
              components={{
                h1: 'h4',
                h2: 'h5',
              }}
              // @ts-expect-error
              rehypePlugins={[rehypeRaw]}
            >
              {props.content.slice(0, 40)}
            </ReactMarkdown>
          </CardContent>

          <CardFooter className='font-light text-s'>
            <time className='text-sm'>
              {format(props.datePublished, 'LLLL d yyyy')}
            </time>
          </CardFooter>
        </Card>
      </a>
      {props.isAuthenticated && (
        <div className='absolute top-4 right-4'>
          <DeleteDialog postId={props.id as string} table={table} />
        </div>
      )}
    </div>
  );
};

export default BlogPreviewCard;
