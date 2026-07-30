import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

// Role → portal redirect map
const ROLE_REDIRECT: Record<string, string> = {
  voter: '/voter',
  candidate: '/candidate/dashboard',
  ec: '/ec/dashboard',
  admin: '/admin',
  auditor: '/auditor',
};

export default async function DashboardPage() {
  const { userId, orgRole } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const user = await currentUser();
  
  // Get role from publicMetadata, fallback to stripping 'org:' from orgRole
  let role = (user?.publicMetadata?.role as string | undefined) ?? '';
  if (!role && orgRole && orgRole.startsWith('org:')) {
    role = orgRole.replace('org:', '');
  }

  // Redirect to the correct portal based on role
  if (role && ROLE_REDIRECT[role]) {
    redirect(ROLE_REDIRECT[role]);
  }

  // Fallback: no role assigned yet
  const firstName = user?.firstName ?? 'there';
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface)',
      fontFamily: 'var(--font-inter, Inter, sans-serif)',
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '480px',
        padding: '2.5rem',
        background: 'var(--surface-container-lowest)',
        borderRadius: '1.5rem',
        border: '1px solid var(--outline-variant)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}>
        <div style={{
          width: '56px', height: '56px',
          borderRadius: '50%',
          background: 'var(--primary-container)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--on-primary-container)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '0.5rem' }}>
          Hi, {firstName}
        </h1>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Your account does not have a role assigned yet. Please contact your system administrator to get access to the correct portal.
        </p>
        <a
          href="/sign-in"
          style={{
            display: 'inline-block',
            padding: '0.6rem 1.5rem',
            background: 'var(--primary)',
            color: 'var(--on-primary)',
            borderRadius: '0.75rem',
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',
          }}
        >
          Sign in with a different account
        </a>
      </div>
    </main>
  );
}
