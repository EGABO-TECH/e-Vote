export const dynamic = 'force-dynamic';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';

export default async function CandidateDashboardPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
  const avatarUrl = user.imageUrl;

  // Fetch candidate record
  const { data: candidate, error: candidateError } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .eq('clerk_id', user.id)
    .single();

  // Fetch active election
  const { data: elections, error: electionsError } = await supabaseAdmin
    .from('elections')
    .select('*')
    .order('starts_at', { ascending: false });

  const activeElection = elections?.[0] || null;
  const electionName = activeElection ? activeElection.title : 'No Active Election';

  // Calculate time remaining if election is active
  let timeRemainingText = 'N/A';
  if (activeElection && activeElection.status === 'live') {
    const endsAt = new Date(activeElection.ends_at);
    const now = new Date();
    const diffTime = Math.abs(endsAt.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    timeRemainingText = `${diffDays} DAYS`;
  } else if (activeElection && activeElection.status === 'draft') {
    const startsAt = new Date(activeElection.starts_at);
    const now = new Date();
    const diffTime = Math.abs(startsAt.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    timeRemainingText = `OPENS IN ${diffDays} DAYS`;
  } else if (activeElection && activeElection.status === 'closed') {
    timeRemainingText = 'ELECTION CLOSED';
  }

  // Profile Completeness Calculation
  let completeness = 0;
  if (candidate) {
    const fields = ['name', 'category', 'slogan', 'statement', 'manifesto', 'goals', 'photo_url'];
    const filledFields = fields.filter(f => !!candidate[f]).length;
    completeness = Math.round((filledFields / fields.length) * 100);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)',
        borderRadius: 'var(--r-lg)',
        padding: '2.5rem',
        color: '#fff',
        boxShadow: 'var(--sh-lg)',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '2rem',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: '-80px', right: '120px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', background: 'rgba(59,130,246,0.25)', borderRadius: '999px', border: '1px solid rgba(59,130,246,0.5)', marginBottom: '1rem' }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--blue-glow)', borderRadius: '50%', animation: 'pulse-dot 1.5s infinite' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{timeRemainingText}</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '0.75rem', maxWidth: '480px' }}>
            {electionName}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Candidate status: {candidate ? (candidate.status || 'Pending Review').toUpperCase() : 'Not Registered'}
          </p>
          <Link href="/candidate/manifesto" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '14px 28px',
            background: 'var(--blue)', color: '#fff',
            borderRadius: 'var(--r-md)', fontWeight: 800, fontSize: '1rem',
            textDecoration: 'none', letterSpacing: '0.02em',
            boxShadow: 'var(--sh-blue)',
            transition: 'all 0.2s',
          }}>
            Edit Manifesto
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit_document</span>
          </Link>
        </div>
        <span className="material-symbols-outlined" style={{ fontSize: '6rem', opacity: 0.15, userSelect: 'none', flexShrink: 0 }}>campaign</span>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'MANIFESTO VIEWS', value: '0', icon: 'visibility', color: 'var(--blue)', sub: 'Analytics coming soon', isPositive: true },
          { label: 'PROFILE', value: `${completeness}%`, icon: 'person', color: completeness === 100 ? 'var(--green)' : 'var(--amber)', sub: 'Dossier Completion', isPositive: completeness === 100 },
          { label: 'LAST UPDATE', value: candidate?.created_at ? new Date(candidate.created_at).toLocaleDateString() : 'N/A', icon: 'update', color: 'var(--text-2)', sub: 'Current', isPositive: true },
        ].map((s) => (
          <div key={s.label} style={{
            background: 'var(--surface)',
            borderRadius: 'var(--r-lg)',
            padding: '1.25rem 1.5rem',
            border: '1px solid var(--border)',
            boxShadow: 'var(--sh-sm)',
            display: 'flex', alignItems: 'center', gap: '14px',
          }}>
            <div style={{
              width: '42px', height: '42px',
              borderRadius: 'var(--r-md)',
              background: s.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#fff', fontVariationSettings: '"FILL" 1' }}>{s.icon}</span>
            </div>
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</p>
              <p style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-1)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{s.value}</p>
              <p style={{ fontSize: '0.72rem', color: s.isPositive ? 'var(--green)' : 'var(--text-2)' }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two columns: Your Manifesto + Support */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>

        <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-1)' }}>Your Manifesto</p>
            <Link href="/candidate/preview" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>
              Preview Public Profile
            </Link>
          </div>
          <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--surface-2)', borderRadius: '8px' }}>
              {candidate?.photo_url || avatarUrl ? (
                <img src={candidate?.photo_url || avatarUrl} alt={fullName} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-3)', color: 'var(--blue)', fontWeight: 'bold' }}>
                  {fullName[0] || 'C'}
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-1)' }}>{candidate?.name || fullName || 'Your Name'}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-3)' }}>{candidate?.category || 'Candidate'}</div>
              </div>
              {candidate?.status && (
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: candidate.status === 'approved' ? 'var(--green)' : 'var(--blue)', padding: '6px 12px', background: '#EFF6FF', borderRadius: '6px' }}>
                  {candidate.status.toUpperCase()}
                </div>
              )}
            </div>
            
            <div style={{ fontSize: '0.9375rem', color: 'var(--text-2)', lineHeight: 1.6, padding: '16px', borderLeft: '2px solid var(--border)', marginLeft: '20px', fontStyle: 'italic' }}>
              {candidate?.statement || 'Your manifesto excerpt will appear here after you fill in your personal statement in the Manifesto section.'}
            </div>
            
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              <Link href="/candidate/manifesto" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '10px 20px', background: 'var(--navy)', color: 'var(--surface)',
                borderRadius: 'var(--r-sm)', fontSize: '0.875rem', fontWeight: 600,
                textDecoration: 'none'
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
                Edit Manifesto
              </Link>
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--navy)', border: '1px solid var(--navy-mid)',
          borderRadius: 'var(--r-lg)', padding: '1.5rem', color: '#fff',
          display: 'flex', flexDirection: 'column'
        }}>
          <h3 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--blue-glow)', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
            SUPPORT HUB
          </h3>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2, margin: '0 0 1rem 0' }}>
            Need assistance with your campaign?
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: '2rem', flex: 1 }}>
            Our dedicated candidate support team is available 24/7 during the election period.
          </p>
          <Link href="/candidate/support" style={{
            fontSize: '0.9375rem', fontWeight: 600, color: '#fff', textDecoration: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            Contact Electoral Commission
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
