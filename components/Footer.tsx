import { products, getProject } from "@/lib/projects";
import { CONTACT } from "@/lib/links";

export default function Footer() {
  // TODO confirm final email/website domain (CONTACT.email in lib/links.ts is still sales@seertechsystems.in).
  return (
    <footer className="site-footer relative overflow-hidden py-14 text-white">
      <div className="pointer-events-none absolute inset-0 bg-hex-grid opacity-[0.12]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div data-reveal-stagger="70" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div data-reveal>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="" className="h-8 w-auto" />
              <span className="font-display font-semibold text-white">
                Seer<span className="text-[#3DEBFF]">Hive</span>
              </span>
            </div>
            <p className="mt-4 text-[16px] text-white/85 leading-relaxed max-w-xs">
              Intelligent solutions, infinite possibilities. SeerHive Recruit AI,
              SeerVoiz AI, SeerHive Invoicing, SeerHive Data Ingestion Pipeline and
              the SeerHive HRMS + ATS.
            </p>
          </div>

          <div data-reveal>
            <p className="label-mono text-[12px] text-white/65">Products</p>
            <ul className="mt-4 space-y-2.5">
              {products.map((prod) => (
                <li key={prod.id}>
                  <a href={prod.href} className="text-[16px] font-semibold text-white hover:text-[#3DEBFF] transition-colors">
                    {prod.name}
                  </a>
                  {prod.children.length > 1 && (
                    <ul className="mt-1.5 space-y-1.5 border-l border-white/20 pl-3">
                      {prod.children.map((slug) => {
                        const c = getProject(slug);
                        return c ? (
                          <li key={slug}>
                            <a href={c.href} className="text-[14px] text-white/75 hover:text-[#3DEBFF] transition-colors">
                              {c.name}
                            </a>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <p className="label-mono text-[12px] text-white/65">Company</p>
            <ul className="mt-4 space-y-2.5">
              <li><a href="/#why" className="text-[16px] text-white/85 hover:text-[#3DEBFF] transition-colors">Why SeerHive</a></li>
              <li><a href="/#faq" className="text-[16px] text-white/85 hover:text-[#3DEBFF] transition-colors">FAQ</a></li>
              <li><a href="/contact" className="text-[16px] text-white/85 hover:text-[#3DEBFF] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div data-reveal>
            <p className="label-mono text-[12px] text-white/65">Get in touch</p>
            <a href={`mailto:${CONTACT.email}`} className="mt-4 flex items-center gap-3 text-[16px] text-white/85 hover:text-[#3DEBFF] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] shrink-0 text-[#3DEBFF]" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <span className="min-w-0 break-all">{CONTACT.email}</span>
            </a>
            <a href={CONTACT.phoneHref} className="mt-3 flex items-center gap-3 text-[16px] text-white/85 hover:text-[#3DEBFF] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] shrink-0 text-[#3DEBFF]" aria-hidden="true">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
              </svg>
              {CONTACT.phone}
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-3 text-[16px] text-white/85 hover:text-[#3DEBFF] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px] shrink-0 text-[#3DEBFF]" aria-hidden="true">
                <path d="M4.5 9h3v10.5h-3zM6 4.5a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zM10 9h2.9v1.4c.5-.9 1.6-1.7 3.2-1.7 3.1 0 3.9 2 3.9 4.7v6.1h-3v-5.4c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8v5.5h-3z" />
              </svg>
              LinkedIn
            </a>
            <div className="mt-3 flex items-start gap-3 text-[16px] leading-relaxed text-white/85">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#3DEBFF]" aria-hidden="true">
                <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <p>{CONTACT.addressLines.join(" ")}</p>
            </div>
            <a
              href="/contact"
              className="btn-wave btn-wave--outline mt-4 inline-flex rounded-full border border-white/35 px-4 py-2 text-[14px] font-medium text-white transition-colors"
            >
              Book a demo →
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <p className="text-[14px] text-white/85">SeerHive – A product division of SeerTech Systems</p>
          </div>
          <p className="text-center text-[14px] text-white/65 sm:text-right">© {new Date().getFullYear()} SeerTech Systems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
