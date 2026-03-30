import { Metadata } from 'next';
import Link from 'next/link';
import { ArenaDockCard } from './components/arenadock-card';
import { FloraCard } from './components/flora-card';
import { GridAnimatorCard } from './components/grid-animator-card';
import { KreaCard } from './components/krea-card';
import { SunlightDropCard } from './components/sunlight-drop-card';

export const metadata: Metadata = {
  title: 'Filip Wojda',
  description: 'artist, engineer, etc',
};

export default function Home() {
  return (
    <section className="w-full max-w-4xl px-6 py-20 self-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <KreaCard />
        <FloraCard />
        <ArenaDockCard />
        <SunlightDropCard />
        <GridAnimatorCard />
        <div className="flex flex-col gap-1">
          <Link className="font-bold hover:underline" target="_blank" href="https://www.ekran.ai">
            <div className="flex flex-row justify-between">EKRAN</div>
          </Link>
          <i className="font-thin text-xs">everything everywhere all at once</i>
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
          <i className="font-thin text-xs">everything everywhere all at once</i>
          AI shorts generator.
        </div>
      </div>
    </section>
  );
}
