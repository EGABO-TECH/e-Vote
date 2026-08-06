'use client';

import { useState, useTransition } from 'react';
import { createElection, updateElectionStatus, deleteElection } from './actions';

type Election = {
  id: string;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string;
  status: string;
};

type Stats = {
  scheduled: number;
  candidates: number;
  completed: number;
};

export function ElectionConfigClient({ initialElections, stats }: { initialElections: Election[], stats: Stats }) {
  const [elections, setElections] = useState(initialElections);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'live' | 'closed'>('all');
  const [search, setSearch] = useState('');
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState('');

  const filtered = elections.filter(e => {
    const matchesStatus = filterStatus === 'all' || e.status === filterStatus;
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    const form = e.currentTarget;
    const fd = new FormData(form);
    startTransition(async () => {
      try {
        await createElection(fd);
        setShowModal(false);
        form.reset();
        window.location.reload();
      } catch (err: any) {
        setFormError(err.message || 'Failed to create election');
      }
    });
  };

  const handleStatusUpdate = (id: string, status: string) => {
    if (!confirm(`Change status to "${status}"?`)) return;
    startTransition(async () => {
      await updateElectionStatus(id, status);
      setElections(prev => prev.map(el => el.id === id ? { ...el, status } : el));
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this election? This action cannot be undone.')) return;
    startTransition(async () => {
      await deleteElection(id);
      setElections(prev => prev.filter(el => el.id !== id));
    });
  };

  const statusColor = (s: string) => s === 'live' ? 'var(--green)' : s === 'closed' ? 'var(--text-3)' : 'var(--amber)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ position: 'relative', background: 'var(--surface)', borderRadius: 24, padding: '32px 40px', border: '1px solid var(--border)', boxShadow: 'var(--sh-md)', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 6, borderRadius: 8, fontSize: 20 }}>event_available</span>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Management Console</p>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-1)', lineHeight: 1.1, margin: 0 }}>Election Lifecycles</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', maxWidth: 600, margin: 0 }}>
              Configure upcoming electoral events, set definitive timelines, and manage candidate registrations.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{ background: 'var(--blue)', color: '#fff', padding: '16px 32px', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: 'var(--sh-blue)', whiteSpace: 'nowrap' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
            CREATE NEW ELECTION
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--blue)', background: 'var(--surface-3)', padding: 8, borderRadius: 8, fontSize: 24 }}>pending_actions</span>
            {stats.scheduled > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)', background: 'var(--surface-3)', padding: '2px 8px', borderRadius: 4 }}>Active Now</span>}
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Scheduled</p>
          <h4 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>{String(stats.scheduled).padStart(2, '0')}</h4>
        </div>
        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--text-2)', background: 'var(--surface-2)', padding: 8, borderRadius: 8, fontSize: 24 }}>person_check</span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Candidates</p>
          <h4 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>{stats.candidates}</h4>
        </div>
        <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--text-2)', background: 'var(--surface-2)', padding: 8, borderRadius: 8, fontSize: 24 }}>event_repeat</span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Completed</p>
          <h4 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>{stats.completed}</h4>
        </div>
        <div style={{ background: 'var(--blue)', color: '#fff', padding: 24, borderRadius: 16, boxShadow: 'var(--sh-blue)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Total Elections</p>
            <h4 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>{elections.length}</h4>
            <p style={{ fontSize: 14, margin: '4px 0 0 0', opacity: 0.9 }}>In system</p>
          </div>
          <span className="material-symbols-outlined" style={{ position: 'absolute', right: -10, bottom: -10, fontSize: 100, opacity: 0.1, pointerEvents: 'none' }}>schedule</span>
        </div>
      </section>

      {/* Table */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--sh-sm)' }}>
        <div style={{ padding: 24, borderBottom: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <h4 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>Election Repository</h4>
            <div style={{ display: 'flex', gap: 4 }}>
              {(['all', 'draft', 'live', 'closed'] as const).map(f => (
                <span
                  key={f}
                  onClick={() => setFilterStatus(f)}
                  style={{ padding: '4px 12px', background: filterStatus === f ? 'var(--surface-3)' : 'transparent', color: filterStatus === f ? 'var(--blue)' : 'var(--text-3)', fontSize: 12, fontWeight: filterStatus === f ? 700 : 600, borderRadius: 99, cursor: 'pointer', textTransform: 'capitalize' }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', fontSize: 18 }}>search</span>
            <input
              type="text"
              placeholder="Search elections..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '8px 16px 8px 36px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, outline: 'none', width: 250, color: 'var(--text-1)' }}
            />
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: 640 }}>
            <thead style={{ background: 'var(--surface-2)' }}>
              <tr>
                {['Election Name', 'Duration', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '16px 24px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-3)' }}>No elections found. Create one above.</td></tr>
              ) : filtered.map(el => (
                <tr key={el.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>{el.title}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{el.description || 'No description'}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: 14, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>
                    {new Date(el.starts_at).toLocaleDateString()} — {new Date(el.ends_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'var(--surface-3)', color: statusColor(el.status), fontSize: 12, fontWeight: 700, borderRadius: 99 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor(el.status) }}></span>
                      {el.status.charAt(0).toUpperCase() + el.status.slice(1)}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    {el.status === 'draft' && (
                      <button onClick={() => handleStatusUpdate(el.id, 'live')} disabled={isPending} style={{ background: 'var(--green)', color: '#fff', border: 'none', padding: '5px 14px', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Go Live</button>
                    )}
                    {el.status === 'live' && (
                      <button onClick={() => handleStatusUpdate(el.id, 'closed')} disabled={isPending} style={{ background: 'var(--amber)', color: '#fff', border: 'none', padding: '5px 14px', borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Close</button>
                    )}
                    <button onClick={() => handleDelete(el.id)} disabled={isPending} style={{ background: 'none', border: 'none', color: 'var(--red)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Create Election Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 40, width: '100%', maxWidth: 560, boxShadow: 'var(--sh-lg)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-1)', margin: 0 }}>Create New Election</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)' }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            {formError && <p style={{ color: 'var(--red)', marginBottom: 16, fontSize: 14 }}>{formError}</p>}
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Election Title *</label>
                <input name="title" required placeholder="e.g. Student Guild President 2026" style={{ marginTop: 6, width: '100%', padding: '12px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, color: 'var(--text-1)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                <textarea name="description" rows={3} placeholder="Optional description..." style={{ marginTop: 6, width: '100%', padding: '12px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, color: 'var(--text-1)', outline: 'none', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Start Date *</label>
                  <input name="starts_at" type="datetime-local" required style={{ marginTop: 6, width: '100%', padding: '12px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, color: 'var(--text-1)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>End Date *</label>
                  <input name="ends_at" type="datetime-local" required style={{ marginTop: 6, width: '100%', padding: '12px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, color: 'var(--text-1)', outline: 'none' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Initial Status</label>
                <select name="status" defaultValue="draft" style={{ marginTop: 6, width: '100%', padding: '12px 16px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, color: 'var(--text-1)', outline: 'none' }}>
                  <option value="draft">Draft</option>
                  <option value="live">Live</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '12px 24px', background: 'transparent', color: 'var(--text-2)', border: '1px solid var(--border)', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={isPending} style={{ padding: '12px 32px', background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', opacity: isPending ? 0.7 : 1 }}>
                  {isPending ? 'Creating...' : 'Create Election'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
