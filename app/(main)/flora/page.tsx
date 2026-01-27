import { Metadata } from 'next';
import Link from 'next/link';
import { LabelBadge } from '@/components/ui/label-badge';
import { ImageCarousel } from '@/components/ui/image-carousel';

export const metadata: Metadata = {
  title: 'Flora | Filip Wojda',
  description: 'Creative workflows on an infinite AI canvas.',
};

export default function FloraPage() {
  return (
    <section className="flex flex-col gap-8 w-full max-w-2xl px-4 py-12 self-center">
      <div className="flex flex-col gap-4">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-2xl"
          style={{ viewTransitionName: 'flora-video' }}
        >
          <source src="/2022drawings/florafeatures.mov" type="video/quicktime" />
          <source src="/2022drawings/florafeatures.mov" type="video/mp4" />
        </video>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <Link
              className="font-bold text-6xl hover:underline"
              target="_blank"
              href="https://www.florafauna.ai"
            >
              FLORA
            </Link>
            <div className='flex flex-col'>
              <span className='font-bold'>2025-2026</span>
              <i className="font-thin text-xs">product engineering</i>

            </div>
          </div>
          <hr className="border-neutral-200" />
          <p className="">
            Concept first, not pixel first.
            I joined FLORA as part of a personal mission to bring the creative control in a world optimizing for one-shot AI (slop). While other tools just bring AI models together, FLORA does so in a carefully curated manner, with a simple interface, and (soon) a full image editing tool suite.
            <br /><br />FLORA is the creative tool for the next generation of creatives, which are increasingly able to protype/conceptualize the work of what previously would have been the effort of an entire production studio. Because of AI. Essentially, it's creative workflows on
            an infinite AI canvas. All your thoughts, in plain language, on your computer. <br /><br /> It allows creatives (such as many world-class agencies, production studios and others) to turn their entire creative process
            into a workflow, which lives in the form of an incredibly simple interface, combining many complex AI models that otherwise tools such
            as ComfyUI and others require tons of expertise to even get started with. <br /><br /> I am incredibly grateful for the team at FLORA for our ride together on many ambitious projects.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 text-neutral-700">
        <span
          className="font-medium font-mono text-xl"
        >
          Some things I worked on
        </span>
        <p>Aside from some other projects, I led the engineering efforts for image editing tools (Inpainting/Outpainting/Compositing/Cropping).</p>
        <div className='h-[940px] min-h-[940px]'>
          <ImageCarousel
            height={940}
            label={<LabelBadge>Inpainting</LabelBadge>}
            images={[
              { src: '/2022drawings/inpaintingflorashowcase.png', alt: 'Inpainting showcase' },
              { src: '/2022drawings/postinpaint.png', alt: 'Post inpaint result' },
            ]}
          />
        </div>
        <div className='h-[940px] min-h-[940px]'>
          <ImageCarousel
            height={940}
            label={<LabelBadge>Outpainting</LabelBadge>}
            images={[
              { src: '/2022drawings/outpaint.png', alt: 'Outpaint showcase' },
              { src: '/2022drawings/postoutpaint.png', alt: 'Post outpaint result' },
            ]}
          />
        </div>
        <div className='h-[940px] min-h-[940px]'>
          <ImageCarousel
            height={940}
            label={<LabelBadge>Cropping</LabelBadge>}
            images={[
              { src: '/2022drawings/cropping.png', alt: 'Cropping showcase' },
              { src: '/2022drawings/postcropping.png', alt: 'Post cropping result' },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
