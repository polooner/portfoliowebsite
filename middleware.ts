import { NextRequest, NextResponse } from "next/server";

import {
  PRODUCTION_DOMAIN,
  SUBDOMAIN_ROUTE_MAP,
} from "@/config/domains";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // Skip subdomain logic in development
  if (!hostname.includes(PRODUCTION_DOMAIN)) {
    return NextResponse.next();
  }

  // Extract subdomain (e.g., "lab" from "lab.filipwojda.com")
  const subdomain = hostname.replace(`.${PRODUCTION_DOMAIN}`, "");
  const routePrefix = SUBDOMAIN_ROUTE_MAP[subdomain];

  if (routePrefix) {
    // On subdomain: strip route prefix to avoid double-nesting
    // e.g., lab.filipwojda.com/lab/foo → lab.filipwojda.com/foo
    if (pathname === routePrefix || pathname.startsWith(`${routePrefix}/`)) {
      const newPath = pathname.slice(routePrefix.length) || "/";
      return NextResponse.redirect(new URL(newPath, request.url));
    }

    // On subdomain: rewrite by prepending route prefix
    // e.g., lab.filipwojda.com/ → serves /lab internally
    // e.g., lab.filipwojda.com/foo → serves /lab/foo internally
    return NextResponse.rewrite(
      new URL(`${routePrefix}${pathname}`, request.url)
    );
  }

  // On main domain: redirect route-prefix paths to their subdomain
  // e.g., filipwojda.com/lab/foo → lab.filipwojda.com/foo (301 for SEO)
  for (const [sub, prefix] of Object.entries(SUBDOMAIN_ROUTE_MAP)) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      const newPath = pathname.slice(prefix.length) || "/";
      const url = new URL(newPath, request.url);
      url.host = `${sub}.${PRODUCTION_DOMAIN}`;
      return NextResponse.redirect(url, 301);
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
