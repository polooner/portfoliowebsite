import ArrowIcon from '@/components/ui/icons';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Filip Wojda',
  description: 'artist, engineer, etc',
};

export default function Home() {
  return (
    <section className="flex flex-col gap-y-10 w-72 py-20 self-center items-center ">
      <div className="w-72 gap-4 text-start flex flex-col">
        <div>
          <strong className="text-2xl">Filip Wojda</strong>
          <br />
          <p>product engineering, design, art</p>

          <br />
          <br />

          <div>
            <p>Currently based out of NYC.</p>
          </div>

          <div>
            I like philosophy, AI and UI.
            <br />
            <br />
          </div>
          <div>
            I am the most helpful on the topics of AI engineering/product, design, web performance.
          </div>
          <div>I occasionally advise select companies on the above.</div>
        </div>
        <br />
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-1">
            <Link
              className="font-bold hover:underline"
              target="_blank"
              href="https://www.florafauna.ai"
            >
              <div className="flex flex-row justify-between">
                FLORA <span className="font-mono">present</span>
              </div>
            </Link>
            <i className="font-thin text-xs">product engineering</i>
            <div className="text-sm">the world&apos;s most powerful creative tool</div>
            <div className="text-neutral-500">
              On a mission to bring the creative control in a world optimizing for one-shot AI.
              creative workflows on an infinite AI canvas.
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Link className="font-bold hover:underline" target="_blank" href="https://www.ekran.ai">
              <div className="flex flex-row justify-between">EKRAN</div>
            </Link>
            <i className="font-thin text-xs">founder, engineer, designer</i>
            <div>a video editing copilot. chat to edit videos.</div>
            <div className="text-neutral-500">
              Video editor with a chat. reads transcripts, visually annotates videos + performs
              vector search using top open source research implementation. <br />
              <br />
              launched from{' '}
              <Link className="font-bold hover:underline" target="_blank" href="https://www.f.inc">
                f.inc
              </Link>{' '}
              [ship it]
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Link
              className="font-bold hover:underline"
              target="_blank"
              href="https://www.julius.ai"
            >
              <div className="flex flex-row justify-between">Julius.ai</div>
            </Link>
            <i className="font-thin text-xs">founding engineer</i>
            AI data scientist
            <div className="text-neutral-500">
              Fullstack, optimized performance, took features 0 &rarr; 1 and 1 &rarr; many
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Link
              className="font-bold hover:underline"
              target="_blank"
              href="https://www.makeklips.ai"
            >
              makeklips.ai
            </Link>
            <i className="font-thin text-xs">founder, engineer, designer</i>
            AI shorts generator
          </div>
        </div>
        <br />
        <br />
        <div className="text-start gap-2 items-start ">
          <strong className="mono">Contact</strong>
          <Link
            target="_blank"
            href="https://twitter.com/filipwojda"
            className="flex hover:underline flex-row gap-x-1 items-center"
          >
            <p>twitter (x)</p>
            <ArrowIcon />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/filip-wojda/"
            className="flex flex-row gap-x-1 hover:underline items-center"
          >
            <p>linkedin</p>
            <ArrowIcon />
          </Link>
          <Link
            href="https://github.com/polooner"
            className="flex hover:underline flex-row gap-x-1 items-center"
          >
            <p>github</p>
            <ArrowIcon />
          </Link>
          <Link
            href="mailto:wojdafilipdev@gmail.com"
            className="flex hover:underline flex-row gap-x-1 items-center"
          >
            <p>email</p>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
