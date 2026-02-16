export const PRODUCTION_DOMAIN = "filipwojda.com";

/**
 * Maps subdomains to their corresponding route prefixes.
 * e.g., "lab" → lab.filipwojda.com serves content from /lab routes
 */
export const SUBDOMAIN_ROUTE_MAP: Record<string, string> = {
  lab: "/lab",
  tools: "/tools",
};
