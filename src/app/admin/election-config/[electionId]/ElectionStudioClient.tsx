'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  deleteElectionCandidate,
  saveElectionCandidate,
  updateElectionBanner,
} from '../actions';
import { formatEastAfricaTime } from '@/lib/date-time';

type Election = {
  id: string;
  title: string;
  description: string | null;
  banner_url: string | null;
  starts_at: string;
  ends_at: string;
  status: string;
};

type Candidate = {
  id: string;
  name: string;
  category: string | null;
  slogan: string | null;
  statement: string | null;
  manifesto: string | null;
  goals: string | null;
  photo_url: string | null;
  status: 'pending' | 'approved' | 'rejected';
};

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 12px',
  border: '1px solid var(--border)',
  borderRadius: 8,
  background: 'var(--surface-2)',
  color: 'var(--text-1)',
  font: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 6,
  color: 'var(--text-2)',
  fontSize: 12,
  fontWeight: 700,
  textTransform: 'uppercase',
};

export function ElectionStudioClient({ election, initialCandidates }: {
  election: Election;
  initialCandidates: Candidate[];
}) {
  const [bannerUrl, setBannerUrl] = useState(election.banner_url);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [candidateFormOpen, setCandidateFormOpen] = useState(false);
  const [bannerPending, setBannerPending] = useState(false);
  const [candidatePending, setCandidatePending] = useState(false);
  const [bannerError, setBannerError] = useState('');
  const [candidateError, setCandidateError] = useState('');

  const handleBannerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBannerError('');
    setBannerPending(true);
    try {
      const updatedUrl = await updateElectionBanner(election.id, new FormData(event.currentTarget));
      setBannerUrl(updatedUrl);
    } catch (error) {
      setBannerError(error instanceof Error ? error.message : 'Could not update the election banner.');
    } finally {
      setBannerPending(false);
    }
  };

  const handleCandidateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCandidateError('');
    setCandidatePending(true);
    try {
      const candidate = await saveElectionCandidate(
        election.id,
        editingCandidate?.id ?? null,
        new FormData(event.currentTarget),
      );
      setCandidates((current) => editingCandidate
        ? current.map((item) => item.id === candidate.id ? candidate : item)
        : [...current, candidate]);
      setCandidateFormOpen(false);
      setEditingCandidate(null);
    } catch (error) {
      setCandidateError(error instanceof Error ? error.message : 'Could not save this candidate.');
    } finally {
      setCandidatePending(false);
    }
  };

  const handleDeleteCandidate = async (candidate: Candidate) => {
    if (!confirm(`Remove ${candidate.name} from this election?`)) return;
    try {
      await deleteElectionCandidate(election.id, candidate.id);
      setCandidates((current) => current.filter((item) => item.id !== candidate.id));
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Could not remove this candidate.');
    }
  };

  const openCandidateForm = (candidate: Candidate | null = null) => {
    setCandidateError('');
    setEditingCandidate(candidate);
    setCandidateFormOpen(true);
  };

  return (
    <div style={{ width: '100%', maxWidth: 1180, margin: '0 auto', padding: '8px 0 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Link href="/admin/election-config" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--blue)', fontSize: 14, fontWeight: 700, textDecoration: 'none', width: 'fit-content' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
        Election configuration
      </Link>

      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <p style={{ margin: '0 0 8px', color: 'var(--blue)', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Election studio</p>
          <h1 style={{ margin: 0, color: 'var(--text-1)', fontSize: 32, fontWeight: 850, lineHeight: 1.1 }}>{election.title}</h1>
          <p style={{ margin: '10px 0 0', color: 'var(--text-2)', fontSize: 14 }}>
            {formatEastAfricaTime(election.starts_at)} – {formatEastAfricaTime(election.ends_at)} · {election.status}
          </p>
        </div>
        <button type="button" onClick={() => openCandidateForm()} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 18px', border: 0, borderRadius: 8, color: '#fff', background: 'var(--blue)', fontWeight: 750, cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 19 }}>person_add</span>
          Add candidate
        </button>
      </header>

      <section style={{ padding: 22, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--sh-sm)' }}>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ margin: 0, color: 'var(--text-1)', fontSize: 18, fontWeight: 800 }}>Voter-facing election artwork</h2>
          <p style={{ margin: '6px 0 0', color: 'var(--text-2)', fontSize: 13 }}>This banner appears on the voter election listing and above the ballot.</p>
        </div>
        {bannerUrl && (
          <div style={{ height: 190, overflow: 'hidden', borderRadius: 8, marginBottom: 16, background: 'var(--surface-2)' }}>
            <img src={bannerUrl} alt={`${election.title} banner`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <form onSubmit={handleBannerSubmit} style={{ display: 'flex', alignItems: 'flex-end', gap: 14, flexWrap: 'wrap' }}>
          <label style={{ flex: '1 1 300px', color: 'var(--text-2)', fontSize: 13, fontWeight: 650 }}>
            {bannerUrl ? 'Replace banner image' : 'Upload banner image'}
            <input name="banner" type="file" accept="image/jpeg,image/png,image/webp,image/avif" style={{ display: 'block', width: '100%', marginTop: 8, fontSize: 13 }} />
            <span style={{ display: 'block', marginTop: 6, color: 'var(--text-3)', fontSize: 12, fontWeight: 400 }}>JPG, PNG, WebP, or AVIF · up to 4 MB</span>
          </label>
          {bannerUrl && <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-2)', fontSize: 13 }}><input name="remove_banner" type="checkbox" /> Remove current banner</label>}
          <button type="submit" disabled={bannerPending} style={{ padding: '11px 18px', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-1)', background: 'var(--surface-2)', fontWeight: 700, cursor: bannerPending ? 'wait' : 'pointer' }}>
            {bannerPending ? 'Saving…' : 'Save banner'}
          </button>
        </form>
        {bannerError && <p role="alert" style={{ margin: '12px 0 0', color: 'var(--red)', fontSize: 13, fontWeight: 650 }}>{bannerError}</p>}
      </section>

      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--sh-sm)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 22px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div>
            <h2 style={{ margin: 0, color: 'var(--text-1)', fontSize: 18, fontWeight: 800 }}>Candidates</h2>
            <p style={{ margin: '5px 0 0', color: 'var(--text-2)', fontSize: 13 }}>Portraits and approved profile content are shown to voters.</p>
          </div>
          <span style={{ color: 'var(--text-3)', fontSize: 13, fontWeight: 700 }}>{candidates.length} total</span>
        </div>
        {candidates.length === 0 ? (
          <div style={{ padding: '42px 20px', textAlign: 'center', color: 'var(--text-2)' }}>
            <span className="material-symbols-outlined" style={{ display: 'block', marginBottom: 10, color: 'var(--text-3)', fontSize: 34 }}>groups</span>
            No candidates have been added to this election.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: 720, borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: 'var(--surface-2)' }}>
                <tr>{['Candidate', 'Position', 'Profile', 'Status', ''].map((heading) => <th key={heading} style={{ padding: '12px 18px', color: 'var(--text-3)', fontSize: 11, textTransform: 'uppercase' }}>{heading}</th>)}</tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate.id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '13px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: 'var(--surface-3)' }}>
                          {candidate.photo_url ? <img src={candidate.photo_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span className="material-symbols-outlined" style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', color: 'var(--text-3)' }}>person</span>}
                        </div>
                        <span style={{ color: 'var(--text-1)', fontWeight: 750 }}>{candidate.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '13px 18px', color: 'var(--text-2)', fontSize: 13 }}>{candidate.category || 'Position not set'}</td>
                    <td style={{ padding: '13px 18px', color: 'var(--text-2)', fontSize: 13 }}>{candidate.manifesto ? 'Manifesto added' : 'No manifesto'}</td>
                    <td style={{ padding: '13px 18px' }}><span style={{ color: candidate.status === 'approved' ? 'var(--green)' : candidate.status === 'rejected' ? 'var(--red)' : 'var(--amber)', fontSize: 12, fontWeight: 750, textTransform: 'capitalize' }}>{candidate.status}</span></td>
                    <td style={{ padding: '13px 18px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button type="button" onClick={() => openCandidateForm(candidate)} style={{ marginRight: 12, padding: 0, border: 0, color: 'var(--blue)', background: 'none', fontWeight: 700, cursor: 'pointer' }}>Edit</button>
                      <button type="button" onClick={() => handleDeleteCandidate(candidate)} style={{ padding: 0, border: 0, color: 'var(--red)', background: 'none', fontWeight: 700, cursor: 'pointer' }}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {candidateFormOpen && (
        <div role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !candidatePending) setCandidateFormOpen(false); }} style={{ position: 'fixed', inset: 0, zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(9,15,30,0.62)' }}>
          <section role="dialog" aria-modal="true" aria-labelledby="candidate-form-title" style={{ width: '100%', maxWidth: 700, maxHeight: 'min(92vh, 900px)', overflowY: 'auto', padding: 24, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--sh-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
              <h2 id="candidate-form-title" style={{ margin: 0, color: 'var(--text-1)', fontSize: 21, fontWeight: 800 }}>{editingCandidate ? 'Edit candidate profile' : 'Add candidate'}</h2>
              <button type="button" aria-label="Close" onClick={() => setCandidateFormOpen(false)} style={{ border: 0, background: 'none', color: 'var(--text-3)', cursor: 'pointer' }}><span className="material-symbols-outlined">close</span></button>
            </div>
            {candidateError && <p role="alert" style={{ color: 'var(--red)', fontSize: 13, fontWeight: 650 }}>{candidateError}</p>}
            <form onSubmit={handleCandidateSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16 }}>
              <label style={labelStyle}>Candidate name *<input name="name" required defaultValue={editingCandidate?.name || ''} style={{ ...fieldStyle, display: 'block', marginTop: 6 }} /></label>
              <label style={labelStyle}>Position *<input name="category" required defaultValue={editingCandidate?.category || ''} placeholder="e.g. Guild President" style={{ ...fieldStyle, display: 'block', marginTop: 6 }} /></label>
              <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>Portrait image<input name="photo" type="file" accept="image/jpeg,image/png,image/webp,image/avif" style={{ display: 'block', marginTop: 8, color: 'var(--text-2)', fontSize: 13, textTransform: 'none', fontWeight: 400 }} />{editingCandidate?.photo_url && <span style={{ display: 'block', marginTop: 6, fontWeight: 400, textTransform: 'none' }}>Current portrait is saved. Select a new image to replace it.</span>}</label>
              {editingCandidate?.photo_url && <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-2)', fontSize: 13, gridColumn: '1 / -1' }}><input name="remove_photo" type="checkbox" /> Remove current portrait</label>}
              <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>Campaign slogan<input name="slogan" defaultValue={editingCandidate?.slogan || ''} style={{ ...fieldStyle, display: 'block', marginTop: 6 }} /></label>
              <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>Personal statement<textarea name="statement" rows={3} defaultValue={editingCandidate?.statement || ''} style={{ ...fieldStyle, display: 'block', marginTop: 6, resize: 'vertical' }} /></label>
              <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>Manifesto<textarea name="manifesto" rows={7} defaultValue={editingCandidate?.manifesto || ''} placeholder="Candidate's policy proposals and commitments" style={{ ...fieldStyle, display: 'block', marginTop: 6, resize: 'vertical' }} /></label>
              <label style={{ ...labelStyle, gridColumn: '1 / -1' }}>Key goals<textarea name="goals" rows={3} defaultValue={editingCandidate?.goals || ''} style={{ ...fieldStyle, display: 'block', marginTop: 6, resize: 'vertical' }} /></label>
              <label style={labelStyle}>Publication status<select name="status" defaultValue={editingCandidate?.status || 'pending'} style={{ ...fieldStyle, display: 'block', marginTop: 6 }}><option value="pending">Pending review</option><option value="approved">Approved for voters</option><option value="rejected">Rejected</option></select></label>
              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 4 }}>
                <button type="button" disabled={candidatePending} onClick={() => setCandidateFormOpen(false)} style={{ padding: '11px 16px', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-2)', background: 'transparent', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={candidatePending} style={{ padding: '11px 18px', border: 0, borderRadius: 8, color: '#fff', background: 'var(--blue)', fontWeight: 750, cursor: candidatePending ? 'wait' : 'pointer' }}>{candidatePending ? 'Saving…' : editingCandidate ? 'Save profile' : 'Add candidate'}</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}