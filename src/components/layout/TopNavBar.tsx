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

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.theme = "light";
      setTheme("light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
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
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      padding: "0 2rem",
      width: "100%",
      height: "72px",
      background: "var(--surface)",
      borderBottom: "1px solid var(--border)",
      position: "sticky",
      top: 0,
      zIndex: 40,
      boxShadow: "var(--sh-sm)",
    }}>
      {/* Welcome Text */}
      <div style={{ minWidth: 0, flex: 1 }}>
        <p style={{
          fontSize: "1.15rem",
          fontWeight: 800,
          color: "var(--navy)",
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          Welcome back, {user?.firstName ?? "User"}
        </p>
        <p style={{
          fontSize: "0.8rem",
          fontWeight: 500,
          color: "var(--text-2)",
          marginTop: "2px",
        }}>
          {roleLabel}
        </p>
      </div>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle theme"
          style={{
            width: "38px", height: "38px",
            borderRadius: "50%",
            border: "1.5px solid var(--border)",
            background: "var(--surface-2)",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--text-2)",
            transition: "all 0.15s",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            {theme === "dark" ? "light_mode" : "dark_mode"}
          </span>
        </button>

        {/* Notifications */}
        <button
          title="Notifications"
          style={{
            width: "38px", height: "38px",
            borderRadius: "50%",
            border: "1.5px solid var(--border)",
            background: "var(--surface-2)",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--text-2)",
            position: "relative",
            transition: "all 0.15s",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>notifications</span>
          <span style={{
            position: "absolute", top: "6px", right: "6px",
            width: "8px", height: "8px",
            background: "var(--red)", borderRadius: "50%",
            border: "2px solid var(--surface)",
          }} />
        </button>

        {/* Profile pill */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "6px 14px 6px 8px",
          borderRadius: "999px",
          border: "1.5px solid var(--border)",
          background: "var(--surface-2)",
          boxShadow: "var(--sh-sm)",
        }}>
          {/* Avatar */}
          <div style={{
            width: "34px", height: "34px",
            borderRadius: "50%",
            overflow: "hidden",
            background: "var(--navy)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            border: "2px solid var(--border)",
          }}>
            {avatarUrl ? (
              <img alt={fullName} src={avatarUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>{initial}</span>
            )}
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-1)", lineHeight: 1.2 }}>{fullName}</p>
            <p style={{ fontSize: "0.7rem", color: "var(--text-3)", lineHeight: 1.2 }}>{roleLabel}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
