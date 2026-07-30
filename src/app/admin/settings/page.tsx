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
    <div className="flex-grow max-w-max-width mx-auto w-full space-y-6 lg:space-y-8 pt-2">

      {/* Page Header */}
      <div className="relative bg-gradient-to-br from-primary-container/40 via-surface to-secondary-container/20 rounded-3xl p-6 lg:p-10 border border-outline-variant/30 overflow-hidden shadow-sm mb-2 section-card">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-secondary bg-secondary/10 p-1.5 rounded-lg text-[20px]">
              settings_suggest
            </span>
            <p className="text-label-md font-bold text-secondary uppercase tracking-widest">
              Configuration
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-on-surface leading-tight tracking-tight drop-shadow-sm">
            System Settings
          </h1>
          <p className="text-body-lg lg:text-xl text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
            Configure institutional branding, cloud infrastructure, and security protocols.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-gutter items-start">

        {/* Settings Sub-Navigation (Left Column) */}
        <aside className="col-span-1 lg:col-span-3">
          {/* Mobile: horizontal scrolling tabs */}
          <div className="lg:hidden overflow-x-auto">
            <div className="flex gap-2 pb-2 min-w-max">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap text-label-md font-semibold transition-all ${activeTab === item.id
                      ? "bg-secondary-container text-on-secondary-container"
                      : "text-on-surface-variant bg-surface-container-low hover:bg-surface-container"
                    }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          {/* Desktop: sticky sidebar */}
          <div className="hidden lg:block bg-surface-container-lowest border border-outline-variant rounded-xl p-2 sticky top-24 shadow-sm card-hover">
            <nav className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${activeTab === item.id
                      ? "bg-secondary-container text-on-secondary-container"
                      : "text-on-surface-variant hover:bg-surface-container"
                    }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  <span className="text-body-md font-semibold">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Settings Content (Right Column) */}
        <div className="col-span-1 lg:col-span-9 space-y-4 lg:space-y-8">

          {/* Section 1: Institutional Branding */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm card-hover">
            <div className="p-4 lg:p-6 border-b border-outline-variant bg-surface-container-low/50">
              <h3 className="text-headline-md font-bold text-primary">Institutional Branding</h3>
              <p className="text-body-md text-on-surface-variant">Customize the platform appearance for Cavendish University Uganda.</p>
            </div>
            <div className="p-4 lg:p-8 space-y-6 lg:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
                <div className="space-y-3">
                  <label className="text-label-md text-on-surface-variant uppercase tracking-wider">University Logo</label>
                  <div className="relative group h-36 lg:h-40 border-2 border-dashed border-outline-variant rounded-xl flex flex-col justify-center items-center bg-surface hover:border-secondary transition-colors cursor-pointer overflow-hidden">
                    <img
                      className="absolute inset-0 w-full h-full object-contain p-4 opacity-50 group-hover:opacity-80 transition-opacity"
                      alt="Placeholder Logo"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO5CEUTPlJfhSdDFCbXmPMpJQWnfwCKUAEBcuHHgrQPInqAQLhouQh5QgwF5XAVmdBlHbVICaA9g5_CRs4EfAaVEHcj0z7UdR3cxqLKGtCD2DDXT_i2vuGqFYkjpENjtJrZhv1TbO3ZOVCRNJUyzCBE-fT-ovzQZvBX25xqI03hHeX5TuJeeiWUPduof0MdfSzDG2FnlkoR49lYg22TEmnOwaIbpdeqny2hAKas21j8qQZ2ei32WJEgkMWV8178wIWa5p2Bs5fCkM"
                    />
                    <div className="relative z-10 flex flex-col items-center gap-1.5 bg-surface-container-lowest/80 p-2 rounded-lg backdrop-blur-sm">
                      <span className="material-symbols-outlined text-on-surface-variant">upload_file</span>
                      <span className="text-label-md font-bold text-secondary">Change Logo</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 lg:space-y-6">
                  <div className="space-y-2">
                    <label className="text-label-md text-on-surface-variant uppercase tracking-wider">Institution Name</label>
                    <input
                      className="w-full px-4 py-2.5 lg:py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none text-on-surface"
                      type="text"
                      defaultValue="Cavendish University Uganda"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-label-md text-on-surface-variant uppercase tracking-wider">Brand Accent Color</label>
                    <div className="flex gap-3 flex-wrap">
                      <div className="w-10 h-10 rounded-full bg-secondary cursor-pointer ring-2 ring-offset-2 ring-secondary"></div>
                      <div className="w-10 h-10 rounded-full bg-[#131b2e] cursor-pointer hover:ring-2 hover:ring-offset-2 ring-primary transition-all"></div>
                      <div className="w-10 h-10 rounded-full bg-error cursor-pointer hover:ring-2 hover:ring-offset-2 ring-error transition-all"></div>
                      <div className="w-10 h-10 rounded-full bg-tertiary-container cursor-pointer hover:ring-2 hover:ring-offset-2 ring-on-tertiary-container transition-all"></div>
                      <button className="w-10 h-10 rounded-full border border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors">
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: API Endpoints */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm card-hover">
            <div className="p-4 lg:p-6 border-b border-outline-variant bg-surface-container-low/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-headline-md font-bold text-primary">Cloud Infrastructure &amp; API</h3>
                <p className="text-body-md text-on-surface-variant">Core integration points for data persistence and external verification.</p>
              </div>
              <span className="px-3 py-1 bg-on-tertiary-container/10 text-on-tertiary-container text-label-md font-bold rounded-full whitespace-nowrap self-start sm:self-center">
                System Health: Optimal
              </span>
            </div>
            <div className="p-4 lg:p-8 space-y-6 lg:space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 lg:gap-3 mb-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">database</span>
                  <h4 className="text-body-lg font-bold text-on-surface">Supabase Backend Configuration</h4>
                </div>
                <div className="space-y-2">
                  <label className="text-label-md text-on-surface-variant">PROJECT URL</label>
                  <div className="flex gap-2">
                    <input className="flex-1 px-3 lg:px-4 py-2.5 lg:py-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface-variant font-mono text-sm outline-none min-w-0" readOnly type="text" value="https://evote-cuu-instance.supabase.co" />
                    <button className="px-3 lg:px-4 py-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-all text-on-surface flex-shrink-0">
                      <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-label-md text-on-surface-variant">ANON PUBLIC KEY</label>
                  <div className="flex gap-2">
                    <input className="flex-1 px-3 lg:px-4 py-2.5 lg:py-3 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface-variant font-mono text-sm outline-none min-w-0" type="password" defaultValue="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." />
                    <button className="px-3 lg:px-4 py-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-all text-on-surface flex-shrink-0">
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-4 lg:pt-6 border-t border-outline-variant space-y-3">
                <div className="flex items-center gap-2 lg:gap-3 mb-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">account_balance</span>
                  <h4 className="text-body-lg font-bold text-on-surface">UEC Node Connectivity</h4>
                </div>
                <input className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-surface-container-low border border-outline-variant rounded-lg outline-none text-on-surface" type="text" defaultValue="https://api.uec.org.ug/v1/auth/verify-institutional" />
              </div>
            </div>
          </section>

          {/* Section 3: Security Protocols */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm card-hover">
            <div className="p-4 lg:p-6 border-b border-outline-variant bg-surface-container-low/50">
              <h3 className="text-headline-md font-bold text-primary">Security &amp; Access Protocols</h3>
              <p className="text-body-md text-on-surface-variant">Configure encryption standards and session management.</p>
            </div>
            <div className="p-4 lg:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6 lg:gap-y-8">
                {/* Toggle: 2FA */}
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <p className="text-body-md lg:text-body-lg font-bold text-on-surface">Enforce 2FA for Administrators</p>
                    <p className="text-body-md text-on-surface-variant text-sm">Require biometric or TOTP for all elevated roles.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>
                {/* Input: Session Timeout */}
                <div className="space-y-2">
                  <label className="text-label-md text-on-surface-variant uppercase tracking-wider">Session Timeout (Minutes)</label>
                  <div className="flex items-center gap-3 lg:gap-4">
                    <input className="w-24 px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg font-bold outline-none text-center text-on-surface" type="number" defaultValue="15" />
                    <p className="text-body-md text-on-surface-variant italic text-sm">Auto-logout after inactivity.</p>
                  </div>
                </div>
                {/* Encryption Display */}
                <div className="sm:col-span-2 p-4 lg:p-6 bg-surface-container-low rounded-xl border border-outline-variant flex flex-col sm:flex-row gap-4 sm:items-center">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-surface-container-lowest rounded-lg flex items-center justify-center border border-outline-variant flex-shrink-0">
                    <span className="material-symbols-outlined text-secondary text-[20px] lg:text-[24px]" style={{ fontVariationSettings: '"FILL" 1' }}>lock</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-body-md lg:text-body-lg font-bold text-on-surface">System-Wide AES-256 GCM</p>
                    <p className="text-label-md text-on-surface-variant mt-0.5">
                      Ballots encrypted at rest. Key ID: <span className="font-mono text-secondary">KID-992-U-2026</span>
                    </p>
                  </div>
                  <button className="px-4 lg:px-6 py-2 bg-primary text-on-primary text-label-md font-bold rounded-lg hover:opacity-90 transition-all active:scale-95 flex-shrink-0 w-full sm:w-auto">
                    Rotate Keys
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 pb-4">
            <button className="px-8 py-2.5 text-on-surface-variant font-bold hover:underline transition-all text-center">
              Reset to Defaults
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-8 lg:px-10 py-2.5 lg:py-3 font-bold rounded-lg shadow-lg transition-all active:scale-95 ${saved
                  ? "bg-on-tertiary-container text-white"
                  : isSaving
                    ? "bg-secondary text-on-secondary opacity-70 cursor-wait"
                    : "bg-secondary text-on-secondary hover:shadow-secondary/20"
                }`}
            >
              {saved ? "Changes Saved ✓" : isSaving ? "Syncing..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
