'use client';

import { PinContainer } from '@/components/ui/3d-pin';
import { getUsersRepos } from '@/lib/get-github-data';
import { useEffect, useState } from 'react';

export default function Projects() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsersRepos();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='grid grid-cols-1 pb-4 text-center text-gray-800 xl-grid-cols-4 gap-x-6 gap-y-10 md:grid-cols-2 p-20 md:gap-x-10 lg:grid-cols-3'>
      {userData
        //@ts-expect-error
        .filter((repo) => !repo.private)
        .map((repo, idx) => (
          <PinContainer
            key={idx}
            className='ring-1 rounded-md ring-zinc-500'
            title='github.com/polooner'
            //@ts-expect-error
            href={repo.html_url}
          >
            <div className='flex basis-full flex-col p-4 tracking-tight text-black sm:basis-1/2 w-[20rem] h-[20rem] '>
              <h3 className='max-w-xs !pb-2 !m-0 font-bold  text-base text-black'>
                {/* @ts-expect-error */}
                {repo.full_name}
              </h3>
              <div className='text-base !m-0 !p-0 font-normal'>
                {/* @ts-expect-error */}
                <span className='text-black '>{repo.description}</span>
              </div>
              {/* <p>containter here</p> */}
            </div>
          </PinContainer>
        ))}
    </div>
    // <div
    //   className='relative mx-auto before:absolute before:inset-0 before:z-[-1] before:bg-[length:22px_22px] before:bg-center before:bg-repeat-space before:opacity-10 before:bg-grid-[#000] before:gradient-mask-t-0 '
    //   id={'repositories'}
    // >
    //   <h3 className='m-6 text-center font-semibold tracking-tight text-white md:text-[35px] lg:text-[37px] xl:text-[40px] flex justify-center items-center'>
    //     My
    //     <span className='flex items-center bg-gradient-to-r text-fill-transparent'>
    //       <GithubIcon className='items-center inline-block w-24 h-24 mx-4' />{' '}
    //       GitHub
    //     </span>
    //     &nbsp; Projects
    //   </h3>

    //   <div className='relative py-20'>
    //     <div className='grid grid-cols-1 pb-4 mb-8 text-center text-gray-800 xl-grid-cols-4 gap-x-6 gap-y-10 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3'>
    //       {userData &&
    //         userData.map((repo) => {
    //           console.log(repo.private);
    //           return !repo.private ? (
    //             <RepoCard
    //               stargazersUrl={repo.stargazers_url}
    //               forksCount={repo.forks_count}
    //               languagesUrl={repo.languages_url}
    //               key={repo.node_id}
    //               stargazersCount={repo.stargazers_count}
    //               watchersCount={repo.watchers_count}
    //               forksUrl={repo.forks_url}
    //               description={repo.description}
    //               language={repo.language}
    //               topics={repo.topics}
    //               repoUrl={repo.html_url}
    //               avatarUrl={repo.avatarUrl}
    //               fullName={repo.full_name}
    //               isArchived={repo.archived}
    //             />
    //           ) : null;
    //         })}
    //     </div>
    //     <div className='absolute inset-x-0 bottom-0 z-20 flex pt-32 pb-8 duration-300 pointer-events-visible section-fade'>
    //       <div className='flex flex-col items-center justify-center flex-1 duration-200 motion-reduce:transition-none'>
    //         <Link
    //           className='relative items-center justify-center inline-block p-2 pb-1 pl-0 pr-0 mt-5 font-semibold duration-200 pointer-events-auto arrow link group motion-reduce:transition-none'
    //           href='https://github.com/polooner'
    //           target='_blank'
    //         >
    //           <>
    //             See more repositories
    //             <svg
    //               className='arrowSymbol inline-block translate-x-[5px] duration-200 group-hover:translate-x-[10px] motion-reduce:transition-none'
    //               width='16'
    //               height='16'
    //               viewBox='0 0 16 16'
    //               fill='none'
    //             >
    //               <path
    //                 fill='currentColor'
    //                 d='M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z'
    //               ></path>
    //               <path
    //                 stroke='currentColor'
    //                 d='M1.75 8H11'
    //                 strokeWidth={2}
    //                 strokeLinecap='round'
    //               ></path>
    //             </svg>
    //           </>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
