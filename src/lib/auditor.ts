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

const MOCK_ELECTION: AuditorElectionOverview = {
  id: 'mock-election-001',
  title: 'University Student Council Election',
  starts_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  ends_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  status: 'live',
};

const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-001',
    timestamp: new Date(Date.now() - 7500000).toISOString(),
    action: 'Election configuration reviewed',
    actorRole: 'auditor',
    ipAddress: '194.87.23.12',
    status: 'Success',
    details: 'Verified election rules and ballot schema.',
  },
  {
    id: 'log-002',
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    action: 'Ballot receipt anchored',
    actorRole: 'system',
    ipAddress: '127.0.0.1',
    status: 'Success',
    details: 'Merkle hash appended to integrity queue.',
  },
  {
    id: 'log-003',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    action: 'Suspicious vote pattern flagged',
    actorRole: 'system',
    ipAddress: '203.15.79.221',
    status: 'Warning',
    details: 'High traffic from single IP detected; review advised.',
  },
  {
    id: 'log-004',
    timestamp: new Date(Date.now() - 2100000).toISOString(),
    action: 'Voter validation query failed',
    actorRole: 'observer',
    ipAddress: '66.249.73.185',
    status: 'Failed',
    details: 'Voter credential mismatch during audit verification.',
  },
  {
    id: 'log-005',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    action: 'Vote tally snapshot created',
    actorRole: 'auditor',
    ipAddress: '194.87.23.12',
    status: 'Success',
    details: 'Snapshot saved for cryptographic checksum comparison.',
  },
];

const MOCK_BALLOT_RECEIPTS: BallotReceipt[] = [
  { id: 'rcpt-101', transactionHash: '0x9b4f7a28e1c79304bd2859103c847f1c4e2a1005', blockNumber: 4102, voterStatus: 'Verified', issuedAt: new Date(Date.now() - 5400000).toISOString() },
  { id: 'rcpt-102', transactionHash: '0x34c2d8f901ab43c72e8179203a451d8b9e0f31c2', blockNumber: 4101, voterStatus: 'Verified', issuedAt: new Date(Date.now() - 5100000).toISOString() },
  { id: 'rcpt-103', transactionHash: '0x58e012b67f34a1c900e823415d6789b01c2d3e4f', blockNumber: 4100, voterStatus: 'Pending',  issuedAt: new Date(Date.now() - 4800000).toISOString() },
  { id: 'rcpt-104', transactionHash: '0xdf914e2d31b08c9f56a7821903456789a0b1c2d3', blockNumber: 4099, voterStatus: 'Disputed', issuedAt: new Date(Date.now() - 4500000).toISOString() },
  { id: 'rcpt-105', transactionHash: '0xa2b7ff110c4398125d7e890123456789b0c1d2e3', blockNumber: 4098, voterStatus: 'Verified', issuedAt: new Date(Date.now() - 4200000).toISOString() },
  { id: 'rcpt-106', transactionHash: '0x10a9c8b765d4e3f2109876543210abcdef123456', blockNumber: 4097, voterStatus: 'Verified', issuedAt: new Date(Date.now() - 3900000).toISOString() },
  { id: 'rcpt-107', transactionHash: '0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f', blockNumber: 4096, voterStatus: 'Verified', issuedAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'rcpt-108', transactionHash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d', blockNumber: 4095, voterStatus: 'Pending',  issuedAt: new Date(Date.now() - 3300000).toISOString() },
  { id: 'rcpt-109', transactionHash: '0x9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b', blockNumber: 4094, voterStatus: 'Verified', issuedAt: new Date(Date.now() - 3000000).toISOString() },
  { id: 'rcpt-110', transactionHash: '0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d', blockNumber: 4093, voterStatus: 'Verified', issuedAt: new Date(Date.now() - 2700000).toISOString() },
  { id: 'rcpt-111', transactionHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b', blockNumber: 4092, voterStatus: 'Disputed', issuedAt: new Date(Date.now() - 2400000).toISOString() },
  { id: 'rcpt-112', transactionHash: '0x8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a', blockNumber: 4091, voterStatus: 'Verified', issuedAt: new Date(Date.now() - 2100000).toISOString() },
];

const MOCK_INTEGRITY: IntegritySummary = {
  merkleRoot: '7c2f3a1b5e4d8c9f231a0b6c5d4e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',
  checksum: 'sha256:8ac2bf3b1f12d4a6a9e28da8c3b9f0c4d2a7b8c9e4f5d6a7b8c9d0e1f2a3b4c5',
  lastVerifiedAt: new Date(Date.now() - 1800000).toISOString(),
};

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
    return MOCK_ELECTION;
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

  const [voterCountResult, voteCountResult, anomalyCountResult] = await Promise.all([
    supabaseAdmin.from('voters').select('id', { count: 'exact' }),
    supabaseAdmin
      .from('votes')
      .select('id', { count: 'exact' })
      .eq('election_id', election.id),
    supabaseAdmin
      .from('audit_logs')
      .select('id', { count: 'exact' })
      .eq('severity', 'anomaly'),
  ]);

  const totalRegisteredVoters = voterCountResult.count ?? 412;
  const totalVotesCast = voteCountResult.count ?? 327;
  const turnoutPercent = totalRegisteredVoters > 0 ? Math.round((totalVotesCast / totalRegisteredVoters) * 100) : 0;
  const systemAnomalyCount = anomalyCountResult.error
    ? MOCK_AUDIT_LOGS.filter((entry) => entry.status !== 'Success').length
    : anomalyCountResult.count ?? MOCK_AUDIT_LOGS.filter((entry) => entry.status !== 'Success').length;

  return {
    election,
    summary: {
      totalRegisteredVoters,
      totalVotesCast,
      turnoutPercent,
      systemAnomalyCount,
    },
    auditLog: MOCK_AUDIT_LOGS,
    ballotReceipts: MOCK_BALLOT_RECEIPTS,
    integrity: MOCK_INTEGRITY,
  };
}
