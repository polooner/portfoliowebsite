import { ComponentProps, ComponentPropsWithoutRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Separator } from './ui/separator';
import Image from 'next/image';
import { Icons } from './ui/icons';
import { DeleteDialog } from './DeleteDialog';

interface CardProps {
  id: string;
  title: string;
  content: string;
  datePublished: string;
  img_src?: string;
  isAuthenticated: boolean;
}

const BlogPreviewCard = (
  props: ComponentPropsWithoutRef<'a'> & CardProps
) => {
  const table = 'posts';
  return (
    <a href={props.href} target='_blank'>
      <Card>
        <CardHeader className='flex flex-row justify-between'>
          {/* TODO: add editing icon/functionality */}
          {/* TODO: add delete functionality */}
          <CardTitle className='text-2xl'>{props.title}</CardTitle>
          {props.isAuthenticated && (
            <div className=''>
              <DeleteDialog postId={props.id as string} table={table} />
            </div>
          )}
        </CardHeader>
        <Separator className='my-4' />
        <CardContent className='flex flex-col items-center'>
          {props.img_src ? (
            <img src={props.img_src} />
          ) : (
            <Icons.laptop size={100} />
          )}
          <Separator className='my-4' />
          {/* TODO: Add content preview as markdown */}
          <p>{props.content.slice(0, 40)}...</p>
        </CardContent>

        <CardFooter className='text-s font-light'>
          <p>{props.datePublished}</p>
        </CardFooter>
      </Card>
    </a>
  );
};

export default BlogPreviewCard;
