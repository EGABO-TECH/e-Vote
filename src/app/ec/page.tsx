export const dynamic = 'force-dynamic';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';

export default async function EcDashboardPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  // Fetch real data from Supabase
  const { data: elections, error: electionsError } = await supabaseAdmin
    .from('elections')
    .select('*')
    .order('starts_at', { ascending: false });

  const activeElection = elections?.[0] || null;

  const [votersCount, candidatesResult, votesResult] = await Promise.all([
    supabaseAdmin.from('voters').select('id', { count: 'exact' }),
    supabaseAdmin.from('candidates').select('id, status', { count: 'exact' }),
    supabaseAdmin.from('votes').select('id', { count: 'exact' }),
  ]);

  const totalVoters = votersCount.count ?? 0;
  
  const candidatesList = candidatesResult.data || [];
  const candidatesApproved = candidatesList.filter(c => c.status === 'approved').length;
  const candidatesPending = candidatesList.filter(c => c.status === 'pending').length;

  const totalVotes = votesResult.count ?? 0;

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
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '0.75rem', maxWidth: '480px' }}>
            {activeElection ? activeElection.title : 'No Active Election'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            {activeElection ? `Status: ${activeElection.status} · Ends at ${new Date(activeElection.ends_at).toLocaleDateString()}` : 'Please create an election to begin'}
          </p>
          <Link href="/ec/candidates" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '14px 28px',
            background: 'var(--blue)', color: '#fff',
            borderRadius: 'var(--r-md)', fontWeight: 800, fontSize: '1rem',
            textDecoration: 'none', letterSpacing: '0.02em',
            boxShadow: 'var(--sh-blue)',
            transition: 'all 0.2s',
          }}>
            Review Pending Candidates
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>how_to_reg</span>
          </Link>
        </div>
        <span className="material-symbols-outlined" style={{ fontSize: '6rem', opacity: 0.15, userSelect: 'none', flexShrink: 0 }}>bar_chart</span>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
        <div style={{
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
            background: 'var(--blue)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#fff', fontVariationSettings: '"FILL" 1' }}>groups</span>
          </div>
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>VOTERS</p>
            <p style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-1)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{totalVoters.toLocaleString()}</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-2)' }}>Registered</p>
          </div>
        </div>

        <div style={{
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
            background: 'var(--amber)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#fff', fontVariationSettings: '"FILL" 1' }}>person_raised_hand</span>
          </div>
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>CANDIDATES</p>
            <p style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-1)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{candidatesApproved} / {candidatesPending}</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--amber)' }}>{candidatesPending} pending review</p>
          </div>
        </div>

        <div style={{
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
            background: 'var(--green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#fff', fontVariationSettings: '"FILL" 1' }}>how_to_vote</span>
          </div>
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>VOTES CAST</p>
            <p style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-1)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{totalVotes.toLocaleString()}</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--green)' }}>Recorded accurately</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', boxShadow: 'var(--sh-sm)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-1)' }}>Your Elections</p>
            <Link href="/ec/elections" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}>
              Manage all
            </Link>
          </div>
          <div style={{ padding: '0 1.5rem' }}>
            {elections && elections.length > 0 ? (
              elections.map((el, i) => (
                <div key={el.id} style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '1.25rem 0',
                  borderBottom: i !== elections.length - 1 ? '1px solid var(--border)' : 'none'
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'var(--surface-3)', color: 'var(--blue)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '0.85rem'
                  }}>
                    {el.title.substring(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-1)' }}>{el.title}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-3)' }}>{el.description || 'No description'}</div>
                  </div>
                  <div style={{
                    fontSize: '0.75rem', fontWeight: 700, color: el.status === 'live' ? 'var(--green)' : 'var(--amber)',
                    padding: '6px 12px', background: 'var(--surface-3)', borderRadius: '6px'
                  }}>
                    {el.status}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-3)' }}>
                No elections found.
              </div>
            )}
          </div>
        </div>

        <div style={{
          background: 'var(--navy)', border: '1px solid var(--navy-mid)',
          borderRadius: 'var(--r-lg)', padding: '1.5rem', color: '#fff',
          display: 'flex', flexDirection: 'column'
        }}>
          <h3 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--blue-glow)', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
            CERTIFICATION STATUS
          </h3>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2, margin: '0 0 1rem 0' }}>
            {activeElection && activeElection.status === 'closed' ? 'Ready for certification' : 'Not yet certified'}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: '2rem', flex: 1 }}>
            {activeElection 
              ? `${activeElection.title} has not been certified. Results and the public audit ledger will remain unpublished until certification.`
              : 'No active election available to certify.'}
          </p>
          <Link href="/ec/results" style={{
            fontSize: '0.9375rem', fontWeight: 600, color: '#fff', textDecoration: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            Go to Results
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
