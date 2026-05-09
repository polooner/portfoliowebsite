export type MediaFit = 'contain' | 'cover';

export type ProjectMedia =
  | {
      type: 'image';
      src: string;
      alt: string;
      width: number;
      height: number;
      fit?: MediaFit;
      caption?: string;
    }
  | {
      type: 'video';
      src: string;
      mime?: string;
      fit?: MediaFit;
      caption?: string;
    }
  | { type: 'logo'; key: 'krea'; caption?: string };

export type ProjectKind = 'work' | 'tool';

export type Project = {
  id: string;
  kind: ProjectKind;
  name: string;
  role: string;
  year: string;
  href: string;
  external: boolean;
  description: string;
  tags: string;
  media: ProjectMedia[];
  defunct?: boolean;
  subtext?: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'krea',
    kind: 'work',
    name: 'Krea',
    role: 'design + engineering',
    year: 'current',
    href: 'https://www.krea.ai',
    external: true,
    description:
      'Realtime AI image and video creation tools. building the canvas + product surfaces.',
    tags: 'web, design, engineering',
    media: [{ type: 'logo', key: 'krea' }],
  },
  {
    id: 'flora',
    kind: 'work',
    name: 'FLORA',
    role: '',
    year: '2025-2026',
    href: '/flora',
    external: false,
    description:
      'A drawing + animation playground exploring procedurally-generated botanical forms.',
    tags: 'web, design, engineering',
    media: [
      {
        type: 'video',
        src: '/2022drawings/florafeatures.mov',
        mime: 'video/quicktime',
      },
      {
        type: 'image',
        src: '/2022drawings/inpaintingflorashowcase.png',
        alt: 'Flora inpainting',
        width: 1200,
        height: 800,
      },
      {
        type: 'image',
        src: '/2022drawings/outpaint.png',
        alt: 'Flora outpainting',
        width: 1200,
        height: 800,
      },
      {
        type: 'image',
        src: '/2022drawings/cropping.png',
        alt: 'Flora cropping',
        width: 1200,
        height: 800,
      },
      {
        type: 'image',
        src: '/2022drawings/postinpaint.png',
        alt: 'Flora post inpaint',
        width: 1200,
        height: 800,
      },
      {
        type: 'image',
        src: '/2022drawings/postoutpaint.png',
        alt: 'Flora post outpaint',
        width: 1200,
        height: 800,
      },
      {
        type: 'image',
        src: '/2022drawings/postcropping.png',
        alt: 'Flora post cropping',
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    id: 'aleksandra-michalska',
    kind: 'work',
    name: 'Aleksandra Michalska',
    subtext: 'portfolio',
    role: 'design + engineering',
    year: '2025',
    href: 'https://aleksandramichalska.com',
    external: true,
    description: 'Portfolio site for Aleksandra Michalska, an artist I deeply admire.',
    tags: 'web, design, engineering',
    media: [],
  },
  {
    id: 'arenadock',
    kind: 'work',
    name: 'Are.na Dock',
    role: 'creator',
    year: '2025',
    href: '/arenadock',
    external: false,
    description:
      'A small mac dock app for browsing and saving to your are.na channels without leaving the desktop.',
    tags: 'design, engineering',
    media: [
      {
        type: 'image',
        src: '/arenadock1.png',
        alt: 'ArenaDock app icon',
        width: 800,
        height: 800,
      },
      {
        type: 'image',
        src: '/arenadock2.png',
        alt: 'ArenaDock app interface',
        width: 800,
        height: 800,
      },
    ],
  },
  {
    id: 'halftone-svg',
    kind: 'tool',
    name: 'Halftone SVG (Figma plugin)',
    role: 'creator',
    year: '2026',
    href: 'https://www.figma.com/community/plugin/1622469816300993774/halftone-svg-turn-visuals-into-halftone-vectors',
    external: true,
    description:
      'Figma plugin that turns any visual into halftone vectors — adjustable grid, dot scale, and shape.',
    tags: 'design, engineering',
    media: [
      {
        type: 'image',
        src: '/halftonead.png',
        alt: 'Halftone SVG plugin promo',
        width: 1200,
        height: 801,
      },
      {
        type: 'video',
        src: '/halftone-demo.mp4',
        mime: 'video/mp4',
        fit: 'cover',
        caption: 'The plugin enables web developers to produce animations like this one.',
      },
    ],
  },
  {
    id: 'sunlight-drop',
    kind: 'tool',
    name: 'Sunlight Drop',
    role: 'creator',
    year: '2025',
    href: '/design-experiments/sunlight-drop',
    external: false,
    description: 'A small tool for generating window-shadow / sunlight overlays for backgrounds.',
    tags: 'design, engineering',
    media: [
      {
        type: 'image',
        src: '/sunlight-drop-demo.png',
        alt: 'Sunlight Drop tool demo',
        width: 800,
        height: 900,
      },
    ],
  },
  {
    id: 'grid-animator',
    kind: 'tool',
    name: 'Grid Animator',
    role: 'creator',
    year: '2025',
    href: 'https://tools.filipwojda.com/grid-animator',
    external: true,
    description:
      'A tool for designing and exporting animated grid compositions with per-cell easing.',
    tags: 'design, engineering',
    media: [
      {
        type: 'video',
        src: 'https://bkjyaeduksegxtarnyzz.supabase.co/storage/v1/object/public/public-assets/grid-animator/demo.mp4',
        mime: 'video/mp4',
      },
    ],
  },
  {
    id: 'ekran',
    kind: 'work',
    name: 'Ekran',
    role: 'creator',
    year: '2024',
    href: 'https://www.ekran.ai',
    external: true,
    description:
      'Video editor with a chat. reads transcripts, visually annotates videos + performs vector search.',
    tags: 'web, engineering',
    media: [],
    defunct: true,
  },
  {
    id: 'makeklips',
    kind: 'work',
    name: 'makeklips.ai',
    role: 'creator',
    year: '2023',
    href: 'https://www.makeklips.ai',
    external: true,
    description: 'AI shorts generator.',
    tags: 'web, engineering',
    media: [],
    defunct: true,
  },
  {
    id: 'paysponge',
    kind: 'work',
    name: 'paysponge.com merch',
    role: 'creator',
    year: '2025',
    href: 'https://paysponge.com',
    external: true,
    description: 'A small merch line built around the paysponge mascot.',
    tags: 'design',
    media: [
      {
        type: 'image',
        src: 'https://bkjyaeduksegxtarnyzz.supabase.co/storage/v1/object/public/public-assets/sponge/sponge1.png',
        alt: 'Sponge credit card merch design',
        width: 600,
        height: 375,
      },
      {
        type: 'image',
        src: 'https://bkjyaeduksegxtarnyzz.supabase.co/storage/v1/object/public/public-assets/sponge/sponge2.png',
        alt: 'Sponge shirt back design',
        width: 600,
        height: 250,
      },
    ],
  },
];
