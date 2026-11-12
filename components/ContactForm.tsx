"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FormSelect from "@/components/FormSelect";
import { ApiError } from "@/services/apiClient";
import { getContactOptions, submitContact, type ContactOptions, type Option } from "@/features/contact/contactService";

// Used until /contact/options answers, and if it cannot be reached.
const FALLBACK: ContactOptions = {
  enquiryTypes: [
    { code: "DEMO", label: "Book a demo" },
    { code: "SALES", label: "Sales enquiry" },
    { code: "PRICING", label: "Pricing" },
    { code: "PARTNERSHIP", label: "Partnership" },
    { code: "SUPPORT", label: "Support" },
    { code: "OTHER", label: "Something else" },
  ],
  products: [
    { code: "SEERHIVE_HRMS", label: "SeerHive HRMS + ATS" },
    { code: "RECRUIT_AI", label: "SeerHive Recruit AI" },
    { code: "IVR", label: "Intelligent IVR System" },
    { code: "VOIZ", label: "Voiz AI Voice Agent" },
    { code: "RESUME_PIPELINE", label: "Resume Data Pipeline" },
    { code: "NOT_SURE", label: "Not sure yet" },
  ],
  companySizes: [
    { code: "S_1_10", label: "1-10 employees" },
    { code: "S_11_50", label: "11-50 employees" },
    { code: "S_51_200", label: "51-200 employees" },
    { code: "S_201_1000", label: "201-1,000 employees" },
    { code: "S_1000_PLUS", label: "1,000+ employees" },
  ],
  sources: [{ code: "WEBSITE", label: "Website" }],
  statuses: [],
};

// The site's own product names, by the backend's product code. Anything not listed keeps the backend's label.
const PRODUCT_LABELS: Record<string, string> = {
  SEERHIVE_HRMS: "SeerHive HRMS + ATS",
  RECRUIT_AI: "SeerHive Recruit AI",
  IVR: "Intelligent Conversational IVR",
  VOIZ: "SeerVoiz AI",
  RESUME_PIPELINE: "Resume Data Pipeline",
  NOT_SURE: "Other",
};

// The topic list the form offers, by backend code, with the labels shown to visitors.
const TOPICS: { code: string; label: string }[] = [
  { code: "DEMO", label: "Book a demo" },
  { code: "SALES", label: "Inquiry" },
  { code: "SUPPORT", label: "Support" },
  { code: "OTHER", label: "Other" },
];

const field =
  "mt-2 w-full rounded-xl border border-border bg-ink px-4 py-2.5 text-[16px] text-paper placeholder:text-mist/60 transition-shadow focus:outline-none focus:border-aqua focus:ring-4 focus:ring-aqua/15";

const NAME_MIN = 2;
const NAME_MAX = 30;
const MESSAGE_MAX_WORDS = 250;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const wordCount = (t: string) => (t.trim() ? t.trim().split(/\s+/).length : 0);

/** Red asterisk for a mandatory field. */
const Req = () => (
  <span className="ml-1 text-red-500" aria-hidden="true">
    *
  </span>
);

export default function ContactForm() {
  const [options, setOptions] = useState<ContactOptions>(FALLBACK);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [words, setWords] = useState(0);
  const [topic, setTopic] = useState("");
  const [product, setProduct] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    let live = true;
    getContactOptions()
      .then((o) => live && setOptions(o))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const productOptions: Option[] = options.products.map((p) => ({ ...p, label: PRODUCT_LABELS[p.code] ?? p.label }));

  /** Drops a field's error as soon as the visitor edits it, and the summary line once none are left. */
  const clearErr = (name: string) => {
    if (!fieldErrors[name]) return;
    const next = { ...fieldErrors };
    delete next[name];
    setFieldErrors(next);
    if (Object.keys(next).length === 0) setError(null);
  };

  const err = (name: string) =>
    fieldErrors[name] ? <span className="mt-1 block text-[13px] text-red-500">{fieldErrors[name]}</span> : null;

  return (
    <form
      noValidate
      onInput={(e) => clearErr((e.target as HTMLInputElement).name)}
      onChange={(e) => clearErr((e.target as HTMLInputElement).name)}
      onSubmit={async (e) => {
        e.preventDefault();
        if (sending) return;
        setSending(true);
        setError(null);
        setFieldErrors({});
        setDone(false);
        const form = e.currentTarget;
        const f = new FormData(form);
        const get = (k: string) => String(f.get(k) ?? "").trim();

        const problems: Record<string, string> = {};
        const textRule = (key: string, what: string) => {
          const v = get(key);
          if (!v) problems[key] = `${what} is required.`;
          else if (v.length < NAME_MIN) problems[key] = `${what} must be at least ${NAME_MIN} characters.`;
          else if (v.length > NAME_MAX) problems[key] = `${what} must be ${NAME_MAX} characters or fewer.`;
        };
        textRule("fullName", "Name");
        if (get("company") && get("company").length < NAME_MIN) problems.company = `Company must be at least ${NAME_MIN} characters.`;
        else if (get("company").length > NAME_MAX) problems.company = `Company must be ${NAME_MAX} characters or fewer.`;
        if (!get("workEmail")) problems.workEmail = "Work email is required.";
        else if (!EMAIL_RE.test(get("workEmail"))) problems.workEmail = "Enter a valid email address.";
        if (get("phone") && !/^\+[1-9]\d{6,14}$/.test(get("phone").replace(/[\s()-]/g, ""))) problems.phone = "Use the international format, e.g. +919876543210.";
        if (!get("enquiryType")) problems.enquiryType = "Please choose a topic.";
        if (!get("product")) problems.product = "Please choose a product.";
        if (wordCount(get("message")) > MESSAGE_MAX_WORDS) problems.message = `Please keep your message to ${MESSAGE_MAX_WORDS} words or fewer.`;
        if (f.get("consent") !== "on") problems.consent = "Please tick the box to continue.";
        if (Object.keys(problems).length) {
          setFieldErrors(problems);
          const missing = !get("fullName") || !get("workEmail") || !get("enquiryType") || !get("product") || f.get("consent") !== "on";
          setError(missing ? "Please fill in the required fields marked with *." : "Please correct the highlighted fields.");
          setSending(false);
          return;
        }
        try {
          await submitContact({
            fullName: get("fullName"),
            workEmail: get("workEmail"),
            // The backend still requires a company, so a blank one is sent as "Not provided".
            company: get("company") || "Not provided",
            enquiryType: get("enquiryType"),
            product: get("product"),
            companySize: get("companySize") || undefined,
            phone: get("phone").replace(/[\s()-]/g, ""),
            message: get("message") || undefined,
            consent: f.get("consent") === "on",
            source: "WEBSITE",
          });
          setDone(true);
          form.reset();
          setTopic("");
          setProduct("");
          setSize("");
          setWords(0);
        } catch (ex) {
          if (ex instanceof ApiError && ex.fieldErrors.length) {
            setFieldErrors(Object.fromEntries(ex.fieldErrors.map((x) => [x.field, x.message])));
            setError("Please correct the highlighted fields.");
          } else if (ex instanceof ApiError && ex.status === 429) {
            setError("You have sent several messages recently. Please wait a little before trying again.");
          } else {
            setError("Sorry, we couldn't send your message. Please try again, or email us directly.");
          }
        } finally {
          setSending(false);
        }
      }}
      className="rounded-3xl border border-border bg-surface p-7 sm:p-9 space-y-5 shadow-[0_30px_80px_-40px_rgba(15,40,90,0.4)]"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="label-mono whitespace-nowrap text-[12px] text-mist">Name<Req /></span>
          <input required type="text" name="fullName" minLength={NAME_MIN} maxLength={NAME_MAX} autoComplete="name" className={field} placeholder="Jordan Lee" />
          {err("fullName")}
        </label>
        <label className="block">
          <span className="label-mono whitespace-nowrap text-[12px] text-mist">Work email<Req /></span>
          <input required type="email" name="workEmail" maxLength={100} autoComplete="email" className={field} placeholder="you@company.com" />
          {err("workEmail")}
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="label-mono text-[12px] text-mist">Company (optional)</span>
          <input type="text" name="company" minLength={NAME_MIN} maxLength={NAME_MAX} autoComplete="organization" className={field} placeholder="Acme Corp" />
          {err("company")}
        </label>
        <label className="block">
          <span className="label-mono text-[12px] text-mist">Phone (optional)</span>
          <input type="tel" name="phone" maxLength={20} className={field} placeholder="+919876543210" />
          {err("phone")}
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="label-mono whitespace-nowrap text-[12px] text-mist">How can we help?<Req /></span>
          <FormSelect
            name="enquiryType"
            placeholder="Select topic"
            value={topic}
            onChange={(v) => { setTopic(v); clearErr("enquiryType"); }}
            invalid={!!fieldErrors.enquiryType}
            options={TOPICS.filter((t) => options.enquiryTypes.some((o) => o.code === t.code) || options === FALLBACK).map((t) => ({ value: t.code, label: t.label }))}
          />
          {err("enquiryType")}
        </label>
        <label className="block">
          <span className="label-mono whitespace-nowrap text-[12px] text-mist">Which product?<Req /></span>
          <FormSelect
            name="product"
            placeholder="Select product"
            value={product}
            onChange={(v) => { setProduct(v); clearErr("product"); }}
            invalid={!!fieldErrors.product}
            options={productOptions.map((o) => ({ value: o.code, label: o.label }))}
          />
          {err("product")}
        </label>
      </div>

      <label className="block">
        <span className="label-mono text-[12px] text-mist">Company size (optional)</span>
        <FormSelect
          name="companySize"
          placeholder="Select company size"
          value={size}
          onChange={setSize}
          options={[{ value: "", label: "Prefer not to say" }, ...options.companySizes.map((o) => ({ value: o.code, label: o.label }))]}
        />
        {err("companySize")}
      </label>

      <label className="block">
        <span className="label-mono text-[12px] text-mist">Message</span>
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          onChange={(e) => setWords(wordCount(e.target.value))}
          className={`${field} resize-none`}
          placeholder="Tell us a bit about your hiring needs."
        />
        <span className={`mt-1 block text-right text-[12px] ${words > MESSAGE_MAX_WORDS ? "text-red-500" : "text-mist"}`}>
          {words}/{MESSAGE_MAX_WORDS} words
        </span>
        {err("message")}
      </label>

      <div>
        <label className="flex items-start gap-3 text-[14px] text-mist">
          <input required type="checkbox" name="consent" className="mt-1 h-4 w-4 shrink-0 accent-[#0078C8]" />
          <span>
            I agree that SeerTech Systems may contact me about my inquiry.
            <Req />
          </span>
        </label>
        {fieldErrors.consent && <p className="mt-1.5 pl-7 text-[13px] text-red-500">Please accept this to send your message.</p>}
      </div>

      <button
        type="submit"
        disabled={sending}
        className="btn-wave w-full rounded-full bg-aqua px-6 py-3.5 text-[16px] font-semibold text-ink transition-colors"
      >
        {sending ? "Sending…" : "Send message"}
      </button>
      {error && (
        <p role="alert" className="text-[14px] text-center text-red-500">
          {error}
        </p>
      )}
      {done && <SuccessPopup onClose={() => setDone(false)} />}
    </form>
  );
}

/** Confirmation shown over the page after a message is sent. Closes on the button, Escape or a click outside. */
function SuccessPopup({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Rendered on <body>: the form sits in a block with a transform, which would otherwise pin "fixed" to that block.
  return createPortal(
    <div
      className="fixed inset-0 z-[120] grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="contact-success-title"
        className="w-full max-w-sm animate-fadeIn rounded-3xl border border-border bg-surface p-8 text-center shadow-2xl"
      >
        <span className="hex mx-auto grid h-16 w-14 place-items-center bg-[#0078C8] shadow-lg shadow-[#0078C8]/30">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h3 id="contact-success-title" className="mt-5 font-display text-xl font-semibold text-paper">
          Message sent
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-mist">Thanks, we&apos;ll reply within one business day.</p>
        <button
          type="button"
          autoFocus
          onClick={onClose}
          className="btn-wave mt-6 w-full rounded-full bg-aqua px-6 py-3 text-[15px] font-semibold text-ink transition-colors"
        >
          Done
        </button>
      </div>
    </div>,
    document.body,
  );
}
