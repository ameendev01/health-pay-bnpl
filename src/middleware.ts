import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Simple allowlist for safe in-app redirects to mitigate open redirect
const ALLOWED_REDIRECTS = [
  "/dashboard",
  "/patients",
  "/claims",
  "/clinics",
  "/settings",
  "/payments",
  "/onboarding",
];

function isValidRedirect(to: string | null | undefined): boolean {
  if (!to) return false;
  try {
    // Support relative paths only; absolute URLs are rejected
    const url = new URL(to, "http://localhost");
    return to.startsWith("/") && ALLOWED_REDIRECTS.some((p) => url.pathname.startsWith(p));
  } catch {
    return false;
  }
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