"use client";
import { useEffect, useState } from "react";

export default function TopNavBar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check initial theme from localStorage or system preference
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

  return (
    <header className="flex items-center justify-between gap-3 lg:px-margin-desktop px-4 py-3 w-full bg-surface dark:bg-surface-dim sticky top-0 z-40 border-b border-outline-variant">
      <div className="hidden sm:block min-w-0">
        <p className="truncate text-xl md:text-2xl font-extrabold text-primary dark:text-primary-container tracking-tight drop-shadow-sm mb-1">
          Welcome back, Aaron 👋
        </p>
        <p className="truncate text-sm md:text-base font-medium text-on-surface-variant">
          Student ID: 258-154
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-3xl bg-surface-container-highest border border-outline-variant px-2 py-2 shadow-sm">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-surface-container-low transition-colors active:opacity-80"
          >
            <span className="material-symbols-outlined">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors active:opacity-80 relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
          </button>
        </div>

        <div className="flex items-center gap-3 rounded-3xl bg-surface-container-highest border border-outline-variant px-3 py-2 shadow-sm">
          <div className="min-w-0 text-right">
            <p className="truncate font-label-md text-on-surface">EGABO AARON</p>
            <p className="truncate text-sm text-outline">Student</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-lowest">
            <img
              alt="Profile avatar"
              className="w-full h-full object-cover"
              src="/assets/Aaron.jpeg"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
