"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addEnquiryNote,
  bulkDeleteEnquiries,
  deleteEnquiry,
  deleteEnquiryNote,
  getEnquiry,
  listEnquiries,
  setEnquiryStatus,
  type Enquiry,
  type EnquiryPage,
} from "@/features/admin/enquiryService";
import { getContactOptions, type ContactOptions, type Option } from "@/features/contact/contactService";
import { ConfirmDialog, Icon, Modal, btn, btnPrimary, fmtDate, input, select } from "./ui";

const PAGE_SIZES = [10, 20, 50];
const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED"];
const EMPTY_OPTIONS: ContactOptions = { enquiryTypes: [], products: [], companySizes: [], sources: [], statuses: [] };

const STATUS_STYLE: Record<string, string> = {
  NEW: "bg-[#0078C8]/15 text-[#0078C8]",
  CONTACTED: "bg-amber-500/15 text-amber-600",
  QUALIFIED: "bg-emerald-500/15 text-emerald-600",
  CLOSED: "bg-mist/20 text-mist",
};

const label = (opts: Option[], code?: string) => opts.find((o) => o.code === code)?.label ?? code ?? "–";

function StatusBadge({ status, options }: { status: string; options: Option[] }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${STATUS_STYLE[status] ?? "bg-mist/20 text-mist"}`}>
      {label(options, status)}
    </span>
  );
}

export default function EnquiriesPanel({ onOk, onFail }: { onOk: (text: string) => void; onFail: (e: unknown) => void }) {
  const [options, setOptions] = useState<ContactOptions>(EMPTY_OPTIONS);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("insertedOn");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const [data, setData] = useState<EnquiryPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [layout, setLayout] = useState<"table" | "cards">("table");
  const [layoutChosen, setLayoutChosen] = useState(false);
  const [picked, setPicked] = useState<number[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [confirm, setConfirm] = useState<{ ids: number[] } | null>(null);

  useEffect(() => {
    if (layoutChosen) return;
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setLayout(mq.matches ? "cards" : "table");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [layoutChosen]);

  useEffect(() => {
    getContactOptions().then(setOptions).catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(search);
      setPage(0);
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(
        await listEnquiries({
          page, size, sortBy, sortDir,
          search: query,
          status: status || undefined,
        }),
      );
      setPicked([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load enquiries.");
    } finally {
      setLoading(false);
    }
  }, [page, size, sortBy, sortDir, query, status]);

  useEffect(() => {
    void load();
  }, [load]);

  const toggleSort = (field: string) => {
    if (sortBy === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(field);
      setSortDir("asc");
    }
    setPage(0);
  };
  const arrow = (f: string) => (sortBy === f ? (sortDir === "asc" ? " ↑" : " ↓") : "");
  const filtered = !!(search || status);
  const rows = data?.items ?? [];
  const allPicked = rows.length > 0 && rows.every((r) => picked.includes(r.enquiryId));

  const Th = ({ f, children }: { f: string; children: React.ReactNode }) => (
    <th className="px-4 py-3 font-semibold">
      <button type="button" onClick={() => toggleSort(f)} className="uppercase tracking-wider hover:text-paper">
        {children}
        {arrow(f)}
      </button>
    </th>
  );

  return (
    <>
      <div className="mt-2.5 flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, company or ENQ-000042"
          aria-label="Search enquiries"
          className={`${input} min-w-[220px] flex-1 sm:max-w-sm`}
        />
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(0); }} aria-label="Filter by status" className={select}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{label(options.statuses, s)}</option>)}
        </select>
        {filtered && (
          <button
            type="button"
            onClick={() => { setSearch(""); setStatus(""); }}
            className="text-[13px] font-semibold text-azure-soft hover:text-paper"
          >
            Clear
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
        {picked.length > 0 && (
          <button type="button" onClick={() => setConfirm({ ids: picked })} className="rounded-full bg-red-600 px-4 py-1.5 text-[13px] font-semibold text-white hover:bg-red-700">
            Delete {picked.length} selected
          </button>
        )}
      </div>

      <div className={`mt-4 overflow-hidden rounded-2xl border border-border bg-surface ${loading ? "opacity-70" : ""}`}>
        {layout === "table" && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-[14px]">
            <thead className="bg-[#0078C8]/15 text-paper">
              <tr className="label-mono text-[12px]">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label="Select all on this page"
                    checked={allPicked}
                    onChange={() => setPicked(allPicked ? [] : rows.map((r) => r.enquiryId))}
                    className="accent-[#0078C8]"
                  />
                </th>
                <Th f="fullName">Contact</Th>
                <Th f="company">Company</Th>
                <Th f="product">Product</Th>
                <Th f="enquiryType">Topic</Th>
                <Th f="status">Status</Th>
                <Th f="insertedOn">Received</Th>
              </tr>
            </thead>
            <tbody>
              {error && <tr><td colSpan={7} className="px-4 py-10 text-center text-red-500">{error}</td></tr>}
              {!error && !data && <tr><td colSpan={7} className="px-4 py-10 text-center text-mist">Loading enquiries…</td></tr>}
              {!error && data && rows.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-14 text-center text-mist">No enquiries found.</td></tr>
              )}
              {!error && rows.map((r) => (
                <tr key={r.enquiryId} className="cursor-pointer border-t border-border/50 hover:bg-surface2/60" onClick={() => setOpen(r.enquiryId)}>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      aria-label={`Select ${r.referenceNo}`}
                      checked={picked.includes(r.enquiryId)}
                      onChange={() => setPicked((p) => (p.includes(r.enquiryId) ? p.filter((x) => x !== r.enquiryId) : [...p, r.enquiryId]))}
                      className="accent-[#0078C8]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-paper">{r.fullName}</p>
                    <p className="text-[12px] text-mist">{r.workEmail} · {r.referenceNo}</p>
                  </td>
                  <td className="px-4 py-3 text-paper">{r.company}</td>
                  <td className="px-4 py-3 text-paper">{label(options.products, r.product)}</td>
                  <td className="px-4 py-3 text-paper">{label(options.enquiryTypes, r.enquiryType)}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} options={options.statuses} /></td>
                  <td className="whitespace-nowrap px-4 py-3 text-paper">{fmtDate(r.insertedOn)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {layout === "cards" && (
          <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:p-4 2xl:grid-cols-3">
            {error && <p className="col-span-full px-4 py-10 text-center text-red-500">{error}</p>}
            {!error && !data && <p className="col-span-full px-4 py-10 text-center text-mist">Loading enquiries…</p>}
            {!error && data && rows.length === 0 && <p className="col-span-full px-4 py-14 text-center text-mist">No enquiries found.</p>}
            {!error && rows.map((r) => (
              <article
                key={r.enquiryId}
                onClick={() => setOpen(r.enquiryId)}
                className="min-w-0 cursor-pointer rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-[#0078C8]/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-paper">{r.fullName}</p>
                    <p className="truncate text-[12px] text-[#0078C8]">{r.workEmail}</p>
                  </div>
                  <input
                    type="checkbox"
                    aria-label={`Select ${r.referenceNo}`}
                    checked={picked.includes(r.enquiryId)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => setPicked((p) => (p.includes(r.enquiryId) ? p.filter((x) => x !== r.enquiryId) : [...p, r.enquiryId]))}
                    className="mt-1 shrink-0 accent-[#0078C8]"
                  />
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-[13px]">
                  <div className="min-w-0">
                    <dt className="label-mono text-[11px] font-semibold text-[#0078C8]">Company</dt>
                    <dd className="mt-0.5 truncate text-paper">{r.company}</dd>
                  </div>
                  <div>
                    <dt className="label-mono text-[11px] font-semibold text-[#0078C8]">Status</dt>
                    <dd className="mt-0.5"><StatusBadge status={r.status} options={options.statuses} /></dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="label-mono text-[11px] font-semibold text-[#0078C8]">Product</dt>
                    <dd className="mt-0.5 truncate text-paper">{label(options.products, r.product)}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="label-mono text-[11px] font-semibold text-[#0078C8]">Topic</dt>
                    <dd className="mt-0.5 truncate text-paper">{label(options.enquiryTypes, r.enquiryType)}</dd>
                  </div>
                  <div>
                    <dt className="label-mono text-[11px] font-semibold text-[#0078C8]">Reference</dt>
                    <dd className="mt-0.5 text-paper">{r.referenceNo}</dd>
                  </div>
                  <div>
                    <dt className="label-mono text-[11px] font-semibold text-[#0078C8]">Received</dt>
                    <dd className="mt-0.5 whitespace-nowrap text-paper">{fmtDate(r.insertedOn)}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 px-4 py-3 text-[14px] text-mist">
          <span>{data && data.total > 0 ? `${page * size + 1}–${Math.min((page + 1) * size, data.total)} of ${data.total}` : "0 enquiries"}</span>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2">
              Rows
              <select value={size} onChange={(e) => { setSize(Number(e.target.value)); setPage(0); }} className="rounded-lg border border-border bg-ink px-2 py-1 text-paper">
                {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            <button type="button" disabled={page === 0} onClick={() => setPage((p) => p - 1)} className={btn}>Previous</button>
            <button type="button" disabled={!data || page + 1 >= data.totalPages} onClick={() => setPage((p) => p + 1)} className={btn}>Next</button>
          </div>
        </div>
      </div>

      {open !== null && (
        <EnquiryDialog
          id={open}
          options={options}
          onClose={() => setOpen(null)}
          onChanged={() => void load()}
          onDelete={(id) => { setOpen(null); setConfirm({ ids: [id] }); }}
          onOk={onOk}
          onFail={onFail}
        />
      )}

      {confirm && (
        <ConfirmDialog
          title={confirm.ids.length === 1 ? "Delete this enquiry?" : `Delete ${confirm.ids.length} enquiries?`}
          body="This permanently removes the enquiry and its notes. It cannot be undone."
          confirmLabel="Delete"
          danger
          onClose={() => setConfirm(null)}
          onConfirm={async () => {
            try {
              if (confirm.ids.length === 1) await deleteEnquiry(confirm.ids[0]);
              else await bulkDeleteEnquiries(confirm.ids);
              setConfirm(null);
              onOk(confirm.ids.length === 1 ? "Enquiry deleted." : `${confirm.ids.length} enquiries deleted.`);
              void load();
            } catch (e) {
              onFail(e);
            }
          }}
        />
      )}
    </>
  );
}

function EnquiryDialog({ id, options, onClose, onChanged, onDelete, onOk, onFail }: {
  id: number;
  options: ContactOptions;
  onClose: () => void;
  onChanged: () => void;
  onDelete: (id: number) => void;
  onOk: (t: string) => void;
  onFail: (e: unknown) => void;
}) {
  const [e, setE] = useState<Enquiry | null>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const reload = useCallback(async () => {
    try {
      setE(await getEnquiry(id));
    } catch (ex) {
      onFail(ex);
      onClose();
    }
  }, [id, onFail, onClose]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const row = (k: string, v?: string | null) => (
    <div className="min-w-0">
      <dt className="label-mono text-[11px] font-semibold text-[#0078C8]">{k}</dt>
      <dd className="mt-0.5 break-words text-[14px] text-paper [overflow-wrap:anywhere]">{v || "–"}</dd>
    </div>
  );

  return (
    <Modal wide title={e ? `${e.referenceNo}` : "Enquiry"} onClose={onClose}>
      {!e ? (
        <p className="text-mist">Loading…</p>
      ) : (
        <div className="space-y-5">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-2xl border border-[#0078C8]/20 bg-[#0078C8]/10 p-5 sm:grid-cols-3">
            {row("Name", e.fullName)}
            {row("Company", e.company)}
            {row("Email", e.workEmail)}
            {row("Phone", e.phone)}
            {row("Product", label(options.products, e.product))}
            {row("Topic", label(options.enquiryTypes, e.enquiryType))}
            {row("Company size", label(options.companySizes, e.companySize))}
            {row("Source", label(options.sources, e.source))}
            {row("Received", fmtDate(e.insertedOn))}
            {row("Consent given", e.consentGiven ? `Yes, ${fmtDate(e.consentOn)}` : "No")}
          </dl>
          {e.message && (
            <div>
              <p className="label-mono text-[11px] font-semibold text-[#0078C8]">Message</p>
              <p className="mt-1 whitespace-pre-wrap break-words rounded-xl border border-border bg-ink p-4 text-[15px] text-paper [overflow-wrap:anywhere]">{e.message}</p>
            </div>
          )}

          <label className="block">
            <span className="label-mono text-[11px] font-semibold text-[#0078C8]">Status</span>
            <select
              value={e.status}
              disabled={busy}
              onChange={async (ev) => {
                setBusy(true);
                try {
                  await setEnquiryStatus(e.enquiryId, ev.target.value);
                  onOk("Status updated.");
                  await reload();
                  onChanged();
                } catch (ex) {
                  onFail(ex);
                } finally {
                  setBusy(false);
                }
              }}
              className={`${select} mt-1 w-full`}
            >
              {STATUSES.map((s) => <option key={s} value={s}>{label(options.statuses, s)}</option>)}
            </select>
          </label>

          <div>
            <p className="label-mono text-[11px] font-semibold text-[#0078C8]">Internal notes</p>
            <ul className="mt-2 space-y-2">
              {(e.notes ?? []).length === 0 && <li className="text-[13px] text-mist">No notes yet.</li>}
              {(e.notes ?? []).map((n) => (
                <li key={n.noteId} className="rounded-xl border border-border bg-ink p-3 text-[14px] text-paper">
                  <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{n.note}</p>
                  <div className="mt-1.5 flex items-center justify-between text-[12px] text-mist">
                    <span>{n.insertedBy ?? "–"} · {fmtDate(n.insertedOn)}</span>
                    <button
                      type="button"
                      className="font-semibold text-red-500 hover:underline"
                      onClick={async () => {
                        try {
                          await deleteEnquiryNote(e.enquiryId, n.noteId);
                          await reload();
                        } catch (ex) {
                          onFail(ex);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <form
              className="mt-3 flex gap-2"
              onSubmit={async (ev) => {
                ev.preventDefault();
                if (!note.trim()) return;
                setBusy(true);
                try {
                  await addEnquiryNote(e.enquiryId, note.trim());
                  setNote("");
                  await reload();
                } catch (ex) {
                  onFail(ex);
                } finally {
                  setBusy(false);
                }
              }}
            >
              <input value={note} onChange={(ev) => setNote(ev.target.value)} placeholder="Add a note" maxLength={2000} className={input} />
              <button type="submit" disabled={busy || !note.trim()} className={btnPrimary}>Add</button>
            </form>
          </div>

          <div className="flex justify-between border-t border-border/60 pt-4">
            <button type="button" onClick={() => onDelete(e.enquiryId)} className="text-[14px] font-semibold text-red-500 hover:underline">Delete enquiry</button>
            <button type="button" onClick={onClose} className={btn}>Close</button>
          </div>
        </div>
      )}
    </Modal>
  );
}
