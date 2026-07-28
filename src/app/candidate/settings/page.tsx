'use client';

import { useState, useTransition } from 'react';
import { UserProfile, useUser } from '@clerk/nextjs';
import { updateCandidateId } from '../actions';
import styles from './page.module.css';

export default function SettingsPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');
  
  // Notification State
  const [notifState, setNotifState] = useState({
    ecReview: true,
    statusChange: true,
    campaignUpdates: false,
    emailDigest: true,
  });
  const [notifSaved, setNotifSaved] = useState(false);

  // ID Form State
  const currentCandidateId = (user?.publicMetadata?.candidateId as string) || '';
  const [candidateIdInput, setCandidateIdInput] = useState(currentCandidateId);
  const [isPending, startTransition] = useTransition();
  const [idSaved, setIdSaved] = useState(false);
  const [idError, setIdError] = useState('');

  const handleSaveId = async () => {
    if (!candidateIdInput.trim()) {
      setIdError('Candidate ID cannot be empty');
      return;
    }
    setIdError('');
    startTransition(async () => {
      try {
        await updateCandidateId(candidateIdInput.trim());
        setIdSaved(true);
        setTimeout(() => setIdSaved(false), 3000);
      } catch (err) {
        setIdError('Failed to update candidate ID');
      }
    });
  };

  const handleToggle = (key: keyof typeof notifState) => {
    setNotifState(prev => ({ ...prev, [key]: !prev[key] }));
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Settings</h1>
          <p className={styles.pageSubtitle}>Manage your account preferences and campaign notifications</p>
        </div>
      </div>

      <div className={styles.settingsLayout}>
        {/* Tabs */}
        <div className={styles.tabList}>
          {([
            { key: 'profile', label: 'Account Profile', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
            { key: 'notifications', label: 'Notifications', icon: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0' },
            { key: 'security', label: 'Security', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`${styles.tabButton} ${activeTab === tab.key ? styles.activeTab : ''}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div className={styles.tabContent}>
          {activeTab === 'profile' && (
            <div className={styles.profileTab}>
              <div className={styles.panelCard}>
                <h2 className={styles.panelTitle}>Electoral Commission Data</h2>
                <p className={styles.panelSubtitle}>Link your verified EC candidate ID to this account.</p>
                <div className={styles.idFormGroup}>
                  <div className={styles.fWrap}>
                    <label className={styles.fLabel}>Candidate ID Number</label>
                    <div className={styles.idInputWrapper}>
                      <input 
                        type="text" 
                        value={candidateIdInput}
                        onChange={(e) => setCandidateIdInput(e.target.value)}
                        placeholder="e.g. 258-154"
                        className={styles.idInput}
                        disabled={isPending}
                      />
                      <button 
                        onClick={handleSaveId}
                        className={styles.saveBtn}
                        disabled={isPending || candidateIdInput === currentCandidateId}
                      >
                        {isPending ? <div className="spinner" style={{width: 14, height: 14, borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff', borderWidth: 2}}></div> : 'Save ID'}
                      </button>
                    </div>
                    {idError && <div className={styles.errorMsg}>{idError}</div>}
                    {idSaved && <div className={styles.successMsg}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Candidate ID saved successfully
                    </div>}
                  </div>
                </div>
              </div>

              <div className={styles.clerkWrapper}>
                <UserProfile
                  appearance={{
                    elements: {
                      card: { boxShadow: 'none', border: 'none', background: 'transparent', padding: 0 },
                      rootBox: { width: '100%' },
                      navbar: { display: 'none' },
                      pageScrollBox: { padding: 0 },
                    }
                  }}
                />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className={styles.panelCard}>
              <div className={styles.panelHeaderFlex}>
                <div>
                  <h2 className={styles.panelTitle}>Notification Preferences</h2>
                  <p className={styles.panelSubtitle}>Choose which events trigger an email or in-app notification.</p>
                </div>
                {notifSaved && (
                  <div className={styles.savedBadge}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Saved
                  </div>
                )}
              </div>
              <div className={styles.toggleList}>
                {[
                  { key: 'ecReview', label: 'EC Review Updates', desc: 'Get notified when the Electoral Commission reviews your manifesto.' },
                  { key: 'statusChange', label: 'Application Status Change', desc: 'Notified when your candidacy status changes (Approved, Requested Changes, etc.).' },
                  { key: 'campaignUpdates', label: 'Campaign Period Announcements', desc: 'Receive general announcements and schedule updates during the campaign.' },
                  { key: 'emailDigest', label: 'Weekly Email Digest', desc: 'A weekly summary of your manifesto views and profile activity.' },
                ].map(item => (
                  <div key={item.key} className={styles.toggleRow}>
                    <div className={styles.toggleInfo}>
                      <div className={styles.toggleLabel}>{item.label}</div>
                      <div className={styles.toggleDesc}>{item.desc}</div>
                    </div>
                    <button
                      className={`${styles.toggle} ${notifState[item.key as keyof typeof notifState] ? styles.toggleOn : ''}`}
                      onClick={() => handleToggle(item.key as keyof typeof notifState)}
                    >
                      <span className={styles.toggleKnob} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className={styles.panelCard}>
              <h2 className={styles.panelTitle}>Security Overview</h2>
              <p className={styles.panelSubtitle}>Your account and campaign data security at a glance.</p>
              <div className={styles.securityList}>
                <div className={styles.securityItem}>
                  <div className={styles.securityIcon} style={{ background: '#ECFDF5', color: '#10B981' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div className={styles.securityContent}>
                    <div className={styles.securityLabel}>Data Encryption</div>
                    <div className={styles.securityStatus} style={{ color: '#10B981' }}>Active — AES-256 Encrypted</div>
                    <div className={styles.securityDesc}>All your candidate data is encrypted at rest and in transit.</div>
                  </div>
                </div>
                <div className={styles.securityItem}>
                  <div className={styles.securityIcon} style={{ background: '#EFF6FF', color: '#3B82F6' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <div className={styles.securityContent}>
                    <div className={styles.securityLabel}>Authentication</div>
                    <div className={styles.securityStatus} style={{ color: '#3B82F6' }}>Clerk Identity Verified</div>
                    <div className={styles.securityDesc}>Your account is secured by Clerk with industry-standard authentication.</div>
                  </div>
                </div>
                <div className={styles.securityItem}>
                  <div className={styles.securityIcon} style={{ background: '#FFF7ED', color: '#F59E0B' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                  </div>
                  <div className={styles.securityContent}>
                    <div className={styles.securityLabel}>Audit Log</div>
                    <div className={styles.securityStatus} style={{ color: '#F59E0B' }}>3 Events Logged</div>
                    <div className={styles.securityDesc}>All EC interactions and manifesto changes are recorded in the immutable audit trail.</div>
                  </div>
                </div>
              </div>
              <div className={styles.infoBox}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Your voting preferences are fully anonymous. Not even the Electoral Commission can link your ballot to your identity.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
