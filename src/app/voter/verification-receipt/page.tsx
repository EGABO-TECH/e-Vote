import { currentUser } from '@clerk/nextjs/server';
import { ReceiptList } from './ReceiptList';
import { getVoterReceiptData } from '@/lib/election-data';

export default async function VerificationReceiptPage() {
  const user = await currentUser();
  const receipts = await getVoterReceiptData(user?.id ?? null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: '24px 0', width: '100%', maxWidth: 1200, margin: '0 auto', flex: 1 }}>
      <section style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: 'var(--surface-2)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
        <span className="material-symbols-outlined" style={{ color: 'var(--blue)', fontSize: 24 }}>
          verified_user
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>
            Cryptographic Assurance
          </h3>
          <p style={{ fontSize: 14, color: 'var(--text-2)', maxWidth: 800, margin: 0, lineHeight: 1.5 }}>
            These digital receipts serve as immutable proof of your participation in the democratic process. Each receipt hash can be verified against the secure Supabase ledger at the University Audit Office.
          </p>
        </div>
      </section>

      <ReceiptList receipts={receipts} />
    </div>
  );
}
