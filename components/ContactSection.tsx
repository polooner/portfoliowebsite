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
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  body: z.string().min(1).max(2000),
  subject: z.string().min(2).max(70),
});

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      body: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    document.location = `mailto:wojdafilip@gmail.com?subject=${values.subject}&body=${values.body}`;
  }

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
            name='subject'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder='Subject' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='body'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Textarea rows={10} placeholder='Body' {...field} />
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
