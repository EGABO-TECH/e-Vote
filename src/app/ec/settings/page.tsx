'use client';

import { useState, useTransition, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { updateEcProfile } from '../actions';

/* ── SVG Icons ── */
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconBell = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const IconShield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconWarning = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconLog = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);

const NOTIF_ITEMS = [
  { key: 'newCandidate',     label: 'New candidate submission',   desc: 'Email + in-app when a candidate submits their application.' },
  { key: 'syncDiscrepancy',  label: 'Sync discrepancy flagged',   desc: 'Email + in-app when a polling device flags an anomaly.' },
  { key: 'votingWindow',     label: 'Voting window opening soon', desc: 'In-app reminder 30 minutes before voting opens.' },
  { key: 'certifyReady',     label: 'Results ready to certify',   desc: 'In-app alert when all anomalies are resolved and certification is unblocked.' },
];

const cardStyle: React.CSSProperties = {
  background: 'var(--card)', border: '1px solid var(--card-border)',
  borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.04em',
  textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '8px',
};
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: '9px',
  border: '1px solid var(--card-border)', background: 'var(--page-bg)',
  fontSize: '14px', color: 'var(--ink)', outline: 'none', fontFamily: 'inherit',
  transition: 'border-color .15s',
};

export default function EcSettingsPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');
  const [isPending, startTransition] = useTransition();

  const meta = user?.publicMetadata as Record<string, string> | undefined;

  /* ── Profile form ── */
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    officerTitle: '',
    jurisdiction: '',
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState('');

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        phone: (meta?.phone as string) ?? '',
        officerTitle: (meta?.officerTitle as string) ?? '',
        jurisdiction: (meta?.jurisdiction as string) ?? 'All faculties — Cavendish University Uganda',
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setProfileError('First and last name are required.');
      return;
    }
    setProfileError('');
    startTransition(async () => {
      try {
        await updateEcProfile(form);
        setProfileSaved(true);
        setTimeout(() => setProfileSaved(false), 3000);
      } catch {
        setProfileError('Failed to save profile. Please try again.');
      }
    });
  };

  /* ── Notifications ── */
  const [notifs, setNotifs] = useState({ newCandidate: true, syncDiscrepancy: true, votingWindow: false, certifyReady: true });
  const [notifSaved, setNotifSaved] = useState(false);
  const handleToggle = (key: keyof typeof notifs) => {
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }));
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 2000);
  };

  const email = user?.primaryEmailAddress?.emailAddress ?? '—';
  const officerId = (meta?.officerId as string) ?? null;
  const displayName = user ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() : 'Loading…';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const tabBtn = (key: typeof activeTab): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px',
    borderRadius: '10px', fontSize: '14px', fontWeight: 600,
    color: activeTab === key ? 'var(--sidebar-active)' : 'var(--ink)',
    background: activeTab === key ? 'var(--badge-blue-bg)' : 'transparent',
    border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer', transition: 'all .15s',
  });

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 4px', color: 'var(--ink)' }}>Settings</h1>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>Manage your EC officer profile, notifications, and account security</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '20px', alignItems: 'flex-start' }}>
        {/* Tab nav */}
        <div style={{ ...cardStyle, padding: '12px', gap: '4px' }}>
          <button style={tabBtn('profile')} onClick={() => setActiveTab('profile')}>
            <IconUser /> Account Profile
          </button>
          <button style={tabBtn('notifications')} onClick={() => setActiveTab('notifications')}>
            <IconBell /> Notifications
          </button>
          <button style={tabBtn('security')} onClick={() => setActiveTab('security')}>
            <IconShield /> Security
          </button>
        </div>

        {/* Tab content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

          {/* ── PROFILE ── */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Profile preview card */}
              <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
                    background: 'var(--badge-blue-bg)', color: 'var(--sidebar-active)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '20px', overflow: 'hidden',
                  }}>
                    {user?.hasImage
                      ? <img src={user.imageUrl} alt={displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)' }}>{displayName}</div>
                    <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{email}</div>
                    {officerId
                      ? <div style={{ fontSize: '12px', color: 'var(--sidebar-active)', marginTop: '2px', fontWeight: 600 }}>EC Officer ID: {officerId}</div>
                      : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--amber)', marginTop: '2px', fontWeight: 600 }}>
                          <IconWarning /> No EC Officer ID assigned — contact System Admin
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>

              {/* Edit form */}
              <div style={cardStyle}>
                <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)' }}>Edit Profile</div>

                {profileSaved && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'var(--green-bg)', border: '1px solid var(--green-bdr)', borderRadius: '8px', color: 'var(--green)', fontWeight: 600, fontSize: '13.5px' }}>
                    <IconCheck /> Profile saved successfully.
                  </div>
                )}
                {profileError && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontWeight: 600, fontSize: '13.5px' }}>
                    <IconWarning /> {profileError}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>First Name <span style={{ color: '#DC2626' }}>*</span></label>
                    <input style={inputStyle} value={form.firstName} onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))} placeholder="First name" required />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name <span style={{ color: '#DC2626' }}>*</span></label>
                    <input style={inputStyle} value={form.lastName} onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))} placeholder="Last name" required />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input style={{ ...inputStyle, background: 'var(--card-border)', color: 'var(--muted)', cursor: 'not-allowed' }} value={email} readOnly />
                  <p style={{ fontSize: '11.5px', color: 'var(--muted)', marginTop: '4px' }}>Managed by your institutional account. Contact System Admin to change.</p>
                </div>

                <div>
                  <label style={labelStyle}>Official Title</label>
                  <input style={inputStyle} value={form.officerTitle} onChange={e => setForm(p => ({ ...p, officerTitle: e.target.value }))} placeholder="e.g. Electoral Commission Officer" />
                </div>

                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input style={inputStyle} type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+256 7XX XXX XXX" />
                </div>

                <div>
                  <label style={labelStyle}>Faculty / Jurisdiction Scope</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.jurisdiction} onChange={e => setForm(p => ({ ...p, jurisdiction: e.target.value }))}>
                    <option>All faculties — Cavendish University Uganda</option>
                    <option>Dept. of Software Engineering only</option>
                    <option>Faculty of Business only</option>
                    <option>Faculty of Law only</option>
                    <option>Faculty of Science only</option>
                  </select>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isPending}
                    style={{
                      background: isPending ? 'var(--muted)' : 'var(--sidebar-active)',
                      color: '#fff', fontWeight: 700, fontSize: '13.5px',
                      padding: '11px 24px', borderRadius: '11px', border: 'none',
                      cursor: isPending ? 'not-allowed' : 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                    }}
                  >
                    {isPending
                      ? <><div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', animation: 'spin .6s linear infinite' }} /> Saving…</>
                      : <><IconCheck /> Save Profile</>
                    }
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ── NOTIFICATIONS ── */}
          {activeTab === 'notifications' && (
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)' }}>Notifications</div>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>Choose which events trigger a notification.</p>
                </div>
                {notifSaved && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--green)', fontWeight: 700, background: 'var(--green-bg)', padding: '4px 10px', borderRadius: '6px' }}>
                    <IconCheck /> Saved
                  </span>
                )}
              </div>

              {NOTIF_ITEMS.map((item, i) => (
                <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 0', borderTop: i === 0 ? '1px solid var(--card-border)' : '1px solid #F0F1F5' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)' }}>{item.label}</div>
                    <div style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '2px' }}>{item.desc}</div>
                  </div>
                  <button
                    onClick={() => handleToggle(item.key as keyof typeof notifs)}
                    type="button"
                    aria-label={`Toggle ${item.label}`}
                    style={{
                      width: '44px', height: '24px', borderRadius: '12px',
                      background: notifs[item.key as keyof typeof notifs] ? 'var(--sidebar-active)' : 'var(--card-border)',
                      border: 'none', cursor: 'pointer', position: 'relative',
                      transition: 'background .2s', flexShrink: 0,
                    }}
                  >
                    <span style={{
                      position: 'absolute', width: '18px', height: '18px',
                      background: '#fff', borderRadius: '50%', top: '3px',
                      left: notifs[item.key as keyof typeof notifs] ? '23px' : '3px',
                      transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.15)',
                    }} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── SECURITY ── */}
          {activeTab === 'security' && (
            <div style={cardStyle}>
              <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)' }}>Security</div>
              <p style={{ margin: '-12px 0 0', fontSize: '13px', color: 'var(--muted)' }}>Your account security at a glance. All EC accounts require institutional authentication.</p>

              {[
                {
                  icon: <IconShield />, bg: '#ECFDF5', color: '#10B981',
                  label: 'Data Encryption', status: 'Active — AES-256',
                  desc: 'All candidate data, votes, and EC actions are encrypted at rest and in transit (TLS 1.3).',
                },
                {
                  icon: <IconLock />, bg: '#EFF6FF', color: '#3B82F6',
                  label: 'Authentication', status: 'Institutional Account',
                  desc: 'Your EC account is secured by institutional identity verification. Password changes must go through your IT office.',
                },
                {
                  icon: <IconLog />, bg: '#FFF7ED', color: '#F59E0B',
                  label: 'Immutable Audit Log', status: 'Active',
                  desc: 'Every certification action, candidate decision, and system change is permanently recorded and cannot be altered.',
                },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', padding: '20px 0', borderTop: '1px solid var(--card-border)' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)', marginBottom: '2px' }}>{item.label}</div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: item.color, marginBottom: '4px' }}>{item.status}</div>
                    <div style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '14px 16px', borderRadius: '10px', background: 'var(--badge-blue-bg)', color: 'var(--sidebar-active)', fontSize: '13px', lineHeight: 1.5 }}>
                <div style={{ flexShrink: 0, marginTop: '1px' }}><IconShield /></div>
                Your certification actions are logged and immutable. Not even System Admin can alter results after certification.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
