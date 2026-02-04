export interface CarouselLogo {
  id: string;
  label: string;
  path: string;
  invert?: boolean;
  sizeMultiplier?: number;
}

export const CAROUSEL_LOGOS: CarouselLogo[] = [
  { id: 'figma', label: 'Figma', path: '/logos/figmalogo.svg', sizeMultiplier: 0.7 },
  { id: 'claude', label: 'Claude', path: '/logos/claudelogo.svg' },
  { id: 'openai', label: 'OpenAI', path: '/logos/openailogo.svg', invert: true },
  { id: 'unicorn', label: 'Unicorn Studio', path: '/logos/unicornstudiologo.svg' },
  { id: 'cursor', label: 'Cursor', path: '/logos/cursorlogo.webp' },
  { id: 'linear', label: 'Linear', path: '/logos/linearlogo.webp', invert: true },
  { id: 'notion', label: 'Notion', path: '/logos/notionlogo.webp', invert: true },
  { id: 'rive', label: 'Rive', path: '/logos/riveapplogo.webp', invert: true },
  { id: 'affinity', label: 'Affinity', path: '/logos/affinitylogo.png' },
  { id: 'aws', label: 'AWS', path: '/logos/awslogo.png' },
  { id: 'cloudflare', label: 'Cloudflare', path: '/logos/cloudflarelogo.png' },
  { id: 'slack', label: 'Slack', path: '/logos/slacklogo.png' },
  { id: 'vercel', label: 'Vercel', path: '/logos/vercellogo.png', invert: true },
];
