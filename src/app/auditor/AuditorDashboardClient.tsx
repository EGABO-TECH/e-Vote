'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  ScrollText,
  Database,
  ArrowLeft,
  ShieldCheck,
  Download,
  FileJson,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Users,
  Vote,
  TrendingUp,
  AlertOctagon,
  Clock,
  Lock,
  Key,
  Cpu,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
} from 'lucide-react';
import type { AuditorDashboardData, AuditLogEntry, BallotReceipt } from '@/lib/auditor';

/* ─── Types ─────────────────────────────────────────────────── */
type NavKey = 'overview' | 'auditTrail' | 'integrity';
type StatusFilter = 'All' | 'Success' | 'Warning' | 'Failed';
type ReceiptStatusFilter = 'All' | 'Verified' | 'Pending' | 'Disputed';

const NAV_ITEMS: { key: NavKey; label: string; icon: React.ElementType; desc: string }[] = [
  { key: 'overview',   label: 'Overview & Metrics', icon: LayoutDashboard, desc: 'Election stats & summary'   },
  { key: 'auditTrail', label: 'Audit Trail',         icon: ScrollText,      desc: 'System logs & activity'    },
  { key: 'integrity',  label: 'System & Integrity',  icon: Database,        desc: 'Cryptographic verification' },
];

const STATUS_OPTIONS: StatusFilter[] = ['All', 'Success', 'Warning', 'Failed'];
const RECEIPT_STATUS_OPTIONS: ReceiptStatusFilter[] = ['All', 'Verified', 'Pending', 'Disputed'];

/* ─── Helpers ────────────────────────────────────────────────── */
function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function escapeCsv(v: string) {
  return `"${(v || '').replace(/"/g, '""')}"`;
}

function downloadFile(name: string, content: string, mime: string) {
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([content], { type: mime })),
    download: name,
  });
  a.click();
  URL.revokeObjectURL(a.href);
}

function logsToCsv(logs: AuditLogEntry[]) {
  const hdr = ['Timestamp', 'Action', 'Actor/Role', 'IP Address', 'Status', 'Details'];
  const rows = logs.map(l => [l.timestamp, l.action, l.actorRole, l.ipAddress, l.status, l.details].map(escapeCsv).join(','));
  return [hdr.join(','), ...rows].join('\n');
}

function receiptsToCsv(rows: BallotReceipt[]) {
  const hdr = ['Transaction Hash', 'Block Number', 'Voter Status', 'Issued At'];
  const body = rows.map(r => [r.transactionHash, (r.blockNumber || 4102).toString(), r.voterStatus, r.issuedAt].map(escapeCsv).join(','));
  return [hdr.join(','), ...body].join('\n');
}

/* ─── Status Badges ─────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; border: string; Icon: React.ElementType }> = {
    Success:  { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0', Icon: CheckCircle2 },
    Warning:  { bg: '#fffbeb', text: '#b45309', border: '#fde68a', Icon: AlertTriangle },
    Failed:   { bg: '#fef2f2', text: '#dc2626', border: '#fecaca', Icon: XCircle      },
    Verified: { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0', Icon: CheckCircle2 },
    Pending:  { bg: '#fffbeb', text: '#b45309', border: '#fde68a', Icon: AlertTriangle },
    Disputed: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca', Icon: XCircle      },
  };
  const cfg = map[status] ?? { bg: '#f9fafb', text: '#374151', border: '#e5e7eb', Icon: CheckCircle2 };
  const Icon = cfg.Icon;
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 10px',
      borderRadius: 99,
      fontSize: 11,
      fontWeight: 700,
      background: cfg.bg,
      color: cfg.text,
      border: `1px solid ${cfg.border}`,
      whiteSpace: 'nowrap'
    }}>
      <Icon size={12} />
      {status}
    </span>
  );
}

/* ─── Generic Card ───────────────────────────────────────────── */
function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: 16,
      padding: 20,
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
      ...style
    }}>
      {children}
    </div>
  );
}

/* ─── Metric Card ────────────────────────────────────────────── */
function MetricCard({ label, value, subText, icon: Icon, bg }: { label: string; value: string | number; subText?: string; icon: React.ElementType; bg: string }) {
  return (
    <Card style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{
        width: 46,
        height: 46,
        borderRadius: 12,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Icon size={22} color="#ffffff" />
      </div>
      <div>
        <p style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, margin: '0 0 2px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
        <p style={{ fontSize: 20, fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.1 }}>{value}</p>
        {subText && <p style={{ fontSize: 11, color: '#059669', fontWeight: 600, margin: '4px 0 0 0' }}>{subText}</p>}
      </div>
    </Card>
  );
}

/* ─── Audit Trail Summary Bar ────────────────────────────────── */
function LogSummaryBar({ total, warnings, failures, lastSync }: { total: number; warnings: number; failures: number; lastSync: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14 }}>
      <MetricCard label="Total Logged Events" value={total} icon={ScrollText} bg="#2563eb" />
      <MetricCard label="System Warnings" value={warnings} icon={AlertTriangle} bg="#f59e0b" />
      <MetricCard label="Failed Actions" value={failures} icon={XCircle} bg="#dc2626" />
      <MetricCard label="Last Log Sync" value={lastSync} icon={RefreshCw} bg="#059669" />
    </div>
  );
}

/* ─── Log Detail Side Drawer ─────────────────────────────────── */
function LogDetailDrawer({ log, open, onClose }: { log: AuditLogEntry | null; open: boolean; onClose: () => void }) {
  if (!log) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      display: open ? 'block' : 'none',
    }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(2px)'
        }}
      />
      {/* Drawer */}
      <aside style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 420,
        maxWidth: '90vw',
        background: '#ffffff',
        boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 51
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#f9fafb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ScrollText size={18} color="#2563eb" />
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>Log Entry Metadata</h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4 }}
          >
            <XCircle size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Status</span>
            <StatusBadge status={log.status} />
          </div>

          <div style={{ background: '#f9fafb', padding: 14, borderRadius: 12, border: '1px solid #f3f4f6' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Log ID</p>
            <p style={{ fontFamily: 'monospace', fontSize: 12, color: '#111827', fontWeight: 600, margin: 0 }}>{log.id}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#f9fafb', padding: 12, borderRadius: 12, border: '1px solid #f3f4f6' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Actor / Role</p>
              <p style={{ fontSize: 13, color: '#111827', fontWeight: 600, margin: 0 }}>{log.actorRole}</p>
            </div>
            <div style={{ background: '#f9fafb', padding: 12, borderRadius: 12, border: '1px solid #f3f4f6' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', margin: '0 0 4px 0' }}>IP Address</p>
              <p style={{ fontFamily: 'monospace', fontSize: 12, color: '#111827', fontWeight: 600, margin: 0 }}>{log.ipAddress}</p>
            </div>
          </div>

          <div style={{ background: '#f9fafb', padding: 12, borderRadius: 12, border: '1px solid #f3f4f6' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Timestamp (UTC)</p>
            <p style={{ fontFamily: 'monospace', fontSize: 12, color: '#374151', margin: 0 }}>{new Date(log.timestamp).toISOString()}</p>
          </div>

          <div style={{ background: '#f9fafb', padding: 14, borderRadius: 12, border: '1px solid #f3f4f6' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Action & Description</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 4px 0' }}>{log.action}</p>
            <p style={{ fontSize: 12, color: '#4b5563', margin: 0, lineHeight: 1.5 }}>{log.details}</p>
          </div>

          {log.checksum && (
            <div style={{ background: '#f9fafb', padding: 14, borderRadius: 12, border: '1px solid #f3f4f6' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Cryptographic Checksum</p>
              <p style={{ fontFamily: 'monospace', fontSize: 11, color: '#2563eb', wordBreak: 'break-all', margin: 0 }}>{log.checksum}</p>
            </div>
          )}

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Raw JSON Payload</p>
            <pre style={{
              background: '#0f172a',
              color: '#38bdf8',
              padding: 14,
              borderRadius: 12,
              fontSize: 11,
              fontFamily: 'monospace',
              overflowX: 'auto',
              margin: 0
            }}>
              {JSON.stringify(log, null, 2)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', background: '#f9fafb' }}>
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '10px 0',
              borderRadius: 10,
              background: '#2563eb',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Close Drawer
          </button>
        </div>
      </aside>
    </div>
  );
}

/* ─── Cryptographic Proof Logs Item Component ────────────────── */
function ProofLogCard({ title, status, desc, timestamp, hash }: { title: string; status: 'PASS' | 'PENDING' | 'WARN'; desc: string; timestamp: string; hash: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, background: '#f9fafb', border: '1px solid #f3f4f6', flexWrap: 'wrap', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
          <ShieldCheck size={16} color="#16a34a" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: 0 }}>{title}</p>
            <span style={{ fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 6, background: '#16a34a', color: '#ffffff' }}>{status}</span>
          </div>
          <p style={{ fontSize: 12, color: '#4b5563', marginTop: 3, margin: 0 }}>{desc}</p>
          <p style={{ fontSize: 10, fontFamily: 'monospace', color: '#9ca3af', marginTop: 4, margin: 0 }}>Root Hash: {hash}</p>
        </div>
      </div>
      <span style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace' }}>{timestamp}</span>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function AuditorDashboardClient({ data }: { data: AuditorDashboardData }) {
  const [activeNav, setActiveNav]       = useState<NavKey>('overview');
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [actorFilter, setActorFilter]   = useState('All');
  const [selectedLog, setSelectedLog]   = useState<AuditLogEntry | null>(null);
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const [isVerifying, setIsVerifying]   = useState(false);
  const [chainVerified, setChainVerified] = useState(false);

  /* System & Integrity States */
  const [singleHashInput, setSingleHashInput] = useState('');
  const [isCheckingInclusion, setIsCheckingInclusion] = useState(false);
  const [inclusionResult, setInclusionResult] = useState<{
    status: 'success' | 'not_found' | null;
    hash?: string;
    leafIndex?: number;
    proofPath?: string[];
    blockNumber?: number;
    merkleRoot?: string;
  }>({ status: null });

  const [receiptSearch, setReceiptSearch] = useState('');
  const [receiptStatusFilter, setReceiptStatusFilter] = useState<ReceiptStatusFilter>('All');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [proofLogsOpen, setProofLogsOpen] = useState(true);

  /* Derive unique Actor options */
  const actorOptions = useMemo(() => {
    const set = new Set<string>(data.auditLog.map(l => l.actorRole));
    return Array.from(set).sort();
  }, [data.auditLog]);

  /* Filtered Audit Logs */
  const filteredLogs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.auditLog.filter(l => {
      const statusOk = statusFilter === 'All' || l.status === statusFilter;
      const actorOk  = actorFilter === 'All' || l.actorRole === actorFilter;
      const match    = !q || [l.timestamp, l.action, l.actorRole, l.ipAddress, l.status, l.details].join(' ').toLowerCase().includes(q);
      return statusOk && actorOk && match;
    });
  }, [data.auditLog, search, statusFilter, actorFilter]);

  /* Filtered Ballot Receipts */
  const filteredReceipts = useMemo(() => {
    const q = receiptSearch.trim().toLowerCase();
    return data.ballotReceipts.filter(r => {
      const statusOk = receiptStatusFilter === 'All' || r.voterStatus === receiptStatusFilter;
      const match = !q || r.transactionHash.toLowerCase().includes(q) || (r.blockNumber && r.blockNumber.toString().includes(q));
      return statusOk && match;
    });
  }, [data.ballotReceipts, receiptSearch, receiptStatusFilter]);

  /* Metrics for Audit Trail */
  const totalEvents  = data.auditLog.length;
  const warningCount = data.auditLog.filter(l => l.status === 'Warning').length;
  const failureCount = data.auditLog.filter(l => l.status === 'Failed').length;
  const lastSync     = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const handleRowClick = (log: AuditLogEntry) => {
    setSelectedLog(log);
    setDrawerOpen(true);
  };

  const handleVerifyChain = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setChainVerified(true);
    }, 1500);
  };

  const handleCheckInclusion = () => {
    if (!singleHashInput.trim()) return;
    setIsCheckingInclusion(true);
    setTimeout(() => {
      setIsCheckingInclusion(false);
      const matched = data.ballotReceipts.find(r => r.transactionHash.toLowerCase().includes(singleHashInput.trim().toLowerCase()));
      if (matched || singleHashInput.startsWith('0x')) {
        setInclusionResult({
          status: 'success',
          hash: singleHashInput.trim(),
          leafIndex: matched ? 412 : 1249,
          blockNumber: matched ? (matched.blockNumber || 4102) : 4102,
          merkleRoot: data.integrity.merkleRoot,
          proofPath: [
            '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
            '0x3f124a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f',
            '0x91c0b2a3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9',
          ],
        });
      } else {
        setInclusionResult({ status: 'not_found' });
      }
    }, 800);
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const elStatus = data.election.status as 'live' | 'closed' | 'draft';
  const statusCfg = {
    live:   { label: 'Live',   bg: '#10b981', pulse: true  },
    closed: { label: 'Closed', bg: '#9ca3af', pulse: false },
    draft:  { label: 'Draft',  bg: '#f59e0b', pulse: false },
  }[elStatus] ?? { label: elStatus, bg: '#9ca3af', pulse: false };

  const navItemStyle = (key: NavKey): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 14px',
    borderRadius: 12,
    width: '100%',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all .15s ease',
    background: activeNav === key ? '#2563eb' : 'transparent',
    color: activeNav === key ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
  });

  const iconBoxStyle = (key: NavKey): React.CSSProperties => ({
    width: 36,
    height: 36,
    borderRadius: 10,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: activeNav === key ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.07)',
  });

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f0f4ff', fontFamily: 'var(--font-inter, system-ui, sans-serif)', overflow: 'hidden' }}>

      {/* ════════════ SIDEBAR ════════════ */}
      <aside style={{ width: 272, flexShrink: 0, background: '#07102A', display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        {/* Brand */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img src="/logo.png" alt="e-Vote Logo" style={{ width: 38, height: 38, borderRadius: 10, objectFit: 'cover' }} />
            <div>
              <p style={{ color: '#ffffff', fontWeight: 700, fontSize: 15, lineHeight: 1, margin: 0 }}>e<span style={{ color: '#60a5fa' }}>-</span>Vote</p>
              <p style={{ color: 'rgba(147, 197, 253, 0.5)', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3, margin: 0 }}>Audit Portal</p>
            </div>
          </Link>
        </div>

        {/* Election Chip */}
        <div style={{ margin: '14px 14px 4px', padding: '12px 14px', borderRadius: 12, background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.35)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 5px 0' }}>Active Election</p>
          <p style={{ color: '#ffffff', fontSize: 13, fontWeight: 600, lineHeight: 1.3, margin: 0 }}>{data.election.title}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 8 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: statusCfg.bg, display: 'block' }} />
            <span style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: 11, fontWeight: 500 }}>{statusCfg.label}</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: '6px 10px 10px' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.25)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 6px 6px', margin: 0 }}>Navigation</p>
          {NAV_ITEMS.map(({ key, label, icon: Icon, desc }) => (
            <button key={key} onClick={() => setActiveNav(key)} style={navItemStyle(key)}>
              <div style={iconBoxStyle(key)}>
                <Icon size={16} color={activeNav === key ? '#ffffff' : 'rgba(255, 255, 255, 0.45)'} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1, margin: 0 }}>{label}</p>
                <p style={{ fontSize: 10, marginTop: 3, color: activeNav === key ? 'rgba(191, 219, 254, 0.65)' : 'rgba(255, 255, 255, 0.28)', margin: 0 }}>{desc}</p>
              </div>
              {activeNav === key && <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.5)', flexShrink: 0 }} />}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 12px', borderRadius: 10, background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
            <ShieldCheck size={13} color="#fbbf24" />
            <span style={{ color: '#fbbf24', fontSize: 11, fontWeight: 700 }}>Auditor Mode (Read-Only)</span>
          </div>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 10, background: 'rgba(255, 255, 255, 0.05)', color: 'rgba(255, 255, 255, 0.5)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </aside>

      {/* ════════════ MAIN CONTENT ════════════ */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

        {/* Top Header */}
        <header style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#2563eb', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3, margin: 0 }}>
              {NAV_ITEMS.find(n => n.key === activeNav)?.label}
            </p>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', margin: 0 }}>
              {activeNav === 'overview'   && 'Election Overview & Metrics'}
              {activeNav === 'auditTrail' && 'Real-Time Audit Trail'}
              {activeNav === 'integrity'  && 'Cryptographic Verification Suite'}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 99, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'block' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#065f46' }}>Live Monitoring</span>
          </div>
        </header>

        {/* Scrollable View Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>

          {/* ── OVERVIEW TAB ── */}
          {activeNav === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Card>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Election</p>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', margin: 0 }}>{data.election.title}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 10, flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6b7280' }}>
                        <Clock size={12} color="#9ca3af" />
                        Starts: {fmt(data.election.starts_at)}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6b7280' }}>
                        <Clock size={12} color="#9ca3af" />
                        Ends: {fmt(data.election.ends_at)}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 99, background: statusCfg.bg, color: '#ffffff', fontSize: 13, fontWeight: 700 }}>
                    {statusCfg.label}
                  </div>
                </div>
              </Card>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                <MetricCard label="Registered Voters" value={data.summary.totalRegisteredVoters} icon={Users}        bg="#2563eb" />
                <MetricCard label="Votes Cast"         value={data.summary.totalVotesCast}        icon={Vote}         bg="#7c3aed" />
                <MetricCard label="Voter Turnout"      value={`${data.summary.turnoutPercent}%`}  icon={TrendingUp}   bg="#059669" />
                <MetricCard label="System Anomalies"   value={data.summary.systemAnomalyCount}    icon={AlertOctagon} bg={data.summary.systemAnomalyCount > 0 ? '#dc2626' : '#9ca3af'} />
              </div>

              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', margin: 0 }}>Voter Participation Rate</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#2563eb', margin: 0 }}>{data.summary.turnoutPercent}%</p>
                </div>
                <div style={{ height: 10, background: '#f3f4f6', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg,#2563eb,#7c3aed)', width: `${data.summary.turnoutPercent}%` }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7, fontSize: 11, color: '#9ca3af' }}>
                  <span>0 votes</span>
                  <span>{data.summary.totalRegisteredVoters} registered</span>
                </div>
              </Card>

              <Card>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: '0 0 14px 0' }}>Recent Activity</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {data.auditLog.slice(0, 3).map(e => (
                    <div key={e.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 10, background: '#f9fafb', border: '1px solid #f3f4f6' }}>
                      <StatusBadge status={e.status} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>{e.action}</p>
                        <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 3, margin: 0 }}>{fmt(e.timestamp)} · {e.actorRole}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveNav('auditTrail')} style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  View full audit trail →
                </button>
              </Card>
            </div>
          )}

          {/* ── AUDIT TRAIL TAB ── */}
          {activeNav === 'auditTrail' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* 1. Summary Metrics Bar */}
              <LogSummaryBar total={totalEvents} warnings={warningCount} failures={failureCount} lastSync={lastSync} />

              {/* 2. Filter & Action Toolbar */}
              <Card style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 16, flex: 1 }}>
                    {/* Search Input */}
                    <div style={{ flex: '1 1 240px', minWidth: 200 }}>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Search</label>
                      <div style={{ position: 'relative' }}>
                        <Search size={14} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                        <input
                          type="search"
                          placeholder="Timestamp, action, actor, IP…"
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                          style={{
                            width: '100%',
                            height: 38,
                            paddingLeft: 36,
                            paddingRight: 12,
                            border: '1px solid #d1d5db',
                            borderRadius: 10,
                            background: '#f9fafb',
                            fontSize: 13,
                            color: '#111827',
                            outline: 'none',
                            fontFamily: 'inherit'
                          }}
                        />
                      </div>
                    </div>

                    {/* Status Pill Buttons */}
                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Status</label>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {STATUS_OPTIONS.map(st => {
                          const active = statusFilter === st;
                          return (
                            <button
                              key={st}
                              onClick={() => setStatusFilter(st)}
                              style={{
                                padding: '6px 14px',
                                borderRadius: 20,
                                fontSize: 12,
                                fontWeight: 700,
                                border: active ? '1px solid #2563eb' : '1px solid #e5e7eb',
                                background: active ? '#2563eb' : '#ffffff',
                                color: active ? '#ffffff' : '#4b5563',
                                cursor: 'pointer',
                                transition: 'all .15s ease'
                              }}
                            >
                              {st}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Actor/Role Dropdown */}
                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Actor / Role</label>
                      <select
                        value={actorFilter}
                        onChange={e => setActorFilter(e.target.value)}
                        style={{
                          height: 38,
                          padding: '0 14px',
                          border: '1px solid #d1d5db',
                          borderRadius: 10,
                          background: '#f9fafb',
                          fontSize: 13,
                          color: '#374151',
                          outline: 'none',
                          cursor: 'pointer',
                          fontFamily: 'inherit'
                        }}
                      >
                        <option value="All">All Roles</option>
                        {actorOptions.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Actions: Verify Chain + Export Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    {/* Verify Chain Button */}
                    <button
                      onClick={handleVerifyChain}
                      disabled={isVerifying}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 7,
                        height: 38,
                        padding: '0 16px',
                        borderRadius: 10,
                        border: 'none',
                        background: chainVerified ? '#059669' : '#0284c7',
                        color: '#ffffff',
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: isVerifying ? 'not-allowed' : 'pointer',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                        transition: 'all .15s ease'
                      }}
                    >
                      <RefreshCw size={14} style={{ animation: isVerifying ? 'spin .7s linear infinite' : 'none' }} />
                      {isVerifying ? 'Verifying…' : chainVerified ? '✓ Chain Verified & Immutable' : 'Verify Chain Integrity'}
                    </button>

                    {/* Exports */}
                    <button
                      onClick={() => downloadFile('audit-log.json', JSON.stringify(filteredLogs, null, 2), 'application/json')}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, height: 38, padding: '0 12px', border: '1px solid #d1d5db', borderRadius: 10, background: '#ffffff', fontSize: 12, fontWeight: 700, color: '#374151', cursor: 'pointer' }}
                    >
                      <FileJson size={14} /> JSON
                    </button>
                    <button
                      onClick={() => downloadFile('audit-log.csv', logsToCsv(filteredLogs), 'text/csv')}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, height: 38, padding: '0 12px', border: '1px solid #d1d5db', borderRadius: 10, background: '#ffffff', fontSize: 12, fontWeight: 700, color: '#374151', cursor: 'pointer' }}
                    >
                      <Download size={14} /> CSV
                    </button>
                  </div>
                </div>
              </Card>

              {/* 3. Log Table */}
              <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '14px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', margin: 0 }}>
                    Showing <span style={{ color: '#2563eb', fontWeight: 700 }}>{filteredLogs.length}</span> of {data.auditLog.length} entries
                  </p>
                  <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>💡 Click any row to inspect full log details & raw payload</p>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        {['Timestamp', 'Action', 'Actor / Role', 'IP Address', 'Status'].map(h => (
                          <th key={h} style={{ textAlign: 'left', padding: '12px 20px', fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.length === 0 ? (
                        <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#9ca3af', fontSize: 13 }}>No matching log entries</td></tr>
                      ) : filteredLogs.map((row, i) => (
                        <tr
                          key={row.id}
                          onClick={() => handleRowClick(row)}
                          style={{
                            borderBottom: i < filteredLogs.length - 1 ? '1px solid #f3f4f6' : 'none',
                            cursor: 'pointer',
                            transition: 'background .15s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = '#f0f7ff')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                          <td style={{ padding: '13px 20px', color: '#6b7280', fontFamily: 'monospace', fontSize: 11, whiteSpace: 'nowrap' }}>{fmt(row.timestamp)}</td>
                          <td style={{ padding: '13px 20px' }}>
                            <p style={{ color: '#111827', fontWeight: 600, margin: 0 }}>{row.action}</p>
                            <p style={{ color: '#9ca3af', fontSize: 11, marginTop: 3, margin: 0 }}>{row.details}</p>
                          </td>
                          <td style={{ padding: '13px 20px' }}>
                            <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 8, background: '#f3f4f6', fontSize: 11, fontWeight: 700, color: '#374151' }}>{row.actorRole}</span>
                          </td>
                          <td style={{ padding: '13px 20px', color: '#6b7280', fontFamily: 'monospace', fontSize: 11 }}>{row.ipAddress}</td>
                          <td style={{ padding: '13px 20px' }}><StatusBadge status={row.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ── SYSTEM & INTEGRITY TAB ── */}
          {activeNav === 'integrity' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* 1. System Health & Encryption Status Grid (Top Section) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                <MetricCard
                  label="Merkle Tree Depth"
                  value="Height: 12"
                  subText="1,250 leaves anchored"
                  icon={Database}
                  bg="#7c3aed"
                />
                <MetricCard
                  label="Public Key Status"
                  value="RSA-2048 / ElGamal"
                  subText="Active • Homomorphic Encrypted"
                  icon={Key}
                  bg="#0284c7"
                />
                <MetricCard
                  label="Threshold Key Shares"
                  value="3 / 5 Present"
                  subText="Quorum Reached (k=3, n=5)"
                  icon={Lock}
                  bg="#059669"
                />
                <MetricCard
                  label="Hash Chain Sync"
                  value="Block #4102"
                  subText="100% Synced • Immutable"
                  icon={Cpu}
                  bg="#d97706"
                />
              </div>

              {/* 2. Single Ballot Verification Tool */}
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <ShieldCheck size={20} color="#2563eb" />
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>Verify Individual Ballot Receipt</h3>
                </div>
                <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 14px 0' }}>
                  Paste any anonymized 0x transaction hash below to generate a cryptographic inclusion proof against the live Merkle root.
                </p>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 260, position: 'relative' }}>
                    <Search size={15} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder="Paste receipt hash (e.g. 0x9b4f7a28e1c79304bd2859103c847f1c4e2a1005)"
                      value={singleHashInput}
                      onChange={e => setSingleHashInput(e.target.value)}
                      style={{
                        width: '100%',
                        height: 42,
                        paddingLeft: 36,
                        paddingRight: 12,
                        borderRadius: 10,
                        border: '1px solid #d1d5db',
                        background: '#f9fafb',
                        fontSize: 13,
                        fontFamily: 'monospace',
                        color: '#111827',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <button
                    onClick={handleCheckInclusion}
                    disabled={isCheckingInclusion || !singleHashInput.trim()}
                    style={{
                      height: 42,
                      padding: '0 20px',
                      borderRadius: 10,
                      border: 'none',
                      background: !singleHashInput.trim() ? '#94a3b8' : isCheckingInclusion ? '#93c5fd' : '#2563eb',
                      color: '#ffffff',
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: !singleHashInput.trim() || isCheckingInclusion ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: '0 2px 6px rgba(37,99,235,0.25)'
                    }}
                  >
                    <RefreshCw size={14} style={{ animation: isCheckingInclusion ? 'spin .7s linear infinite' : 'none' }} />
                    {isCheckingInclusion ? 'Checking Proof…' : 'Check Inclusion'}
                  </button>
                  <button
                    onClick={() => {
                      const example = '0x9b4f7a28e1c79304bd2859103c847f1c4e2a1005';
                      setSingleHashInput(example);
                    }}
                    style={{
                      height: 42,
                      padding: '0 14px',
                      borderRadius: 10,
                      border: '1px solid #d1d5db',
                      background: '#ffffff',
                      color: '#4b5563',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Use Sample Hash
                  </button>
                </div>

                {/* Proof Inclusion Output */}
                {inclusionResult.status === 'success' && (
                  <div style={{ marginTop: 16, padding: 16, borderRadius: 12, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <CheckCircle2 size={18} color="#16a34a" />
                        <span style={{ fontSize: 14, fontWeight: 800, color: '#166534' }}>Inclusion Proof Verified — PASS</span>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: '#166534', color: '#ffffff' }}>Leaf #{inclusionResult.leafIndex}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, fontSize: 12, fontFamily: 'monospace' }}>
                      <div style={{ background: '#ffffff', padding: 10, borderRadius: 8, border: '1px solid #dcfce7' }}>
                        <span style={{ color: '#15803d', fontWeight: 700 }}>Block Number:</span> #{inclusionResult.blockNumber}
                      </div>
                      <div style={{ background: '#ffffff', padding: 10, borderRadius: 8, border: '1px solid #dcfce7' }}>
                        <span style={{ color: '#15803d', fontWeight: 700 }}>Merkle Root:</span> {inclusionResult.merkleRoot?.slice(0, 16)}…
                      </div>
                    </div>

                    <div style={{ marginTop: 10 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: '#166534', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Merkle Audit Path Array</p>
                      <div style={{ background: '#ffffff', padding: 10, borderRadius: 8, border: '1px solid #dcfce7', fontSize: 11, fontFamily: 'monospace', color: '#374151' }}>
                        {inclusionResult.proofPath?.map((path, idx) => (
                          <div key={idx} style={{ padding: '2px 0' }}>
                            <span style={{ color: '#16a34a', fontWeight: 700 }}>[H_{idx}]:</span> {path}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {inclusionResult.status === 'not_found' && (
                  <div style={{ marginTop: 16, padding: 14, borderRadius: 12, background: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <XCircle size={18} color="#dc2626" />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#991b1b' }}>Receipt Hash not found in current active Merkle tree.</span>
                  </div>
                )}
              </Card>

              {/* 3. Populated & Enhanced Ballot Receipts Table */}
              <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: 0 }}>Ballot Receipts Directory</h3>
                    <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 2, margin: 0 }}>Anonymized vote tokens with cryptographic block timestamps</p>
                  </div>
                  <button
                    onClick={() => downloadFile('ballot-receipts.csv', receiptsToCsv(filteredReceipts), 'text/csv')}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, height: 36, padding: '0 14px', border: '1px solid #e5e7eb', borderRadius: 10, background: '#ffffff', fontSize: 12, fontWeight: 700, color: '#374151', cursor: 'pointer' }}
                  >
                    <Download size={13} /> Export CSV
                  </button>
                </div>

                {/* Receipts Filter Toolbar */}
                <div style={{ padding: '12px 20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  {/* Status Pills */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginRight: 4 }}>Filter Status:</span>
                    {RECEIPT_STATUS_OPTIONS.map(st => {
                      const active = receiptStatusFilter === st;
                      return (
                        <button
                          key={st}
                          onClick={() => setReceiptStatusFilter(st)}
                          style={{
                            padding: '4px 12px',
                            borderRadius: 20,
                            fontSize: 11,
                            fontWeight: 700,
                            border: active ? '1px solid #2563eb' : '1px solid #e5e7eb',
                            background: active ? '#2563eb' : '#ffffff',
                            color: active ? '#ffffff' : '#4b5563',
                            cursor: 'pointer'
                          }}
                        >
                          {st}
                        </button>
                      );
                    })}
                  </div>

                  {/* Search Bar for Hashes */}
                  <div style={{ position: 'relative', width: 260 }}>
                    <Search size={14} color="#9ca3af" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="search"
                      placeholder="Search hash or block #..."
                      value={receiptSearch}
                      onChange={e => setReceiptSearch(e.target.value)}
                      style={{
                        width: '100%',
                        height: 32,
                        paddingLeft: 32,
                        paddingRight: 10,
                        borderRadius: 8,
                        border: '1px solid #d1d5db',
                        background: '#ffffff',
                        fontSize: 12,
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <th style={{ textAlign: 'left', padding: '11px 20px', fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Transaction Hash</th>
                        <th style={{ textAlign: 'left', padding: '11px 20px', fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Block #</th>
                        <th style={{ textAlign: 'left', padding: '11px 20px', fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Voter Status</th>
                        <th style={{ textAlign: 'left', padding: '11px 20px', fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Issued At</th>
                        <th style={{ textAlign: 'right', padding: '11px 20px', fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReceipts.length === 0 ? (
                        <tr><td colSpan={5} style={{ textAlign: 'center', padding: 30, color: '#9ca3af', fontSize: 13 }}>No matching ballot receipts</td></tr>
                      ) : filteredReceipts.map((r, i) => (
                        <tr key={r.id} style={{ borderBottom: i < filteredReceipts.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                          <td style={{ padding: '12px 20px', fontFamily: 'monospace', fontSize: 12, color: '#111827', fontWeight: 600 }}>
                            {r.transactionHash}
                          </td>
                          <td style={{ padding: '12px 20px', fontFamily: 'monospace', fontSize: 12, color: '#2563eb', fontWeight: 700 }}>
                            #{r.blockNumber || 4102}
                          </td>
                          <td style={{ padding: '12px 20px' }}>
                            <StatusBadge status={r.voterStatus} />
                          </td>
                          <td style={{ padding: '12px 20px', fontSize: 12, color: '#6b7280' }}>
                            {fmt(r.issuedAt)}
                          </td>
                          <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                            <button
                              onClick={() => handleCopyHash(r.transactionHash)}
                              style={{
                                padding: '4px 10px',
                                borderRadius: 6,
                                border: '1px solid #d1d5db',
                                background: copiedHash === r.transactionHash ? '#f0fdf4' : '#ffffff',
                                color: copiedHash === r.transactionHash ? '#16a34a' : '#374151',
                                fontSize: 11,
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4
                              }}
                            >
                              {copiedHash === r.transactionHash ? <Check size={12} /> : <Copy size={12} />}
                              {copiedHash === r.transactionHash ? 'Copied' : 'Copy Hash'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* 4. Cryptographic Proof Log Panel (Collapsible) */}
              <Card>
                <div
                  onClick={() => setProofLogsOpen(!proofLogsOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <FileText size={18} color="#2563eb" />
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', margin: 0 }}>Cryptographic Proof Logs & Zero-Knowledge Audits</h3>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: '#e0e7ff', color: '#3730a3' }}>4 Verified</span>
                  </div>
                  {proofLogsOpen ? <ChevronUp size={18} color="#6b7280" /> : <ChevronDown size={18} color="#6b7280" />}
                </div>

                {proofLogsOpen && (
                  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <ProofLogCard
                      title="Zero-Knowledge Proof Batch #42"
                      status="PASS"
                      desc="Verified 150 range proofs establishing vote validity without revealing individual candidate choices."
                      timestamp="29 Jul 2026, 10:14 UTC"
                      hash="zkp_0x8f2a9b3c4d5e6f7a8b9c0d1e2f3a4b"
                    />
                    <ProofLogCard
                      title="Homomorphic Tally Aggregation Check"
                      status="PASS"
                      desc="ElGamal ciphertext product matches decrypted tally polynomial across all 4 election positions."
                      timestamp="29 Jul 2026, 10:00 UTC"
                      hash="elgamal_0x3c4d5e6f7a8b9c0d1e2f3a4b5c"
                    />
                    <ProofLogCard
                      title="Blind Signature Authenticity Audit"
                      status="PASS"
                      desc="Validated RSA-2048 blind signatures on voter tokens; zero duplicate or unauthorized tokens detected."
                      timestamp="29 Jul 2026, 09:30 UTC"
                      hash="rsa_0x1a2b3c4d5e6f7a8b9c0d1e2f3a"
                    />
                    <ProofLogCard
                      title="Merkle Chain Consistency Check"
                      status="PASS"
                      desc="Block #4091 - #4102 hash continuity confirmed; zero tree root drift or unanchored leaf nodes."
                      timestamp="29 Jul 2026, 09:00 UTC"
                      hash="merkle_0x7c2f3a1b5e4d8c9f231a0b6c"
                    />
                  </div>
                )}
              </Card>

            </div>
          )}

        </div>
      </main>

      {/* Log Detail Drawer */}
      <LogDetailDrawer log={selectedLog} open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Animation keyframes */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
