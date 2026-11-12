"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { isAdminUser } from "@/features/auth/tokenStorage";
import EnquiriesPanel from "./EnquiriesPanel";
import { ApiError } from "@/services/apiClient";
import { Icon, Modal, ConfirmDialog, input, select, btn, btnPrimary, messageOf, fmtDate } from "./ui";
import {
  getUser,
  listUsers,
  createUser,
  replaceRoles,
  resetPasswordById,
  deleteUser,
  setUserStatus,
  type AdminUser,
  type UserPage,
} from "@/features/admin/adminService";

const MIN_PASSWORD = 8;
const BASE_ROLES = ["ADMIN", "USER"];
const PAGE_SIZES = [10, 20, 50];

/** A readable random password that meets the length rule. */
function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#$%";
  const bytes = crypto.getRandomValues(new Uint32Array(14));
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

/** 0-4 from length and character variety; only a hint, the server decides. */
function strength(pw: string) {
  if (!pw) return 0;
  let n = 0;
  // Repeating one or two characters is weak whatever the length.
  if (new Set(pw).size <= 2) return 1;
  if (pw.length >= MIN_PASSWORD) n++;
  if (pw.length >= 12) n++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) n++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) n++;
  return Math.max(1, n);
}
const STRENGTH = [
  ["", ""],
  ["Weak", "bg-red-500"],
  ["Fair", "bg-amber-500"],
  ["Good", "bg-[#0078C8]"],
  ["Strong", "bg-emerald-500"],
] as const;

/** Usernames, emails and passwords never contain spaces, so they are never typed in. */
const noSpaces = (v: string) => v.replace(/\s/g, "");

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

type Toast = { kind: "ok" | "err"; text: string } | null;
type View = "home" | "users" | "enquiries";

type Dialog =
  | { type: "view"; user: AdminUser }
  | { type: "roles"; user: AdminUser }
  | { type: "password"; user: AdminUser }
  | { type: "status"; user: AdminUser }
  | { type: "delete"; user: AdminUser }
  | { type: "create" }
  | { type: "reset-by-login" }
  | null;

type Overview = { total: number; active: number; inactive: number; admins: number; recent: AdminUser[] };

const NAV: { id: View; label: string; icon: React.ReactNode }[] = [
  {
    id: "home",
    label: "Home",
    icon: <path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" />,
  },
  {
    id: "users",
    label: "Users",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.8a3.5 3.5 0 010 6.4M18 14.4c2 .7 3.5 2.6 3.5 5.6" />
      </>
    ),
  },
  {
    id: "enquiries",
    label: "Enquiries",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
];

const TITLES: Record<View, [string, string]> = {
  home: ["Dashboard", "Your users, roles and access overview"],
  users: ["Users", "Manage accounts, roles and access"],
  enquiries: ["Enquiries", "Contact Us leads from the website"],
};

export default function AdminDashboard() {
  const { user, sessionChecked, openAuth, logout } = useAuth();

  const [view, setView] = useState<View>("home");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [layout, setLayout] = useState<"table" | "cards">("table");
  const [layoutChosen, setLayoutChosen] = useState(false);

  // Phones start on cards; once the user picks a layout, their choice sticks.
  useEffect(() => {
    if (layoutChosen) return;
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setLayout(mq.matches ? "cards" : "table");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [layoutChosen]);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"" | "active" | "inactive">("");
  const [role, setRole] = useState("");
  const [sort, setSort] = useState("createdAt,desc");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [data, setData] = useState<UserPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [overview, setOverview] = useState<Overview | null>(null);
  const [dialog, setDialog] = useState<Dialog>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [knownRoles, setKnownRoles] = useState<string[]>(BASE_ROLES);

  const isAdmin = isAdminUser(user);

  // Debounce the search box so every keystroke is not a request.
  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(search);
      setPage(0);
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(t);
  }, [toast]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listUsers({ page, size, sort, search: query, status, role });
      setData(res);
      setKnownRoles((prev) => Array.from(new Set([...prev, ...res.items.flatMap((u) => u.roles)])));
    } catch (e) {
      setError(messageOf(e));
    } finally {
      setLoading(false);
    }
  }, [page, size, sort, query, status, role]);

  /** Home cards: four cheap one-row requests for the totals, plus the newest five users. */
  const loadOverview = useCallback(async () => {
    try {
      const [all, active, inactive, admins, recent] = await Promise.all([
        listUsers({ page: 0, size: 1 }),
        listUsers({ page: 0, size: 1, status: "active" }),
        listUsers({ page: 0, size: 1, status: "inactive" }),
        listUsers({ page: 0, size: 1, role: "ADMIN" }),
        listUsers({ page: 0, size: 5, sort: "createdAt,desc" }),
      ]);
      setOverview({ total: all.total, active: active.total, inactive: inactive.total, admins: admins.total, recent: recent.items });
    } catch {
      setOverview(null);
    }
  }, []);

  useEffect(() => {
    if (isAdmin && view === "users") void load();
  }, [isAdmin, view, load]);

  useEffect(() => {
    if (isAdmin && view === "home") void loadOverview();
  }, [isAdmin, view, loadOverview]);

  useEffect(() => {
    if (!mobileNav) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileNav(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileNav]);

  const refresh = () => {
    void load();
    void loadOverview();
  };
  const ok = (text: string) => setToast({ kind: "ok", text });
  /** The server refuses to reset your own password this way; it must be changed with the current password. */
  const isOwnPasswordError = (e: unknown) => e instanceof ApiError && /own password/i.test(e.message);
  const fail = (e: unknown) => {
    if (isOwnPasswordError(e)) {
      setToast({ kind: "err", text: "That is your own account. Enter your current password to change it." });
      openAuth("password");
      return;
    }
    setToast({ kind: "err", text: messageOf(e) });
  };

  const toggleSort = (field: string) => {
    const [f, dir] = sort.split(",");
    setSort(f === field ? `${field},${dir === "asc" ? "desc" : "asc"}` : `${field},asc`);
    setPage(0);
  };

  // ---- access states --------------------------------------------------------
  if (!sessionChecked) {
    return <Frame>
        <div role="status" aria-live="polite" className="m-auto grid place-items-center">
          <span aria-hidden="true" className="h-10 w-10 animate-spin rounded-full border-[3px] border-aqua/20 border-t-aqua" />
          <span className="sr-only">Loading…</span>
        </div>
      </Frame>;
  }
  if (!user || !isAdmin) {
    return (
      <Frame>
        <div className="m-auto w-full max-w-md rounded-3xl border border-border bg-surface p-8 text-center shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className="mx-auto h-12 w-auto" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-paper">Admin access required</h1>
          <p className="mt-2 text-mist">
            {user ? "This account does not have administrator access." : "Log in with an administrator account to open the dashboard."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            {!user && <button type="button" onClick={() => openAuth("login")} className={btnPrimary}>Log in</button>}
            <a href="/" className={btn}>Back to website</a>
          </div>
        </div>
      </Frame>
    );
  }

  const displayName = user.name || user.email || "Admin";
  const initial = displayName.trim().charAt(0).toUpperCase() || "A";
  const [sortField, sortDir] = sort.split(",");
  const arrow = (f: string) => (sortField === f ? (sortDir === "asc" ? " ↑" : " ↓") : "");
  const isSelf = (u: AdminUser) => (!!user.id && u.id === user.id) || (!!user.email && u.email === user.email);
  const [title, subtitle] = TITLES[view];

  return (
    <Frame>
      <div className="flex h-full w-full">
        {/* ---------------- sidebar ---------------- */}
        <aside className={`hidden shrink-0 flex-col border-r border-border/60 bg-surface transition-[width] duration-200 md:flex ${collapsed ? "w-[72px]" : "w-[232px]"}`}>
          <div className="flex h-[72px] items-center gap-3 border-b border-border/60 px-4">
            {collapsed ? (
              /* Collapsed: the logo, which turns into the expand toggle on hover. */
              <button
                type="button"
                aria-label="Expand sidebar"
                title="Expand sidebar"
                onClick={() => setCollapsed(false)}
                className="group/logo relative mx-auto grid h-10 w-10 place-items-center rounded-lg transition-colors hover:bg-surface2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="" className="h-8 w-auto transition-opacity group-hover/logo:opacity-0 group-focus-visible/logo:opacity-0" />
                <span className="absolute inset-0 grid place-items-center text-mist opacity-0 transition-opacity group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100">
                  <Icon><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M9 4v16M13 9l3 3-3 3" /></Icon>
                </span>
              </button>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src="/logo.svg" alt="" className="h-8 w-auto shrink-0" />
            )}
            {!collapsed && (
              <div className="min-w-0 flex-1 leading-tight">
                <p className="font-display text-[17px] font-bold text-paper">Seer<span className="text-[#0078C8]">Hive</span></p>
                <p className="mt-0.5 text-[10px] font-medium leading-snug text-mist">Intelligent Solutions, Infinite Possibilities</p>
              </div>
            )}
            <button
              type="button"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setCollapsed((v) => !v)}
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-mist transition-colors hover:bg-surface2 hover:text-paper ${collapsed ? "hidden" : ""}`}
            >
              <Icon><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M9 4v16M15 9l-3 3 3 3" /></Icon>
            </button>
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {NAV.map((n) => {
              const on = view === n.id;
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setView(n.id)}
                  title={collapsed ? n.label : undefined}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[14px] font-medium transition-colors ${on ? "bg-[#3B8BE0] text-white shadow-sm" : "text-paper hover:bg-surface2"} ${collapsed ? "justify-center px-0" : ""}`}
                >
                  <Icon>{n.icon}</Icon>
                  {!collapsed && n.label}
                </button>
              );
            })}
          </nav>

          <div className="space-y-0.5 border-t border-border/60 p-3">
            <button type="button" onClick={() => { logout(); window.location.href = "/"; }} title={collapsed ? "Log out" : undefined} className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[14px] text-mist transition-colors hover:bg-surface2 hover:text-paper ${collapsed ? "justify-center px-0" : ""}`}>
              <Icon><path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9" /></Icon>
              {!collapsed && "Log out"}
            </button>
          </div>
        </aside>

        {/* ---------------- main ---------------- */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="flex h-[72px] shrink-0 items-center gap-4 border-b border-border/60 bg-surface px-5 lg:px-8">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileNav(true)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border text-paper transition-colors hover:bg-surface2 md:hidden"
            >
              <Icon><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M9 4v16M14 9l3 3-3 3" /></Icon>
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate font-display text-[19px] font-semibold leading-tight text-paper">{title}</h1>
              <p className="truncate text-[13px] text-mist">{subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <ProfileMenu
                initial={initial}
                name={displayName}
                email={user.email}
                roles={user.roles ?? []}
                onChangePassword={() => openAuth("password")}
                onLogout={() => { logout(); window.location.href = "/"; }}
              />
            </div>
          </header>

          <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-ink p-2 lg:p-3">
            {/* welcome banner */}
            {view === "home" && (
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F4C94] via-[#1F70C6] to-[#5AAEF0] px-6 py-5 text-white shadow-[0_24px_50px_-28px_rgba(15,76,148,0.7)] lg:px-9">
              <span className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-white/10" />
              <span className="pointer-events-none absolute right-24 top-10 h-72 w-72 rounded-full bg-white/10" />
              <div className="relative flex flex-wrap items-center gap-5">
                <span className="grid h-[60px] w-[60px] shrink-0 place-items-center rounded-full border-[3px] border-white/30 bg-white/15 font-display text-[24px] font-bold">
                  {initial}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-[clamp(1.25rem,2.2vw,1.65rem)] font-semibold leading-tight">{greeting()}, {displayName}</h2>
                  <p className="mt-0.5 text-[13px] text-white/85">
                    Administrator{user.email && user.email !== displayName ? ` · ${user.email}` : ""}
                  </p>
                </div>
                <span className="hidden items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-[13px] font-semibold sm:inline-flex">
                  <Icon size={18}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></Icon>
                  {new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
            </section>
            )}

            {view === "home" && (
              <HomeView
                overview={overview}
                onOpenUsers={() => setView("users")}
                onAddUser={() => setDialog({ type: "create" })}
                onView={(u) => setDialog({ type: "view", user: u })}
              />
            )}

            {view === "enquiries" && <EnquiriesPanel onOk={ok} onFail={fail} />}

            {view === "users" && (
              <>
                {/* toolbar */}
                <div className="mt-2.5 flex flex-wrap items-center gap-3">
                  <div className="relative min-w-[220px] flex-1 sm:max-w-sm">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mist"><Icon size={17}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></Icon></span>
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search name, username or email"
                      aria-label="Search users"
                      className={`${input} pl-10`}
                    />
                  </div>
                  <select value={status} onChange={(e) => { setStatus(e.target.value as typeof status); setPage(0); }} aria-label="Filter by status" className={select}>
                    <option value="">All statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <select value={role} onChange={(e) => { setRole(e.target.value); setPage(0); }} aria-label="Filter by role" className={select}>
                    <option value="">All roles</option>
                    {knownRoles.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {(search || status || role) && (
                    <button type="button" onClick={() => { setSearch(""); setStatus(""); setRole(""); }} className="text-[13px] font-semibold text-azure-soft hover:text-paper">
                      Clear filters
                    </button>
                  )}
                  <div role="group" aria-label="Layout" className="ml-auto flex overflow-hidden rounded-xl border border-border bg-surface">
                    {([
                      ["cards", "Cards", <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>],
                      ["table", "Table", <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M3 15h18M9 4v16" /></>],
                    ] as const).map(([id, text, icon]) => (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={layout === id}
                        title={`${text} view`}
                        onClick={() => { setLayout(id); setLayoutChosen(true); }}
                        className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold transition-colors ${layout === id ? "bg-[#0078C8] text-white" : "text-mist hover:text-paper"}`}
                      >
                        <Icon size={16}>{icon}</Icon>
                        <span className="hidden sm:inline">{text}</span>
                      </button>
                    ))}
                  </div>
                  <span className="text-[13px] text-mist">{loading ? "Loading…" : data ? `${data.total} ${data.total === 1 ? "user" : "users"}` : ""}</span>
                  <button type="button" onClick={() => setDialog({ type: "create" })} className={btnPrimary}>+ Add user</button>
                </div>

                {/* table */}
                <div className={`mt-4 rounded-2xl border border-border bg-surface shadow-[0_10px_30px_-24px_rgba(15,40,90,0.35)] ${layout === "table" ? "overflow-hidden" : ""}`}>
                  {layout === "table" && (
                  <div className="min-h-[300px] overflow-x-auto">
                    <table className="w-full min-w-[960px] table-fixed text-left text-[13px]">
                      <colgroup>
                        <col />
                        <col className="w-[170px]" />
                        <col className="w-[130px]" />
                        <col className="w-[110px]" />
                        <col className="w-[120px]" />
                        <col className="w-[220px]" />
                      </colgroup>
                      <thead className="bg-[#0078C8]/15 text-paper">
                        <tr className="label-mono text-[12px]">
                          <Th onClick={() => toggleSort("name")}>User{arrow("name")}</Th>
                          <Th onClick={() => toggleSort("username")}>Username{arrow("username")}</Th>
                          <Th>Roles</Th>
                          <Th onClick={() => toggleSort("active")}>Status{arrow("active")}</Th>
                          <Th className="whitespace-nowrap" onClick={() => toggleSort("createdAt")}>Created{arrow("createdAt")}</Th>
                          <Th className="text-right">Actions</Th>
                        </tr>
                      </thead>
                      <tbody className={loading ? "opacity-60" : ""}>
                        {error && <tr><td colSpan={6} className="px-4 py-10 text-center text-red-500">{error}</td></tr>}
                        {!error && data && data.items.length === 0 && <tr><td colSpan={6} className="px-4 py-14 text-center"><p className="font-semibold text-paper">No users found</p><p className="mt-1 text-[13px] text-mist">Try a different search or clear the filters.</p></td></tr>}
                        {!error && !data && <tr><td colSpan={6} className="px-4 py-10 text-center text-mist">Loading users…</td></tr>}
                        {!error && data?.items.map((u) => (
                          <tr key={u.id} className="border-t border-border/60 transition-colors hover:bg-[#0078C8]/[0.04]">
                            <td className="overflow-hidden px-4 py-3"><UserCell u={u} /></td>
                            <td className="truncate px-4 py-3 text-paper" title={u.username}>{u.username || "–"}</td>
                            <td className="px-4 py-3"><RoleChips roles={u.roles} /></td>
                            <td className="px-4 py-3"><StatusBadge active={u.active} /></td>
                            <td className="whitespace-nowrap px-4 py-3 text-mist">{fmtDate(u.createdAt)}</td>
                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-1.5 whitespace-nowrap text-[12px] font-semibold">
                                <Link onClick={() => setDialog({ type: "view", user: u })}>View</Link>
                                <Link onClick={() => setDialog({ type: "roles", user: u })}>Roles</Link>
                                <RowMenu
                                  label={`More actions for ${u.name || u.username}`}
                                  items={[
                                    { label: isSelf(u) ? "Change my password" : "Reset password", onClick: () => (isSelf(u) ? openAuth("password") : setDialog({ type: "password", user: u })) },
                                    { label: u.active ? "Deactivate" : "Activate", danger: u.active, disabled: isSelf(u), title: isSelf(u) ? "You cannot deactivate your own account" : undefined, onClick: () => setDialog({ type: "status", user: u }) },
                                    { label: "Delete", danger: true, disabled: isSelf(u), title: isSelf(u) ? "You cannot delete your own account" : undefined, onClick: () => setDialog({ type: "delete", user: u }) },
                                  ]}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  )}

                  {layout === "cards" && (
                    <div className={`grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:p-4 2xl:grid-cols-3 ${loading ? "opacity-60" : ""}`}>
                      {error && <p className="col-span-full px-4 py-10 text-center text-red-500">{error}</p>}
                      {!error && !data && <p className="col-span-full px-4 py-10 text-center text-mist">Loading users…</p>}
                      {!error && data && data.items.length === 0 && (
                        <div className="col-span-full px-4 py-14 text-center">
                          <p className="font-semibold text-paper">No users found</p>
                          <p className="mt-1 text-[13px] text-mist">Try a different search or clear the filters.</p>
                        </div>
                      )}
                      {!error && data?.items.map((u) => (
                        <article key={u.id} className="min-w-0 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-[#0078C8]/40">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1"><UserCell u={u} accent /></div>
                            <RowMenu
                              label={`Actions for ${u.name || u.username}`}
                              items={[
                                { label: "View details", onClick: () => setDialog({ type: "view", user: u }) },
                                { label: "Change roles", onClick: () => setDialog({ type: "roles", user: u }) },
                                { label: isSelf(u) ? "Change my password" : "Reset password", onClick: () => (isSelf(u) ? openAuth("password") : setDialog({ type: "password", user: u })) },
                                { label: u.active ? "Deactivate" : "Activate", danger: u.active, disabled: isSelf(u), title: isSelf(u) ? "You cannot deactivate your own account" : undefined, onClick: () => setDialog({ type: "status", user: u }) },
                                { label: "Delete", danger: true, disabled: isSelf(u), title: isSelf(u) ? "You cannot delete your own account" : undefined, onClick: () => setDialog({ type: "delete", user: u }) },
                              ]}
                            />
                          </div>
                          <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-[13px]">
                            <div className="min-w-0">
                              <dt className="label-mono text-[11px] font-semibold text-[#0078C8]">Username</dt>
                              <dd className="mt-0.5 truncate font-medium text-paper" title={u.username}>{u.username || "–"}</dd>
                            </div>
                            <div>
                              <dt className="label-mono text-[11px] font-semibold text-[#0078C8]">Status</dt>
                              <dd className="mt-0.5"><StatusBadge active={u.active} /></dd>
                            </div>
                            <div>
                              <dt className="label-mono text-[11px] font-semibold text-[#0078C8]">Roles</dt>
                              <dd className="mt-0.5"><RoleChips roles={u.roles} /></dd>
                            </div>
                            <div>
                              <dt className="label-mono text-[11px] font-semibold text-[#0078C8]">Created</dt>
                              <dd className="mt-0.5 whitespace-nowrap text-paper">{fmtDate(u.createdAt)}</dd>
                            </div>
                          </dl>
                        </article>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 px-4 py-3 text-[14px] text-mist">
                    <span>{data && data.total > 0 ? `${page * size + 1}–${Math.min((page + 1) * size, data.total)} of ${data.total}` : "0 users"}</span>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2">
                        Rows
                        <select value={size} onChange={(e) => { setSize(Number(e.target.value)); setPage(0); }} className="rounded-lg border border-border bg-ink px-2 py-1 text-paper">
                          {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </label>
                      <button type="button" className={btn} disabled={page === 0 || loading} onClick={() => setPage((p) => p - 1)}>Previous</button>
                      <span>Page {page + 1} of {Math.max(data?.totalPages ?? 1, 1)}</span>
                      <button type="button" className={btn} disabled={loading || !data || page + 1 >= data.totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* mobile drawer: opens from the left */}
      {mobileNav && (
        <div className="fixed inset-0 z-[70] md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileNav(false)} />
          <aside role="dialog" aria-modal="true" aria-label="Menu" className="absolute inset-y-0 left-0 flex w-[272px] max-w-[85vw] flex-col bg-surface shadow-2xl animate-drawerIn">
            <div className="flex h-[72px] items-center gap-3 border-b border-border/60 px-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="" className="h-8 w-auto shrink-0" />
              <div className="min-w-0 flex-1 leading-tight">
                <p className="font-display text-[17px] font-bold text-paper">Seer<span className="text-[#0078C8]">Hive</span></p>
                <p className="mt-0.5 text-[10px] font-medium leading-snug text-mist">Intelligent Solutions, Infinite Possibilities</p>
              </div>
              <button type="button" aria-label="Close menu" onClick={() => setMobileNav(false)} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-mist hover:bg-surface2 hover:text-paper">
                <Icon><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M9 4v16M15 9l-3 3 3 3" /></Icon>
              </button>
            </div>
            <nav className="flex-1 space-y-1 p-3">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => { setView(n.id); setMobileNav(false); }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[15px] font-medium transition-colors ${view === n.id ? "bg-[#3B8BE0] text-white shadow-sm" : "text-paper hover:bg-surface2"}`}
                >
                  <Icon>{n.icon}</Icon>
                  {n.label}
                </button>
              ))}
            </nav>
            <div className="space-y-0.5 border-t border-border/60 p-3">
              <button type="button" onClick={() => { logout(); window.location.href = "/"; }} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[15px] text-mist transition-colors hover:bg-surface2 hover:text-paper">
                <Icon><path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9" /></Icon>
                Log out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* dialogs */}
      {dialog?.type === "create" && (
        <CreateUserDialog
          knownRoles={knownRoles}
          onClose={() => setDialog(null)}
          onCreated={(name) => { setDialog(null); ok(`Account created for ${name}.`); refresh(); }}
          onError={fail}
        />
      )}
      {dialog?.type === "view" && <ViewDialog id={dialog.user.id} fallback={dialog.user} onClose={() => setDialog(null)} />}
      {dialog?.type === "roles" && (
        <RolesDialog
          user={dialog.user}
          knownRoles={knownRoles}
          editingSelf={isSelf(dialog.user)}
          onClose={() => setDialog(null)}
          onSaved={() => { setDialog(null); ok("Roles updated."); refresh(); }}
          onError={fail}
        />
      )}
      {dialog?.type === "password" && (
        <Modal title={`Reset password for ${dialog.user.name || dialog.user.username || dialog.user.email}`} onClose={() => setDialog(null)}>
          <PasswordForm
            submitLabel="Reset password"
            onCancel={() => setDialog(null)}
            onSubmit={(pw) => resetPasswordById(dialog.user.id, pw)}
            onDone={() => { setDialog(null); ok("Password reset."); }}
            onError={fail}
          />
        </Modal>
      )}
      {dialog?.type === "status" && (
        <ConfirmDialog
          title={dialog.user.active ? "Deactivate this user?" : "Activate this user?"}
          body={dialog.user.active ? `${dialog.user.name || dialog.user.username} will no longer be able to log in.` : `${dialog.user.name || dialog.user.username} will be able to log in again.`}
          confirmLabel={dialog.user.active ? "Deactivate" : "Activate"}
          danger={dialog.user.active}
          disabled={isSelf(dialog.user)}
          onClose={() => setDialog(null)}
          onConfirm={async () => {
            try {
              await setUserStatus(dialog.user.id, !dialog.user.active);
              setDialog(null);
              ok(dialog.user.active ? "User deactivated." : "User activated.");
              refresh();
            } catch (e) {
              fail(e);
            }
          }}
        />
      )}

      {dialog?.type === "delete" && (
        <ConfirmDialog
          title="Delete this user?"
          body={`${dialog.user.name || dialog.user.username} will be permanently deleted and will no longer be able to log in. This action cannot be undone.`}
          confirmLabel="Delete"
          danger
          disabled={isSelf(dialog.user)}
          onClose={() => setDialog(null)}
          onConfirm={async () => {
            try {
              await deleteUser(dialog.user.id);
              setDialog(null);
              ok("User deleted.");
              refresh();
            } catch (e) {
              fail(e);
            }
          }}
        />
      )}

      {toast && (
        <div role="status" className={`fixed bottom-6 right-6 z-[170] max-w-sm rounded-xl px-4 py-3 text-[14px] font-semibold text-white shadow-xl ${toast.kind === "ok" ? "bg-emerald-600" : "bg-red-600"}`}>
          {toast.text}
        </div>
      )}
    </Frame>
  );
}

// ---- layout pieces ----------------------------------------------------------

type RowMenuItem = { label: string; onClick: () => void; danger?: boolean; disabled?: boolean; title?: string };

/** Three-dot button that opens a small menu of actions. */
function RowMenu({ items, label }: { items: RowMenuItem[]; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, [open]);
  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className="grid h-9 w-9 place-items-center rounded-lg text-mist transition-colors hover:bg-surface2 hover:text-paper"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" /></svg>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full z-30 mt-1 w-48 overflow-hidden rounded-xl border border-border/60 bg-surface p-1 shadow-[0_18px_40px_-18px_rgba(15,40,90,0.45)] animate-floatIn">
          {items.map((it) => (
            <button
              key={it.label}
              type="button"
              role="menuitem"
              disabled={it.disabled}
              title={it.title}
              onClick={() => { setOpen(false); it.onClick(); }}
              className={`flex w-full items-center rounded-lg px-3 py-2.5 text-left text-[14px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${it.danger ? "text-red-500 hover:bg-red-500/10" : "text-paper hover:bg-surface2"}`}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Avatar in the top bar. Hover or click opens a card with the account details and options. */
function ProfileMenu({ initial, name, email, roles, onChangePassword, onLogout }: {
  initial: string; name: string; email: string; roles: string[];
  onChangePassword: () => void; onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancel = () => { if (timer.current) clearTimeout(timer.current); timer.current = null; };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, [open]);
  useEffect(() => cancel, []);

  const item = "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] font-medium text-paper transition-colors hover:bg-surface2";
  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => { cancel(); setOpen(true); }}
      onMouseLeave={() => { cancel(); timer.current = setTimeout(() => setOpen(false), 150); }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        onClick={() => setOpen((v) => !v)}
        className="relative grid h-10 w-10 place-items-center rounded-full bg-[#0078C8] font-display text-[15px] font-bold text-white ring-2 ring-transparent transition-shadow hover:ring-[#0078C8]/30"
      >
        {initial}
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-surface bg-emerald-500" />
      </button>

      {open && (
        <div role="menu" className="absolute right-0 top-full z-50 pt-2">
          <div className="w-72 overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-[0_24px_60px_-24px_rgba(15,40,90,0.4)] animate-floatIn">
            <div className="flex items-center gap-3 border-b border-border/60 bg-surface2/60 px-4 py-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#0078C8] font-display text-[18px] font-bold text-white">{initial}</span>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-paper" title={name}>{name}</p>
                {email && <p className="truncate text-[12px] text-mist" title={email}>{email}</p>}
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {(roles.length ? roles : ["ADMIN"]).map((r) => (
                    <span key={r} className="rounded-full bg-[#0078C8]/10 px-2 py-0.5 text-[11px] font-semibold text-azure-soft">{r}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-1.5">
              <a href="/" role="menuitem" className={item}>
                <Icon size={18}><path d="M15 6l-6 6 6 6" /></Icon>
                Back to website
              </a>
              <button type="button" role="menuitem" className={item} onClick={() => { setOpen(false); onChangePassword(); }}>
                <Icon size={18}><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></Icon>
                Change password
              </button>
              <button type="button" role="menuitem" className={`${item} text-red-500`} onClick={() => { setOpen(false); onLogout(); }}>
                <Icon size={18}><path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9" /></Icon>
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Full-screen app frame: sits over the marketing navbar and footer. */
function Frame({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[60] flex overflow-hidden bg-ink font-body text-paper">{children}</div>;
}

function HomeView({ overview, onOpenUsers, onAddUser, onView }: {
  overview: Overview | null; onOpenUsers: () => void; onAddUser: () => void; onView: (u: AdminUser) => void;
}) {
  const cards: [string, number | undefined][] = [
    ["Total users", overview?.total],
    ["Active", overview?.active],
    ["Inactive", overview?.inactive],
    ["Administrators", overview?.admins],
  ];
  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-[13px] text-mist">{label}</p>
            <p className="mt-1.5 font-display text-[26px] font-semibold leading-none text-paper">{value ?? "–"}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <section className="rounded-2xl border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
            <h3 className="font-display text-[15px] font-semibold text-paper">Recently added users</h3>
            <button type="button" onClick={onOpenUsers} className="text-[14px] font-semibold text-azure-soft hover:text-paper">View all →</button>
          </div>
          {!overview && <p className="px-5 py-8 text-center text-mist">Loading…</p>}
          {overview && overview.recent.length === 0 && <p className="px-5 py-8 text-center text-mist">No users yet.</p>}
          <ul>
            {overview?.recent.map((u) => (
              <li key={u.id}>
                <button type="button" onClick={() => onView(u)} className="flex w-full items-center justify-between gap-4 border-t border-border/60 px-5 py-3.5 text-left first:border-t-0 hover:bg-surface2/50">
                  <div className="min-w-0 flex-1"><UserCell u={u} /></div>
                  <span className="hidden shrink-0 items-center gap-3 sm:flex">
                    <RoleChips roles={u.roles} />
                    <StatusBadge active={u.active} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5">
          <h3 className="font-display text-[15px] font-semibold text-paper">Quick actions</h3>
          <div className="mt-4 space-y-3">
            <button type="button" onClick={onAddUser} className="flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3.5 text-left transition-colors hover:bg-surface2">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#0078C8]/10 text-[#0078C8]"><Icon><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6M18 9v6M15 12h6" /></Icon></span>
              <span><span className="block text-[14px] font-semibold text-paper">Add a user</span><span className="text-[13px] text-mist">Create an account for someone</span></span>
            </button>
            <button type="button" onClick={onOpenUsers} className="flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3.5 text-left transition-colors hover:bg-surface2">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#0078C8]/10 text-[#0078C8]"><Icon><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /></Icon></span>
              <span><span className="block text-[14px] font-semibold text-paper">Manage users</span><span className="text-[13px] text-mist">Roles, access and status</span></span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

function UserCell({ u, accent }: { u: AdminUser; accent?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0078C8] text-[14px] font-bold text-white">
        {(u.name || u.username || u.email || "?").charAt(0).toUpperCase()}
      </span>
      <div className="min-w-0">
        <p className="truncate font-semibold text-paper" title={u.name}>{u.name || u.username || "–"}</p>
        <p className={`truncate text-[13px] ${accent ? "text-[#0078C8]" : "text-mist"}`} title={u.email}>{u.email || "–"}</p>
      </div>
    </div>
  );
}

function RoleChips({ roles }: { roles: string[] }) {
  if (!roles.length) return <span className="text-mist">–</span>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {roles.map((r) => <span key={r} className="rounded-full bg-[#0078C8]/10 px-2.5 py-0.5 text-[12px] font-semibold text-azure-soft">{r}</span>)}
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${active ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-500"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-red-500"}`} />
      {active ? "Active" : "Inactive"}
    </span>
  );
}

// ---- small pieces -----------------------------------------------------------

function Th({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <th className={`px-4 py-3 font-semibold ${className}`}>
      {onClick ? (
        <button type="button" onClick={onClick} className="uppercase tracking-wider hover:text-paper">{children}</button>
      ) : children}
    </th>
  );
}

function Link({ children, onClick, disabled, title, danger }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; title?: string; danger?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`rounded-lg border border-border px-2.5 py-1 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${danger ? "text-red-500 hover:border-red-400/60 hover:bg-red-500/10" : "text-azure-soft hover:border-[#0078C8]/40 hover:bg-[#0078C8]/10"}`}
    >
      {children}
    </button>
  );
}

function ViewDialog({ id, fallback, onClose }: { id: string; fallback: AdminUser; onClose: () => void }) {
  const [u, setU] = useState<AdminUser>(fallback);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    let live = true;
    getUser(id).then((x) => live && setU(x)).catch((e) => live && setErr(messageOf(e)));
    return () => { live = false; };
  }, [id]);
  const rows: [string, string][] = [
    ["Name", u.name || "–"],
    ["Username", u.username || "–"],
    ["Email", u.email || "–"],
    ["Roles", u.roles.join(", ") || "–"],
    ["Status", u.active ? "Active" : "Inactive"],
    ["Created", fmtDate(u.createdAt)],
    ["Last login", fmtDate(u.lastLoginAt)],
    ["User ID", u.id],
  ];
  return (
    <Modal title="User details" onClose={onClose}>
      <dl className="divide-y divide-border/60 text-[15px]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-2.5">
            <dt className="text-mist">{k}</dt>
            <dd className="min-w-0 break-words text-right font-medium text-paper">{v}</dd>
          </div>
        ))}
      </dl>
      {err && <p className="mt-3 text-[13px] text-red-500">{err}</p>}
    </Modal>
  );
}

function RolesDialog({ user, knownRoles, editingSelf, onClose, onSaved, onError }: {
  user: AdminUser; knownRoles: string[]; editingSelf: boolean;
  onClose: () => void; onSaved: () => void; onError: (e: unknown) => void;
}) {
  const [selected, setSelected] = useState<string[]>(user.roles);
  const [busy, setBusy] = useState(false);
  const options = Array.from(new Set([...knownRoles, ...selected]));
  const toggle = (r: string) => setSelected((s) => (s.includes(r) ? s.filter((x) => x !== r) : [...s, r]));
  const losesAdmin = editingSelf && user.roles.includes("ADMIN") && !selected.includes("ADMIN");
  return (
    <Modal title={`Roles for ${user.name || user.username || user.email}`} onClose={onClose}>
      <p className="text-[14px] text-mist">The selected roles replace the user&apos;s current roles.</p>
      <ul className="mt-4 space-y-2">
        {options.map((r) => (
          <li key={r}>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border px-3.5 py-2.5 hover:bg-surface2">
              <input type="checkbox" checked={selected.includes(r)} onChange={() => toggle(r)} className="h-4 w-4 accent-[#0078C8]" />
              <span className="text-[15px] font-semibold text-paper">{r}</span>
            </label>
          </li>
        ))}
      </ul>
      {losesAdmin && <p className="mt-3 text-[13px] text-red-500">You are removing your own ADMIN role. You will lose access to this dashboard.</p>}
      <div className="mt-6 flex justify-end gap-2">
        <button type="button" onClick={onClose} className={btn}>Cancel</button>
        <button
          type="button"
          disabled={busy || selected.length === 0}
          className={btnPrimary}
          onClick={async () => {
            setBusy(true);
            try { await replaceRoles(user.id, selected); onSaved(); } catch (e) { onError(e); } finally { setBusy(false); }
          }}
        >
          {busy ? "Saving…" : "Save roles"}
        </button>
      </div>
    </Modal>
  );
}

function PasswordForm({ askLogin, submitLabel, onCancel, onSubmit, onDone, onError }: {
  askLogin?: boolean; submitLabel: string; onCancel?: () => void;
  onSubmit: (password: string, login?: string) => Promise<unknown>;
  onDone: () => void; onError: (e: unknown) => void;
}) {
  const [login, setLogin] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [touched, setTouched] = useState({ login: false, pw: false });

  const loginError = !login ? "Enter the username or email." : login.length < TEXT_MIN ? `Must be at least ${TEXT_MIN} characters.` : undefined;
  const pwError = !pw
    ? "Password is required."
    : pw.length < MIN_PASSWORD
      ? `Password must be at least ${MIN_PASSWORD} characters.`
      : pw.length > TEXT_MAX
        ? `Password must be at most ${TEXT_MAX} characters.`
        : undefined;
  const showLoginError = touched.login ? loginError : undefined;
  const showPwError = touched.pw ? pwError : undefined;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setTouched({ login: true, pw: true });
    if ((askLogin && loginError) || pwError) return;
    setBusy(true);
    try {
      await onSubmit(pw, login.trim());
      setPw("");
      setLogin("");
      onDone();
    } catch (x) {
      onError(x);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      {askLogin && (
        <label className="block label-mono text-[12px] text-mist">
          Username or email
          <input value={login} onChange={(e) => setLogin(noSpaces(e.target.value))} onBlur={() => setTouched((t) => ({ ...t, login: true }))} maxLength={TEXT_MAX} placeholder="e.g. jane.doe or jane@company.com" aria-invalid={!!showLoginError} className={`${input} mt-2 normal-case ${showLoginError ? "!border-red-500" : ""}`} autoComplete="off" />
          {showLoginError && <span role="alert" className="mt-1.5 block text-[12px] normal-case tracking-normal text-red-500">{showLoginError}</span>}
        </label>
      )}
      <label className="block label-mono text-[12px] text-mist">
        New password
        <div className="mt-2 flex gap-2">
          <input type={show ? "text" : "password"} value={pw} onChange={(e) => { setPw(noSpaces(e.target.value)); setCopied(false); }} onBlur={() => setTouched((t) => ({ ...t, pw: true }))} maxLength={TEXT_MAX} placeholder={`${MIN_PASSWORD}–${TEXT_MAX} characters`} aria-invalid={!!showPwError} className={`${input} normal-case ${showPwError ? "!border-red-500" : ""}`} autoComplete="new-password" />
          <button type="button" onClick={() => setShow((v) => !v)} className={btn}>{show ? "Hide" : "Show"}</button>
        </div>
        {showPwError && <span role="alert" className="mt-1.5 block text-[12px] normal-case tracking-normal text-red-500">{showPwError}</span>}
      </label>
      {pw && (
        <div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= strength(pw) ? STRENGTH[strength(pw)][1] : "bg-border"}`} />
            ))}
          </div>
          <p className="mt-1.5 text-[12px] text-mist">Strength: <span className="font-semibold text-paper">{STRENGTH[strength(pw)][0]}</span></p>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold">
        <button type="button" onClick={() => { setPw(generatePassword()); setShow(true); setCopied(false); }} className="text-azure-soft hover:text-paper">
          Generate a strong password
        </button>
        {pw && (
          <button
            type="button"
            onClick={() => { void navigator.clipboard?.writeText(pw).then(() => setCopied(true)).catch(() => {}); }}
            className="text-azure-soft hover:text-paper"
          >
            {copied ? "Copied ✓" : "Copy password"}
          </button>
        )}
      </div>
      {err && <p role="alert" className="text-[13px] text-red-500">{err}</p>}
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && <button type="button" onClick={onCancel} className={btn}>Cancel</button>}
        <button type="submit" disabled={busy} className={btnPrimary}>{busy ? "Saving…" : submitLabel}</button>
      </div>
    </form>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Letters of any script (A-Z, accented Latin, and other alphabets), then letters, spaces, . ' and -.
const NAME_RE = /^[A-Za-zÀ-￿][A-Za-zÀ-￿ .'’-]*$/;
const USERNAME_RE = /^[A-Za-z0-9._-]+$/;
const TEXT_MIN = 2;
const TEXT_MAX = 60;
const NAME_MAX = 30; // first name, last name and username
const maxFor = (f: "firstName" | "lastName" | "username" | "email" | "password") => (f === "email" || f === "password" ? TEXT_MAX : NAME_MAX);

type CreateField = "firstName" | "lastName" | "username" | "email" | "password";

/** One message per field, or undefined when it is fine. */
function checkCreateField(field: CreateField, value: string): string | undefined {
  const isName = field === "firstName" || field === "lastName";
  const v = isName ? value.trim() : value;
  const label = { firstName: "First name", lastName: "Last name", username: "Username", email: "Email", password: "Password" }[field];
  if (!v) return `${label} is required.`;
  const min = field === "password" ? MIN_PASSWORD : TEXT_MIN;
  if (v.length < min) return `${label} must be at least ${min} characters.`;
  if (v.length > maxFor(field)) return `${label} must be at most ${maxFor(field)} characters.`;
  if (isName && !NAME_RE.test(v)) return `${label} can contain letters, spaces, . ' and - only.`;
  if (field === "username" && !USERNAME_RE.test(v)) return "Username can contain letters, numbers, . _ and - only.";
  if (field === "email" && !EMAIL_RE.test(v)) return "Enter a valid email address.";
  return undefined;
}

function CreateUserDialog({ knownRoles, onClose, onCreated, onError }: {
  knownRoles: string[]; onClose: () => void; onCreated: (name: string) => void; onError: (e: unknown) => void;
}) {
  const [values, setValues] = useState<Record<CreateField, string>>({ firstName: "", lastName: "", username: "", email: "", password: "" });
  const [touched, setTouched] = useState<Partial<Record<CreateField, boolean>>>({});
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("USER");
  const [busy, setBusy] = useState(false);
  const roles = Array.from(new Set(["USER", "ADMIN", ...knownRoles]));

  const errors: Partial<Record<CreateField, string>> = {};
  (Object.keys(values) as CreateField[]).forEach((f) => {
    const m = checkCreateField(f, values[f]);
    if (m) errors[f] = m;
  });
  const shown = (f: CreateField) => (touched[f] ? errors[f] : undefined);

  const set = (f: CreateField, v: string) => setValues((x) => ({ ...x, [f]: f === "firstName" || f === "lastName" ? v : noSpaces(v) }));
  const blur = (f: CreateField) => setTouched((t) => ({ ...t, [f]: true }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true, username: true, email: true, password: true });
    if (Object.keys(errors).length) return;
    setBusy(true);
    try {
      const firstName = values.firstName.trim();
      const lastName = values.lastName.trim();
      await createUser({ firstName, lastName, username: values.username, email: values.email, password: values.password, roles: [role] });
      onCreated(`${firstName} ${lastName}`);
    } catch (x) {
      onError(x);
    } finally {
      setBusy(false);
    }
  };

  const label = "block label-mono text-[12px] text-mist";
  const field = (f: CreateField) =>
    `${input} mt-2 normal-case ${shown(f) ? "!border-red-500" : ""}`;
  const Err = ({ f }: { f: CreateField }) =>
    shown(f) ? <span role="alert" className="mt-1.5 block text-[12px] normal-case tracking-normal text-red-500">{shown(f)}</span> : null;

  return (
    <Modal title="Add a user" onClose={onClose}>
      <form onSubmit={submit} noValidate className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>
            First name
            <input value={values.firstName} onChange={(e) => set("firstName", e.target.value)} onBlur={() => blur("firstName")} maxLength={NAME_MAX} placeholder="Jane" autoComplete="off" aria-invalid={!!shown("firstName")} className={field("firstName")} />
            <Err f="firstName" />
          </label>
          <label className={label}>
            Last name
            <input value={values.lastName} onChange={(e) => set("lastName", e.target.value)} onBlur={() => blur("lastName")} maxLength={NAME_MAX} placeholder="Doe" autoComplete="off" aria-invalid={!!shown("lastName")} className={field("lastName")} />
            <Err f="lastName" />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Username
            <input value={values.username} onChange={(e) => set("username", e.target.value)} onBlur={() => blur("username")} maxLength={NAME_MAX} placeholder="jane.doe" autoComplete="off" aria-invalid={!!shown("username")} className={field("username")} />
            <Err f="username" />
          </label>
          <label className={label}>
            Role
            <select value={role} onChange={(e) => setRole(e.target.value)} className={`${input} mt-2 normal-case`}>
              {roles.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
        </div>
        <label className={label}>
          Email
          <input type="email" value={values.email} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")} maxLength={TEXT_MAX} placeholder="jane@company.com" autoComplete="off" aria-invalid={!!shown("email")} className={field("email")} />
          <Err f="email" />
        </label>
        <div>
          <label className={label}>
            Password
            <div className="mt-2 flex gap-2">
              <input type={show ? "text" : "password"} value={values.password} onChange={(e) => set("password", e.target.value)} onBlur={() => blur("password")} maxLength={TEXT_MAX} placeholder={`${MIN_PASSWORD}–${TEXT_MAX} characters`} autoComplete="new-password" aria-invalid={!!shown("password")} className={`${input} normal-case ${shown("password") ? "!border-red-500" : ""}`} />
              <button type="button" onClick={() => setShow((v) => !v)} className={btn}>{show ? "Hide" : "Show"}</button>
            </div>
            <Err f="password" />
          </label>
          <button type="button" onClick={() => { set("password", generatePassword()); setShow(true); blur("password"); }} className="mt-3 text-[13px] font-semibold text-azure-soft hover:text-paper">
            Generate a strong password
          </button>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onClose} className={btn}>Cancel</button>
          <button type="submit" disabled={busy} className={btnPrimary}>{busy ? "Creating…" : "Create account"}</button>
        </div>
      </form>
    </Modal>
  );
}

