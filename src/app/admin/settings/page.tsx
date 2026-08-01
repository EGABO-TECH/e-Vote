"use client";
import { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("branding");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1200);
  };

  const navItems = [
    { id: "branding", icon: "palette", label: "Institutional Branding" },
    { id: "api", icon: "api", label: "API & Cloud Endpoints" },
    { id: "notifications", icon: "notifications_active", label: "Notification Prefs" },
    { id: "security", icon: "security", label: "Security Protocols" },
    { id: "version", icon: "history", label: "Version Control" },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto', flex: 1 }}>

      {/* Page Header */}
      <div style={{
        position: 'relative',
        background: 'var(--surface)',
        borderRadius: 24,
        padding: '32px 40px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--sh-md)',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 6, borderRadius: 8, fontSize: 20 }}>
              settings_suggest
            </span>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              Configuration
            </p>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-1)', lineHeight: 1.1, margin: 0 }}>
            System Settings
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', maxWidth: 600, margin: 0 }}>
            Configure institutional branding, cloud infrastructure, and security protocols.
          </p>
        </div>
      </div>

      <div className="settings-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 3fr', gap: 24, alignItems: 'flex-start' }}>

        {/* Settings Sub-Navigation (Left Column) */}
        <aside className="settings-nav" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 12, position: 'sticky', top: 96, boxShadow: 'var(--sh-sm)' }}>
          <nav className="settings-nav-list" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left',
                  background: activeTab === item.id ? 'var(--blue)' : 'transparent',
                  color: activeTab === item.id ? '#fff' : 'var(--text-2)',
                  fontWeight: activeTab === item.id ? 700 : 600,
                  transition: 'all 0.2s'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{item.icon}</span>
                <span style={{ fontSize: 14 }}>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings Content (Right Column) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Section 1: Institutional Branding */}
          <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Institutional Branding</h3>
              <p style={{ fontSize: 14, color: 'var(--text-3)', margin: '4px 0 0 0' }}>Customize the platform appearance for Cavendish University Uganda.</p>
            </div>
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>University Logo</label>
                  <div style={{ position: 'relative', height: 160, border: '2px dashed var(--border)', borderRadius: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--surface)', cursor: 'pointer', overflow: 'hidden' }}>
                    <img
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: 16, opacity: 0.5 }}
                      alt="Placeholder Logo"
                      src="/logo.jpeg"
                    />
                    <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.8)', padding: '8px 16px', borderRadius: 8 }}>
                      <span className="material-symbols-outlined" style={{ color: 'var(--text-2)' }}>upload_file</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)' }}>Change Logo</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Institution Name</label>
                    <input
                      style={{ width: '100%', padding: '12px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, outline: 'none', color: 'var(--text-1)' }}
                      type="text"
                      defaultValue="Cavendish University Uganda"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Brand Accent Color</label>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--blue)', cursor: 'pointer', border: '2px solid #fff', outline: '2px solid var(--blue)' }}></div>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#131b2e', cursor: 'pointer' }}></div>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--red)', cursor: 'pointer' }}></div>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#64ffda', cursor: 'pointer' }}></div>
                      <button style={{ width: 40, height: 40, borderRadius: '50%', border: '1px dashed var(--border)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)', cursor: 'pointer' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: API Endpoints */}
          <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Cloud Infrastructure &amp; API</h3>
                <p style={{ fontSize: 14, color: 'var(--text-3)', margin: '4px 0 0 0' }}>Core integration points for data persistence and external verification.</p>
              </div>
              <span style={{ padding: '6px 16px', background: 'var(--blue)', color: '#fff', fontSize: 12, fontWeight: 700, borderRadius: 99 }}>
                System Health: Optimal
              </span>
            </div>
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--blue)', fontSize: 20 }}>database</span>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Supabase Backend Configuration</h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)' }}>PROJECT URL</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input style={{ flex: 1, padding: '12px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontFamily: 'monospace', fontSize: 14, color: 'var(--text-2)', outline: 'none' }} readOnly type="text" value="https://evote-cuu-instance.supabase.co" />
                    <button style={{ padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-2)', cursor: 'pointer' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>content_copy</span>
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)' }}>ANON PUBLIC KEY</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input style={{ flex: 1, padding: '12px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontFamily: 'monospace', fontSize: 14, color: 'var(--text-2)', outline: 'none' }} type="password" defaultValue="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." />
                    <button style={{ padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-2)', cursor: 'pointer' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>visibility</span>
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--blue)', fontSize: 20 }}>account_balance</span>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>UEC Node Connectivity</h4>
                </div>
                <input style={{ width: '100%', padding: '12px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, outline: 'none', color: 'var(--text-1)', fontSize: 14 }} type="text" defaultValue="https://api.uec.org.ug/v1/auth/verify-institutional" />
              </div>
            </div>
          </section>

          {/* Section 3: Security Protocols */}
          <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Security &amp; Access Protocols</h3>
              <p style={{ fontSize: 14, color: 'var(--text-3)', margin: '4px 0 0 0' }}>Configure encryption standards and session management.</p>
            </div>
            <div style={{ padding: 32 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                {/* Toggle: 2FA */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Enforce 2FA for Administrators</p>
                    <p style={{ fontSize: 14, color: 'var(--text-3)', margin: 0 }}>Require biometric or TOTP for all elevated roles.</p>
                  </div>
                  <div style={{ width: 44, height: 24, background: 'var(--blue)', borderRadius: 99, position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, right: 2 }}></div>
                  </div>
                </div>
                {/* Input: Session Timeout */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Session Timeout (Minutes)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <input style={{ width: 96, padding: '12px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontWeight: 700, textAlign: 'center', color: 'var(--text-1)', fontSize: 14, outline: 'none' }} type="number" defaultValue="15" />
                    <p style={{ fontSize: 14, color: 'var(--text-3)', fontStyle: 'italic', margin: 0 }}>Auto-logout after inactivity.</p>
                  </div>
                </div>
                {/* Encryption Display */}
                <div style={{ gridColumn: '1 / -1', padding: 24, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--blue)', fontSize: 24 }}>lock</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>System-Wide AES-256 GCM</p>
                    <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '4px 0 0 0' }}>
                      Ballots encrypted at rest. Key ID: <span style={{ fontFamily: 'monospace', color: 'var(--blue)' }}>KID-992-U-2026</span>
                    </p>
                  </div>
                  <button style={{ padding: '12px 24px', background: 'var(--text-1)', color: 'var(--surface)', fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer' }}>
                    Rotate Keys
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, paddingBottom: 16 }}>
            <button style={{ padding: '12px 32px', background: 'transparent', color: 'var(--text-3)', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              Reset to Defaults
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              style={{
                padding: '12px 40px', fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                background: saved ? 'var(--blue)' : isSaving ? 'var(--text-3)' : 'var(--blue)',
                color: '#fff',
                boxShadow: 'var(--sh-sm)'
              }}
            >
              {saved ? "Changes Saved" : isSaving ? "Syncing..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
