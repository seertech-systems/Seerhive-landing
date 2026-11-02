import { projects } from "@/lib/projects";

export default function Footer() {
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
            <p className="mt-4 text-[14px] text-white/65 leading-relaxed max-w-xs">
              Recruitment software from SeerHive. AI modules for
              screening and interviewing, IVR Outbound for reminder calls, an AI
              Voice Agent for inbound and outbound calls, and an HRMS that brings
              everything together.
            </p>
          </div>

          <div data-reveal>
            <p className="label-mono text-[12px] text-white/65">Products</p>
            <ul className="mt-4 space-y-2.5">
              {projects.map((p) => (
                <li key={p.id}>
                  <a href={p.href} className="text-[16px] text-white/85 hover:text-[#3DEBFF] transition-colors">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <p className="label-mono text-[12px] text-white/65">Company</p>
            <ul className="mt-4 space-y-2.5">
              <li><a href="/#seerhive" className="text-[16px] text-white/85 hover:text-[#3DEBFF] transition-colors">SeerHive HRM</a></li>
              <li><a href="/#why" className="text-[16px] text-white/85 hover:text-[#3DEBFF] transition-colors">Why SeerHive</a></li>
              <li><a href="/#faq" className="text-[16px] text-white/85 hover:text-[#3DEBFF] transition-colors">FAQ</a></li>
              <li><a href="/contact" className="text-[16px] text-white/85 hover:text-[#3DEBFF] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div data-reveal>
            <p className="label-mono text-[12px] text-white/65">Get in touch</p>
            <p className="mt-4 text-[16px] text-white/85">hello@seertechsystems.ai</p>
            <a
              href="/contact"
              className="btn-wave btn-wave--outline mt-4 inline-flex rounded-full border border-white/35 px-4 py-2 text-[14px] font-medium text-white transition-colors"
            >
              Contact the team →
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[14px] text-white/65">© {new Date().getFullYear()} SeerTech Systems. All rights reserved.</p>
          <p className="label-mono text-[12px] text-white/65">Software for the whole hiring process.</p>
        </div>
      </div>
    </footer>
  );
}
