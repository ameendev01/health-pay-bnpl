// Central allowlist of safe in-app redirect prefixes
// Only relative paths starting with one of these prefixes are allowed
export const REDIRECT_ALLOWLIST: readonly string[] = [
  "/dashboard",
  "/patients",
  "/claims",
  "/clinics",
  "/settings",
  "/payments",
  "/onboarding",
] as const;

export function isAllowedRedirect(path: string): boolean {
  try {
    if (!path.startsWith("/")) return false;
    const parsed = new URL(path, "http://localhost");
    return REDIRECT_ALLOWLIST.some((p) => parsed.pathname.startsWith(p));
  } catch {
    return false;
  }
}
