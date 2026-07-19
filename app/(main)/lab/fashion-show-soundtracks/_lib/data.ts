import { createClient } from "@supabase/supabase-js";

// Read-only view over show-curator's Supabase Data API (anon key, column-scoped grants + forced
// RLS: only published+completed shows and seeded tenure playlists are readable at all).
// The page is ISR-cached, so these queries run ~once per revalidation, not per visitor.

export type ShowRow = {
  id: string;
  label: string; // "FW25 WOMEN'S", "FW18 DEBUT"
  seasonYear: number | null;
  spotifyUrl: string | null; // only set when the playlist is posted (public)
  youtubeUrl: string | null;
  musicLine: string | null; // "Commissioned score — not on Spotify · <note>"
  editorialNote: string | null;
};

export type DirectorSection = {
  director: string | null; // null = shows with no resolvable director
  directorSlug: string;
  years: string | null; // "2018–2025", "2002–", "2005"
  note: string | null; // tenure notes
  tenurePlaylistUrl: string | null; // "FULL TENURE PLAYLIST ↗"
  shows: ShowRow[];
};

export type BrandSection = {
  brand: string;
  slug: string;
  directors: DirectorSection[];
};

type JobRow = {
  id: string;
  brand: string | null;
  brand_slug: string | null;
  season: string | null;
  season_year: number | null;
  creative_director: string | null;
  creative_director_slug: string | null;
  title: string | null;
  custom_title: string | null;
  published_at: string | null;
  playlist_url: string | null;
  apple_playlist_url: string | null;
  playlist_public: boolean | null;
  url: string | null;
  metadata: Record<string, unknown> | null;
};

type TenureRow = {
  brand_slug: string;
  director: string;
  director_slug: string;
  line: "house" | "women" | "men";
  start_year: number;
  end_year: number | null;
  start_season: string | null;
  end_season: string | null;
  notes: string | null;
};

type AggregateRow = {
  name: string;
  playlist_url: string | null;
  apple_playlist_url: string | null;
  seed_key: string;
  metadata: Record<string, unknown> | null;
};

const JOB_COLS =
  "id, brand, brand_slug, season, season_year, creative_director, creative_director_slug, " +
  "title, custom_title, published_at, playlist_url, apple_playlist_url, playlist_public, url, metadata";

const TENURE_COLS =
  "brand_slug, director, director_slug, line, start_year, end_year, start_season, end_season, notes";

const AGGREGATE_COLS = "name, playlist_url, apple_playlist_url, seed_key, metadata";

// Vocab from show-curator's jobs.metadata.musicStatus (db/09). Statuses without an entry
// (RECOGNIZED, DOWNLOAD_FAILED, RESEARCH_PENDING) are internal states and render nothing.
const MUSIC_STATUS_LABELS: Record<string, string> = {
  CUSTOM_SCORE: "Commissioned score — not on Spotify",
  CUSTOM_MIX: "Custom mix — not on Spotify",
  LIVE: "Live performance — not on Spotify",
  SOUND_DESIGN: "Sound design — not on Spotify",
  COMMERCIAL_UNRECOGNIZED: "Not identified on Spotify",
};

// Brands render in this order; anything new lands after, alphabetically.
const BRAND_ORDER = [
  "celine",
  "saint-laurent",
  "rick-owens",
  "balmain",
  "isabel-marant",
  "gucci",
  "dior",
  "maison-margiela",
];

// PostgREST caps responses at 1000 rows; page through so a growing archive never truncates.
async function fetchAll<T>(
  query: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
): Promise<T[]> {
  const PAGE = 1000;
  const all: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await query(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    all.push(...(data ?? []));
    if (!data || data.length < PAGE) return all;
  }
}

// ── Effective creative director: TS port of show-curator's jobs_with_director view ──
// (db/06_creative_director_tenures.sql). The per-show value wins; else brand+year tenure,
// preferring house/matching-line rows, then the narrower span, then the most recent start.

function deriveLine(job: JobRow): "women" | "men" | "house" {
  const name = job.custom_title || job.title || "";
  if (/\bwomen/i.test(name)) return "women"; // women first — "Women's" contains "men"
  if (/\bmen/i.test(name)) return "men";
  return "house";
}

function resolveDirector(job: JobRow, tenures: TenureRow[]): { name: string; slug: string } | null {
  if (job.creative_director && job.creative_director_slug) {
    return { name: job.creative_director, slug: job.creative_director_slug };
  }
  if (!job.brand_slug || job.season_year == null) return null;
  const line = deriveLine(job);
  const candidates = tenures
    .filter(
      (t) =>
        t.brand_slug === job.brand_slug &&
        job.season_year! >= t.start_year &&
        job.season_year! <= (t.end_year ?? 9999),
    )
    .sort((a, b) => {
      const pref = (t: TenureRow) => (t.line === "house" || t.line === line ? 0 : 1);
      const span = (t: TenureRow) => (t.end_year ?? 9999) - t.start_year;
      return pref(a) - pref(b) || span(a) - span(b) || b.start_year - a.start_year;
    });
  const hit = candidates[0];
  return hit ? { name: hit.director, slug: hit.director_slug } : null;
}

// Row label from the canonical custom_title ("BRAND SEASON [LINE] RUNWAY" → "SEASON [LINE]").
function rowLabel(job: JobRow): string {
  const name = (job.custom_title || job.title || "").toUpperCase().trim();
  const brand = (job.brand || "").toUpperCase().trim();
  let label = name;
  if (brand && label.startsWith(`${brand} `)) label = label.slice(brand.length + 1);
  label = label.replace(/\s*RUNWAY\s*$/, "").trim();
  if (!label) {
    const line = deriveLine(job);
    label = [job.season?.toUpperCase(), line === "house" ? null : `${line.toUpperCase()}'S`]
      .filter(Boolean)
      .join(" ");
  }
  return label;
}

function tenureYears(rows: TenureRow[], shows: JobRow[]): string | null {
  if (rows.length > 0) {
    const start = Math.min(...rows.map((t) => t.start_year));
    const open = rows.some((t) => t.end_year == null);
    if (open) return `${start}–`;
    const end = Math.max(...rows.map((t) => t.end_year!));
    return end === start ? `${start}` : `${start}–${end}`;
  }
  const years = shows.map((s) => s.season_year).filter((y): y is number => y != null);
  if (years.length === 0) return null;
  const start = Math.min(...years);
  const end = Math.max(...years);
  return end === start ? `${start}` : `${start}–${end}`;
}

function toShowRow(job: JobRow): ShowRow | null {
  const meta = job.metadata ?? {};
  const status = typeof meta.musicStatus === "string" ? meta.musicStatus : null;
  const musicNote = typeof meta.musicNote === "string" && meta.musicNote.trim() ? meta.musicNote.trim() : null;
  const editorialNote =
    typeof meta.editorialNote === "string" && meta.editorialNote.trim() ? meta.editorialNote.trim() : null;

  const spotifyUrl = job.playlist_url && job.playlist_public ? job.playlist_url : null;
  const statusLabel = status ? (MUSIC_STATUS_LABELS[status] ?? null) : null;
  const musicLine = statusLabel ? [statusLabel, musicNote].filter(Boolean).join(" · ") : null;

  // A row earns its place with a posted playlist or a music-provenance story; otherwise it's
  // simply not ready for the public archive yet.
  if (!spotifyUrl && !musicLine) return null;

  return {
    id: job.id,
    label: rowLabel(job),
    seasonYear: job.season_year,
    spotifyUrl,
    youtubeUrl: !spotifyUrl && musicLine ? job.url : null,
    musicLine,
    editorialNote,
  };
}

export async function getArchive(): Promise<BrandSection[] | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const db = createClient(url, key, {
    db: { schema: "show_curator" },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let jobs: JobRow[], tenures: TenureRow[], aggregates: AggregateRow[];
  try {
    [jobs, tenures, aggregates] = await Promise.all([
      fetchAll<JobRow>((from, to) => db.from("jobs").select(JOB_COLS).range(from, to).returns<JobRow[]>()),
      fetchAll<TenureRow>((from, to) =>
        db.from("creative_director_tenures").select(TENURE_COLS).range(from, to).returns<TenureRow[]>(),
      ),
      fetchAll<AggregateRow>((from, to) =>
        db
          .from("aggregated_playlists")
          .select(AGGREGATE_COLS)
          .like("seed_key", "tenure:%")
          .range(from, to)
          .returns<AggregateRow[]>(),
      ),
    ]);
  } catch (error) {
    // Grants/exposed-schema not applied yet, or transient API failure — render the shell, not a 500.
    console.error("[fashion-show-soundtracks] archive fetch failed:", error);
    return null;
  }

  const aggregateBySeedKey = new Map(aggregates.map((a) => [a.seed_key, a]));

  // brand slug → director slug → shows
  const brands = new Map<string, { brand: string; directors: Map<string, { name: string | null; jobs: JobRow[] }> }>();
  for (const job of jobs) {
    if (!job.brand || !job.brand_slug) continue;
    const director = resolveDirector(job, tenures);
    let entry = brands.get(job.brand_slug);
    if (!entry) {
      entry = { brand: job.brand, directors: new Map() };
      brands.set(job.brand_slug, entry);
    }
    const slug = director?.slug ?? "";
    let section = entry.directors.get(slug);
    if (!section) {
      section = { name: director?.name ?? null, jobs: [] };
      entry.directors.set(slug, section);
    }
    section.jobs.push(job);
  }

  const sections: BrandSection[] = [];
  for (const [brandSlug, entry] of Array.from(brands.entries())) {
    const directors: DirectorSection[] = [];
    for (const [directorSlug, { name, jobs: directorJobs }] of Array.from(entry.directors.entries())) {
      const tenureRows = tenures.filter((t) => t.brand_slug === brandSlug && t.director_slug === directorSlug);
      const debutSeasons = new Set(
        tenureRows.map((t) => t.start_season).filter((s): s is string => s != null),
      );
      const pairs = directorJobs
        .map((job) => ({ job, row: toShowRow(job) }))
        .filter((pair): pair is { job: JobRow; row: ShowRow } => pair.row !== null);
      // DEBUT marks the tenure's opening season, but only where the label is unambiguous —
      // two distinct shows can normalize to the same season label (e.g. Celine Printemps +
      // Été 2026 → both "SS26 WOMEN'S"), and guessing which one opened the tenure would lie.
      for (const season of Array.from(debutSeasons)) {
        const inSeason = pairs.filter((pair) => pair.job.season === season);
        const labelCounts = new Map<string, number>();
        for (const pair of inSeason) labelCounts.set(pair.row.label, (labelCounts.get(pair.row.label) ?? 0) + 1);
        for (const pair of inSeason) {
          if (labelCounts.get(pair.row.label) === 1) pair.row.label = `${pair.row.label} DEBUT`;
        }
      }
      const shows = pairs
        .map((pair) => pair.row)
        .sort((a, b) => (b.seasonYear ?? 0) - (a.seasonYear ?? 0) || a.label.localeCompare(b.label));
      if (shows.length === 0) continue;

      const aggregate = aggregateBySeedKey.get(`tenure:${brandSlug}:${directorSlug}`);
      const aggregatePublic = aggregate?.metadata?.spotifyPublic === true;
      directors.push({
        director: name,
        directorSlug,
        years: tenureYears(tenureRows, directorJobs),
        note: tenureRows.map((t) => t.notes?.trim()).filter(Boolean).join(" · ") || null,
        tenurePlaylistUrl: aggregate?.playlist_url && aggregatePublic ? aggregate.playlist_url : null,
        shows,
      });
    }
    if (directors.length === 0) continue;

    // Current/most recent tenures first (start year desc; directors without tenure rows sort by
    // their newest show).
    const sortYear = (d: DirectorSection) => {
      const t = tenures.filter((r) => r.brand_slug === brandSlug && r.director_slug === d.directorSlug);
      if (t.length > 0) return Math.max(...t.map((r) => r.start_year));
      return Math.max(...d.shows.map((s) => s.seasonYear ?? 0));
    };
    directors.sort((a, b) => sortYear(b) - sortYear(a));

    sections.push({ brand: entry.brand, slug: brandSlug, directors });
  }

  sections.sort((a, b) => {
    const ai = BRAND_ORDER.indexOf(a.slug);
    const bi = BRAND_ORDER.indexOf(b.slug);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.brand.localeCompare(b.brand);
  });

  return sections;
}
