import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10 w-full">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block py-8 pl-4">
          <ScrollArea>
            <div style={{ minWidth: "100%", display: "table" }}>
              <div className="w-full pb-20">
                <Link
                  href="/ui/landing-page-headings"
                  className="flex items-center gap-2 underline"
                >
                  landing page headings
                </Link>
                <div className="pb-4"></div>
              </div>
            </div>
          </ScrollArea>
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px] w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
