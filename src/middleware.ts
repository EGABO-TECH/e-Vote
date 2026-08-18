import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sso-callback(.*)',
  '/api/webhooks(.*)',
]);

const ROLE_ROUTES: Record<string, string> = {
  voter: '/voter',
  candidate: '/candidate',
  ec: '/ec',
  admin: '/admin',
  auditor: '/auditor',
};

const PROTECTED_PREFIXES: { prefix: string; roles: string[] }[] = [
  { prefix: '/voter', roles: ['voter'] },
  { prefix: '/candidate', roles: ['candidate'] },
  { prefix: '/ec', roles: ['ec', 'admin'] },
  { prefix: '/admin', roles: ['admin'] },
  { prefix: '/auditor', roles: ['admin', 'auditor'] },
];

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;

  const authObj = await auth.protect();
  const { userId, orgRole } = authObj;
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/dashboard')) return;

  let role: string | undefined;
  type SessionClaims = {
    publicMetadata?: { role?: string };
    metadata?: { role?: string };
  };
  const sessionClaims = authObj.sessionClaims as SessionClaims | undefined;

  if (sessionClaims?.publicMetadata?.role || sessionClaims?.metadata?.role) {
    role = sessionClaims.publicMetadata?.role || sessionClaims.metadata?.role;
  }

  if (!role && process.env.CLERK_SECRET_KEY && userId) {
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
    role = orgRole.replace('org:', '');
  }

  if (!role) {
    role = 'voter';
  }

  const matched = PROTECTED_PREFIXES.find(({ prefix }) => pathname.startsWith(prefix));

  if (matched && !matched.roles.includes(role)) {
    const destination = ROLE_ROUTES[role] ?? '/dashboard';
    return NextResponse.redirect(new URL(destination, req.url));
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/((?!_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt).*)',
  ],
};
