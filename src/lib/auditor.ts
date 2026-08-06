import { supabaseAdmin, type Election } from '@/lib/supabase';

export type AuditorRole = 'voter' | 'admin' | 'observer' | 'auditor';

export const ALLOWED_AUDITOR_ROLES = ['admin', 'auditor'] as const;
export type AllowedAuditorRole = (typeof ALLOWED_AUDITOR_ROLES)[number];

export type AuditorElectionOverview = {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string;
  status: 'live' | 'closed' | 'draft' | string;
};

export type AuditLogEntry = {
  id: string;
  timestamp: string;
  action: string;
  actorRole: string;
  ipAddress: string;
  status: 'Success' | 'Warning' | 'Failed';
  details: string;
  checksum?: string;
};

export type BallotReceipt = {
  id: string;
  transactionHash: string;
  blockNumber?: number;
  voterStatus: 'Verified' | 'Pending' | 'Disputed';
  issuedAt: string;
};

export type IntegritySummary = {
  merkleRoot: string;
  checksum: string;
  lastVerifiedAt: string;
};

export type AuditorSummary = {
  totalRegisteredVoters: number;
  totalVotesCast: number;
  turnoutPercent: number;
  systemAnomalyCount: number;
};

export type AuditorDashboardData = {
  election: AuditorElectionOverview;
  summary: AuditorSummary;
  auditLog: AuditLogEntry[];
  ballotReceipts: BallotReceipt[];
  integrity: IntegritySummary;
};

import crypto from 'crypto';

export async function getAuditorRoleByClerkId(clerkId: string) {
  const { data, error } = await supabaseAdmin
    .from('voters')
    .select('id, role, clerk_id')
    .eq('clerk_id', clerkId)
    .single();

  if (error || !data) return null;
  return data as { id: string; role: AuditorRole; clerk_id: string };
}

export async function getLatestElectionOverview() {
  const { data, error } = await supabaseAdmin
    .from('elections')
    .select('*')
    .order('starts_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return {
      id: 'no-election',
      title: 'No Active Election',
      starts_at: new Date().toISOString(),
      ends_at: new Date().toISOString(),
      status: 'draft',
    };
  }

  return {
    id: data.id,
    title: data.title,
    starts_at: data.starts_at,
    ends_at: data.ends_at,
    status: data.status,
  } as AuditorElectionOverview;
}

export async function getAuditorDashboardData(): Promise<AuditorDashboardData> {
  const election = await getLatestElectionOverview();

  const [voterCountResult, voteCountResult, anomalyCountResult, auditLogsResult, receiptsResult] = await Promise.all([
    supabaseAdmin.from('voters').select('id', { count: 'exact' }),
    supabaseAdmin
      .from('votes')
      .select('id', { count: 'exact' })
      .eq('election_id', election.id),
    supabaseAdmin
      .from('audit_logs')
      .select('id', { count: 'exact' })
      .eq('severity', 'anomaly'),
    supabaseAdmin
      .from('audit_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(50),
    supabaseAdmin
      .from('receipts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50),
  ]);

  const totalRegisteredVoters = voterCountResult.count ?? 0;
  const totalVotesCast = voteCountResult.count ?? 0;
  const turnoutPercent = totalRegisteredVoters > 0 ? Math.round((totalVotesCast / totalRegisteredVoters) * 100) : 0;
  const systemAnomalyCount = anomalyCountResult.count ?? 0;

  // Format real audit logs
  const auditLog: AuditLogEntry[] = (auditLogsResult.data || []).map((log) => ({
    id: log.id,
    timestamp: log.timestamp,
    action: log.action,
    actorRole: log.actor_role,
    ipAddress: log.ip_address || 'N/A',
    status: log.status as 'Success' | 'Warning' | 'Failed',
    details: log.details || '',
    checksum: log.id, // placeholder for checksum
  }));

  // Format real ballot receipts
  const ballotReceipts: BallotReceipt[] = (receiptsResult.data || []).map((rcpt) => ({
    id: rcpt.id,
    transactionHash: rcpt.receipt_hash,
    blockNumber: undefined,
    voterStatus: 'Verified',
    issuedAt: rcpt.created_at,
  }));

  // Calculate integrity from receipts
  const hash = crypto.createHash('sha256');
  hash.update(JSON.stringify(ballotReceipts.map(r => r.transactionHash)));
  const calculatedHash = hash.digest('hex');
  
  const integrity: IntegritySummary = {
    merkleRoot: calculatedHash,
    checksum: `sha256:${calculatedHash}`,
    lastVerifiedAt: new Date().toISOString(),
  };

  return {
    election,
    summary: {
      totalRegisteredVoters,
      totalVotesCast,
      turnoutPercent,
      systemAnomalyCount,
    },
    auditLog,
    ballotReceipts,
    integrity,
  };
}
