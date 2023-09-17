import { readdirSync, readFileSync } from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import { join } from 'path';
import * as components from '@/components/mdx-components';

export const DIR = join(process.cwd(), 'contents');

export function getAllIds(page: string) {
  return readdirSync(join(DIR, `${page}`), { withFileTypes: true })
    .filter((file) => file.isFile() && file.name.endsWith('.mdx'))
    .map((file) => file.name.replace(/\.mdx$/, ''));
}

export async function getTitle(id: string, page: string) {
  return await getContent(id, page).then(({ title }) => title);
}

export async function getContent(id: string, page: string) {
  const source = readFileSync(join(DIR, `${page}/${id}.mdx`), 'utf8');
  const { content, frontmatter } = await compileMDX<{
    img?: string;
    company?: string;
    title: string;
    updated: Date;
    messageContent: string;
  }>({
    source,
    options: { parseFrontmatter: true },
    components,
  });
  return { content, ...frontmatter };
}
