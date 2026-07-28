"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const SECONDARY_ELECTIONS = [
  {
    id: 1,
    status: "Upcoming",
    statusColor: "bg-tertiary-fixed text-on-tertiary-fixed",
    timeLabel: "Opens in 2 Days",
    title: "Faculty of Law: Representative",
    description:
      "Electing the student representatives for the Faculty Board for the 2026/27 session.",
    action: "view-candidates",
    candidateImgs: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9US9N7vR_NztereCvFZCImJMhvraPw6TfnagFf8Au35P0CaorIeDJV5syJFjBJH1amxPTQN9WlMtRgcHr_jySv7LrXeCqCIKd6F2v32PSVsYuYITzAL86nXSI3fq2kqX5_x4XFec6Qi8Q0qhcwmO5EmT6UIBzkwfYeAhWN_uJI0IpCFZBZNWK75XLRoqa9PioYQ8GgT649Cti0-sOTS9vDJelo2v_APjMz_ljl6U-CEHEGDJAZX4jX_ligOJryb2iEA1bqPCTxa4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPmWYjAFsaIrmFZncr-OGDjGji54ZybzxIeW5OCt0xl4J3SnY3EbrdxUW2ATwWlB_g-MtoJsMs6prLbUA84thcUzXhZdcBB9tpljWMO2Q-VR2ZBrZpnmspBdlH8HsVnbEfdNARMenqvzkE9lrrItSnH124A-u0pRn57g_adRFQzxSOo-RuD7IeYizDhjlnxpBtpQ3tRscyAu7LU08_c3tMlHlo_TvAk3EUgwcZTOmNR4GFomUqyK2FakDzMmI_AzIG4HDC5RTrmoU",
    ],
    extraCandidates: "+4",
    progress: null,
  },
  {
    id: 2,
    status: "Ongoing",
    statusColor: "bg-surface-container-high text-on-surface-variant",
    timeLabel: "Ends tomorrow",
    title: "Sports Committee: Chairperson",
    description:
      "Direct election for the head of university sports and extracurricular coordinating committee.",
    action: "vote",
    candidateImgs: [],
    extraCandidates: null,
    progress: 78,
  },
];

export default function ActiveElection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Upcoming" | "Ongoing">("All");

  const filteredElections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SECONDARY_ELECTIONS.filter((e) => {
      const matchesSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.status.toLowerCase().includes(q);
      const matchesFilter =
        filterStatus === "All" || e.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterStatus]);

  return (
    <>
      {/* Header Section */}
      <section className="mb-stack-lg flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-primary mb-2 tracking-tight drop-shadow-sm">
            Elections Portal
          </h1>
          <p className="text-base md:text-lg font-medium text-on-surface-variant">
            Securely exercise your right to shape the future of our campus.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/30 shadow-sm w-full lg:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2.5 bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full sm:w-56 md:w-72 text-on-surface placeholder-outline"
              placeholder="Find an election..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
          {/* Filter pills */}
          <div className="flex items-center gap-1 justify-center sm:justify-start">
            {(["All", "Upcoming", "Ongoing"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  filterStatus === f
                    ? "bg-secondary text-on-secondary shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="bento-grid grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Featured Election Card (Hero) */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden soft-shadow relative group">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-secondary-container pointer-events-none"></div>
          <div className="p-8 h-full flex flex-col">
            <div className="flex flex-wrap justify-between items-start mb-8 gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-2 px-4 py-1.5 bg-secondary text-on-secondary rounded-full font-bold text-sm uppercase tracking-wider animate-pulse shadow-sm">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    fiber_manual_record
                  </span>
                  Active Now
                </span>
                <span className="px-4 py-1.5 bg-surface-container-highest text-on-surface-variant rounded-full font-bold text-sm shadow-sm">
                  Ends in 4h 22m
                </span>
              </div>
              <img
                className="w-24 h-24 object-contain drop-shadow-md"
                alt="Student Guild Presidential Election Icon"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0qdB3diR0-31jyOdSWmsLIkTUlixbWfTBnZejwQArfFiGtBPwn2xbulocZb2PMzEH7sm9_ykiMIl0vL-XC2FUYM12feOPKX9vmnrUoRIidNT8LPS4y3WbDhyX4g0Lnpv0p0Go2y8-4Ba6mx5HQjNQPqNRo8ucKJBXoNsU3RKXr3PHDi3cF0Y_1Z44qGAo3fcqB5aaoi05fOm6I9j7DUBJJzdcxRdkuUiIUCaOC8kpu4fyIAVk9Eawe97qBsna47U8h2RtecFoetw"
              />
            </div>
            <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-container mb-6 max-w-3xl leading-tight drop-shadow-sm">
              2026 Student Guild Presidential Election
            </h4>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl">
              Cast your vote for the next President of the Student Guild. Ensure
              your voice is heard in this critical election determining the
              leadership for the upcoming academic biennium.
            </p>
            <div className="mt-auto grid grid-cols-1 md:grid-cols-3 gap-gutter py-6 border-t border-outline-variant/20">
              <div className="md:col-span-2 flex flex-col justify-center">
                <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                  Start Date
                </p>
                <p className="text-body-lg font-bold text-primary-container">
                  Oct 12, 2026 • 08:00 AM
                </p>
              </div>
              <div className="flex justify-end items-center">
                <button className="w-full md:w-auto px-8 py-4 bg-primary-container text-on-primary font-bold rounded-xl hover:bg-on-surface-variant hover:-translate-y-0.5 transition-all duration-200 active:scale-95 soft-shadow flex items-center justify-center gap-3">
                  <span className="text-label-md">Cast Your Ballot</span>
                  <span className="material-symbols-outlined text-[20px]">
                    how_to_vote
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats/System Health Card */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          <div className="bg-primary-container text-on-primary p-6 rounded-xl flex-1 flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[32px] mb-4 text-secondary-fixed-dim">
                verified_user
              </span>
              <h5 className="font-headline-md text-headline-md mb-2">
                Supabase Secured
              </h5>
              <p className="font-body-md text-body-md opacity-80 mb-6">
                Your vote is encrypted and stored on a secured ledger, ensuring
                100% tamper-proof results.
              </p>
              <Link
                className="text-label-md font-label-md text-secondary-fixed-dim flex items-center gap-1 hover:gap-2 transition-all"
                href="/rules"
              >
                Learn about security
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
          <div className="bg-surface-container-highest p-6 rounded-xl flex items-center gap-4 border border-outline-variant/30">
            <div className="w-12 h-12 rounded-full bg-on-tertiary-container flex items-center justify-center text-white">
              <span className="material-symbols-outlined">history</span>
            </div>
            <div>
              <p className="text-label-sm font-label-sm text-on-surface-variant uppercase">
                Last Action
              </p>
              <p className="text-body-md font-body-md font-bold">
                Verified receipt
                <span className="ml-1 px-2 py-0.5 bg-secondary-container/20 border border-secondary/20 rounded text-secondary font-mono text-[14px] tracking-tight">
                  #8292-X
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Filtered election cards */}
        {filteredElections.length === 0 ? (
          <div className="col-span-12 text-center py-16 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl">
            <span className="material-symbols-outlined text-[64px] text-outline mb-4 block">
              search_off
            </span>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              No elections found
            </h4>
            <p className="text-on-surface-variant text-body-md">
              No elections match &quot;{searchQuery}&quot;.{" "}
              <button
                onClick={() => { setSearchQuery(""); setFilterStatus("All"); }}
                className="text-secondary font-bold hover:underline"
              >
                Clear filters
              </button>
            </p>
          </div>
        ) : (
          <>
            {filteredElections.map((election) => (
              <div
                key={election.id}
                className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 soft-shadow hover:border-secondary/30 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2 py-1 rounded font-label-sm text-label-sm ${election.statusColor}`}>
                    {election.status}
                  </span>
                  <p className="text-label-sm font-label-sm text-outline">
                    {election.timeLabel}
                  </p>
                </div>
                <h5 className="font-headline-md text-headline-md text-primary mb-2">
                  {election.title}
                </h5>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">
                  {election.description}
                </p>
                <div className="flex items-center justify-between">
                  {election.action === "view-candidates" ? (
                    <>
                      <div className="flex -space-x-2">
                        {election.candidateImgs.map((src, i) => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-surface bg-gray-200 overflow-hidden">
                            <img className="w-full h-full object-cover" src={src} alt="candidate" />
                          </div>
                        ))}
                        {election.extraCandidates && (
                          <div className="w-8 h-8 rounded-full border-2 border-surface bg-gray-400 flex items-center justify-center text-[10px] font-bold text-white">
                            {election.extraCandidates}
                          </div>
                        )}
                      </div>
                      <button className="text-secondary font-bold font-label-md text-label-md hover:underline decoration-2 underline-offset-4">
                        View Candidates
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mr-4">
                        <div className="bg-secondary h-full" style={{ width: `${election.progress}%` }}></div>
                      </div>
                      <button className="px-4 py-2 bg-on-surface text-surface rounded-lg font-bold font-label-md text-label-md whitespace-nowrap active:opacity-70">
                        Vote
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* View Election Calendar card */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 soft-shadow hover:border-secondary/30 transition-all flex flex-col justify-center items-center text-center group cursor-pointer border-dashed border-2">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-outline mb-3 group-hover:bg-secondary-fixed transition-colors">
                <span className="material-symbols-outlined">event_note</span>
              </div>
              <h5 className="font-label-md text-label-md font-bold text-on-surface">
                View Election Calendar
              </h5>
              <p className="text-label-sm font-label-sm text-outline">
                See all scheduled votes for 2026
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
