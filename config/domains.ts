export const PRODUCTION_DOMAIN = "filipwojda.com";

/**
 * Maps subdomains to their corresponding route prefixes.
 * e.g., "lab" → lab.filipwojda.com serves content from /lab routes
 */
export const SUBDOMAIN_ROUTE_MAP: Record<string, string> = {
  lab: "/lab",
  tools: "/tools",
};

/**
 * Top-level sections served by the main domain. Requests for these paths on a
 * subdomain (e.g., lab.filipwojda.com/blog) redirect back to the apex domain
 * instead of being rewritten under the subdomain's route prefix, which would 404.
 */
export const MAIN_SITE_SECTIONS = [
  "/blog",
  "/projects",
  "/flora",
  "/arenadock",
  "/design-experiments",
];
