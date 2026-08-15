import fs from 'fs';
import path from 'path';

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function write(rel, content) {
  fs.writeFileSync(path.join(root, rel), content, 'utf8');
}

function replace(rel, oldStr, newStr) {
  const file = read(rel);
  if (!file.includes(oldStr)) {
    console.warn(`WARN: pattern not found in ${rel}`);
    return false;
  }
  write(rel, file.replace(oldStr, newStr));
  console.log(`OK: ${rel}`);
  return true;
}

replace(
  'src/app/voter/page.tsx',
  `import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";`,
  `import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { ElectionCountdown } from "@/components/ElectionCountdown";`
);

replace('src/app/voter/page.tsx', 'let voterRecord: any = null;', 'let voterRecord: { id: string; voting_suspended: boolean } | null = null;');

replace(
  'src/app/voter/page.tsx',
  `  const turnoutPct =
    totalVoters > 0 ? ((totalVotes / totalVoters) * 100).toFixed(1) : "0.0";

  // Compute time remaining
  let timeLeft = "—";
  if (activeElection?.ends_at) {
    const diff = new Date(activeElection.ends_at).getTime() - Date.now();
    if (diff > 0) {
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      timeLeft = \`\${h}h \${m}m\`;
    } else {
      timeLeft = "Closed";
    }
  }`,
  `  const turnoutPct =
    totalVoters > 0 ? ((totalVotes / totalVoters) * 100).toFixed(1) : "0.0";`
);

replace('src/app/voter/page.tsx', 'value: timeLeft,', 'value: <ElectionCountdown endsAt={activeElection?.ends_at} />,');

replace(
  'src/app/auditor/AuditorDashboardClient.tsx',
  `  const [theme, setTheme]               = useState<'light' | 'dark'>('light');
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
    }
  }, []);`,
  `  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return 'dark';
    }
    return 'light';
  });
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();`
);

replace('src/app/admin/election-config/ElectionConfigClient.tsx', '      } catch (err: any) {', '      } catch (err: unknown) {');
replace('src/app/admin/election-config/ElectionConfigClient.tsx', '        setFormError(err.message || \'Failed to create election\');', '        setFormError(err instanceof Error ? err.message : \'Failed to create election\');');

replace('src/app/admin/offline-sync/actions.ts', 'export async function exportSyncLogs(logs: any[]) {', 'export async function exportSyncLogs(logs: Record<string, unknown>[]) {');

replace('src/app/admin/settings/SettingsClient.tsx', 'export function SettingsClient({ initialSettings }: { initialSettings: any }) {', 'type SystemSettings = Record<string, unknown>;\n\nexport function SettingsClient({ initialSettings }: { initialSettings: SystemSettings }) {');
replace('src/app/admin/settings/SettingsClient.tsx', 'onClick={() => setSettings((s: any) => ({ ...s, [item.key]: !s[item.key] }))}', 'onClick={() => setSettings((s) => ({ ...s, [item.key]: !s[item.key] }))}');

replace('src/app/admin/users/UsersClient.tsx', '    } catch (e: any) {', '    } catch (e: unknown) {');
replace('src/app/admin/users/UsersClient.tsx', '      alert("Failed to create user: " + (e.message || \'Unknown error\'));', '      alert("Failed to create user: " + (e instanceof Error ? e.message : \'Unknown error\'));');

replace('src/app/candidate/ApplyElectionClient.tsx', '    } catch (e: any) {', '    } catch (e: unknown) {');
replace('src/app/candidate/ApplyElectionClient.tsx', '      setError(e.message || \'Failed to apply. Please try again.\');', '      setError(e instanceof Error ? e.message : \'Failed to apply. Please try again.\');');

replace(
  'src/app/candidate/manifesto/ManifestoClient.tsx',
  'export function ManifestoClient({ initialProfile, openElections }: { initialProfile: any, openElections: any[] }) {',
  `type CandidateProfile = {
  category?: string;
  slogan?: string;
  statement?: string;
  election_id?: string;
} | null;

type OpenElection = {
  id: string;
  title: string;
};

export function ManifestoClient({ initialProfile, openElections }: { initialProfile: CandidateProfile, openElections: OpenElection[] }) {`
);

replace('src/app/voter/settings/SettingsClient.tsx', 'export function SettingsClient({ initialSettings }: { initialSettings: any }) {', 'type VoterSettings = Record<string, unknown>;\n\nexport function SettingsClient({ initialSettings }: { initialSettings: VoterSettings }) {');

replace(
  'src/app/ec/candidates/CandidatesClient.tsx',
  `import { useState, useEffect } from 'react';`,
  `import { useState } from 'react';`
);
replace(
  'src/app/ec/candidates/CandidatesClient.tsx',
  `export function CandidatesClient({ initialCandidates }: { initialCandidates: any[] }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    setCandidates(
      initialCandidates.map(c => ({
        id: c.id,
        name: c.name || 'Unknown',
        position: c.category || 'Unknown Position',
        initials: getInitials(c.name || ''),
        status: c.status || 'pending',
        manifesto: c.manifesto || '',
      }))
    );
  }, [initialCandidates]);`,
  `type RawCandidate = {
  id: string;
  name?: string;
  category?: string;
  status?: Candidate['status'];
  manifesto?: string;
};

const mapCandidates = (items: RawCandidate[]): Candidate[] =>
  items.map((c) => ({
    id: c.id,
    name: c.name || 'Unknown',
    position: c.category || 'Unknown Position',
    initials: getInitials(c.name || ''),
    status: c.status || 'pending',
    manifesto: c.manifesto || '',
  }));

export function CandidatesClient({ initialCandidates }: { initialCandidates: RawCandidate[] }) {
  const [candidates, setCandidates] = useState<Candidate[]>(() => mapCandidates(initialCandidates));`
);

replace(
  'src/app/ec/elections/ElectionsClient.tsx',
  `import { useState, useEffect } from 'react';`,
  `import { useState } from 'react';`
);
replace(
  'src/app/ec/elections/ElectionsClient.tsx',
  `export function ElectionsClient({ initialElections }: { initialElections: any[] }) {
  const [elections, setElections] = useState<Election[]>([]);

  useEffect(() => {
    setElections(
      initialElections.map(e => {
        const opensDate = new Date(e.starts_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        const closesDate = new Date(e.ends_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        return {
          id: e.id,
          title: e.title,
          scope: e.scope || 'All faculties',
          window: \`\${opensDate} – \${closesDate}\`,
          status: e.status || 'draft',
        };
      })
    );
  }, [initialElections]);`,
  `type RawElection = {
  id: string;
  title: string;
  scope?: string;
  starts_at: string;
  ends_at: string;
  status?: Election['status'];
};

const mapElections = (items: RawElection[]): Election[] =>
  items.map((e) => {
    const opensDate = new Date(e.starts_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const closesDate = new Date(e.ends_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    return {
      id: e.id,
      title: e.title,
      scope: e.scope || 'All faculties',
      window: \`\${opensDate} – \${closesDate}\`,
      status: e.status || 'draft',
    };
  });

export function ElectionsClient({ initialElections }: { initialElections: RawElection[] }) {
  const [elections, setElections] = useState<Election[]>(() => mapElections(initialElections));`
);

replace(
  'src/app/ec/results/page.tsx',
  `  useEffect(() => {
    let pollingId: number | undefined;

    const fetchResults = async () => {`,
  `  useEffect(() => {
    const fetchResults = async () => {`
);
replace(
  'src/app/ec/results/page.tsx',
  `    fetchResults();
    pollingId = window.setInterval(fetchResults, 7000);

    return () => {
      if (pollingId) window.clearInterval(pollingId);
    };`,
  `    fetchResults();
    const pollingId = window.setInterval(fetchResults, 7000);

    return () => {
      window.clearInterval(pollingId);
    };`
);
replace(
  'src/app/ec/results/page.tsx',
  `  const pieSegments = useMemo(() => {
    const circumference = 2 * Math.PI * 44;
    let cumulative = 0;

    return candidates.map((candidate, index) => {
      const length = circumference * (candidate.share / 100);
      const segment = {
        ...candidate,
        color: pieColors[index % pieColors.length],
        dashArray: \`\${length} \${circumference}\`,
        dashOffset: circumference - cumulative,
      };
      cumulative += length;
      return segment;
    });
  }, [candidates]);`,
  `  const pieSegments = useMemo(() => {
    const circumference = 2 * Math.PI * 44;
    return candidates.reduce<Array<CandidateResult & { color: string; dashArray: string; dashOffset: number }>>(
      (segments, candidate, index) => {
        const length = circumference * (candidate.share / 100);
        const cumulative = segments.reduce((sum, seg) => {
          const segLength = parseFloat(seg.dashArray.split(' ')[0] || '0');
          return sum + segLength;
        }, 0);
        segments.push({
          ...candidate,
          color: pieColors[index % pieColors.length],
          dashArray: \`\${length} \${circumference}\`,
          dashOffset: circumference - cumulative,
        });
        return segments;
      },
      []
    );
  }, [candidates, pieColors]);`
);

// Settings pages: sync form when user loads without useEffect
const settingsSync = `  const [syncedUserId, setSyncedUserId] = useState<string | null>(null);

  if (user && user.id !== syncedUserId) {
    setSyncedUserId(user.id);
    setForm({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      phone: (meta?.phone as string) ?? '',
      faculty: (meta?.faculty as string) ?? '',
      yearOfStudy: (meta?.yearOfStudy as string) ?? '',
      bio: (meta?.bio as string) ?? '',
      studentId: (meta?.studentId as string) ?? '',
    });
  }`;

replace(
  'src/app/candidate/settings/page.tsx',
  `  // Populate form from Clerk user once loaded
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        phone: (meta?.phone as string) ?? '',
        faculty: (meta?.faculty as string) ?? '',
        yearOfStudy: (meta?.yearOfStudy as string) ?? '',
        bio: (meta?.bio as string) ?? '',
        studentId: (meta?.studentId as string) ?? '',
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);`,
  settingsSync
);

replace(
  'src/app/ec/settings/page.tsx',
  `  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        phone: (meta?.phone as string) ?? '',
        officerTitle: (meta?.officerTitle as string) ?? '',
        jurisdiction: (meta?.jurisdiction as string) ?? 'All faculties — Cavendish University Uganda',
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);`,
  `  const [syncedUserId, setSyncedUserId] = useState<string | null>(null);

  if (user && user.id !== syncedUserId) {
    setSyncedUserId(user.id);
    setForm({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      phone: (meta?.phone as string) ?? '',
      officerTitle: (meta?.officerTitle as string) ?? '',
      jurisdiction: (meta?.jurisdiction as string) ?? 'All faculties — Cavendish University Uganda',
    });
  }`
);

replace('src/app/candidate/settings/page.tsx', "import { useState, useTransition, useEffect } from 'react';", "import { useState, useTransition } from 'react';");

// Link fixes
replace(
  'src/app/auditor/page.tsx',
  `          <a href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', background: 'var(--blue)', color: '#fff',
            borderRadius: 'var(--r-sm)', fontSize: '0.875rem', fontWeight: 600,
            textDecoration: 'none'
          }}>
            Back to Home
          </a>`,
  `          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', background: 'var(--blue)', color: '#fff',
            borderRadius: 'var(--r-sm)', fontSize: '0.875rem', fontWeight: 600,
            textDecoration: 'none'
          }}>
            Back to Home
          </Link>`
);

const auditorPage = read('src/app/auditor/page.tsx');
if (!auditorPage.includes("import Link from 'next/link'")) {
  write('src/app/auditor/page.tsx', auditorPage.replace(/^/m, "import Link from 'next/link';\n").replace("import Link from 'next/link';\nimport Link", 'import Link'));
}

replace(
  'src/app/dashboard/page.tsx',
  `        <a
          href="/sign-in"
          style={{
            display: 'inline-block',
            padding: '0.6rem 1.5rem',
            background: 'var(--primary)',
            color: 'var(--on-primary)',
            borderRadius: '0.75rem',
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',`,
  `        <Link
          href="/sign-in"
          style={{
            display: 'inline-block',
            padding: '0.6rem 1.5rem',
            background: 'var(--primary)',
            color: 'var(--on-primary)',
            borderRadius: '0.75rem',
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',`
);
replace('src/app/dashboard/page.tsx', '        </a>', '        </Link>', false);

const dashboardPage = read('src/app/dashboard/page.tsx');
if (!dashboardPage.includes('import Link from')) {
  write('src/app/dashboard/page.tsx', dashboardPage.replace(/^/m, "import Link from 'next/link';\n"));
}

// active-election any type
replace(
  'src/app/voter/active-election/page.tsx',
  `        const formatted = (payload.elections || []).map((e: any) => ({`,
  `        type ElectionPayload = {
          id: string;
          title: string;
          description?: string | null;
          status: string;
          candidates?: unknown[];
        };

        const formatted = (payload.elections || []).map((e: ElectionPayload) => ({`
);

console.log('Done applying fixes');
