export default function OfflineSync() {
  return (
    <div className="flex-grow flex flex-col gap-6 lg:gap-8 max-w-max-width mx-auto w-full pt-2">

      {/* Page Header */}
      <div className="relative bg-gradient-to-br from-primary-container/40 via-surface to-secondary-container/20 rounded-3xl p-6 lg:p-10 border border-outline-variant/30 overflow-hidden shadow-sm mb-2 section-card">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-secondary bg-secondary/10 p-1.5 rounded-lg text-[20px]">
              cloud_sync
            </span>
            <p className="text-label-md font-bold text-secondary uppercase tracking-widest">
              Infrastructure
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-on-surface leading-tight tracking-tight drop-shadow-sm">
            Offline Sync Management
          </h1>
          <p className="text-body-lg lg:text-xl text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
            Monitor synchronization health across regional clusters and resolve data conflicts.
          </p>
        </div>
      </div>

      {/* Sync Health Overview */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-gutter">
        {/* Status Card: Global */}
        <div className="bg-surface-container-lowest border border-outline-variant p-4 lg:p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all card-hover">
          <div className="flex justify-between items-start mb-3 lg:mb-4">
            <span className="text-on-surface-variant text-label-md font-semibold uppercase tracking-wider leading-tight">System Health</span>
            <div className="bg-on-tertiary-container/10 p-1.5 lg:p-2 rounded-lg flex-shrink-0">
              <span className="material-symbols-outlined text-on-tertiary-container text-[20px]">dns</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl lg:text-display font-display leading-none text-on-surface">Optimal</span>
              <div className="w-2 h-2 bg-on-tertiary-container rounded-full animate-pulse flex-shrink-0"></div>
            </div>
            <p className="text-on-surface-variant text-body-md mt-2 hidden sm:block">98.2% synchronized</p>
          </div>
        </div>
        {/* Status Card: Pending */}
        <div className="bg-surface-container-lowest border border-outline-variant p-4 lg:p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all card-hover">
          <div className="flex justify-between items-start mb-3 lg:mb-4">
            <span className="text-on-surface-variant text-label-md font-semibold uppercase tracking-wider leading-tight">Conflicts</span>
            <div className="bg-error-container/20 p-1.5 lg:p-2 rounded-lg flex-shrink-0">
              <span className="material-symbols-outlined text-error text-[20px]">warning</span>
            </div>
          </div>
          <div>
            <span className="text-xl lg:text-display font-display leading-none text-on-surface">12</span>
            <p className="text-on-surface-variant text-body-md mt-2 hidden sm:block">Manual reconciliation</p>
          </div>
        </div>
        {/* Status Card: Last Sync */}
        <div className="bg-surface-container-lowest border border-outline-variant p-4 lg:p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all card-hover">
          <div className="flex justify-between items-start mb-3 lg:mb-4">
            <span className="text-on-surface-variant text-label-md font-semibold uppercase tracking-wider leading-tight">Last Push</span>
            <div className="bg-secondary-container/10 p-1.5 lg:p-2 rounded-lg flex-shrink-0">
              <span className="material-symbols-outlined text-secondary text-[20px]">cloud_upload</span>
            </div>
          </div>
          <div>
            <span className="text-headline-lg font-headline-lg leading-none text-on-surface">4m ago</span>
            <p className="text-on-surface-variant text-body-md mt-2 hidden sm:block">Supabase Edge Network</p>
          </div>
        </div>
        {/* Status Card: Latency */}
        <div className="bg-surface-container-lowest border border-outline-variant p-4 lg:p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all card-hover">
          <div className="flex justify-between items-start mb-3 lg:mb-4">
            <span className="text-on-surface-variant text-label-md font-semibold uppercase tracking-wider leading-tight">Avg Latency</span>
            <div className="bg-on-tertiary-fixed-variant/10 p-1.5 lg:p-2 rounded-lg flex-shrink-0">
              <span className="material-symbols-outlined text-on-tertiary-fixed-variant text-[20px]">speed</span>
            </div>
          </div>
          <div>
            <span className="text-xl lg:text-display font-display leading-none text-on-surface">142ms</span>
            <p className="text-on-surface-variant text-body-md mt-2 hidden sm:block">Dexie → Supabase</p>
          </div>
        </div>
      </section>

      {/* Regional Clusters & Conflict Resolution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-gutter items-start">
        {/* Regional Clusters Trigger */}
        <div className="lg:col-span-1 flex flex-col gap-4 lg:gap-gutter">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm card-hover">
            <div className="p-4 lg:p-6 border-b border-outline-variant flex justify-between items-center">
              <h2 className="text-headline-md font-headline-md text-on-surface">Regional Clusters</h2>
              <span className="material-symbols-outlined text-on-surface-variant">public</span>
            </div>
            <div className="p-4 lg:p-6 flex flex-col gap-3 lg:gap-4">
              <div className="flex items-center justify-between p-3 border border-outline-variant rounded-lg bg-surface-container-low">
                <div className="flex flex-col">
                  <span className="font-bold text-body-md text-on-surface">Kampala Central</span>
                  <span className="text-label-md text-on-tertiary-container flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-on-tertiary-container rounded-full"></span>Healthy
                  </span>
                </div>
                <button className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors active:scale-95">
                  <span className="material-symbols-outlined text-[18px]">sync</span>
                </button>
              </div>
              <div className="flex items-center justify-between p-3 border border-outline-variant rounded-lg bg-surface-container-low">
                <div className="flex flex-col">
                  <span className="font-bold text-body-md text-on-surface">Gulu Satellite</span>
                  <span className="text-label-md text-error flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-error rounded-full"></span>Latency Warning
                  </span>
                </div>
                <button className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors active:scale-95">
                  <span className="material-symbols-outlined text-[18px]">sync</span>
                </button>
              </div>
              <div className="flex items-center justify-between p-3 border border-outline-variant rounded-lg bg-surface-container-low opacity-75">
                <div className="flex flex-col">
                  <span className="font-bold text-body-md text-on-surface">Mbarara Campus</span>
                  <span className="text-label-md text-outline flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-outline rounded-full"></span>Offline
                  </span>
                </div>
                <button className="bg-outline text-white p-2 rounded-lg cursor-not-allowed">
                  <span className="material-symbols-outlined text-[18px]">sync_disabled</span>
                </button>
              </div>
            </div>
            <div className="bg-surface-container-low p-4 text-center border-t border-outline-variant">
              <button className="text-secondary font-bold text-label-md hover:underline">
                Force Sync All Clusters
              </button>
            </div>
          </div>

          {/* Conflict Preview Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm card-hover">
            <div className="p-4 lg:p-6 border-b border-outline-variant">
              <h2 className="text-headline-md font-headline-md text-on-surface">Conflict Resolution</h2>
            </div>
            <div className="p-4 lg:p-6 flex flex-col gap-4">
              <div className="bg-error-container/10 border border-error/20 p-4 rounded-lg flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-body-md text-on-error-container">Voter ID #UV-9921</span>
                  <span className="text-[10px] bg-error text-white px-2 py-0.5 rounded font-bold">High Priority</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="flex flex-col">
                    <span className="text-outline uppercase">Local (Dexie)</span>
                    <span className="font-bold text-on-surface">Status: Voted</span>
                  </div>
                  <div className="flex flex-col border-l border-outline-variant pl-2">
                    <span className="text-outline uppercase">Remote (Supabase)</span>
                    <span className="font-bold text-on-surface">Status: Pending</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-on-tertiary-container text-white text-[11px] py-1.5 rounded font-bold hover:opacity-90 transition-opacity active:scale-95">
                    Keep Local
                  </button>
                  <button className="flex-1 border border-outline text-on-surface text-[11px] py-1.5 rounded font-bold hover:bg-surface-container transition-colors active:scale-95">
                    Keep Remote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sync Log Table */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden card-hover">
          <div className="p-4 lg:p-6 border-b border-outline-variant flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-surface-container-lowest">
            <div>
              <h2 className="text-headline-md font-headline-md text-on-surface">Live Transaction Log</h2>
              <p className="text-body-md text-on-surface-variant">Real-time reconciliation stream</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <div className="relative">
                <select className="text-label-md border border-outline-variant rounded-lg bg-surface-container-low px-3 py-2 focus:ring-2 focus:ring-secondary/20 outline-none text-on-surface appearance-none pr-8">
                  <option>All Events</option>
                  <option>Conflicts Only</option>
                  <option>Errors</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[16px]">expand_more</span>
              </div>
              <button className="bg-secondary text-white px-4 py-2 rounded-lg text-label-md font-bold flex items-center gap-1.5 hover:bg-secondary/90 transition-all active:scale-95">
                <span className="material-symbols-outlined text-[16px]">download</span>
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[480px]">
              <thead>
                <tr className="bg-surface-container-low/50 text-on-surface-variant font-label-md text-[11px] uppercase tracking-widest">
                  <th className="px-4 lg:px-6 py-4 font-bold">Timestamp</th>
                  <th className="px-4 lg:px-6 py-4 font-bold">Resource</th>
                  <th className="px-4 lg:px-6 py-4 font-bold">Action</th>
                  <th className="px-4 lg:px-6 py-4 font-bold">Node</th>
                  <th className="px-4 lg:px-6 py-4 font-bold">Status</th>
                  <th className="px-4 lg:px-6 py-4 font-bold text-center">Health</th>
                </tr>
              </thead>
              <tbody className="text-body-md divide-y divide-outline-variant/30">
                <tr className="hover:bg-surface-container-low transition-colors animate-pulse bg-surface-container/50">
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-on-surface-variant text-[11px] lg:text-body-md">11:30:18 PM</td>
                  <td className="px-4 lg:px-6 py-4 font-bold text-on-surface text-[11px] lg:text-body-md">tbl_heartbeat_sync</td>
                  <td className="px-4 lg:px-6 py-4 text-on-tertiary-container font-medium text-[11px] lg:text-body-md">PING</td>
                  <td className="px-4 lg:px-6 py-4 text-on-surface text-[11px] lg:text-body-md">SYS-HEARTBEAT</td>
                  <td className="px-4 lg:px-6 py-4">
                    <span className="bg-tertiary-fixed-dim/20 text-on-tertiary-container px-2 py-1 rounded-full text-[10px] font-bold">OK</span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-center">
                    <div className="w-2 h-2 rounded-full bg-on-tertiary-container mx-auto"></div>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-on-surface-variant text-[11px] lg:text-body-md">11:30:10 PM</td>
                  <td className="px-4 lg:px-6 py-4 font-bold text-on-surface text-[11px] lg:text-body-md">tbl_heartbeat_sync</td>
                  <td className="px-4 lg:px-6 py-4 text-on-tertiary-container font-medium text-[11px] lg:text-body-md">PING</td>
                  <td className="px-4 lg:px-6 py-4 text-on-surface text-[11px] lg:text-body-md">SYS-HEARTBEAT</td>
                  <td className="px-4 lg:px-6 py-4">
                    <span className="bg-tertiary-fixed-dim/20 text-on-tertiary-container px-2 py-1 rounded-full text-[10px] font-bold">OK</span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-center">
                    <div className="w-2 h-2 rounded-full bg-on-tertiary-container mx-auto"></div>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-on-surface-variant text-[11px] lg:text-body-md">11:30:01 PM</td>
                  <td className="px-4 lg:px-6 py-4 font-bold text-on-surface text-[11px] lg:text-body-md">tbl_voter_registry</td>
                  <td className="px-4 lg:px-6 py-4 text-secondary font-medium text-[11px] lg:text-body-md">UPSERT</td>
                  <td className="px-4 lg:px-6 py-4 text-on-surface text-[11px] lg:text-body-md">CU-SI-001</td>
                  <td className="px-4 lg:px-6 py-4">
                    <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-[10px] font-bold">SYNCED</span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-center">
                    <div className="w-2 h-2 rounded-full bg-secondary mx-auto"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
