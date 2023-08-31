'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { UploadButton } from '@/lib/uploadthing';
import { UploadFileResponse } from 'uploadthing/client';
import Link from 'next/link';
import { Icons } from './ui/icons';

const postFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  content: z.string().min(2, {
    message: 'Content must be at least 2 characters.',
  }),
  // Not validating bannerUrl because it's optional in db and component props
});

export type postFormType = typeof postFormSchema.shape;

interface PostContentProps {
  edit_type?: string;
}

const PostContent = (props: PostContentProps) => {
  const [file, setFile] = useState<UploadFileResponse | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  // 2. Define a submit handler.
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
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='w-40 mt-10 self-center'>
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
              className='space-y-8 flex flex-col'
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
              {/* 
              Show link to banner once uploaded 
              TODO: ask "Are you sure" when quitting form 
              TODO: delete file if form was not submitted and quit
              */}

              {file && (
                <FormItem>
                  <Link
                    target='_blank'
                    className='flex gap-x-4 p-4 flex-row rounded-md ring-1 ring-slate-200'
                    href={file.url}
                  >
                    <Icons.media />
                    {file.name}
                  </Link>
                </FormItem>
              )}
              <FormItem>
                <FormLabel>
                  Upload banner
                  <Button
                    variant={'outline'}
                    type='button'
                    className='h-fit w-full self-center'
                  >
                    <UploadButton
                      endpoint='imageUploader'
                      onClientUploadComplete={(res) => {
                        // Setting file to be the response object
                        // of type UploadFileResponse[]
                        // TODO: handle multiple file uploads,
                        //       currently only taking first response
                        console.log('Files: ', res);
                        if (res) {
                          setFile(res[0]);
                        }

                        alert('Upload Completed');
                      }}
                      onUploadError={(error: Error) => {
                        // Alert the error
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </Button>
                </FormLabel>
              </FormItem>
              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostContent;
