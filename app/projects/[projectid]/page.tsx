import { MDXProvider } from '@mdx-js/react';
import { readFileSync, readdirSync } from 'fs';
import { redirect } from 'next/navigation';
import React from 'react';

//TODO: add metadata w/ greymatter

const components = {};

export default async function BlogPost({
  props,
  params,
}: {
  props: React.ComponentPropsWithoutRef<'div'>;
  params: { projectid: string };
}) {
  let post;
  try {
    post = readdirSync(`../../../mdx/${params.projectid}.mdx`);
    console.log(post);
  } catch (err) {
    console.log(err);
    redirect(`/projects/${err.code}`);
  }

  return (
    <MDXProvider components={components}>
      <main {...props} />
    </MDXProvider>
  );
}
