import { SiteContact } from './site-contact';
import { SiteHeader } from './site-header';
import { SiteNav } from './site-nav';

type Props = {
  children: React.ReactNode;
  sidebarExtra?: React.ReactNode;
};

export function PageShell({ children, sidebarExtra }: Props) {
  return (
    <div className="min-h-screen w-full px-8 py-8 text-sm text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <aside className="flex flex-col gap-8 md:sticky md:top-8 md:h-[calc(100vh-4rem)] md:overflow-y-auto uppercase">
          <SiteHeader />
          <SiteNav />
          {sidebarExtra}
          <SiteContact />
        </aside>
        <section className="flex flex-col gap-8">{children}</section>
      </div>
    </div>
  );
}
