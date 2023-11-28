import { MDXComponents } from 'mdx/types';
import NextImage from 'next/image';
import { Code } from 'bright';
import { MDXImage } from './mdx-image';
import { Tweet } from 'react-tweet';

export const mdxComponents: MDXComponents = {
  pre: ({
    children,
    ...props
  }: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLPreElement
  >) => {
    // TODO: extract title from children
    return <Code theme='material-default'>{children as any}</Code>;
  },
  img: MDXImage as any,
  Image: NextImage as any,

  Tweet: (props) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Tweet {...props} />
    </div>
  ),
};
