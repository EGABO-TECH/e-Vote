import { supabaseAdmin } from '@/lib/supabase';
import { OfflineSyncClient } from './OfflineSyncClient';

export default async function OfflineSyncPage() {
  // Fetch recent audit logs related to sync activity
  const [syncLogsRes, totalVotersRes, electionsRes, votesRes] = await Promise.all([
    supabaseAdmin.from('audit_logs').select('*').order('timestamp', { ascending: false }).limit(100),
    supabaseAdmin.from('voters').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('elections').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('votes').select('id', { count: 'exact', head: true }),
  ]);

  const syncLogs = syncLogsRes.data ?? [];
  const totalVoters = totalVotersRes.count ?? 0;
  const totalElections = electionsRes.count ?? 0;
  const totalVotes = votesRes.count ?? 0;

  return (
    <OfflineSyncClient
      initialLogs={syncLogs}
      totalVoters={totalVoters}
      totalElections={totalElections}
      totalVotes={totalVotes}
    />
  );
}
