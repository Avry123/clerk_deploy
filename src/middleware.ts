import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/tracking_webhook/:partner",
  "/api/wallet/webhooks",
  "/api/shopify/orderUpdate",
   '/(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  // Extract userId for checking authenticated state
  const { userId } = await auth();

  // Redirect authenticated users away from auth routes
  if (userId && isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect unauthenticated users to the sign-in page for protected routes
  if (!userId && !isPublicRoute(req)) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

// Update the matcher configuration
export const config = {
  matcher: [
    // Protect all routes, including api/trpc
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};
