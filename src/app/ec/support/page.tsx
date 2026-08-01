'use client';

import { useState } from 'react';

const FAQS = [
  { q: 'How do I reopen a voting window?', a: 'Go to Elections → select the election → Edit Window. Reopening after certification is not possible; contact System Admin for an override request.' },
  { q: 'How do I resolve a sync discrepancy?', a: 'Open Results → Anomaly & Incident Log. Most discrepancies resolve automatically once the flagged device reconnects; unresolved items after 24 hours should be escalated to System Admin.' },
  { q: 'What happens if I certify with unresolved anomalies?', a: 'Certification is blocked while any anomaly is unresolved. Resolve or formally annotate each item in the Incident Log before the Certify action becomes available.' },
  { q: 'How is candidate manifesto data secured?', a: "Manifestos are stored in Supabase with Row-Level Security scoped to the EC and the candidate's own account; nothing is publicly visible until you approve it." },
  { q: 'Can I edit an election after publishing?', a: 'You can edit election details (title, dates, eligibility) up until voting opens. Once voting starts, only the description field can be changed — position and candidate list are locked.' },
  { q: 'How do I add more voting positions?', a: 'Navigate to Elections → select the election → Positions tab. You can add positions and assign candidates to each before the voting window opens.' },
];

export default function EcSupportPage() {
  const [query, setQuery] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [ticket, setTicket] = useState({ subject: '', body: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const filtered = query.trim()
    ? FAQS.filter(f =>
        f.q.toLowerCase().includes(query.toLowerCase()) ||
        f.a.toLowerCase().includes(query.toLowerCase())
      )
    : FAQS;

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTicket({ subject: '', body: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const handleChat = () => {
    window.open('mailto:admin@evote.example.ac.ug?subject=Live%20Support%20Request', '_blank');
  };

  const card: React.CSSProperties = {
    background: 'var(--card)',
    border: '1px solid var(--card-border)',
    borderRadius: '16px',
    padding: '24px',
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {/* Hero */}
      <div style={{ background: 'var(--sidebar)', color: '#fff', borderRadius: '16px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800 }}>How can we help you today?</h1>
        <p style={{ margin: 0, color: '#B7C1E0', fontSize: '14px' }}>Access Electoral Commission support resources during the election period.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', borderRadius: '10px', padding: '10px 16px', marginTop: '8px', maxWidth: '560px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search guides: 'Reopen a window', 'Sync discrepancy', 'Certification'..."
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', color: 'var(--ink)', background: 'transparent', fontFamily: 'inherit' }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px', lineHeight: 1 }}>×</button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', alignItems: 'flex-start' }}>

        {/* FAQs */}
        <div>
          <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>
            Frequently Asked Questions
            {query && <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--muted)', marginLeft: '8px' }}>— {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{query}"</span>}
          </div>

          {filtered.length === 0 ? (
            <div style={{ ...card, textAlign: 'center', color: 'var(--muted)', fontSize: '14px' }}>
              No results for "{query}". Try a different keyword or submit a support ticket.
            </div>
          ) : (
            filtered.map((faq, idx) => (
              <div key={idx} style={{ border: '1px solid var(--card-border)', borderRadius: '10px', marginBottom: '10px', overflow: 'hidden' }}>
                <button
                  style={{
                    width: '100%', background: openIdx === idx ? 'var(--badge-blue-bg)' : '#fff',
                    border: 'none', padding: '16px 18px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontWeight: 600, fontSize: '14px', textAlign: 'left', cursor: 'pointer',
                    color: openIdx === idx ? 'var(--sidebar-active)' : 'var(--ink)',
                    transition: 'all .15s',
                  }}
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  {faq.q}
                  <svg
                    style={{ transform: openIdx === idx ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease', flexShrink: 0 }}
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div style={{
                  maxHeight: openIdx === idx ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height .25s ease',
                  background: '#FAFBFD',
                  fontSize: '13.5px',
                  color: 'var(--muted)',
                  lineHeight: 1.6,
                }}>
                  <div style={{ padding: '12px 18px 16px' }}>{faq.a}</div>
                </div>
              </div>
            ))
          )}

          {/* Ticket form */}
          <div style={{ ...card, marginTop: '24px' }}>
            <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '4px' }}>Submit a Support Ticket</div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '20px' }}>
              Can't find your answer? The EC support team will respond within 24 hours.
            </p>

            {submitted && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', color: '#065F46', fontWeight: 600, fontSize: '14px', marginBottom: '16px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Ticket submitted — we'll respond within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmitTicket} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '8px' }}>Subject</label>
                <input
                  required
                  value={ticket.subject}
                  onChange={e => setTicket(p => ({ ...p, subject: e.target.value }))}
                  placeholder="e.g. Sync discrepancy on device SE-07"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1px solid var(--card-border)', background: 'var(--page-bg)', fontSize: '14px', color: 'var(--ink)', outline: 'none', fontFamily: 'inherit' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '8px' }}>Describe your issue</label>
                <textarea
                  required
                  rows={4}
                  value={ticket.body}
                  onChange={e => setTicket(p => ({ ...p, body: e.target.value }))}
                  placeholder="Describe the issue in detail, including any error messages..."
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1px solid var(--card-border)', background: 'var(--page-bg)', fontSize: '14px', color: 'var(--ink)', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                style={{ background: 'var(--ink)', color: '#fff', fontWeight: 700, fontSize: '13.5px', padding: '11px 20px', borderRadius: '11px', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1, display: 'inline-flex', alignItems: 'center', gap: '8px', width: 'fit-content' }}
              >
                {submitting ? 'Submitting…' : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Submit Ticket
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '24px' }}>
          <div style={card}>
            <div style={{ fontSize: '16px', fontWeight: 800, marginBottom: '16px' }}>Contact Support</div>

            <div style={{ background: 'var(--page-bg)', borderRadius: '10px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '13.5px' }}>Live Chat Support</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Available: 8AM – 6PM</div>
              </div>
              <button
                onClick={handleChat}
                style={{ background: 'var(--sidebar-active)', color: '#fff', fontWeight: 700, fontSize: '13px', padding: '8px 16px', borderRadius: '9px', border: 'none', cursor: 'pointer' }}
              >
                Chat
              </button>
            </div>

            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '10px' }}>System Admin Contacts</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="mailto:admin@evote.example.ac.ug" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--sidebar-active)', textDecoration: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                admin@evote.example.ac.ug
              </a>
              <a href="tel:+256414123456" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--muted)', textDecoration: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.08 6.08l1.02-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                +256 (0) 414 123 456
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--muted)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Student Affairs Office
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', borderRadius: '12px', background: 'var(--badge-blue-bg)', color: 'var(--sidebar-active)', fontSize: '13px', lineHeight: 1.5 }}>
            <div style={{ flexShrink: 0, marginTop: '1px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            Your certification actions are logged and immutable. Not even System Admin can alter results after certification.
          </div>
        </div>
      </div>
    </div>
  );
}
