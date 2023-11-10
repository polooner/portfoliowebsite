import AnimatedHeader from '@/components/AnimatedHeader';
import { CodeCard } from '@/components/CodeCard';
import { RepoCard } from '@/components/RepoCard';
import { getPopular, getUserData } from '@/lib/getGitHubData';
import { getTotalContributionsForYears } from '@/lib/getTotalContributionsForYears';
import Link from 'next/link';

export default async function Home() {
  const userData = await getUserData();
  const contributions = await getTotalContributionsForYears();
  const repos = await getPopular();
  const reposData = repos.repositories.edges;

  return (
    <main className='flex flex-col items-center justify-center w-full min-h-full gap-6 sm:gap-10 sm:flex-row'>
      <AnimatedHeader />
      <CodeCard userData={userData} contributions={contributions} />
      <section id={'repositories'} className='pt-12 scroll-mt-20 lg:px-24'>
        <div
          className='relative mx-auto before:absolute before:inset-0 before:z-[-1] before:bg-[length:22px_22px] before:bg-center before:bg-repeat-space before:opacity-10 before:bg-grid-[#000] before:gradient-mask-t-0 dark:before:opacity-20 dark:before:bg-grid-[#fff]'
          id={'repositories'}
        >
          <h3 className='m-6 text-center text-[35px] font-semibold tracking-[-0.03em] text-gray-800 duration-300 motion-reduce:transition-none dark:text-white md:text-[35px] lg:text-[37px] xl:text-[40px]'>
            Most Popular Projects
            <span className='bg-gradient-to-r from-[#6310ff] to-[#1491ff] box-decoration-clone bg-clip-text text-fill-transparent dark:from-[#a2facf] dark:to-[#64acff]'>
              .
            </span>
          </h3>
          <div className='relative'>
            <div className='grid grid-cols-1 pb-4 mb-8 text-center text-gray-800 xl-grid-cols-4 gap-x-6 gap-y-10 dark:text-white md:grid-cols-2 md:gap-x-10 lg:grid-cols-3'>
              {reposData &&
                reposData.map((repo) => {
                  return repo.node.owner.login == 'polooner' ? (
                    <RepoCard key={repo.node.id} {...repo.node} />
                  ) : null;
                })}
            </div>
            <div className='absolute inset-x-0 bottom-0 z-20 flex pt-32 pb-8 duration-300 pointer-events-visible section-fade'>
              <div className='flex flex-col items-center justify-center flex-1 duration-200 motion-reduce:transition-none'>
                <Link
                  className='relative items-center justify-center inline-block p-2 pb-1 pl-0 pr-0 mt-5 font-semibold duration-200 pointer-events-auto arrow link group motion-reduce:transition-none'
                  href='/repositories'
                >
                  <>
                    See more repositories
                    <svg
                      className='arrowSymbol inline-block translate-x-[5px] duration-200 group-hover:translate-x-[10px] motion-reduce:transition-none'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                    >
                      <path
                        fill='currentColor'
                        d='M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z'
                      ></path>
                      <path
                        stroke='currentColor'
                        d='M1.75 8H11'
                        strokeWidth={2}
                        strokeLinecap='round'
                      ></path>
                    </svg>
                  </>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
