import { getCurrentUser } from '@/lib/session';

export default async function Projects() {
  const user = await getCurrentUser();

  return (
    <main>
      <h1 className='heading'>A collection of my projects.</h1>
      <p>{user?.email}</p>
      <p className='text-gray-500'>Source code sometimes included.</p>
    </main>
  );
}
