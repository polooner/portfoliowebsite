'use client';

import { useEffect, useRef, useState } from 'react';

type Brand = { name: string; slug: string };

// The archive itself is server-rendered; this island only owns the BRANDS jump menu and the
// search filter, which hides/shows the existing DOM via data attributes — nothing from the
// dataset is duplicated into the client bundle.
export function HeaderNav({ brands }: { brands: Brand[] }) {
  const [query, setQuery] = useState('');
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const active = tokens.length > 0;
    document.querySelectorAll<HTMLElement>('[data-row]').forEach((row) => {
      row.hidden = active && !tokens.every((t) => (row.dataset.q ?? '').includes(t));
    });
    document.querySelectorAll<HTMLElement>('[data-director]').forEach((el) => {
      el.hidden = active && !el.querySelector('[data-row]:not([hidden])');
    });
    document.querySelectorAll<HTMLElement>('[data-brand-section]').forEach((el) => {
      el.hidden = active && !el.querySelector('[data-director]:not([hidden])');
    });
    const empty = document.getElementById('archive-empty');
    if (empty) empty.hidden = !active || !!document.querySelector('[data-row]:not([hidden])');
  }, [query]);

  useEffect(() => {
    if (!brandsOpen) return;
    const close = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setBrandsOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [brandsOpen]);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  return (
    <nav className="flex items-center gap-5 sm:gap-7 text-[11px] font-bold uppercase tracking-[0.14em]">
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setBrandsOpen((open) => !open)}
          aria-expanded={brandsOpen}
          className={`${brandsOpen ? 'text-black' : 'text-neutral-400'} uppercase tracking-[0.14em] transition-colors hover:text-black`}
        >
          Brands
        </button>
        {brandsOpen && (
          <div className="absolute right-0 top-full z-20 mt-3 flex min-w-44 flex-col items-start gap-2.5 border border-black/10 bg-white p-4 shadow-sm">
            {brands.map((brand) => (
              <a
                key={brand.slug}
                href={`#${brand.slug}`}
                onClick={() => setBrandsOpen(false)}
                className="whitespace-nowrap text-neutral-500 transition-colors hover:text-black"
              >
                {brand.name}
              </a>
            ))}
          </div>
        )}
      </div>

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
            className="mr-3 w-32 border-b border-black bg-transparent pb-0.5 text-[11px] font-bold uppercase tracking-[0.14em] placeholder:text-neutral-300 focus:outline-none sm:w-52"
          />
        )}
        <button
          type="button"
          onClick={() => {
            if (searchOpen) setQuery('');
            setSearchOpen((open) => !open);
          }}
          aria-expanded={searchOpen}
          className={`${searchOpen ? 'text-black' : 'text-neutral-400'} uppercase tracking-[0.14em] transition-colors hover:text-black`}
        >
          Search
        </button>
      </div>
    </nav>
  );
}
