import type { Metadata } from 'next';

import { BrandLogo } from './_components/brand-logo';
import { HeaderNav } from './_components/header-nav';
import { getArchive } from './_lib/data';

// ISR: visitors get CDN-cached static HTML; the Supabase queries run once an hour at most.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Runway Archive — Fashion Show Soundtracks',
  description:
    'Every runway show soundtrack, brand by brand: per-show Spotify playlists and full creative-director tenure playlists.',
};

// The archive deliberately drops the site font for the flat Helvetica of the design.
const FONT_STACK = "'Helvetica Neue', Helvetica, Arial, sans-serif";

export default async function Page() {
  const archive = await getArchive();

  return (
    <div className="min-h-screen bg-white text-black tracking-normal" style={{ fontFamily: FONT_STACK }}>
      <header className="sticky top-0 z-10 border-b border-black/10 bg-white">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="text-[13px] font-extrabold uppercase tracking-[0.02em]">
            Runway Archive
          </a>
          <HeaderNav brands={(archive ?? []).map((b) => ({ name: b.brand.toUpperCase(), slug: b.slug }))} />
        </div>
      </header>

      <main id="top" className="mx-auto max-w-5xl px-5 pb-32 md:px-8">
        {archive === null || archive.length === 0 ? (
          <p className="pt-32 text-[13px] font-bold uppercase tracking-[0.14em] text-neutral-400">
            The archive is being assembled — check back soon.
          </p>
        ) : (
          <>
            {archive.map((brand, index) => (
              <section key={brand.slug} id={brand.slug} data-brand-section className="scroll-mt-20 pt-20 md:pt-28">
                <h2 className="m-0">
                  <BrandLogo slug={brand.slug} name={brand.brand} priority={index === 0} />
                </h2>

                {brand.directors.map((director) => (
                  <div key={director.directorSlug || 'unattributed'} data-director className="mt-14 md:mt-20">
                    {director.director && (
                      <div>
                        <p className="m-0 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                          Creative Director{director.years ? ` ${director.years}` : ''}
                        </p>
                        <div className="mt-1 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                          <h3 className="m-0 text-[clamp(2.25rem,7vw,4.75rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-neutral-400">
                            {director.director}
                          </h3>
                          {director.tenurePlaylistUrl && (
                            <a
                              href={director.tenurePlaylistUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400 transition-colors hover:text-black"
                            >
                              Full Tenure Playlist →
                            </a>
                          )}
                        </div>
                        {director.note && (
                          <p className="m-0 mt-3 max-w-xl text-[12px] leading-relaxed text-neutral-400">
                            {director.note}
                          </p>
                        )}
                      </div>
                    )}

                    <ul className="m-0 mt-8 list-none p-0 md:mt-10">
                      {director.shows.map((show) => (
                        <li
                          key={show.id}
                          data-row
                          data-q={`${brand.brand} ${director.director ?? ''} ${show.label}`.toLowerCase()}
                          className="py-3.5"
                        >
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="text-[15px] font-bold uppercase tracking-[0.01em]">{show.label}</span>
                            {show.spotifyUrl && (
                              <a
                                href={show.spotifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${brand.brand} ${show.label} playlist on Spotify`}
                                className="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400 transition-colors hover:text-black"
                              >
                                Spotify →
                              </a>
                            )}
                          </div>
                          {(show.musicLine || show.editorialNote) && (
                            <div className="mt-1 text-[11px] leading-relaxed text-neutral-400">
                              {show.musicLine}
                              {show.musicLine && show.youtubeUrl && (
                                <>
                                  {' · '}
                                  <a
                                    href={show.youtubeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-colors hover:text-black"
                                  >
                                    YouTube →
                                  </a>
                                </>
                              )}
                              {show.musicLine && show.editorialNote && <br />}
                              {show.editorialNote}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            ))}

            <p id="archive-empty" hidden className="pt-24 text-[13px] font-bold uppercase tracking-[0.14em] text-neutral-400">
              No results.
            </p>

            <footer className="mt-28 border-t border-black/10 pt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-300">
              <a href="https://filipwojda.com" className="transition-colors hover:text-black">
                filipwojda.com
              </a>
            </footer>
          </>
        )}
      </main>
    </div>
  );
}
