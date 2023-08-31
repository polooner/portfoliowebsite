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

interface CardProps {
  title: string;
  content: string;
  datePublished: string;
  img_src?: string;
}

const BlogPreviewCard = (
  props: ComponentPropsWithoutRef<'a'> & CardProps
) => {
  return (
    <a href={props.href} target='_blank'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>{props.title}</CardTitle>
        </CardHeader>
        <Separator className='my-4' />
        <CardContent className='flex flex-col items-center'>
          {props.img_src ? (
            <img src={props.img_src} />
          ) : (
            <Icons.laptop size={100} />
          )}
          <Separator className='my-4' />
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
