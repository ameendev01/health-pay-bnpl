import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/login(.*)",
  "/signup(.*)",
  "/",
  "/api/webhooks(.*)",
  "/verify-email(.*)",
  "/forgot-password(.*)"
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  const { userId } = await auth();

  // if (userId && isOnboardingRoute(req)) {
  //   return NextResponse.next();
  // }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req))
    return NextResponse.redirect(new URL("/login", req.url));

  // if (userId && !sessionClaims?.metadata?.onboardingComplete && req.nextUrl.pathname !== "/onboarding"){
  //   const onboardingUrl = new URL("/onboarding", req.url);
  //   return NextResponse.redirect(onboardingUrl);
  // }

  // If the user is logged in and the route is protected, let them view.
  if (userId && !isPublicRoute(req)) return NextResponse.next();

  // return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
