import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import { getHighlighter } from 'shiki';
import { getTitle } from '@/lib/get-content';

export function A({ href, ...rest }: React.ComponentProps<'a'>) {
  if (href && href.startsWith('/'))
    return <Link {...rest} href={href} ref={undefined} />;
  return <a {...rest} href={href} target='_blank' rel='noopener noreferrer' />;
}
export const a = A;

export function pre({ children }: React.ComponentProps<'pre'>) {
  return <>{children}</>;
}

export function p({ children }: React.ComponentProps<'p'>) {
  return <p className='text-start text-md'>{children}</p>;
}

export function div({ children }: React.ComponentProps<'div'>) {
  return <div className='space-x-10'>{children}</div>;
}

export async function Product(
  stripeLink: string,
  title: string,
  description: string
) {
  return (
    <div className='flex flex-row gap-2 p-4'>
      <h1 className=''>{title}</h1>
      <p>{description}</p>
      {/* TODO: make a global Tailwind button/Link style */}
      <Link href={stripeLink} className=''></Link>
    </div>
  );
}

async function __code({ children, ...rest }: React.ComponentProps<'code'>) {
  const language = rest.className?.replace(/language-/, '');
  if (!language || !children)
    return (
      <code className='p-4 rounded-xl' {...rest}>
        {children}
      </code>
    );
  const highlighter = await getHighlighter({
    theme: 'github-light',
    langs: ['json', 'json5', 'js', 'jsx', 'ts', 'tsx'],
  });
  return (
    <div
      className='p-10 rounded-xl'
      dangerouslySetInnerHTML={{
        __html: highlighter.codeToHtml(String(children), {
          lang: language,
        }),
      }}
    />
  );
}
export const code = __code as unknown as (
  props: React.ComponentProps<'code'>
) => JSX.Element;

// TODO: Defining a completely custom component
// async function __Question({ id }: { id: string }) {
//   const title = await getTitle(id);
//   // We need to ensure the help-circle stays on the same line as the link, while
//   // the underline is displayed nicely, the spacing are good and if the help-circle
//   // is at the start of a line, it aligns well with the left margin of the whole
//   // text. See also https://stackoverflow.com/a/75070847
//   return (
//     <>
//       &nbsp;
//       <span className='whitespace-nowrap'>
//         <HelpCircle
//           size='18'
//           className='inline-block mr-1 text-daw-zinc-600'
//         />
//         &nbsp;
//       </span>
//       <A href={`/${id}`}>{title}</A>
//     </>
//   );
// }
// export const Question = __Question as unknown as ({
//   id,
// }: {
//   id: string;
// }) => JSX.Element;
