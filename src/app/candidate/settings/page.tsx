'use client';

import { useState, useTransition, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { updateCandidateProfile } from '../actions';
import styles from './page.module.css';

/* -- tiny SVG helpers -- */
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconAlertTriangle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IconLock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconAudit = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);

const NOTIF_ITEMS = [
  { key: 'ecReview', label: 'EC Review Updates', desc: 'Get notified when the Electoral Commission reviews your manifesto.' },
  { key: 'statusChange', label: 'Application Status Change', desc: 'Notified when your candidacy status changes (Approved, Requested Changes, etc.).' },
  { key: 'campaignUpdates', label: 'Campaign Period Announcements', desc: 'General announcements and schedule updates during the campaign.' },
  { key: 'emailDigest', label: 'Weekly Email Digest', desc: 'A weekly summary of your manifesto views and profile activity.' },
];

export default function SettingsPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');
  const [isPending, startTransition] = useTransition();

  /* -- Profile form state -- */
  const meta = user?.publicMetadata as Record<string, string> | undefined;
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    faculty: '',
    yearOfStudy: '',
    bio: '',
    studentId: '',
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState('');

  // Populate form from Clerk user once loaded
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        phone: (meta?.phone as string) ?? '',
        faculty: (meta?.faculty as string) ?? '',
        yearOfStudy: (meta?.yearOfStudy as string) ?? '',
        bio: (meta?.bio as string) ?? '',
        studentId: (meta?.studentId as string) ?? '',
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
        await updateCandidateProfile(form);
        setProfileSaved(true);
        setTimeout(() => setProfileSaved(false), 3000);
      } catch {
        setProfileError('Failed to save profile. Please try again.');
      }
    });
  };

  /* -- Notifications state -- */
  const [notifState, setNotifState] = useState({ ecReview: true, statusChange: true, campaignUpdates: false, emailDigest: true });
  const [notifSaved, setNotifSaved] = useState(false);
  const handleToggle = (key: keyof typeof notifState) => {
    setNotifState(prev => ({ ...prev, [key]: !prev[key] }));
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 2000);
  };

  const email = user?.primaryEmailAddress?.emailAddress ?? '—';
  const candidateId = (meta?.candidateId as string) ?? null;

  /* -- shared input style -- */
  const inp: React.CSSProperties = {
    width: '100%', height: '42px', padding: '0 14px',
    borderRadius: 'var(--r-sm)', border: '1.5px solid var(--border)',
    background: 'var(--surface)', fontSize: '0.875rem', fontFamily: 'inherit',
    color: 'var(--text-1)', outline: 'none',
  };
  const lbl: React.CSSProperties = {
    fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-2)',
    letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '5px',
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Settings</h1>
          <p className={styles.pageSubtitle}>Manage your candidate profile and preferences</p>
        </div>
      </div>

      <div className={styles.settingsLayout}>
        {/* Sidebar nav */}
        <div className={styles.tabList}>
          {([
            { key: 'profile' as const, label: 'Profile', icon: <IconUser /> },
            { key: 'notifications' as const, label: 'Notifications', icon: <IconBell /> },
            { key: 'security' as const, label: 'Security', icon: <IconShield /> },
          ]).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`${styles.tabButton} ${activeTab === tab.key ? styles.activeTab : ''}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>

          {/* -- PROFILE -- */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className={styles.profileTab}>
              <div className={styles.panelCard}>
                <h2 className={styles.panelTitle}>Personal Information</h2>
                <p className={styles.panelSubtitle}>This information is displayed to EC reviewers and voters.</p>

                {profileSaved && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'var(--green-bg)', border: '1px solid var(--green-bdr)', borderRadius: '8px', color: 'var(--green)', fontWeight: 600, fontSize: '0.875rem' }}>
                    <IconCheck /> Profile saved successfully.
                  </div>
                )}
                {profileError && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'var(--red-bg)', border: '1px solid #FECACA', borderRadius: '8px', color: 'var(--red)', fontWeight: 600, fontSize: '0.875rem' }}>
                    <IconAlertTriangle /> {profileError}
                  </div>
                )}

                {/* Name row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={lbl}>First Name <span style={{ color: 'var(--red)' }}>*</span></label>
                    <input style={inp} value={form.firstName} onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))} placeholder="e.g. Niwasiima" required />
                  </div>
                  <div>
                    <label style={lbl}>Last Name <span style={{ color: 'var(--red)' }}>*</span></label>
                    <input style={inp} value={form.lastName} onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))} placeholder="e.g. Ashelycole" required />
                  </div>
                </div>

                {/* Email — read only from Clerk */}
                <div>
                  <label style={lbl}>Email Address</label>
                  <input style={{ ...inp, background: 'var(--surface-2)', color: 'var(--text-3)', cursor: 'not-allowed' }} value={email} readOnly />
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginTop: '4px' }}>Email is managed by your institutional account and cannot be changed here.</p>
                </div>

                {/* Student ID */}
                <div>
                  <label style={lbl}>Student / Registration Number</label>
                  <input style={inp} value={form.studentId} onChange={e => setForm(p => ({ ...p, studentId: e.target.value }))} placeholder="e.g. 2024/BSE/001" />
                </div>

                {/* Phone */}
                <div>
                  <label style={lbl}>Phone Number</label>
                  <input style={inp} type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+256 7XX XXX XXX" />
                </div>

                {/* Faculty + Year row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={lbl}>Faculty / Department</label>
                    <select style={{ ...inp, cursor: 'pointer' }} value={form.faculty} onChange={e => setForm(p => ({ ...p, faculty: e.target.value }))}>
                      <option value="">Select faculty…</option>
                      <option>Faculty of Computing &amp; IT</option>
                      <option>Faculty of Business</option>
                      <option>Faculty of Law</option>
                      <option>Faculty of Science</option>
                      <option>Faculty of Engineering</option>
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>Year of Study</label>
                    <select style={{ ...inp, cursor: 'pointer' }} value={form.yearOfStudy} onChange={e => setForm(p => ({ ...p, yearOfStudy: e.target.value }))}>
                      <option value="">Select year…</option>
                      <option>Year 1</option>
                      <option>Year 2</option>
                      <option>Year 3</option>
                      <option>Year 4</option>
                      <option>Postgraduate</option>
                    </select>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label style={lbl}>Short Bio / Tagline</label>
                  <textarea
                    rows={3}
                    style={{ ...inp, height: 'auto', padding: '12px 14px', resize: 'vertical' }}
                    value={form.bio}
                    onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                    maxLength={280}
                    placeholder="A one-line statement that will appear on your public ballot profile…"
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginTop: '4px' }}>{form.bio.length}/280 characters</p>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn-p"
                    style={{ width: 'auto', padding: '0 28px' }}
                  >
                    {isPending
                      ? <><div className="spinner" />&nbsp;Saving…</>
                      : <><IconCheck />&nbsp;Save Profile</>
                    }
                  </button>
                </div>
              </div>

              {/* EC Data linkage */}
              {candidateId && (
                <div className={styles.panelCard}>
                  <h2 className={styles.panelTitle}>EC Candidate ID</h2>
                  <p className={styles.panelSubtitle}>Your Electoral Commission registration number.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--surface-3)', borderRadius: '8px' }}>
                    <IconShield />
                    <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '0.04em' }}>{candidateId}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>Verified by EC</span>
                  </div>
                </div>
              )}
            </form>
          )}

          {/* -- NOTIFICATIONS -- */}
          {activeTab === 'notifications' && (
            <div className={styles.panelCard}>
              <div className={styles.panelHeaderFlex}>
                <div>
                  <h2 className={styles.panelTitle}>Notification Preferences</h2>
                  <p className={styles.panelSubtitle}>Choose which events trigger an email or in-app notification.</p>
                </div>
                {notifSaved && (
                  <div className={styles.savedBadge}>
                    <IconCheck /> Saved
                  </div>
                )}
              </div>
              <div className={styles.toggleList}>
                {NOTIF_ITEMS.map(item => (
                  <div key={item.key} className={styles.toggleRow}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleLabel}>{item.label}</div>
                      <div className={styles.toggleDesc}>{item.desc}</div>
                    </div>
                    <button
                      className={`${styles.toggle} ${notifState[item.key as keyof typeof notifState] ? styles.toggleOn : ''}`}
                      onClick={() => handleToggle(item.key as keyof typeof notifState)}
                      type="button"
                    >
                      <span className={styles.toggleKnob} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -- SECURITY -- */}
          {activeTab === 'security' && (
            <div className={styles.panelCard}>
              <h2 className={styles.panelTitle}>Security Overview</h2>
              <p className={styles.panelSubtitle}>Your account and campaign data security at a glance.</p>
              <div className={styles.securityList}>
                <div className={styles.securityItem}>
                  <div className={styles.securityIcon} style={{ background: '#ECFDF5', color: '#10B981' }}>
                    <IconShield />
                  </div>
                  <div className={styles.securityContent}>
                    <div className={styles.securityLabel}>Data Encryption</div>
                    <div className={styles.securityStatus} style={{ color: '#10B981' }}>Active — AES-256 Encrypted</div>
                    <div className={styles.securityDesc}>All your candidate data is encrypted at rest and in transit.</div>
                  </div>
                </div>
                <div className={styles.securityItem}>
                  <div className={styles.securityIcon} style={{ background: '#EFF6FF', color: '#3B82F6' }}>
                    <IconLock />
                  </div>
                  <div className={styles.securityContent}>
                    <div className={styles.securityLabel}>Authentication</div>
                    <div className={styles.securityStatus} style={{ color: '#3B82F6' }}>Institutional Identity Verified</div>
                    <div className={styles.securityDesc}>Your account is secured with industry-standard authentication. Password changes must go through your institutional IT office.</div>
                  </div>
                </div>
                <div className={styles.securityItem}>
                  <div className={styles.securityIcon} style={{ background: '#FFF7ED', color: '#F59E0B' }}>
                    <IconAudit />
                  </div>
                  <div className={styles.securityContent}>
                    <div className={styles.securityLabel}>Audit Log</div>
                    <div className={styles.securityStatus} style={{ color: '#F59E0B' }}>Immutable Record</div>
                    <div className={styles.securityDesc}>All EC interactions and manifesto changes are recorded in the immutable audit trail.</div>
                  </div>
                </div>
              </div>
              <div className={styles.infoBox}>
                <IconShield />
                Your voting preferences are fully anonymous. Not even the Electoral Commission can link your ballot to your identity.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
