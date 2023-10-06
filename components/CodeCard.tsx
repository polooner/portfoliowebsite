import { ConvertBytes, ConvertNumber } from '@/lib/utils';
import Link from 'next/link';

const meta = {
  title: 'Filip Wojda',
  author: 'Filip Wojda',
  url: 'https://filipwojda.dev',
  themeColor: '#091430',
  locale: 'en_US',
  siteName: 'Igor Kowalczyk',
  accounts: {
    github: {
      username: 'igorkowalczyk',
      repo: 'igorkowalczyk.github.io',
    },
    twitter: {
      username: '@wojda.labs',
    },
    discord: {
      username: '1voy',
      id: '685999672749326368',
    },
    instagram: {
      username: 'how2lyck',
    },
  },
};

const header = {
  title: 'Filip Wojda',
  subtitle: 'Full-stack developer',

  code: {
    user: 'filipwojda',
  },
};

export function CodeCard({ userData, contributions }) {
  return (
    <div className=' card border-b-black/15 shadow-code block w-fit rounded-md border text-[15px] text-sm backdrop-blur-md transition-colors motion-reduce:transition-none dark:border-[1px] dark:border-neutral-800 dark:bg-[#161617]/30'>
      <div className='w-fill border-b-dark/5 relative flex h-8 items-center gap-[6px] border-b bg-white/[0.05%] p-2 dark:border-b-white/10'>
        <div className='h-3.5 w-3.5 cursor-no-drop rounded-full bg-[#fb5f57]' />
        <div className='h-3.5 w-3.5 cursor-no-drop rounded-full bg-[#fdbf2d]' />
        <div className='h-3.5 w-3.5 cursor-no-drop rounded-full bg-[#27cb3f]' />
        <div className='absolute top-0 bottom-0 flex items-center justify-center w-full'>
          <span className='opacity-50' aria-hidden='true'>
            Console
          </span>
        </div>
      </div>
      {userData && contributions && (
        <div className='min-h-[200px] overflow-x-hidden whitespace-nowrap p-4'>
          <span
            className='font-semibold leading-6 text-[#ea4aaa]'
            aria-hidden='true'
          >
            →
          </span>{' '}
          <span
            className='font-semibold text-[#66e777]'
            aria-hidden='true'
          >
            ~/wojda
          </span>{' '}
          <span
            className='italic font-semibold text-gray-700 duration-200 motion-reduce:transition-none dark:text-neutral-300'
            aria-hidden='true'
          >
            $
          </span>{' '}
          <span
            className='italic'
            aria-label={`list github account ${meta.accounts.github.username}`}
          >
            list github --user=
            <Link
              href={`https://github.com/polooner`}
              target='_blank'
              aria-label={`See polooner github`}
            >
              <>wojda</>
            </Link>
          </span>
          <span className='leading-6'>
            <div>
              <span aria-hidden='true'> + </span>
              <span className='font-semibold'>
                {userData.userPublicRepositoriesCount} Open Source
              </span>{' '}
              {userData.userPublicRepositoriesCount > 1
                ? 'repositories'
                : 'repository'}{' '}
              on Github (total size:{' '}
              {ConvertBytes(
                userData.userPublicRepositoriesDiskUsage * 1000
              )}
              )
            </div>
            {/* <div>
              <span aria-hidden='true'> + </span>
              <span className='font-semibold'>
                {ConvertNumber(contributions.total)} Contributions
              </span>{' '}
              since {contributions.dates.since} (
              {ConvertNumber(contributions.results[0].totalContributions)}{' '}
              in last year)
            </div> */}
          </span>
          {meta.accounts.discord && (
            <div>
              <span
                className='font-semibold leading-6 text-[#ea4aaa]'
                aria-hidden='true'
              >
                →
              </span>{' '}
              <span
                className='font-semibold text-[#66e777]'
                aria-hidden='true'
              >
                ~/wojda
              </span>{' '}
              <span className='italic font-semibold text-gray-700 duration-200 motion-reduce:transition-none dark:text-neutral-300'>
                $
              </span>{' '}
              <span className='italic'>contact --discord</span>
              <div className='leading-6'>
                + <span className='font-semibold'>User:</span>{' '}
                <Link
                  href={`https://discord.com/users/685999672749326368`}
                  target='_blank'
                >
                  {meta.accounts.discord.username}
                </Link>
              </div>
            </div>
          )}
          <span
            className='font-semibold leading-6 text-[#ea4aaa]'
            aria-hidden='true'
          >
            →
          </span>{' '}
          <span
            className='font-semibold text-[#66e777]'
            aria-hidden='true'
          >
            ~/{header.code.user}
          </span>{' '}
          <span className='italic'>
            <span
              className="relative font-semibold text-gray-700 duration-200 after:absolute after:bottom-0 after:right-[-1.5em] after:top-0 after:my-auto after:animate-[cursor_750ms_infinite] after:text-[1em] after:not-italic after:content-['▌'] motion-reduce:transition-none dark:text-neutral-300"
              aria-hidden='true'
            >
              $
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
