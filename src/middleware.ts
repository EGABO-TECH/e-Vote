import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
]);

// Role -> allowed route prefixes
const ROLE_ROUTES: Record<string, string> = {
  voter: '/voter',
  candidate: '/candidate',
  ec: '/ec',
  admin: '/admin',
  auditor: '/auditor',
};

// Protected route prefixes and which roles can access them
const PROTECTED_PREFIXES: { prefix: string; roles: string[] }[] = [
  { prefix: '/voter', roles: ['voter'] },
  { prefix: '/candidate', roles: ['candidate'] },
  { prefix: '/ec', roles: ['ec'] },
  { prefix: '/admin', roles: ['admin'] },
  { prefix: '/auditor', roles: ['admin', 'auditor'] },
];

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;

  // Protect all non-public routes (redirects to sign-in if not authenticated)
  const authObj = await auth.protect();
  
  const { userId, orgRole } = authObj;

  const pathname = req.nextUrl.pathname;

  // Skip role checks for the /dashboard route (it is the role router itself)
  if (pathname.startsWith('/dashboard')) return;

  let role: string | undefined;

  // Try to get role from sessionClaims first (if configured in Clerk dashboard)
  const sessionClaims = authObj.sessionClaims as any;
  if (sessionClaims?.publicMetadata?.role || sessionClaims?.metadata?.role) {
    role = sessionClaims.publicMetadata?.role || sessionClaims.metadata?.role;
  }

  // Fallback to fetching user via Clerk REST API because clerkClient() isn't supported in Edge Middleware
  if (!role && process.env.CLERK_SECRET_KEY) {
    try {
      const res = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      });
      if (res.ok) {
        const user = await res.json();
        role = user?.public_metadata?.role;
      }
    } catch (error) {
      console.error('Error fetching user from Clerk API in middleware:', error);
    }
  }

  if (!role && orgRole && orgRole.startsWith('org:')) {
    role = orgRole.replace('org:', ''); // e.g. org:admin -> admin
  }
  
  // Default fresh accounts to 'voter' if they have no role
  if (!role) {
    role = 'voter';
  }

  // Check if the user is trying to access a portal they don't belong to
  const matched = PROTECTED_PREFIXES.find(({ prefix }) =>
    pathname.startsWith(prefix)
  );
  if (matched && !matched.roles.includes(role)) {
    const destination = ROLE_ROUTES[role] ?? '/dashboard';
    return NextResponse.redirect(new URL(destination, req.url));
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
