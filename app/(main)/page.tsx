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
          <strong>Filip Wojda</strong>
          <br />
          <p>artist, ex-founder, technologist</p>
          <div>
            currently a product engineer @{' '}
            <Link
              className="font-bold hover:underline"
              target="_blank"
              href={'https://florafauna.ai'}
            >
              FLORA
            </Link>
          </div>
          <br />
          <br />

          <div>
            <p>i am based out of nyc.</p>
          </div>

          <div>
            i like philosophy <br /> and ai <br /> and ui.
          </div>
        </div>
        <br />
        <br />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <Link className="font-bold hover:underline" target="_blank" href="https://www.ekran.ai">
              ekran.ai
            </Link>
            <div>a video editing copilot. chat to edit videos.</div>
            <div>
              launched from{' '}
              <Link className="font-bold hover:underline" target="_blank" href="https://www.f.inc">
                f.inc
              </Link>{' '}
              [ship it] in march 2025
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Link
              className="font-bold hover:underline"
              target="_blank"
              href="https://www.julius.ai"
            >
              julius.ai
            </Link>
            previously founding engineer
          </div>
          <div className="flex flex-col gap-1">
            <Link
              className="font-bold hover:underline"
              target="_blank"
              href="https://www.makeklips.ai"
            >
              makeklips.ai
            </Link>
            ai shorts generator.
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
