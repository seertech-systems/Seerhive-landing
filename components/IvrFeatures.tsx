"use client";

import { useState } from "react";

const features = [
  {
    id: "dashboard",
    tab: "Dashboard",
    title: "See how your calls are going",
    text: "The dashboard totals your campaigns and calls for today, the last 7 days, the last 30 days or all time. It shows how many were answered, how many did not connect and the average call length.",
    points: ["Total and active campaigns", "Answered and not-connected calls", "Average call duration", "Call status chart and daily call trend"],
    image: "/screens/ivr-outbound/dashboard.png",
    alt: "IVR Outbound dashboard with call totals and a status chart",
  },
  {
    id: "contacts",
    tab: "Contacts",
    title: "Keep the people you call in lists",
    text: "Group contacts into lists. Add them by hand, upload a file or bring them in from an applicant tracking system. Start a call flow straight from any list.",
    points: ["Manual entry, file upload or ATS source", "Search and sort contact lists", "View the contacts in each list", "Create a call flow from a list"],
    image: "/screens/ivr-outbound/contacts.png",
    alt: "IVR Outbound contact lists with source and created date",
  },
  {
    id: "flows",
    tab: "Call flows",
    title: "Write the call once, reuse it every time",
    text: "A call flow is the script of a call, made of steps. Variables such as the candidate's name, client, role, date and time are filled in for each person when the call is made.",
    points: ["Variables for personal details", "Ready-made flows for interview reminders, appointments and payments", "Number of steps shown for each flow", "Search and manage all your flows"],
    image: "/screens/ivr-outbound/flows.png",
    alt: "IVR Outbound call flows with their variables and steps",
  },
  {
    id: "campaigns",
    tab: "Campaigns",
    title: "Run a flow for a whole list",
    text: "A campaign pairs a call flow with a contact list and a time. You can follow its progress and see how many answered, how many failed and the answer rate. Retry the calls that did not connect.",
    points: ["Filter by running, scheduled, paused, completed or cancelled", "Progress bar for each campaign", "Answer rate and average duration", "Retry, edit or remove a campaign"],
    image: "/screens/ivr-outbound/campaigns.png",
    alt: "IVR Outbound campaign list with progress and answer rate",
  },
  {
    id: "voices",
    tab: "Voices",
    title: "Choose the voice that speaks to your contacts",
    text: "Pick from a library of natural voices with different accents and tones, or clone your own voice. Play any voice before you use it in a campaign.",
    points: ["Natural voices with accent and tone listed", "Clone your own voice", "Play a sample before choosing", "Remove voices you no longer use"],
    image: "/screens/ivr-outbound/voices.png",
    alt: "IVR Outbound voices page with natural and cloned voices",
  },
  {
    id: "history",
    tab: "Call history",
    title: "Review every call, and retry the ones that failed",
    text: "Each call is listed with the contact, the campaign, the status, the last key the contact pressed and how long the call lasted.",
    points: ["Completed and no-answer statuses", "Last key pressed, such as 1 to confirm or 2 to reschedule", "Duration of every call", "Search by name, phone or campaign"],
    image: "/screens/ivr-outbound/history.png",
    alt: "IVR Outbound call history with status, key pressed and duration",
  },
  {
    id: "reports",
    tab: "Reports",
    title: "Download the results of a campaign",
    text: "Choose a campaign to see every call and what happened on it. Download the full result as a CSV file, with the call details, keypad responses and contact information.",
    points: ["Pick any campaign", "Call activity shown on screen", "Call details, keypad responses and contact info included", "One-click CSV download"],
    image: "/screens/ivr-outbound/reports.png",
    alt: "IVR Outbound report page with call activity and CSV download",
  },
];

export default function IvrFeatures() {
  const [active, setActive] = useState(features[0].id);
  const f = features.find((x) => x.id === active)!;
  const index = features.findIndex((x) => x.id === active);

  return (
    <section id="features" className="relative overflow-hidden border-t border-border/60 py-20 lg:py-28">
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[520px] glow-azure opacity-40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl" data-reveal-stagger="80">
          <span data-reveal className="label-mono text-[12px] text-aqua">Inside IVR Outbound</span>
          <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            Every screen, <span className="brand-gradient-x bg-clip-text text-transparent">one calling workflow</span>.
          </h2>
          <p data-reveal className="mt-4 leading-relaxed text-mist">
            Choose a screen to see it as it appears in the product, with sample data, and what it does.
          </p>
        </div>

        <div data-reveal className="mt-12 grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-10">
          {/* tab list */}
          <div
            role="tablist"
            aria-label="IVR Outbound screens"
            className="scrollbar-none -mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:px-0 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {features.map((x, i) => {
              const on = x.id === active;
              return (
                <button
                  key={x.id}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  onClick={(e) => {
                    setActive(x.id);
                    e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                  }}
                  onMouseEnter={() => setActive(x.id)}
                  onFocus={() => setActive(x.id)}
                  className={`group flex shrink-0 snap-start items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left sm:gap-3 sm:px-4 sm:py-3 transition-all duration-200 lg:shrink ${
                    on
                      ? "border-transparent brand-gradient text-white shadow-lg shadow-[#0078C8]/25"
                      : "card-wave border-border/70 bg-surface text-paper hover:-translate-y-0.5 hover:border-aqua/50"
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg sm:h-8 sm:w-8 font-display text-[14px] font-semibold ${
                      on ? "bg-white/20 text-white" : "bg-aqua/10 text-aqua"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="whitespace-nowrap font-display text-[16px] font-semibold lg:whitespace-normal">{x.tab}</span>
                </button>
              );
            })}
          </div>

          {/* panel */}
          <div key={f.id} role="tabpanel" className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-[0_40px_100px_-40px_rgba(10,108,255,0.35)]">
              <div className="flex items-center gap-1.5 border-b border-[#0078C8] bg-[#0078C8] px-4 py-2.5">
                <span className="ml-3 label-mono text-[12px] text-white">IVR Outbound · {f.tab}</span>
              </div>
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="scrollbar-none overflow-x-auto overscroll-x-contain sm:overflow-visible">
                  <img src={f.image} alt={f.alt} className="block w-[820px] max-w-none sm:w-full sm:max-w-full" />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-14 bg-gradient-to-t from-surface to-transparent sm:block" />
              </div>
              <p className="border-t border-border/60 px-4 py-2 text-[12px] text-mist sm:hidden">Swipe the screen sideways to see all of it</p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="label-mono text-[12px] text-azure-soft">
                  {String(index + 1).padStart(2, "0")} · {f.tab}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-paper">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{f.text}</p>
              </div>
              <ul className="space-y-3 md:pt-6">
                {f.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-[16px] text-paper">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
