import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import AuditorDashboardClient from './AuditorDashboardClient';
import {
  ALLOWED_AUDITOR_ROLES,
  getAuditorDashboardData,
  getAuditorRoleByClerkId,
} from '@/lib/auditor';

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
    const userRole = await getAuditorRoleByClerkId(userId);
    if (userRole && ALLOWED_AUDITOR_ROLES.some((role) => role === userRole.role)) {
      hasAccess = true;
    }
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFF]">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-md border border-gray-100">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-500 text-sm mb-6">
            Auditor access is restricted to users with an administrator or auditor role.
            If you believe this is an error, please contact your system administrator.
          </p>
          <a href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const dashboardData = await getAuditorDashboardData();

  return <AuditorDashboardClient data={dashboardData} />;
}
