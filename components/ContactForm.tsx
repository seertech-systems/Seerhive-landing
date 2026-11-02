"use client";

import { useState } from "react";
import { projects } from "@/lib/projects";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-3xl border border-aqua/40 bg-surface/60 p-10 text-center">
        <span className="hex mx-auto h-12 w-12 brand-gradient grid place-items-center">
          <span className="text-ink text-lg font-bold">✓</span>
        </span>
        <p className="mt-5 font-display text-lg font-semibold text-paper">
          Message received.
        </p>
        <p className="mt-2 text-[16px] text-mist">
          Someone from SeerHive will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-3xl border border-border bg-surface p-7 sm:p-9 space-y-5 shadow-[0_30px_80px_-40px_rgba(15,40,90,0.4)]"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="label-mono text-[12px] text-mist">Name</span>
          <input
            required
            type="text"
            name="name"
            className="mt-2 w-full rounded-xl border border-border bg-ink px-4 py-2.5 text-[16px] text-paper placeholder:text-mist/60 transition-shadow focus:outline-none focus:border-aqua focus:ring-4 focus:ring-aqua/15"
            placeholder="Jordan Lee"
          />
        </label>
        <label className="block">
          <span className="label-mono text-[12px] text-mist">Work email</span>
          <input
            required
            type="email"
            name="email"
            className="mt-2 w-full rounded-xl border border-border bg-ink px-4 py-2.5 text-[16px] text-paper placeholder:text-mist/60 transition-shadow focus:outline-none focus:border-aqua focus:ring-4 focus:ring-aqua/15"
            placeholder="you@company.com"
          />
        </label>
      </div>

      <label className="block">
        <span className="label-mono text-[12px] text-mist">Company</span>
        <input
          type="text"
          name="company"
          className="mt-2 w-full rounded-xl border border-border bg-ink px-4 py-2.5 text-[16px] text-paper placeholder:text-mist/60 transition-shadow focus:outline-none focus:border-aqua focus:ring-4 focus:ring-aqua/15"
          placeholder="Acme Corp"
        />
      </label>

      <label className="block">
        <span className="label-mono text-[12px] text-mist">Which product are you interested in?</span>
        <select
          name="project"
          defaultValue=""
          className="mt-2 w-full rounded-xl border border-border bg-ink px-4 py-2.5 text-[16px] text-paper transition-shadow focus:outline-none focus:border-aqua focus:ring-4 focus:ring-aqua/15"
        >
          <option value="" disabled>
            Choose a product
          </option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
          <option value="all">Several / not sure yet</option>
        </select>
      </label>

      <label className="block">
        <span className="label-mono text-[12px] text-mist">Message</span>
        <textarea
          required
          name="message"
          rows={4}
          className="mt-2 w-full rounded-xl border border-border bg-ink px-4 py-2.5 text-[16px] text-paper placeholder:text-mist/60 transition-shadow focus:outline-none focus:border-aqua focus:ring-4 focus:ring-aqua/15 resize-none"
          placeholder="Tell us a bit about your hiring needs."
        />
      </label>

      <button
        type="submit"
        className="btn-wave w-full rounded-full bg-aqua px-6 py-3.5 text-[16px] font-semibold text-ink transition-colors"
      >
        Send message
      </button>
      <p className="text-[12px] text-mist text-center">
        This form is UI-only in the prototype — wire the submit handler up to
        your email/CRM endpoint of choice.
      </p>
    </form>
  );
}
