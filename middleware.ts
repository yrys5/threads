// import { authMiddleware } from "@clerk/nextjs";

// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// // See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// export default authMiddleware({
//   debug: true,
//   publicRoutes: ["/","/sign-in", "/sign-up" ,"/api/webhook/clerk"],
//   ignoredRoutes: ["/api/webhook/clerk"],
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { authMiddleware } from "@clerk/nextjs";

const isGoogleBot = (userAgent) => {
  // Regular expression to check for Googlebot's User-Agent string
  return /Google-InspectionTool/.test(userAgent || '');
};

export default authMiddleware({
  beforeAuth: (req) => {
    // Check if the User-Agent is Googlebot and bypass auth if true
    if (isGoogleBot(req.headers["user-agent"])) {
      return Promise.resolve(); // Bypass authentication
    }
  },

  debug: true,
  publicRoutes: ["/", "/sign-in", "/sign-up", "/api/webhook/clerk"],
  ignoredRoutes: ["/api/webhook/clerk"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
