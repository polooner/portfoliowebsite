import { ArrowLeft, Copy, Link as Clip } from 'lucide-react';
import Balancer from 'react-wrap-balancer';
import { getAllIds, getTitle, getContent } from '@/lib/get-content';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { headers } from 'next/headers';
import CopyButton from '@/components/copy-button';

export default async function ProjectPost({
  params,
}: {
  params: { id: string };
}) {
  const { content, title, updated, messageContent } = await getContent(
    params.id
  );
  return (
    <div className='p-20 sm:py-30 sm: px-52'>
      <Link
        href='/projects'
        className='inline-flex items-center justify-center text-sm duration-150 not-prose hover:underline'
      >
        <ArrowLeft size='18' /> See other projects
      </Link>
      <h1 className='my-8 text-2xl font-black text-center sm:text-6xl'>
        <Balancer>{title}</Balancer>
      </h1>
      <div className='flex flex-row flex-wrap items-baseline justify-between gap-20 space-y-16 text-sm not-prose text-daw-zinc-600'>
        <div>
          <span className='hidden sm:inline'>Last updated:</span>{' '}
          <time title={updated.toISOString()}>{formatDate(updated)}</time>
        </div>
        <div className='flex flex-row gap-8 p-2'>
          <CopyButton contentTemplate='<link>'>
            <Clip size='18' />
            Copy link
          </CopyButton>
        </div>
      </div>
      <hr className='w-full' />
      <div className='items-center justify-center p-20 text-lg text-center sm:p-30'>
        {content}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  return { title: await getTitle(params.id) };
}

export function generateStaticParams() {
  return getAllIds().map((id) => ({ id }));
}

export const dynamicParams = false;
