# Subdomain routing middleware — architecture & gotchas

How `middleware.ts` + `config/domains.ts` map subdomains to route sections, and
the non-obvious Next.js behaviors discovered while fixing the "lab → writing 404"
(2026-07-19).

## Architecture

- `SUBDOMAIN_ROUTE_MAP` (`config/domains.ts`) maps subdomains to route prefixes:
  `lab.filipwojda.com` serves `/lab/*`, `tools.filipwojda.com` serves `/tools/*`.
- On a subdomain, the middleware rewrites every path by prepending the prefix
  (`lab.filipwojda.com/foo` → serves `/lab/foo` internally).
- On the apex domain in production, prefix paths 301 to their subdomain
  (`filipwojda.com/lab/foo` → `lab.filipwojda.com/foo`).
- Dev is testable via `*.localhost` (browsers resolve it natively; curl needs
  `--resolve lab.localhost:3000:127.0.0.1`).

## The bug this doc came from

The blanket prefix rewrite means any main-site link clicked while on a subdomain
404s: nav "writing" (`/blog`) on `lab.filipwojda.com` was rewritten to
`/lab/blog`, which doesn't exist.

Fix: `MAIN_SITE_SECTIONS` in `config/domains.ts` lists apex-owned top-level
sections. On a subdomain, those paths (and other subdomains' prefixes) redirect
to the apex domain in production, and serve directly in dev (see gotcha 2).

**Maintenance rule: when adding a new top-level section under `app/(main)/`,
add it to `MAIN_SITE_SECTIONS` — otherwise visitors clicking to it from a
subdomain get a 404.**

## Gotchas (verified empirically against `next dev`)

1. **`request.url` and `request.nextUrl` normalize the host in dev.** A request
   with `Host: lab.localhost:3000` still reports `http://localhost:3000/...` in
   both. Consequently `nextUrl.clone()` + `url.host = ...` can be a silent no-op.
   The `Host` header (`request.headers.get("host")`) is the only source of truth
   for subdomain detection — the middleware already relies on it.

2. **Next relativizes middleware redirect `Location` headers that match its
   normalized origin.** `NextResponse.redirect(new URL("http://localhost:3000/blog"))`
   emits `location: /blog`. On `lab.localhost` that relative redirect resolves
   back to the subdomain → infinite 307 loop. Cross-origin targets
   (e.g. `http://example.com/blog`, or `filipwojda.com` from `lab.filipwojda.com`
   in production) survive as absolute URLs. Hence the split behavior: redirect
   only in production, `NextResponse.next()` in dev.

3. **Known cosmetic quirk (unfixed):** on a subdomain, the nav's "home" link
   (`/`) stays on the subdomain root (serves lab again) and the nav highlights
   "home" while showing lab content. Fixing it needs host-aware nav links
   (hydration-safe host detection), which wasn't worth it yet.
