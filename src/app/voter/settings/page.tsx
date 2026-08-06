import { currentUser } from '@clerk/nextjs/server';
import { SettingsClient } from './SettingsClient';
import { getVoterSettings } from './actions';

export default async function Settings() {
  const user = await currentUser();

  const fullName =
    `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || 'Unknown User';
  const email = user?.emailAddresses?.[0]?.emailAddress ?? '—';
  const avatarUrl = user?.imageUrl ?? '';
  const studentId = (user?.publicMetadata?.studentId as string | undefined) ?? '—';
  const faculty = (user?.publicMetadata?.faculty as string | undefined) ?? '—';

  let initialSettings = null;
  try {
    initialSettings = await getVoterSettings();
  } catch (e) {
    console.error('Failed to get voter settings', e);
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: '24px 0 80px 0', width: '100%', maxWidth: 1200, margin: '0 auto', flex: 1 }}>
        <header style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-1)', margin: '0 0 8px 0', lineHeight: 1.1 }}>
            Account Settings
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 600, margin: 0 }}>
            Manage your student profile, secure your voting credentials, and
            customize your experience.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {/* Personal Information - Read Only */}
          <section style={{ gridColumn: '1 / -1', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, boxShadow: 'var(--sh-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 24 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--blue)' }}>
                badge
              </span>
              <h4 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>
                Personal Information
              </h4>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Full Name
                </label>
                <div style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 8, color: 'var(--text-1)', fontWeight: 600, border: '1px solid var(--border)' }}>
                  {fullName}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Email Address
                </label>
                <div style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 8, color: 'var(--text-1)', fontWeight: 600, border: '1px solid var(--border)' }}>
                  {email}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Student Identification Number
                </label>
                <div style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 8, color: 'var(--text-1)', fontWeight: 600, border: '1px solid var(--border)' }}>
                  {studentId}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Faculty / Department
                </label>
                <div style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 8, color: 'var(--text-1)', fontWeight: 600, border: '1px solid var(--border)' }}>
                  {faculty}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 24, display: 'flex', alignItems: 'flex-start', gap: 16, padding: 20, background: 'rgba(59, 130, 246, 0.1)', borderRadius: 12, border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--blue)', fontSize: 28 }}>info</span>
              <p style={{ fontSize: 16, color: 'var(--text-1)', margin: 0, lineHeight: 1.5 }}>
                Your personal details are synced with the University Registry. If
                any information is incorrect, please contact the Registrar&apos;s
                Office.
              </p>
            </div>
          </section>

          {/* Quick Profile Summary */}
          <section style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
            <div style={{ height: 128, background: 'var(--blue)', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)' }}>
                {avatarUrl ? (
                  <img
                    style={{ width: 96, height: 96, borderRadius: '50%', border: '4px solid var(--surface)', objectFit: 'cover', boxShadow: 'var(--sh-sm)' }}
                    alt="Profile avatar"
                    src={avatarUrl}
                  />
                ) : (
                  <div style={{ width: 96, height: 96, borderRadius: '50%', border: '4px solid var(--surface)', background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800, color: 'var(--blue)' }}>
                    {fullName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            <div style={{ marginTop: 48, padding: 32, textAlign: 'center', flex: 1 }}>
              <h5 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-1)' }}>{fullName}</h5>
              <p style={{ fontSize: 14, color: 'var(--blue)', margin: '0 0 24px 0', fontWeight: 600 }}>
                Verified Student Voter
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
                  <span style={{ color: 'var(--text-2)' }}>Email</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-1)', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '60%' }}>{email}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
                  <span style={{ color: 'var(--text-2)' }}>Account Security</span>
                  <span style={{ color: 'var(--green)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                      {initialSettings?.voting_suspended ? 'cancel' : 'check_circle'}
                    </span>
                    {initialSettings?.voting_suspended ? 'Suspended' : 'Active'}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Account Security (Client Component) */}
          <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, boxShadow: 'var(--sh-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 24 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--blue)' }}>
                security
              </span>
              <h4 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>Account Security</h4>
            </div>
            
            <SettingsClient initialSettings={initialSettings} />
            
          </section>

        </div>
      </div>
    </>
  );
}
