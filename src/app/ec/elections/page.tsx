'use client';

import { useState } from 'react';
import styles from '../dashboard/page.module.css';

type Election = {
  id: string;
  title: string;
  scope: string;
  window: string;
  status: 'Draft' | 'Live' | 'Certified' | 'Awaiting certification';
};

const INITIAL_ELECTIONS: Election[] = [
  { id: '1', title: 'General Student Council Election 2026', scope: 'All faculties', window: 'Aug 11 – Aug 13, 2026', status: 'Draft' },
  { id: '2', title: 'Software Engineering Rep Election', scope: 'Dept. of Software Engineering', window: 'Jun 2 – Jun 3, 2026', status: 'Certified' },
  { id: '3', title: 'Business Faculty Guild Rep', scope: 'Faculty of Business', window: 'Jun 20 – Jun 21, 2026', status: 'Awaiting certification' },
];

const statusStyle = (status: Election['status']): React.CSSProperties => {
  const map: Record<string, { bg: string; color: string }> = {
    Draft: { bg: 'var(--badge-blue-bg)', color: 'var(--sidebar-active)' },
    Live: { bg: 'var(--green-bg)', color: 'var(--green)' },
    Certified: { bg: 'var(--green-bg)', color: 'var(--green)' },
    'Awaiting certification': { bg: 'var(--amber-bg)', color: 'var(--amber)' },
  };
  const { bg, color } = map[status] ?? map.Draft;
  return {
    display: 'inline-flex', alignItems: 'center', gap: '5px',
    fontSize: '11.5px', fontWeight: 700, padding: '4px 11px',
    borderRadius: '999px', letterSpacing: '0.02em', background: bg, color,
  };
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px', borderRadius: '9px',
  border: '1px solid var(--card-border)', background: 'var(--page-bg)',
  fontSize: '14px', color: 'var(--ink)', outline: 'none', fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11.5px', fontWeight: 700,
  letterSpacing: '0.04em', textTransform: 'uppercase',
  color: 'var(--ink)', marginBottom: '8px',
};

export default function ElectionsPage() {
  const [elections, setElections] = useState<Election[]>(INITIAL_ELECTIONS);
  const [showCreate, setShowCreate] = useState(false);
  const [saved, setSaved] = useState(false);
  const [categories, setCategories] = useState<string[]>(['Guild President', 'Speaker', 'Faculty Rep']);
  const [catInput, setCatInput] = useState('');

  const [form, setForm] = useState({
    title: '',
    scope: 'All faculties',
    opens: '',
    closes: '',
    eligibility: 'All registered voters in scope',
    biometric: false,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const opensDate = form.opens ? new Date(form.opens).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'TBD';
    const closesDate = form.closes ? new Date(form.closes).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'TBD';
    const newElection: Election = {
      id: String(Date.now()),
      title: form.title,
      scope: form.scope,
      window: `${opensDate} – ${closesDate}`,
      status: 'Draft',
    };
    setElections(prev => [newElection, ...prev]);
    setSaved(true);
    setShowCreate(false);
    setForm({ title: '', scope: 'All faculties', opens: '', closes: '', eligibility: 'All registered voters in scope', biometric: false });
    setCategories(['Guild President', 'Speaker', 'Faculty Rep']);
    setTimeout(() => setSaved(false), 4000);
  };

  const addCategory = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && catInput.trim()) {
      e.preventDefault();
      setCategories(prev => [...prev, catInput.trim()]);
      setCatInput('');
    }
  };

  const removeCategory = (idx: number) => setCategories(prev => prev.filter((_, i) => i !== idx));

  return (
    <div className={styles.container}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 4px', color: 'var(--ink)' }}>Elections</h1>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>Create and configure elections for your institution</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          style={{ background: 'var(--sidebar-active)', color: '#fff', border: 'none', padding: '11px 20px', borderRadius: '11px', fontWeight: 700, fontSize: '13.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'opacity .15s' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          {showCreate ? 'Cancel' : 'Create Election'}
        </button>
      </div>

      {/* Success toast */}
      {saved && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', color: '#065F46', fontWeight: 600, fontSize: '14px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          Election saved as Draft! It will appear in the list above until published.
        </div>
      )}

      {/* Elections table */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead>
            <tr>
              {['Election', 'Scope', 'Window', 'Status'].map(h => (
                <th key={h} style={{ textAlign: 'left', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', padding: '14px 18px', borderBottom: '1px solid var(--card-border)', fontWeight: 700, background: 'var(--page-bg)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {elections.map(e => (
              <tr key={e.id} style={{ transition: 'background .15s' }}>
                <td style={{ padding: '14px 18px', borderBottom: '1px solid var(--card-border)', fontWeight: 700, color: 'var(--ink)' }}>{e.title}</td>
                <td style={{ padding: '14px 18px', borderBottom: '1px solid var(--card-border)', color: 'var(--muted)' }}>{e.scope}</td>
                <td style={{ padding: '14px 18px', borderBottom: '1px solid var(--card-border)', color: 'var(--muted)' }}>{e.window}</td>
                <td style={{ padding: '14px 18px', borderBottom: '1px solid var(--card-border)' }}>
                  <span style={statusStyle(e.status)}>{e.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create form */}
      {showCreate && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '18px' }}>
          <form onSubmit={handleSave} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>New Election</div>

            <div>
              <label style={labelStyle}>Election Title</label>
              <input
                required
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                placeholder="e.g., General Student Council Election 2026"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Faculty / Institution Scope</label>
              <select value={form.scope} onChange={e => setForm(p => ({ ...p, scope: e.target.value }))} style={inputStyle}>
                <option>All faculties</option>
                <option>Dept. of Software Engineering</option>
                <option>Faculty of Business</option>
                <option>Faculty of Law</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '14px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Voting Opens</label>
                <input type="datetime-local" value={form.opens} onChange={e => setForm(p => ({ ...p, opens: e.target.value }))} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Voting Closes</label>
                <input type="datetime-local" value={form.closes} onChange={e => setForm(p => ({ ...p, closes: e.target.value }))} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Candidate Categories</label>
              <p style={{ fontSize: '12.5px', color: 'var(--muted)', margin: '-4px 0 10px' }}>
                Press <kbd style={{ background: 'var(--page-bg)', border: '1px solid var(--card-border)', borderRadius: '4px', padding: '1px 5px', fontSize: '11px' }}>Enter</kbd> to add a category.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                {categories.map((cat, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '999px', background: 'var(--badge-blue-bg)', color: 'var(--sidebar-active)' }}>
                    {cat}
                    <button type="button" onClick={() => removeCategory(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, lineHeight: 1, fontSize: '14px' }}>×</button>
                  </span>
                ))}
              </div>
              <input
                value={catInput}
                onChange={e => setCatInput(e.target.value)}
                onKeyDown={addCategory}
                placeholder="Add a category and press Enter"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Eligibility</label>
              <select value={form.eligibility} onChange={e => setForm(p => ({ ...p, eligibility: e.target.value }))} style={inputStyle}>
                <option>All registered voters in scope</option>
                <option>Final-year students only</option>
                <option>Custom voter list (upload)</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="bio-toggle"
                checked={form.biometric}
                onChange={e => setForm(p => ({ ...p, biometric: e.target.checked }))}
                style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--sidebar-active)' }}
              />
              <label htmlFor="bio-toggle" style={{ fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', color: 'var(--ink)' }}>
                Require biometric checkpoint at polling
              </label>
            </div>

            <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
              <button
                type="submit"
                style={{ background: 'var(--sidebar-active)', color: '#fff', fontWeight: 700, fontSize: '13.5px', padding: '11px 24px', borderRadius: '11px', border: 'none', cursor: 'pointer', transition: 'opacity .15s' }}
              >
                Save Election
              </button>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                style={{ background: 'var(--card)', color: 'var(--ink)', fontWeight: 600, fontSize: '13.5px', padding: '10px 18px', borderRadius: '11px', border: '1px solid var(--card-border)', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </form>

          <div style={{ background: 'var(--sidebar)', color: '#fff', borderRadius: '16px', padding: '24px', height: 'fit-content' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', color: '#7FA3F5', textTransform: 'uppercase', marginBottom: '10px' }}>Guidelines</div>
            <h3 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: 800 }}>Before you publish</h3>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#B7C1E0', lineHeight: 1.8 }}>
              • Voting windows cannot overlap for the same faculty.<br />
              • Categories cannot be edited once any candidate is approved into them.<br />
              • Biometric checkpoints require compatible polling devices — confirm with System Admin first.<br />
              • Save as Draft first; click Publish from the election detail page when ready.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
