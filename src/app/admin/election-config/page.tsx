export default function ElectionConfig() {
  return (
    <div className="flex-grow max-w-max-width mx-auto w-full space-y-6 lg:space-y-8">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-primary-container/40 via-surface to-secondary-container/20 rounded-3xl p-6 lg:p-10 border border-outline-variant/30 overflow-hidden shadow-sm mb-2 section-card">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary bg-secondary/10 p-1.5 rounded-lg text-[20px]">
                event_available
              </span>
              <p className="text-label-md font-bold text-secondary uppercase tracking-widest">
                Management Console
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-on-surface leading-tight tracking-tight drop-shadow-sm">
              Election Lifecycles
            </h1>
            <p className="text-body-lg lg:text-xl text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
              Configure upcoming electoral events, set definitive timelines, and manage verified candidate registrations for the 2026 academic year.
            </p>
          </div>
          <button className="bg-primary-container text-on-primary px-6 py-3 lg:px-8 lg:py-4 rounded-xl flex items-center justify-center gap-2 font-label-md font-bold hover:bg-on-primary-fixed-variant active:scale-95 transition-all shadow-lg w-full md:w-auto flex-shrink-0">
            <span className="material-symbols-outlined">add</span>CREATE NEW ELECTION
          </button>
        </div>
      </div>

      {/* Bento Grid - Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-gutter">
        <div className="bg-surface-container-lowest p-4 lg:p-6 rounded-xl shadow-sm border border-outline-variant card-hover">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <span className="material-symbols-outlined text-secondary bg-secondary/10 p-1.5 lg:p-2 rounded-lg text-[20px] lg:text-[24px]">
              pending_actions
            </span>
            <span className="text-label-md text-on-tertiary-container bg-tertiary-fixed-dim/20 px-2 py-0.5 rounded hidden sm:block">
              Active Now
            </span>
          </div>
          <p className="text-label-md font-label-md text-outline mb-1 uppercase tracking-wider">Scheduled</p>
          <h4 className="text-headline-lg font-headline-lg text-on-surface">04</h4>
        </div>
        <div className="bg-surface-container-lowest p-4 lg:p-6 rounded-xl shadow-sm border border-outline-variant card-hover">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <span className="material-symbols-outlined text-outline bg-surface-container p-1.5 lg:p-2 rounded-lg text-[20px] lg:text-[24px]">
              person_check
            </span>
          </div>
          <p className="text-label-md font-label-md text-outline mb-1 uppercase tracking-wider">Candidates</p>
          <h4 className="text-headline-lg font-headline-lg text-on-surface">28</h4>
        </div>
        <div className="bg-surface-container-lowest p-4 lg:p-6 rounded-xl shadow-sm border border-outline-variant card-hover">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <span className="material-symbols-outlined text-outline bg-surface-container p-1.5 lg:p-2 rounded-lg text-[20px] lg:text-[24px]">
              event_repeat
            </span>
          </div>
          <p className="text-label-md font-label-md text-outline mb-1 uppercase tracking-wider">Completed</p>
          <h4 className="text-headline-lg font-headline-lg text-on-surface">12</h4>
        </div>
        <div className="col-span-1 bg-primary text-on-primary p-4 lg:p-6 rounded-xl overflow-hidden relative shadow-sm border border-outline-variant card-hover">
          <div className="relative z-10">
            <p className="text-label-md font-label-md text-on-primary-container mb-1 uppercase tracking-wider">Next Deadline</p>
            <h4 className="text-body-lg lg:text-headline-md font-bold">Guild Elections</h4>
            <p className="text-body-md mt-1 opacity-80">Closes in 4d</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[80px] lg:text-[120px]">schedule</span>
          </div>
        </div>
      </section>

      {/* Main Table Section */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm card-hover">
        <div className="p-4 lg:p-6 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-3 lg:gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="text-headline-md font-headline-md text-primary">Election Repository</h4>
            <div className="flex gap-1 flex-wrap">
              <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-label-md rounded-full cursor-pointer">All</span>
              <span className="px-3 py-1 hover:bg-surface-container text-outline text-label-md rounded-full cursor-pointer transition-colors">Draft</span>
              <span className="px-3 py-1 hover:bg-surface-container text-outline text-label-md rounded-full cursor-pointer transition-colors">Active</span>
              <span className="px-3 py-1 hover:bg-surface-container text-outline text-label-md rounded-full cursor-pointer transition-colors">Completed</span>
            </div>
          </div>
          <div className="relative w-full md:w-auto">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
            <input
              className="pl-9 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-body-md w-full md:w-56 lg:w-64 focus:ring-2 focus:ring-secondary focus:outline-none text-on-surface"
              placeholder="Search elections..."
              type="text"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="px-4 lg:px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider">Election Name</th>
                <th className="px-4 lg:px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider">Duration</th>
                <th className="px-4 lg:px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-4 lg:px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider">Candidates</th>
                <th className="px-4 lg:px-6 py-4 text-label-md text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-body-md font-bold text-primary">Student Guild President 2026</span>
                    <span className="text-label-md text-outline uppercase">General Election</span>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-on-surface whitespace-nowrap">Oct 12 — Oct 14, 2026</td>
                <td className="px-4 lg:px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-fixed/20 text-on-tertiary-container text-label-md whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container flex-shrink-0"></span>Active
                  </span>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 border-surface-container-lowest bg-surface-dim flex items-center justify-center text-[9px] font-bold text-on-surface">JD</div>
                    <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 border-surface-container-lowest bg-secondary-fixed flex items-center justify-center text-[9px] font-bold text-on-surface">MS</div>
                    <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 border-surface-container-lowest bg-surface-variant flex items-center justify-center text-[9px] font-bold text-outline">+2</div>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 text-right">
                  <button className="text-secondary hover:underline text-label-md mr-3">Manage</button>
                  <button className="text-outline hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-body-md font-bold text-primary">Faculty of Law Rep</span>
                    <span className="text-label-md text-outline uppercase">Internal Poll</span>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-on-surface whitespace-nowrap">Nov 02 — Nov 03, 2026</td>
                <td className="px-4 lg:px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-outline text-label-md whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-outline flex-shrink-0"></span>Draft
                  </span>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <span className="text-body-md text-outline italic">Registration Open</span>
                </td>
                <td className="px-4 lg:px-6 py-4 text-right">
                  <button className="text-secondary hover:underline text-label-md mr-3">Edit</button>
                  <button className="text-outline hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-body-md font-bold text-primary">BOS Member At Large</span>
                    <span className="text-label-md text-outline uppercase">Administrative</span>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 text-body-md text-on-surface whitespace-nowrap">Sep 15 — Sep 16, 2026</td>
                <td className="px-4 lg:px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-variant text-on-surface-variant text-label-md whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant flex-shrink-0"></span>Completed
                  </span>
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <span className="text-body-md text-on-surface">Verified (8)</span>
                </td>
                <td className="px-4 lg:px-6 py-4 text-right">
                  <button className="text-secondary hover:underline text-label-md mr-3">Audit</button>
                  <button className="text-outline hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-3 lg:p-4 bg-surface-container-low/50 border-t border-outline-variant flex items-center justify-between">
          <span className="text-label-md text-outline">Showing 1-3 of 16 elections</span>
          <div className="flex gap-2">
            <button className="p-1.5 lg:p-2 border border-outline-variant rounded hover:bg-surface-container transition-colors text-on-surface">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="p-1.5 lg:p-2 border border-outline-variant rounded hover:bg-surface-container transition-colors text-on-surface">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Integrity Monitoring */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-gutter">
        <div className="bg-surface-container-lowest p-6 lg:p-8 rounded-xl shadow-sm border border-outline-variant relative overflow-hidden group card-hover">
          <div className="relative z-10">
            <h5 className="text-headline-md font-headline-md text-primary mb-4">Integrity Monitoring</h5>
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-outline-variant">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-tertiary-container text-[20px]">verified_user</span>
                  <span className="text-body-md font-bold text-on-surface">Supabase Anchoring</span>
                </div>
                <span className="text-label-md text-on-tertiary-container bg-tertiary-fixed-dim/20 px-2 py-0.5 rounded">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-outline-variant">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">security</span>
                  <span className="text-body-md font-bold text-on-surface">Multi-Sig Approval</span>
                </div>
                <span className="text-label-md text-secondary bg-secondary-fixed/20 px-2 py-0.5 rounded">Required</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-outline-variant">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline text-[20px]">cloud_sync</span>
                  <span className="text-body-md font-bold text-on-surface">Auto-Sync Intervals</span>
                </div>
                <span className="text-label-md text-outline">Every 15m</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
}
