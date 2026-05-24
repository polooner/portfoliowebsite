import { SiteContact } from './site-contact';
import { SiteHeader } from './site-header';
import { SiteNav } from './site-nav';

type Props = {
  children: React.ReactNode;
  sidebarExtra?: React.ReactNode;
};

export function CenteredShell({ children, sidebarExtra }: Props) {
  return (
    <div className="min-h-screen w-full text-sm text-black">
      <aside className="flex flex-col gap-8 uppercase px-8 pt-8 md:p-0 md:fixed md:top-8 md:left-8 md:z-10 md:max-h-[calc(100vh-4rem)] md:overflow-y-auto">
        <SiteHeader />
        <SiteNav />
        {sidebarExtra}
        <SiteContact />
      </aside>
      <main className="w-full max-w-[800px] mx-auto px-8 py-8">
        {children}
      </main>
    </div>
  );
}
