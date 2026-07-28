export default function Settings() {
  return (
    <>
      <div className="lg:p-margin-desktop p-4 pb-20 lg:pb-0 max-w-container-max mx-auto">
        <header className="mb-stack-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-2 tracking-tight drop-shadow-sm">
            Account Settings
          </h1>
          <p className="text-lg md:text-xl font-medium text-on-surface-variant max-w-2xl">
            Manage your student profile, secure your voting credentials, and
            customize your experience.
          </p>
        </header>
        
        <div className="bento-grid grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Personal Information - Read Only */}
          <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 soft-shadow">
            <div className="flex items-center gap-4 mb-stack-md border-b border-outline-variant pb-4">
              <span className="material-symbols-outlined text-primary text-3xl">
                badge
              </span>
              <h4 className="font-headline-md text-headline-md">
                Personal Information
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
              <div className="flex flex-col gap-1">
                <label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                  Full Name
                </label>
                <div className="p-4 bg-surface-container-low rounded-lg text-on-surface font-medium border border-outline-variant/30">
                  EGABO AARON
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                  Student Identification Number
                </label>
                <div className="p-4 bg-surface-container-low rounded-lg text-on-surface font-medium border border-outline-variant/30">
                  258-154
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
                <label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                  Faculty / Department
                </label>
                <div className="p-4 bg-surface-container-low rounded-lg text-on-surface font-medium border border-outline-variant/30">
                  Faculty of Science and Technology - BSc. Software Engineering
                </div>
              </div>
            </div>
            <div className="mt-stack-md flex items-start gap-4 p-5 bg-secondary-container/10 dark:bg-secondary-container/20 rounded-xl border border-secondary/20 shadow-sm">
              <span className="material-symbols-outlined text-secondary text-[28px]">info</span>
              <p className="text-base md:text-lg text-on-surface font-medium leading-relaxed">
                Your personal details are synced with the University Registry. If
                any information is incorrect, please contact the Registrar&apos;s
                Office.
              </p>
            </div>
          </section>

          {/* Quick Profile Summary */}
          <section className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden flex flex-col soft-shadow">
            <div className="h-32 bg-primary-container relative">
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <img
                  className="w-24 h-24 rounded-full border-4 border-surface object-cover shadow-md"
                  alt="Student profile portrait"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDtx28dsdvedUyiNdt0Y7-yEoUyxhm4bhqgiDG1rGE5Vcjr4bcCz8xQK5XKv8oxTqWmovgLMmlGC7wKxIl7oGEL0zWpjVClRhB9Nbb6LufwymC637rVq71S9G3Pqw4VAygf9spDIErpd-7llFsTamyb--J6iFmEsFQGHgx87ZxqYvjRhwwMEryyMDxg6mX0pAT4rPUipkH58oIEPyjbHZsSGn2VecDwDz0bTVbgMIdLTgkbS6vPj3sd314f9qIXChCR-bkIpX9TUrkow"
                />
              </div>
            </div>
            <div className="mt-12 p-8 text-center flex-1">
              <h5 className="font-headline-md text-headline-md mb-1">EGABO AARON</h5>
              <p className="text-label-md text-secondary mb-6">
                Verified Student Voter
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-label-md border-b border-outline-variant/20 pb-2">
                  <span className="text-on-surface-variant">Last Vote</span>
                  <span className="font-bold">Oct 16, 2026</span>
                </div>
                <div className="flex justify-between text-label-md border-b border-outline-variant/20 pb-2">
                  <span className="text-on-surface-variant">Account Security</span>
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      check_circle
                    </span>
                    High
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Account Security */}
          <section className="col-span-12 lg:col-span-6 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 soft-shadow">
            <div className="flex items-center gap-4 mb-stack-md border-b border-outline-variant pb-4">
              <span className="material-symbols-outlined text-primary text-3xl">
                security
              </span>
              <h4 className="font-headline-md text-headline-md">Account Security</h4>
            </div>
            <div className="space-y-stack-md">
              <div className="flex flex-col gap-stack-sm">
                <label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                  Voting PIN
                </label>
                <p className="text-label-md text-on-surface-variant mb-2">
                  Used to authorize your ballot submission.
                </p>
                <button className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[20px]">
                    password
                  </span>
                  Change Voting PIN
                </button>
              </div>
              <div className="h-[1px] bg-outline-variant my-6"></div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="font-bold text-on-surface">
                    Two-Factor Authentication
                  </span>
                  <span className="text-label-md text-on-surface-variant">
                    Requires a code sent to your university email.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-14 h-7 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="col-span-12 lg:col-span-6 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 soft-shadow">
            <div className="flex items-center gap-4 mb-stack-md border-b border-outline-variant pb-4">
              <span className="material-symbols-outlined text-primary text-3xl">
                settings_accessibility
              </span>
              <h4 className="font-headline-md text-headline-md">Preferences</h4>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                  System Language
                </label>
                <select className="w-full p-3 border border-outline-variant rounded-xl bg-surface appearance-none focus:border-secondary transition-all text-on-surface">
                  <option>English (United Kingdom)</option>
                  <option>Swahili</option>
                  <option>French</option>
                </select>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex flex-col">
                  <span className="font-bold text-on-surface">
                    Push Notifications
                  </span>
                  <span className="text-label-md text-on-surface-variant">
                    Election start and end alerts.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex flex-col">
                  <span className="font-bold text-on-surface">Dark Mode</span>
                  <span className="text-label-md text-on-surface-variant">
                    Switch to the dark visual theme.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    className="sr-only peer"
                    id="dark-mode-toggle-main"
                    type="checkbox"
                  />
                  <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="col-span-12 bg-red-50/50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-8 soft-shadow">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-headline-md text-headline-md text-error flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined">warning</span>
                  Deactivate Voting Session
                </h4>
                <p className="text-body-md text-on-surface-variant max-w-2xl">
                  If you suspect your account has been compromised, you can
                  temporarily suspend your voting ability. This action requires
                  immediate re-verification at the ICT office.
                </p>
              </div>
              <button className="px-6 py-3 border-2 border-error text-error font-bold rounded-xl hover:bg-error hover:text-on-error transition-all active:scale-95 whitespace-nowrap">
                Suspend Voting Rights
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
