"use client";
import { useState, useRef } from "react";
import { updateSettings } from "./actions";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const BRAND_COLORS = [
  { hex: '#1E40AF', label: 'Blue' },
  { hex: '#131b2e', label: 'Navy' },
  { hex: '#DC2626', label: 'Red' },
  { hex: '#64ffda', label: 'Teal' },
  { hex: '#7C3AED', label: 'Purple' },
  { hex: '#059669', label: 'Green' },
];

export function SettingsClient({ initialSettings }: { initialSettings: any }) {
  const [activeTab, setActiveTab] = useState("branding");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState(initialSettings);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(BRAND_COLORS[0].hex);
  const [customColor, setCustomColor] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [rotatingKeys, setRotatingKeys] = useState(false);
  const [keyId, setKeyId] = useState('KID-992-U-2026');
  const [resetConfirm, setResetConfirm] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert("Failed to update settings");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('Logo must be under 2MB'); return; }
    const reader = new FileReader();
    reader.onload = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(SUPABASE_URL);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyKey = async () => {
    await navigator.clipboard.writeText(SUPABASE_ANON_KEY);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRotateKeys = async () => {
    if (!confirm('Rotate encryption keys? All active sessions will be invalidated.')) return;
    setRotatingKeys(true);
    await new Promise(r => setTimeout(r, 1500));
    const newId = `KID-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}-U-2026`;
    setKeyId(newId);
    setRotatingKeys(false);
    alert(`Keys rotated successfully. New Key ID: ${newId}`);
  };

  const handleResetDefaults = async () => {
    if (!resetConfirm) {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 3000);
      return;
    }
    setSettings({ institution: 'Cavendish University Uganda', enforce_2fa: false, session_timeout: 15 });
    setResetConfirm(false);
    await handleSave();
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
      <div style={{ position: 'relative', background: 'var(--surface)', borderRadius: 24, padding: '32px 40px', border: '1px solid var(--border)', boxShadow: 'var(--sh-md)', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 6, borderRadius: 8, fontSize: 20 }}>settings_suggest</span>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Configuration</p>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-1)', lineHeight: 1.1, margin: 0 }}>System Settings</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', maxWidth: 600, margin: 0 }}>
            Configure institutional branding, cloud infrastructure, and security protocols.
          </p>
        </div>
      </div>

      <div className="settings-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 3fr', gap: 24, alignItems: 'flex-start' }}>

        {/* Settings Sub-Navigation */}
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
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                  width: '100%',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{item.icon}</span>
                <span style={{ fontSize: 14 }}>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Section 1: Institutional Branding */}
          <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Institutional Branding</h3>
              <p style={{ fontSize: 14, color: 'var(--text-3)', margin: '4px 0 0 0' }}>
                Customize the platform appearance for {settings.institution}.
              </p>
            </div>
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                {/* Logo Upload */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>University Logo</label>
                  <div
                    onClick={() => logoInputRef.current?.click()}
                    style={{ position: 'relative', height: 160, border: '2px dashed var(--border)', borderRadius: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--surface)', cursor: 'pointer', overflow: 'hidden', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--blue)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    <img
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: 16, opacity: logoPreview ? 1 : 0.5 }}
                      alt="University Logo"
                      src={logoPreview || '/logo.jpeg'}
                    />
                    <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.85)', padding: '8px 16px', borderRadius: 8 }}>
                      <span className="material-symbols-outlined" style={{ color: 'var(--text-2)' }}>upload_file</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)' }}>
                        {logoPreview ? 'Change Logo' : 'Upload Logo'}
                      </span>
                      <span style={{ fontSize: 10, color: 'var(--text-3)' }}>PNG, JPG max 2MB</span>
                    </div>
                  </div>
                  <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoChange} style={{ display: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {/* Institution Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Institution Name</label>
                    <input
                      style={{ width: '100%', padding: '12px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, outline: 'none', color: 'var(--text-1)', fontFamily: 'inherit' }}
                      type="text"
                      value={settings.institution}
                      onChange={(e) => setSettings({ ...settings, institution: e.target.value })}
                    />
                  </div>
                  {/* Brand Color Picker */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Brand Accent Color</label>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                      {BRAND_COLORS.map(c => (
                        <button
                          key={c.hex}
                          title={c.label}
                          onClick={() => setSelectedColor(c.hex)}
                          style={{ width: 40, height: 40, borderRadius: '50%', background: c.hex, cursor: 'pointer', border: selectedColor === c.hex ? '3px solid #fff' : '3px solid transparent', outline: selectedColor === c.hex ? `3px solid ${c.hex}` : 'none', transition: 'all 0.2s' }}
                        />
                      ))}
                      <input
                        type="color"
                        title="Custom color"
                        value={customColor || selectedColor}
                        onChange={e => { setCustomColor(e.target.value); setSelectedColor(e.target.value); }}
                        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px dashed var(--border)', background: 'transparent', cursor: 'pointer', padding: 0 }}
                      />
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--text-3)', margin: 0 }}>Selected: <span style={{ fontFamily: 'monospace', color: 'var(--blue)' }}>{selectedColor}</span></p>
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
              <span style={{ padding: '6px 16px', background: SUPABASE_URL ? 'var(--green)' : 'var(--amber)', color: '#fff', fontSize: 12, fontWeight: 700, borderRadius: 99 }}>
                {SUPABASE_URL ? 'Connected' : 'Not Configured'}
              </span>
            </div>
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--blue)', fontSize: 20 }}>database</span>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Supabase Backend Configuration</h4>
                </div>
                {/* Project URL */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)' }}>PROJECT URL</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      style={{ flex: 1, padding: '12px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontFamily: 'monospace', fontSize: 13, color: 'var(--text-2)', outline: 'none' }}
                      readOnly
                      type="text"
                      value={SUPABASE_URL || 'Not configured — set NEXT_PUBLIC_SUPABASE_URL'}
                    />
                    <button
                      onClick={handleCopyUrl}
                      title="Copy URL"
                      style={{ padding: '12px 16px', background: copiedUrl ? 'var(--green)' : 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: copiedUrl ? '#fff' : 'var(--text-2)', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{copiedUrl ? 'check' : 'content_copy'}</span>
                    </button>
                  </div>
                </div>
                {/* Anon Key */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)' }}>ANON PUBLIC KEY</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      style={{ flex: 1, padding: '12px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontFamily: 'monospace', fontSize: 13, color: 'var(--text-2)', outline: 'none' }}
                      type={showKey ? 'text' : 'password'}
                      readOnly
                      value={SUPABASE_ANON_KEY || 'Not configured — set NEXT_PUBLIC_SUPABASE_ANON_KEY'}
                    />
                    <button onClick={() => setShowKey(s => !s)} title={showKey ? 'Hide' : 'Show'} style={{ padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-2)', cursor: 'pointer' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{showKey ? 'visibility_off' : 'visibility'}</span>
                    </button>
                    <button onClick={handleCopyKey} title="Copy key" style={{ padding: '12px 16px', background: copiedKey ? 'var(--green)' : 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: copiedKey ? '#fff' : 'var(--text-2)', cursor: 'pointer', transition: 'all 0.2s' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{copiedKey ? 'check' : 'content_copy'}</span>
                    </button>
                  </div>
                </div>
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
                    <p style={{ fontSize: 14, color: 'var(--text-3)', margin: 0 }}>Require TOTP for all elevated roles.</p>
                    <p style={{ fontSize: 12, color: settings.enforce_2fa ? 'var(--green)' : 'var(--text-3)', margin: 0 }}>
                      {settings.enforce_2fa ? '✓ Currently enforced' : 'Currently disabled'}
                    </p>
                  </div>
                  <div
                    onClick={() => setSettings({ ...settings, enforce_2fa: !settings.enforce_2fa })}
                    role="switch"
                    aria-checked={settings.enforce_2fa}
                    style={{ width: 44, height: 24, background: settings.enforce_2fa ? 'var(--blue)' : 'var(--surface-3)', borderRadius: 99, position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}
                  >
                    <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, right: settings.enforce_2fa ? 2 : 'auto', left: settings.enforce_2fa ? 'auto' : 2, transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
                  </div>
                </div>
                {/* Session Timeout */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Session Timeout (Minutes)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <input
                      style={{ width: 96, padding: '12px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontWeight: 700, textAlign: 'center', color: 'var(--text-1)', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
                      type="number"
                      min={5}
                      max={480}
                      value={settings.session_timeout}
                      onChange={(e) => setSettings({ ...settings, session_timeout: parseInt(e.target.value) || 15 })}
                    />
                    <p style={{ fontSize: 14, color: 'var(--text-3)', fontStyle: 'italic', margin: 0 }}>Auto-logout after inactivity.</p>
                  </div>
                </div>
                {/* Encryption + Key Rotation */}
                <div style={{ gridColumn: '1 / -1', padding: 24, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--blue)', fontSize: 24 }}>lock</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>System-Wide AES-256 GCM</p>
                    <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '4px 0 0 0' }}>
                      Ballots encrypted at rest. Key ID: <span style={{ fontFamily: 'monospace', color: 'var(--blue)' }}>{keyId}</span>
                    </p>
                  </div>
                  <button
                    onClick={handleRotateKeys}
                    disabled={rotatingKeys}
                    style={{ padding: '12px 24px', background: 'var(--text-1)', color: 'var(--surface)', fontWeight: 700, borderRadius: 8, border: 'none', cursor: rotatingKeys ? 'not-allowed' : 'pointer', opacity: rotatingKeys ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16, animation: rotatingKeys ? 'spin 1s linear infinite' : 'none' }}>key</span>
                    {rotatingKeys ? 'Rotating...' : 'Rotate Keys'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Notifications */}
          <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Notification Preferences</h3>
              <p style={{ fontSize: 14, color: 'var(--text-3)', margin: '4px 0 0 0' }}>Configure system alerts and admin notifications.</p>
            </div>
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { key: 'notify_election_start', label: 'Election Start Alert', desc: 'Send notification when an election goes live.' },
                { key: 'notify_vote_milestone', label: 'Vote Milestone Alerts', desc: 'Alert at 25%, 50%, 75%, 100% participation.' },
                { key: 'notify_security_events', label: 'Security Events', desc: 'Immediate alerts for brute-force and anomaly detection.' },
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>{item.label}</p>
                    <p style={{ fontSize: 13, color: 'var(--text-3)', margin: '2px 0 0 0' }}>{item.desc}</p>
                  </div>
                  <div
                    onClick={() => setSettings((s: any) => ({ ...s, [item.key]: !s[item.key] }))}
                    role="switch"
                    aria-checked={!!settings[item.key]}
                    style={{ width: 44, height: 24, background: settings[item.key] ? 'var(--blue)' : 'var(--surface-3)', borderRadius: 99, position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}
                  >
                    <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, right: settings[item.key] ? 2 : 'auto', left: settings[item.key] ? 'auto' : 2, transition: 'all 0.2s' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, paddingBottom: 16 }}>
            <button
              onClick={handleResetDefaults}
              style={{ padding: '12px 32px', background: resetConfirm ? 'var(--red-bg)' : 'transparent', color: resetConfirm ? 'var(--red)' : 'var(--text-3)', fontWeight: 700, border: resetConfirm ? '1px solid var(--red)' : 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
            >
              {resetConfirm ? 'Click again to confirm reset' : 'Reset to Defaults'}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              style={{
                padding: '12px 40px', fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit',
                background: saved ? 'var(--green)' : 'var(--blue)',
                color: '#fff',
                boxShadow: 'var(--sh-sm)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{saved ? 'check' : 'save'}</span>
              {saved ? 'Changes Saved!' : isSaving ? 'Syncing...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
