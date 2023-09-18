'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Cryptr from 'cryptr';
import toast from 'react-hot-toast';

const formSchema = z.object({
  firstname: z.string().min(2).max(70),
  lastname: z.string().min(2).max(70),
  email: z.string().email().min(2).max(70),
  company: z.string().min(2).max(70).optional(),
});

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      company: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const cryptr = new Cryptr(process.env.NEXT_PUBLIC_KEY as string);
    values['key'] = cryptr.encrypt(KEY);

    await fetch('/api/send_email', {
      method: 'POST',

      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status == 200) toast('Sent!');
      })
      .catch((err) => toast('Error'));
  }
  const KEY = process.env.NEXT_PUBLIC_API_KEY as string;

  return (
    <main className='flex flex-col justify-center w-full h-full space-y-6 duration-100'>
      <h1 className='heading'>A form to get in touch with me.</h1>

      <div>
        <Link
          className='duration-100 hover:pr-6 w-fit hover:underline underline-offset-2 decoration-2'
          href={'/bookacall'}
        >
          You can schedule some time on my calendar here
        </Link>
        <span>&rarr;</span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 !w-[50%] self-center pt-10 sm:pt-20'
        >
          <FormField
            control={form.control}
            name='firstname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='First name' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder='Last name' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder='E-mail' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='company'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder='Company' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </main>
  );
}
