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

export const proxy = clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;

  // Protect all non-public routes (redirects to sign-in if not authenticated)
  const authObj = await auth.protect();
  
  const { sessionClaims, orgRole } = authObj;

  const pathname = req.nextUrl.pathname;

  // Skip role checks for the /dashboard route (it is the role router itself)
  if (pathname.startsWith('/dashboard')) return;

  // Try to get role from publicMetadata first, fallback to stripping 'org:' from orgRole if present
  let role = (sessionClaims?.publicMetadata as Record<string, string> | undefined)?.role ?? '';
  
  if (!role && orgRole && orgRole.startsWith('org:')) {
    role = orgRole.replace('org:', ''); // e.g. org:admin -> admin
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
