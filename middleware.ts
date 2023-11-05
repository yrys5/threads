import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  debug: true,
  authorizedParties: ["https://www.thrinks.com", "http://localhost:3000"],
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-in(.*)",
    "/sign-up",
    "/sign-up(.*)",
    "/search",
    "/api/webhook/clerk",
    "/profile/user(.*)",
    "/thread/(.*)",
    "/sitemap"
  ],
  ignoredRoutes: ["/api/webhook/clerk", "/", "/profile"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
