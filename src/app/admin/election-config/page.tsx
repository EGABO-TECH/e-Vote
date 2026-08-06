import { supabaseAdmin } from '@/lib/supabase';
import { ElectionConfigClient } from './ElectionConfigClient';

export default async function ElectionConfigPage() {
  const [electionsRes, candidatesRes] = await Promise.all([
    supabaseAdmin.from('elections').select('*').order('starts_at', { ascending: false }),
    supabaseAdmin.from('candidates').select('id, status'),
  ]);

  const elections = electionsRes.data ?? [];
  const candidates = candidatesRes.data ?? [];

  const stats = {
    scheduled: elections.filter(e => e.status === 'draft' || e.status === 'live').length,
    candidates: candidates.length,
    completed: elections.filter(e => e.status === 'closed').length,
  };

  return <ElectionConfigClient initialElections={elections} stats={stats} />;
}
