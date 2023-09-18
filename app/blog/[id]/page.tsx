import { ArrowLeft, Copy, Link } from 'lucide-react';
import Balancer from 'react-wrap-balancer';
import { getAllIds, getTitle, getContent } from '@/lib/get-content';
import { formatDate } from '@/lib/utils';
import { A } from '@/components/mdx-components';
import { headers } from 'next/headers';
import CopyButton from '@/components/copy-button';

export default async function BlogPost({
  params,
}: {
  params: { id: string };
}) {
  const { content, title, updated, messageContent } = await getContent(
    params.id
  );
  return (
    <>
      <div className='not-prose'>
        <A
          href='/'
          className='inline-flex flex-row items-center justify-center gap-2 text-sm duration-100 text-daw-zinc-600 hover:gap-x-6 hover:underline'
        >
          <ArrowLeft size='18' /> See other projects
        </A>
      </div>
      <h1 className='my-8 text-2xl font-black sm:text-6xl'>
        <Balancer>{title}</Balancer>
      </h1>
      <div className='flex flex-row flex-wrap items-center justify-between gap-20 space-y-16 text-sm not-prose text-daw-zinc-600'>
        <div>
          <span className='hidden sm:inline'>Last updated:</span>{' '}
          <time title={updated.toISOString()}>{formatDate(updated)}</time>
        </div>
        <div className='flex flex-row gap-8'>
          <CopyButton contentTemplate={messageContent}>
            <Copy size='18' />
            Copy message
          </CopyButton>
          <CopyButton contentTemplate='<link>'>
            <Link size='18' />
            Copy link
          </CopyButton>
        </div>
      </div>
      <hr />
      <div className='p-20 sm:p-40'>{content}</div>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  return { title: await getTitle(params.id) };
}

export function generateStaticParams() {
  return getAllIds().map((id) => ({ id }));
}

export const dynamicParams = false;
