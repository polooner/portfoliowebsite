'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

import { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Textarea } from './ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

import { UploadFileResponse } from 'uploadthing/client';

import { useRouter } from 'next/navigation';

const postFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  content: z.string().min(2, {
    message: 'Content must be at least 2 characters.',
  }),
  // NOTE: notice that some projects might be too private = not shared. What then?
  projectUrl: z.string().min(2, {
    message: 'Must supply a projectURL',
  }),
  table: z.literal('project'),
});

export type postFormType = typeof postFormSchema.shape;

// TODO: make this component reusable for other db tables too

const PostContentProject = () => {
  const [file, setFile] = useState<UploadFileResponse | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      content: '',
      projectUrl: '',
      table: 'project',
    },
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof postFormSchema>) {
    // Post to database
    // ✅ This will be type-safe and validated.
    fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then(async (res) => {
        const json = await res.json();
        alert(JSON.stringify(json));
        router.refresh();
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='self-center w-40 mt-10'>
          Post a project
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Post a project</DialogTitle>
        </DialogHeader>

        <DialogDescription>Supports html</DialogDescription>
        <div className='grid gap-4 py-4'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col space-y-8'
            >
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='title of post...' {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder='content' {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='projectUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project URL</FormLabel>
                    <FormControl>
                      <Textarea placeholder='content' {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostContentProject;
