"use client";
import { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";

const ROLE_LABELS: Record<string, string> = {
  voter: "Student Voter",
  candidate: "Candidate",
  ec: "Electoral Commission",
  admin: "System Administrator",
  auditor: "Auditor",
};

export default function TopNavBar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setTheme("dark");
    }
  };

  const fullName = isLoaded
    ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() || "User"
    : "Loading…";
  const role = (user?.publicMetadata?.role as string | undefined) ?? "";
  const roleLabel = ROLE_LABELS[role] ?? "User";

  const avatarUrl = user?.imageUrl;
  const initial = (
    user?.firstName?.[0] ??
    user?.emailAddresses?.[0]?.emailAddress?.[0] ??
    "U"
  ).toUpperCase();

  return (
    <header className="flex items-center justify-between gap-3 lg:px-margin-desktop px-4 py-3 w-full bg-surface dark:bg-surface-dim sticky top-0 z-40 border-b border-outline-variant h-20">
      {/* Welcome Text */}
      <div className="hidden sm:block min-w-0">
        <p className="truncate text-xl md:text-2xl font-extrabold text-primary dark:text-primary-container tracking-tight drop-shadow-sm mb-1">
          Welcome back, {user?.firstName ?? "User"} 👋
        </p>
        <p className="truncate text-sm md:text-base font-medium text-on-surface-variant">
          {roleLabel}
        </p>
      </div>

      <div className="flex items-center justify-end gap-2 sm:gap-3 min-w-0 w-full sm:w-auto">
        {/* Actions Group */}
        <div className="flex items-center gap-1 sm:gap-2 rounded-3xl bg-surface-container-highest border border-outline-variant px-1.5 sm:px-2 py-1.5 sm:py-2 shadow-sm flex-shrink-0">
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full hover:bg-surface-container-low transition-colors active:opacity-80 flex items-center justify-center"
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] sm:text-[24px]">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <button
            className="p-1.5 sm:p-2 rounded-full hover:bg-surface-container-low transition-colors active:opacity-80 relative flex items-center justify-center"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] sm:text-[24px]">
              notifications
            </span>
            <span className="absolute top-1 right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-error rounded-full border-2 border-surface animate-pulse"></span>
          </button>
        </div>

        {/* Profile Group */}
        <div className="flex items-center gap-2 sm:gap-3 rounded-3xl bg-surface-container-highest border border-outline-variant px-2 sm:px-3 py-1.5 sm:py-2 shadow-sm min-w-0">
          <div className="min-w-0 text-right">
            <p className="truncate font-label-md text-on-surface text-sm sm:text-base">
              {fullName}
            </p>
            <p className="truncate text-xs sm:text-sm text-outline">
              {roleLabel}
            </p>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-primary-container flex items-center justify-center flex-shrink-0 border border-outline-variant">
            {avatarUrl ? (
              <img
                alt={fullName}
                className="w-full h-full object-cover"
                src={avatarUrl}
              />
            ) : (
              <span className="text-on-primary-container font-bold text-sm">
                {initial}
              </span>
            )}
          </div>
        </div>

        {/* Sign Out */}
        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          className="p-1.5 sm:p-2 rounded-full hover:bg-error/10 transition-colors active:opacity-80 flex items-center justify-center"
          aria-label="Sign out"
          title="Sign out"
        >
          <span className="material-symbols-outlined text-error text-[20px] sm:text-[24px]">
            logout
          </span>
        </button>
      </div>
    </header>
  );
}
