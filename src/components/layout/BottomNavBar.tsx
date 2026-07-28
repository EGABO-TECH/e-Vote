import Link from "next/link";

export default function BottomNavBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white shadow-lg lg:hidden">
      <div className="mx-auto flex max-w-5xl justify-between px-4 py-3">
        <Link
          href="/"
          className="flex flex-col items-center text-xs text-slate-700 hover:text-secondary"
        >
          <span className="material-symbols-outlined text-lg">dashboard</span>
          Dashboard
        </Link>
        <Link
          href="/active-election"
          className="flex flex-col items-center text-xs text-slate-700 hover:text-secondary"
        >
          <span className="material-symbols-outlined text-lg">how_to_vote</span>
          Vote
        </Link>
        <Link
          href="/verification-receipt"
          className="flex flex-col items-center text-xs text-slate-700 hover:text-secondary"
        >
          <span className="material-symbols-outlined text-lg">
            receipt_long
          </span>
          Receipt
        </Link>
        <Link
          href="/help-centre"
          className="flex flex-col items-center text-xs text-slate-700 hover:text-secondary"
        >
          <span className="material-symbols-outlined text-lg">help</span>
          Help
        </Link>
        <Link
          href="/settings"
          className="flex flex-col items-center text-xs text-slate-700 hover:text-secondary"
        >
          <span className="material-symbols-outlined text-lg">settings</span>
          Settings
        </Link>
      </div>
    </nav>
  );
}
