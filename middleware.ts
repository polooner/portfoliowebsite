import { NextRequest, NextResponse } from "next/server";

import {
  MAIN_SITE_SECTIONS,
  PRODUCTION_DOMAIN,
  SUBDOMAIN_ROUTE_MAP,
} from "@/config/domains";

function pathIsInSection(pathname: string, section: string) {
  return pathname === section || pathname.startsWith(`${section}/`);
}

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;
  const host = hostname.split(":")[0];

  const isProduction =
    host === PRODUCTION_DOMAIN || host.endsWith(`.${PRODUCTION_DOMAIN}`);

  // Extract subdomain: "lab" from "lab.filipwojda.com", or from "lab.localhost"
  // so subdomains are testable in dev (browsers resolve *.localhost natively).
  const subdomain = isProduction
    ? host.slice(0, Math.max(0, host.length - PRODUCTION_DOMAIN.length - 1))
    : host.endsWith(".localhost")
      ? host.slice(0, -".localhost".length)
      : "";
  const routePrefix = SUBDOMAIN_ROUTE_MAP[subdomain];

  if (routePrefix) {
    // On subdomain: strip route prefix to avoid double-nesting
    // e.g., lab.filipwojda.com/lab/foo → lab.filipwojda.com/foo
    if (pathIsInSection(pathname, routePrefix)) {
      const newPath = pathname.slice(routePrefix.length) || "/";
      return NextResponse.redirect(new URL(newPath, request.url));
    }

    // On subdomain: paths owned by the main site (or another subdomain's
    // section) can't resolve under this prefix — rewriting them would 404.
    // In production, redirect to the apex domain, where the branch below
    // re-routes cross-subdomain paths: lab.filipwojda.com/blog → filipwojda.com/blog.
    // In dev, serve the path directly (dev normalizes the request origin to
    // localhost, which turns an apex redirect into a relative one and loops).
    const belongsElsewhere = [
      ...MAIN_SITE_SECTIONS,
      ...Object.values(SUBDOMAIN_ROUTE_MAP),
    ].some(
      (section) =>
        section !== routePrefix && pathIsInSection(pathname, section)
    );
    if (belongsElsewhere) {
      if (isProduction) {
        const url = new URL(
          `${request.nextUrl.protocol}//${PRODUCTION_DOMAIN}${pathname}${request.nextUrl.search}`
        );
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    // On subdomain: rewrite by prepending route prefix
    // e.g., lab.filipwojda.com/ → serves /lab internally
    // e.g., lab.filipwojda.com/foo → serves /lab/foo internally
    return NextResponse.rewrite(
      new URL(`${routePrefix}${pathname}`, request.url)
    );
  }

  // On main domain (production only): redirect route-prefix paths to their subdomain
  // e.g., filipwojda.com/lab/foo → lab.filipwojda.com/foo (301 for SEO).
  // In dev, localhost:3000/lab/foo keeps serving directly.
  if (isProduction) {
    for (const [sub, prefix] of Object.entries(SUBDOMAIN_ROUTE_MAP)) {
      if (pathIsInSection(pathname, prefix)) {
        const newPath = pathname.slice(prefix.length) || "/";
        const url = new URL(newPath, request.url);
        url.host = `${sub}.${PRODUCTION_DOMAIN}`;
        return NextResponse.redirect(url, 301);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals, API routes, and static files
    "/((?!_next|api|favicon.ico|.*\\..*).*)",
  ],
};
