import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import AuditorDashboardClient from './AuditorDashboardClient';
import { ALLOWED_AUDITOR_ROLES, getAuditorDashboardData } from '@/lib/auditor';

export const metadata = {
  title: 'Auditor Dashboard | e-Vote',
};

export default async function AuditorPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const isBypass =
    (searchParams.bypass === 'true' || searchParams.mock === 'true') &&
    process.env.NODE_ENV === 'development';

  let hasAccess = false;

  if (isBypass) {
    hasAccess = true;
  } else {
    const { userId } = await auth();
    if (!userId) {
      redirect('/sign-in');
    }

    // Use Clerk REST API as the source of truth for roles (same as middleware)
    let role: string | undefined;
    try {
      const res = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
        cache: 'no-store',
      });
      if (res.ok) {
        const user = await res.json();
        role = user?.public_metadata?.role;
      }
    } catch {
      // fallback: deny access on error
    }

    if (role && ALLOWED_AUDITOR_ROLES.some((r) => r === role)) {
      hasAccess = true;
    }
  }

  if (!hasAccess) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--surface-2)' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh-md)', border: '1px solid var(--border)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(220,38,38,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <span className="material-symbols-outlined" style={{ color: '#DC2626', fontSize: '28px' }}>gpp_bad</span>
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-1)', marginBottom: '0.5rem' }}>Access Denied</h1>
          <p style={{ color: 'var(--text-3)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            Auditor access is restricted to users with an administrator or auditor role.
            If you believe this is an error, please contact your system administrator.
          </p>
          <a href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', background: 'var(--blue)', color: '#fff',
            borderRadius: 'var(--r-sm)', fontSize: '0.875rem', fontWeight: 600,
            textDecoration: 'none'
          }}>
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const dashboardData = await getAuditorDashboardData();

  return <AuditorDashboardClient data={dashboardData} />;
}
