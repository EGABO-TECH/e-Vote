import { supabaseAdmin } from '@/lib/supabase';
import { AuditLogsClient } from './AuditLogsClient';

export default async function AuditLogsPage() {
  const [logsRes, totalRes, alertsRes] = await Promise.all([
    supabaseAdmin.from('audit_logs').select('*').order('timestamp', { ascending: false }).limit(500),
    supabaseAdmin.from('audit_logs').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('audit_logs').select('id', { count: 'exact', head: true }).eq('severity', 'critical'),
  ]);

  const logs = logsRes.data ?? [];
  const totalEvents = totalRes.count ?? 0;
  const securityAlerts = alertsRes.count ?? 0;

  return <AuditLogsClient initialLogs={logs} totalEvents={totalEvents} securityAlerts={securityAlerts} />;
}
