import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { isAllowedRedirect } from "@/constants/redirectAllowlist";

function isValidRedirect(to: string | null | undefined): boolean {
  if (!to) return false;
  return isAllowedRedirect(to);
}

// Optional Upstash-based rate limiter: activates only if env is configured
let ratelimit: Ratelimit | null = null;
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, "10 s"),
      analytics: false,
    });
  }
} catch {
  // Fail open: do not crash middleware if Upstash misconfigured
  ratelimit = null;
}

// const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhooks(.*)",
  "/login(.*)",
  "/signup(.*)",
  "/verify-email(.*)",
  "/forgot-password(.*)",
]);

const isAuthRoute = createRouteMatcher([
  "/login(.*)",
  "/signup(.*)",
  "/verify-email(.*)",
  "/forgot-password(.*)",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  const { userId } = await auth();

  // Basic API rate limit (if enabled)
  if (ratelimit && req.nextUrl.pathname.startsWith("/api/")) {
    const ip =
      // Standard headers commonly set by reverse proxies
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      // Next.js request IP helper (may be undefined locally)
      (req as any).ip ||
      // Fallback to clientId if available or a static placeholder
      (await auth()).userId ||
      "127.0.0.1";
    const { success } = await ratelimit.limit(`api:${ip}`);
    if (!success) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }
  }

  // if (userId && isOnboardingRoute(req)) {
  //   return NextResponse.next();
  // }

  if (userId && isAuthRoute(req)) {
    const url = new URL(req.url);
    const requested = url.searchParams.get("redirect_url");
    const to = isValidRedirect(requested) ? requested! : "/dashboard";
    return NextResponse.redirect(new URL(to, req.url));
  }

  if (!userId && !isPublicRoute(req)) {
    const loginUrl = new URL("/login", req.url);
    // Only persist redirect if it's within allowlist
    const backTo = req.nextUrl.pathname + req.nextUrl.search;
    const safeBackTo = isValidRedirect(backTo) ? backTo : "/dashboard";
    loginUrl.searchParams.set("redirect_url", safeBackTo);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};