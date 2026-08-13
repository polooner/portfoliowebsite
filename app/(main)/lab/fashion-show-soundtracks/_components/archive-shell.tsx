'use client';

import { useEffect, useRef, useState } from 'react';

type Brand = { name: string; slug: string };

const ALL_BRANDS = 'all';

// The archive itself is server-rendered; this island only owns the sidebar brand filter and the
// search box, which hide/show the existing DOM via data attributes — nothing from the dataset is
// duplicated into the client bundle, and no list re-rendering happens on every keystroke/click.
export function ArchiveShell({ brands, children }: { brands: Brand[]; children: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const [activeBrand, setActiveBrand] = useState(ALL_BRANDS);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const searchActive = tokens.length > 0;

    document.querySelectorAll<HTMLElement>('[data-row]').forEach((row) => {
      const brandOk = activeBrand === ALL_BRANDS || row.dataset.brand === activeBrand;
      const searchOk = !searchActive || tokens.every((t) => (row.dataset.q ?? '').includes(t));
      row.hidden = !(brandOk && searchOk);
    });
    document.querySelectorAll<HTMLElement>('[data-director]').forEach((director) => {
      director.hidden = !director.querySelector('[data-row]:not([hidden])');
    });
    document.querySelectorAll<HTMLElement>('[data-brand-section]').forEach((section) => {
      section.hidden = !section.querySelector('[data-director]:not([hidden])');
    });
    const empty = document.getElementById('archive-empty');
    if (empty) empty.hidden = !!document.querySelector('[data-row]:not([hidden])');
  }, [query, activeBrand]);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  return (
    <>
      <header className="sticky top-0 z-10 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="text-[13px] font-normal uppercase tracking-[0.14em]">
            Runway Soundtracks
          </a>
          <div className="flex items-center">
            {searchOpen && (
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    setQuery('');
                    setSearchOpen(false);
                  }
                }}
                placeholder="BRAND, DIRECTOR, SEASON"
                aria-label="Search the archive"
                className="mr-3 w-32 border-b border-black bg-transparent pb-0.5 text-[11px] font-normal uppercase tracking-[0.14em] placeholder:text-neutral-300 focus:outline-none sm:w-52"
              />
            )}
            <button
              type="button"
              onClick={() => {
                if (searchOpen) setQuery('');
                setSearchOpen((open) => !open);
              }}
              aria-expanded={searchOpen}
              className={`${searchOpen ? 'text-black' : 'text-neutral-400'} text-[11px] font-normal uppercase tracking-[0.14em] transition-colors hover:text-black`}
            >
              Search
            </button>
          </div>
        </div>
      </header>

      <div id="top" className="mx-auto flex max-w-6xl gap-6 px-5 pb-32 md:gap-10 md:px-8">
        <aside className="w-20 shrink-0 pt-16 sm:w-28 md:w-36 md:pt-20">
          <nav aria-label="Filter by brand" className="sticky top-20 flex flex-col items-start gap-2.5">
            <button
              type="button"
              onClick={() => setActiveBrand(ALL_BRANDS)}
              aria-pressed={activeBrand === ALL_BRANDS}
              className={`${activeBrand === ALL_BRANDS ? 'text-black' : 'text-neutral-400'} text-[9px] font-normal uppercase tracking-[0.1em] transition-colors hover:text-black md:text-[10px]`}
            >
              All
            </button>
            {brands.map((brand) => (
              <button
                key={brand.slug}
                type="button"
                onClick={() => setActiveBrand(brand.slug)}
                aria-pressed={activeBrand === brand.slug}
                className={`${activeBrand === brand.slug ? 'text-black' : 'text-neutral-400'} text-left text-[9px] font-normal uppercase leading-snug tracking-[0.1em] transition-colors hover:text-black md:text-[10px]`}
              >
                {brand.name}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </>
  );
}
