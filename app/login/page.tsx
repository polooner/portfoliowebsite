'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';

const formSchema = z.object({
  username: z.string().min(2).max(70),
  password: z.string().min(2).max(70),
});

export default function Login() {
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);

  return (
    <div>
      <button
        type='button'
        className={cn(buttonVariants({ variant: 'outline' }))}
        onClick={() => {
          setIsGitHubLoading(true);
          signIn('github');
        }}
      >
        {isGitHubLoading ? (
          <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <Icons.gitHub className='mr-2 h-4 w-4' />
        )}{' '}
        Github
      </button>
    </div>
  );
}
