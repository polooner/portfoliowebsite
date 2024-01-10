import { StarIcon } from '@radix-ui/react-icons';
import {
  ArchiveIcon,
  FolderIcon,
  GithubIcon,
  SparklesIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface RepoCardProps {
  key: string;
  avatarUrl: string;
  repoUrl: string;
  stargazersCount: number;
  forksCount: number;
  languagesUrl: string;
  stargazersUrl: string;
  watchersCount: number;
  isArchived: Boolean;
  language: string;
  fullName: string;
  forksUrl: string;
  description: string;
  topics: string[];
}

export function RepoCard(props: RepoCardProps) {
  return (
    <div
      key={props.key}
      id={props.fullName}
      className='card z-10 rounded-[10px] ring-white ring-1 border-[1px] border-black/[15%] p-5 backdrop-blur-md duration-200 ease-in-out hover:bg-gray-100 bg-white motion-reduce:transition-none'
    >
      <div>
        {/* <div className='mb-4 rounded-[10px] items-center relative self-center w-[720px] h-[480px]'>
          <GithubIcon size={150} className='self-center' />
        </div> */}
        <div className='text-left'>
          <Link
            href={props.repoUrl}
            key={props.key}
            className='font-semibold text-left break-all'
            target='_blank'
          >
            <FolderIcon className='inline h-6 w-6 fill-black/[10%] stroke-black/[70%] duration-200 motion-reduce:transition-none  ' />{' '}
            {props.fullName}
          </Link>{' '}
          <span className='ml-1 inline-flex content-center items-center rounded-lg border-[1px] border-black/[15%] px-[0.5em] py-[0.12em] align-middle text-[88%] text-gray-800/[55%] duration-200 hover:bg-black/[5%] motion-reduce:transition-none '>
            {props.isArchived ? (
              <>
                <ArchiveIcon className='mr-1 inline-block h-4 w-4 stroke-black/[50%] duration-200 motion-reduce:transition-none' />{' '}
                Archived
              </>
            ) : (
              <>
                <SparklesIcon className='mr-1 inline-block h-4 w-4 stroke-black/[50%] duration-200 motion-reduce:transition-none ' />{' '}
                Active
              </>
            )}
          </span>
        </div>
        <p className='text-left'>
          {props.description
            ? props.description.substring(0, 90)
            : 'No description'}
          {props.description && props.description.length > 90 ? '...' : ''}
        </p>
        {props.topics ? (
          <div className='text-left'>
            {props.topics.map((topic) => (
              <Link
                key={topic}
                href={`https://github.com/topics/${topic}`}
                target='_blank'
              >
                <span className='mr-[10px] mt-1 inline-flex content-center items-center rounded-[2em] border-[1px] border-black/[15%] px-[0.5em] py-[0.12em] align-middle text-[88%] text-gray-800/[60%] duration-200 hover:bg-black/[5%] motion-reduce:transition-none'>
                  #{topic}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          ''
        )}
        <div className='flex gap-1 overflow-hidden overflow-x-auto hide-scrollbar'>
          <Link
            key='repo_lang'
            href={props.languagesUrl}
            target='_blank'
            aria-label={`${
              props.language ? props.language : 'Markdown'
            } search`}
          >
            <span className='my-1 flex w-max content-center items-center rounded-lg border-2 border-transparent bg-black/[5%] px-[0.5em] py-[0.12em] text-[88%] text-gray-800/[60%] duration-200 hover:bg-black/10 motion-reduce:transition-none '>
              <span>{props.language ? props.language : 'Markdown'}</span>
            </span>
          </Link>
          <Link key='repo_stars' href={props.stargazersUrl} target='_blank'>
            <span className='my-1 flex w-max snap-center snap-always content-center items-center rounded-lg border-2 border-transparent bg-black/[5%] px-[0.5em] py-[0.12em] align-middle text-[88%] text-gray-800/[60%] duration-200 hover:bg-black/10 motion-reduce:transition-none '>
              <StarIcon
                className='mr-1 inline h-5 w-5 stroke-black/[50%] duration-200 motion-reduce:transition-none '
                aria-hidden='true'
                role='img'
              />{' '}
              <span>{props.stargazersCount} Stars</span>
            </span>
          </Link>
          <Link key='repo_forks' href={props.forksUrl} target='_blank'>
            <span className='my-1 flex w-max snap-center snap-always content-center items-center rounded-lg border-2 border-transparent bg-black/[5%] px-[0.5em] py-[0.12em] align-middle text-[88%] text-gray-800/[60%] duration-200 hover:bg-black/10 motion-reduce:transition-none '>
              <svg
                className='mr-1 h-5 w-5 fill-black/[50%] duration-200 motion-reduce:transition-none '
                aria-hidden='true'
                role='img'
                viewBox='0 0 32 32'
              >
                <path
                  fill='currentColor'
                  d='M9 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6Zm1 1.9A5.002 5.002 0 0 0 9 2a5 5 0 0 0-1 9.9v8.2A5.002 5.002 0 0 0 9 30a5 5 0 0 0 1-9.9V18h9a5 5 0 0 0 5-5v-1.1A5.002 5.002 0 0 0 23 2a5 5 0 0 0-1 9.9V13a3 3 0 0 1-3 3h-9v-4.1ZM23 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6ZM12 25a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z'
                />
              </svg>{' '}
              <span>{props.forksCount} Forks</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function RepoCardSkeleton() {
  return (
    <div className='rounded-[10px] border-[1px] border-black/[15%] bg-white p-5 duration-200 hover:shadow-xl motion-reduce:transition-none '>
      <div className='h-6 w-2/4 animate-pulse rounded-md bg-gray-200/[15%]' />
      <div className='mt-3 h-6 w-5/6 animate-pulse rounded-md bg-gray-200/[15%]' />
      <div className='flex mt-3 text-left'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            className='mr-2 h-6 w-28 animate-pulse rounded-[2em] bg-gray-200/[15%]'
            key={index}
          />
        ))}
      </div>
      <div className='flex gap-1 mt-2 '>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            className='mr-2 h-6 w-28 animate-pulse rounded-md bg-gray-200/[15%]'
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
