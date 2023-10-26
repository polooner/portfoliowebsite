import { ArrowLeft } from 'lucide-react';
import Balancer from 'react-wrap-balancer';
import { getAllIds, getContent } from '@/lib/get-content';
import Link from 'next/link';

import { Metadata } from 'next';

export default async function ProjectPost({
  params,
}: {
  params: { id: string };
}) {
  const { content, title } = await getContent(params.id);
  return (
    <div className='p-20 sm:py-30 sm: px-52'>
      <Link
        href='/products'
        className='inline-flex items-center justify-center text-sm duration-150 not-prose hover:underline'
      >
        <ArrowLeft size='18' /> See other products
      </Link>
      <h1 className='my-8 text-2xl font-black text-center sm:text-6xl'>
        <Balancer>{title}</Balancer>
      </h1>
      <hr className='w-full' />
      <div className='items-center justify-center p-20 text-lg text-center sm:p-30'>
        {content}
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { content, title, updated } = await getContent(params.id);
  return {
    title: title,
    description: content.key?.toString().slice(0, 40),
    authors: [{ name: 'Filip Wojda', url: 'https://twitter.com/filip_w000' }],
  };
}

export function generateStaticParams() {
  return getAllIds().map((id) => ({ id }));
}

export const dynamicParams = false;
