# Fashion Show Soundtracks lab page

Route: `app/(main)/lab/fashion-show-soundtracks/page.tsx`
Data: `app/(main)/lab/fashion-show-soundtracks/_lib/data.ts`

## There is no static data file

All show/brand/director data comes from a **live Supabase query** against the
`show_curator` schema (`jobs`, `creative_director_tenures`, `aggregated_playlists`
tables) — read via `SUPABASE_URL`/`SUPABASE_ANON_KEY` in `.env.local`. The
Supabase project itself is managed entirely outside this repo (no admin UI,
seed script, or migration file lives here). The page is ISR-cached, so the
query runs roughly once per revalidation, not per request.

## Gotcha: RLS hides unpublished shows

The anon key is scoped by RLS to only return **published + completed** rows
(see comment at top of `data.ts`). Adding a row to `show_curator.jobs`
elsewhere does **not** make it appear on the page until it's marked
published/completed in the source system — a brand-new brand can be totally
invisible here even though the row exists, with no error surfaced (the fetch
just returns fewer rows).

## Gotcha: display order is a hardcoded list, not insertion/DB order

Sort order is fully computed in `getArchive()`, not by DB row order:

- Shows within a director: newest `seasonYear` first.
- Directors within a brand: most recent tenure `start_year` first.
- **Brands: the `BRAND_ORDER` constant** in `data.ts`. Anything not in that
  array falls to the end, alphabetically by brand name.

To pin a new brand to a specific position (e.g. "put it at the top"), add its
`brand_slug` to `BRAND_ORDER` — there's no other mechanism. `indexOf` match
is case-sensitive and exact, so the slug must match the DB value exactly.

## Gotcha: accented brand names don't slugify the way you'd guess

The show-curator ingest pipeline's slugifier does not transliterate
diacritics to their base letter — it just collapses each non-ASCII char to a
hyphen. So "Enfants Riches Déprimés" became `brand_slug =
"enfants-riches-d-prim-s"`, not the `enfants-riches-deprimes` you'd expect
from other brands' clean kebab-case slugs (`isabel-marant`, `saint-laurent`,
which have no accents to begin with). Always confirm the real `brand_slug`
by querying the DB (or the anon REST endpoint) rather than hand-guessing it
for any brand with accented characters.

## Assets

Brand logos are optional: `public/fashion-show-soundtracks/logos/<brand-slug>.png`,
registered manually in `_components/brand-logo.tsx`'s `LOGOS` map with a
per-logo Tailwind height (single-line wordmarks read larger than two-line
lockups at equal height, so heights are hand-tuned, not uniform). Brands
without a logo entry fall back to a plain uppercase text header — no error,
nothing required to add a new brand without a logo yet.
