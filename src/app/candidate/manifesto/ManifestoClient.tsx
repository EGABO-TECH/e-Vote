'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { saveManifesto } from './actions';

const categories = ['President', 'Vice President', 'Secretary General', 'Treasurer', 'Guild Representative'];

export function ManifestoClient({ initialProfile, openElections }: { initialProfile: any, openElections: any[] }) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    category: initialProfile?.category || '',
    slogan: initialProfile?.slogan || '',
    statement: initialProfile?.statement || '',
    manifesto: initialProfile?.manifesto || '',
    goals: initialProfile?.goals || '',
    election_id: initialProfile?.election_id || '',
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveManifesto(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
      alert('Failed to save manifesto');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Edit Manifesto</h1>
          <p className={styles.pageSubtitle}>Your public-facing candidate profile and policy statements</p>
        </div>
        <button onClick={handleSave} disabled={saving} className={`${styles.saveBtn} ${saved ? styles.saved : ''}`}>
          {saving ? (
            <>Saving...</>
          ) : saved ? (
            <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Saved!</>
          ) : (
            <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>Save Changes</>
          )}
        </button>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formMain}>
          {/* Election */}
          <div className={styles.fieldCard}>
            <label className={styles.fieldLabel}>Election</label>
            <select
              className={styles.select}
              value={form.election_id}
              onChange={e => handleChange('election_id', e.target.value)}
            >
              <option value="">-- Select an election --</option>
              {openElections.map(e => <option key={e.id} value={e.id}>{e.title}</option>)}
            </select>
          </div>

          {/* Category */}
          <div className={styles.fieldCard}>
            <label className={styles.fieldLabel}>Running For Position</label>
            <select
              className={styles.select}
              value={form.category}
              onChange={e => handleChange('category', e.target.value)}
            >
              <option value="">-- Select a position --</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Slogan */}
          <div className={styles.fieldCard}>
            <label className={styles.fieldLabel}>Campaign Slogan</label>
            <p className={styles.fieldHint}>A short, memorable statement that represents your campaign.</p>
            <input
              className={styles.input}
              value={form.slogan}
              onChange={e => handleChange('slogan', e.target.value)}
              placeholder="e.g., Integrity. Transparency. Progress."
            />
          </div>

          {/* Personal Statement */}
          <div className={styles.fieldCard}>
            <label className={styles.fieldLabel}>Personal Statement</label>
            <p className={styles.fieldHint}>Introduce yourself to voters. This appears at the top of your public profile.</p>
            <textarea
              className={styles.textarea}
              rows={6}
              value={form.statement}
              onChange={e => handleChange('statement', e.target.value)}
              placeholder="Write your personal statement here..."
            />
            <div className={styles.charCount}>{form.statement.length} / 1000 characters</div>
          </div>

          {/* Full Manifesto */}
          <div className={styles.fieldCard}>
            <label className={styles.fieldLabel}>Full Policy Manifesto</label>
            <p className={styles.fieldHint}>Detail your specific policy proposals and plans for office.</p>
            <textarea
              className={styles.textarea}
              rows={12}
              value={form.manifesto}
              onChange={e => handleChange('manifesto', e.target.value)}
              placeholder="Outline your key policy pillars..."
            />
          </div>

          {/* Goals */}
          <div className={styles.fieldCard}>
            <label className={styles.fieldLabel}>Key Measurable Goals</label>
            <p className={styles.fieldHint}>Specific, quantifiable targets you commit to achieving if elected.</p>
            <textarea
              className={styles.textarea}
              rows={4}
              value={form.goals}
              onChange={e => handleChange('goals', e.target.value)}
              placeholder="e.g., Reduce wait times by 50%..."
            />
          </div>
        </div>

        {/* Sidebar info cards */}
        <div className={styles.formSidebar}>
          <div className={styles.infoCard}>
            <div className={styles.infoCardIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className={styles.infoCardTitle}>Submission Guidelines</h3>
            <ul className={styles.infoList}>
              <li>Keep your statement honest and fact-based.</li>
              <li>Policy promises should be realistic and specific.</li>
              <li>Avoid defamatory language about other candidates.</li>
              <li>All submissions are reviewed by the Electoral Commission.</li>
            </ul>
          </div>
          <div className={styles.infoCard} style={{ background: '#1E293B', color: '#fff' }}>
            <div className={styles.infoCardIcon} style={{ background: 'rgba(255,255,255,0.1)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className={styles.infoCardTitle} style={{ color: '#fff' }}>EC Review Status</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
              <span style={{ color: '#10B981', fontWeight: 600, fontSize: '0.875rem' }}>Approved</span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.8125rem', marginTop: 8, lineHeight: 1.5 }}>
              Your manifesto has been reviewed and approved by the Electoral Commission. Any edits will require re-review.
            </p>
          </div>
          <a href="/candidate/preview" className={styles.previewBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
            </svg>
            Preview as Voters See It
          </a>
        </div>
      </div>
    </div>
  );
}
