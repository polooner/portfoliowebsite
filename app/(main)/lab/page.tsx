import { StarReveal } from '@/app/(main)/lab/components/star-reveal';
import { TableSearchDemo } from '@/app/(main)/lab/components/landing-page-elements/table-search-demo';
import { LazyLabDemos } from '@/app/(main)/lab/components/lazy-lab-demos';
import { CenteredShell } from '@/app/(main)/_components/centered-shell';

export default function Page() {
  return (
    <CenteredShell>
      <div className="flex flex-col gap-20 max-w-full overflow-x-hidden">
        <TableSearchDemo />
        <StarReveal />
        <LazyLabDemos />
      </div>
    </CenteredShell>
  );
}
