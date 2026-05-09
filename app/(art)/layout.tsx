import { PageShell } from '../(main)/_components/page-shell';

export default function ArtLayout({ children }: { children: React.ReactNode }) {
  return <PageShell>{children}</PageShell>;
}
