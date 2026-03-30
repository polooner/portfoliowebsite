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
    <section className="w-full max-w-4xl px-6 py-20 self-center flex flex-col gap-20">
      <div>
        <h2 className="text-xl font-mono text-black mb-6">[&nbsp;work&nbsp;]</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <KreaCard />
          <FloraCard />
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center">
              <Link
                className="font-bold hover:underline"
                target="_blank"
                href="https://www.julius.ai"
              >
                Julius.ai
              </Link>
              <i className="font-thin text-xs">2024</i>
            </div>
            <i className="font-thin text-xs">founding engineer</i>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-mono text-black mb-6">[&nbsp;more work&nbsp;]</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ArenaDockCard />
          <SunlightDropCard />
          <GridAnimatorCard />
          <div className="flex flex-col gap-1">
            <Link className="font-bold hover:underline" target="_blank" href="https://www.ekran.ai">
              <div className="flex flex-row justify-between">EKRAN</div>
            </Link>
            <div className="text-neutral-500">
              Video editor with a chat. reads transcripts, visually annotates videos + performs
              vector search using top open source research implementation. <br />
              <br />

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
            AI shorts generator.
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Link
          className="font-bold hover:underline"
          target="_blank"
          href="https://paysponge.com"
        >
          PAYSPONGE.COM MERCH
        </Link>
        <div className="flex flex-row gap-4 max-w-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://bkjyaeduksegxtarnyzz.supabase.co/storage/v1/object/public/public-assets/sponge/sponge1.png"
            alt="Sponge credit card merch design"
            className="w-1/2 h-auto object-contain"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://bkjyaeduksegxtarnyzz.supabase.co/storage/v1/object/public/public-assets/sponge/sponge2.png"
            alt="Sponge shirt back design"
            className="w-1/2 h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
