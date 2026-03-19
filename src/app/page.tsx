import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Building2,
  Unlock,
  ShieldCheck,
  Globe,
  Lock,
  BadgeCheck,
} from "lucide-react";

function HeroCard() {
  return (
    <div
      className="rounded-[28px] shadow-2xl p-7 max-w-[360px] w-full"
      style={{
        background:
          "linear-gradient(135deg, #0d1321 0%, #1a2f4a 60%, #1e3d3d 100%)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="text-[13px] text-white/60 uppercase tracking-[0.04em]">
          Treasury Balance
        </span>
        <span className="text-white/20 text-sm font-bold">M</span>
      </div>
      <div className="text-[38px] font-bold text-white tabular-nums tracking-tight">
        € 284,612.00
      </div>
      <div
        className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold text-[#4ec99b]"
        style={{ background: "rgba(45,159,111,0.25)" }}
      >
        <TrendingUp size={14} />
        15% Annual Return
      </div>
      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between">
        <div>
          <div className="text-[11px] text-white/50 mb-1">
            Earnings this month
          </div>
          <div className="text-[18px] font-semibold text-[#4ec99b] tabular-nums">
            +€ 3,558.02
          </div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-white/50 mb-1">Projected annual</div>
          <div className="text-[18px] font-semibold text-[#4ec99b] tabular-nums">
            € 42,692
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafaf5]">
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 bg-white/95 border-b border-[#e4e4dc] z-50 backdrop-blur-sm"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-16 px-6">
          <Link href="/" className="text-xl font-bold text-[#0d1321]">
            <span className="text-[#2d9f6f]">manna</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#4b5563]">
            <a href="#features" className="hover:text-[#0d1321] transition-colors">
              Product
            </a>
            <a href="#how-it-works" className="hover:text-[#0d1321] transition-colors">
              How it works
            </a>
            <a href="#security" className="hover:text-[#0d1321] transition-colors">
              Security
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:block text-[14px] font-medium text-[#4b5563] hover:text-[#0d1321] px-4 py-2 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 bg-[#2d9f6f] text-white text-[14px] font-semibold rounded-full px-4 py-2 hover:bg-[#1f7a52] hover:-translate-y-px transition-all shadow-[0_4px_16px_-4px_rgba(45,159,111,0.40)]"
            >
              Get started
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="pt-32 pb-20 md:pt-40 md:pb-28 px-6"
        style={{
          background:
            "linear-gradient(160deg, #fafaf5 0%, #f0f5f2 50%, #e8f5ef 100%)",
        }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 max-w-[540px]">
            <div className="text-[13px] font-medium text-[#2d9f6f] uppercase tracking-[0.08em] mb-4">
              Treasury Management
            </div>
            <h1 className="text-[40px] md:text-[56px] font-bold text-[#0d1321] leading-[1.15] tracking-tight">
              Put your idle treasury cash to work
            </h1>
            <p className="text-[16px] md:text-[18px] text-[#4b5563] mt-5 leading-relaxed max-w-[480px]">
              Manna lets European companies earn up to 15% annual return on
              unused cash — via standard SEPA bank transfer, in minutes. No
              complexity, no lock-up, no surprises.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-[#2d9f6f] text-white font-semibold text-[16px] rounded-full px-7 py-3.5 hover:bg-[#1f7a52] hover:-translate-y-px transition-all shadow-[0_4px_16px_-4px_rgba(45,159,111,0.40)]"
              >
                Start earning — it&apos;s free
                <ArrowRight size={16} />
              </Link>
              <a
                href="#how-it-works"
                className="text-[16px] text-[#4b5563] hover:text-[#0d1321] px-4 py-3.5 transition-colors"
              >
                See how it works ↓
              </a>
            </div>
            <div className="mt-4 text-[13px] text-[#9ca3af]">
              SEPA bank transfer · No minimum · Withdraw anytime
            </div>
          </div>
          <div
            className="flex-1 flex justify-center md:justify-end"
            aria-hidden="true"
          >
            <HeroCard />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-8 bg-white border-y border-[#e4e4dc]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-3">
            <span className="text-[12px] font-medium text-[#9ca3af] uppercase tracking-[0.04em] hidden md:block">
              Trusted by finance teams across Europe
            </span>
            {[
              { name: "Lumis GmbH", desc: "Berlin · SaaS" },
              { name: "Arken BV", desc: "Amsterdam · E-commerce" },
              { name: "Solvera SRL", desc: "Milan · Manufacturing" },
              { name: "Calder SA", desc: "Paris · Consulting" },
              { name: "Nexway OÜ", desc: "Tallinn · FinTech" },
            ].map(({ name, desc }) => (
              <div key={name} className="flex items-center gap-1.5">
                <span className="text-[14px] font-semibold text-[#0d1321]">
                  {name}
                </span>
                <span className="text-[12px] text-[#9ca3af] hidden sm:block">
                  {desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-[#fafaf5]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-[12px] font-medium text-[#2d9f6f] uppercase tracking-[0.08em] mb-3">
              Why Finance Teams Choose Manna
            </div>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#0d1321] tracking-tight leading-tight">
              Everything your treasury needs.
              <br />
              Nothing it doesn&apos;t.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp size={24} className="text-[#2d9f6f]" />,
                iconBg: "bg-[#e8f5ef]",
                title: "Up to 15% annual return",
                body: "Your idle treasury earns a competitive annual return — automatically, every day. No action needed after your initial transfer.",
                note: "Returns shown are variable and may change.",
              },
              {
                icon: <Building2 size={24} className="text-[#0d1321]" />,
                iconBg: "bg-[#f4f4ef]",
                title: "Standard SEPA bank transfer",
                body: "Fund your account just like any bank transfer. Provide your accountant with an IBAN and reference — that's it. No new banking relationship required.",
                note: null,
              },
              {
                icon: <Unlock size={24} className="text-[#2d9f6f]" />,
                iconBg: "bg-[#e8f5ef]",
                title: "No lock-up. Withdraw anytime.",
                body: "Your funds are never locked. Request a withdrawal and receive your full balance — including returns — in your business account within one business day.",
                note: null,
              },
            ].map(({ icon, iconBg, title, body, note }) => (
              <div
                key={title}
                className="bg-white rounded-[20px] border border-[#e4e4dc] shadow-[0_2px_8px_rgba(13,19,33,0.08)] p-8 hover:-translate-y-1 hover:shadow-[0_10px_32px_-4px_rgba(13,19,33,0.12)] transition-all duration-250"
              >
                <div
                  className={`w-14 h-14 rounded-[14px] flex items-center justify-center mb-5 ${iconBg}`}
                >
                  {icon}
                </div>
                <h3 className="text-[20px] font-semibold text-[#0d1321] mb-3">
                  {title}
                </h3>
                <p className="text-[15px] text-[#4b5563] leading-relaxed">
                  {body}
                </p>
                {note && (
                  <p className="text-[12px] text-[#9ca3af] mt-4">{note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-[12px] font-medium text-[#2d9f6f] uppercase tracking-[0.08em] mb-3">
              Getting Started
            </div>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#0d1321] tracking-tight">
              Earning returns in three steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[calc(16.66%+32px)] right-[calc(16.66%+32px)] h-px border-t border-dashed border-[#e4e4dc]" />
            {[
              {
                num: "01",
                title: "Create your company account",
                body: "Sign up with your business email. We verify your company in minutes — no lengthy onboarding paperwork.",
              },
              {
                num: "02",
                title: "Send a SEPA bank transfer",
                body: "We give you a unique IBAN and payment reference. Transfer any amount from your business bank account — just like a normal supplier payment.",
              },
              {
                num: "03",
                title: "Earn returns from day one",
                body: "Your balance starts earning immediately. View your daily accrual, request withdrawals, and manage your treasury from your dashboard.",
              },
            ].map(({ num, title, body }) => (
              <div key={num} className="relative">
                <div className="text-[56px] font-bold text-[#2d9f6f] leading-none mb-4">
                  {num}
                </div>
                <h3 className="text-[18px] font-semibold text-[#0d1321] mb-3">
                  {title}
                </h3>
                <p className="text-[15px] text-[#4b5563] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-[#2d9f6f] text-white font-semibold text-[16px] rounded-full px-7 py-3.5 hover:bg-[#1f7a52] transition-colors"
            >
              Get started — it&apos;s free →
            </Link>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="py-24 px-6 bg-[#0d1321]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <div className="text-[12px] font-medium text-[#4ec99b] uppercase tracking-[0.08em] mb-4">
                Security & Compliance
              </div>
              <h2 className="text-[32px] md:text-[40px] font-bold text-white tracking-tight leading-tight">
                Bank-grade security.
                <br />
                Built for business.
              </h2>
              <p className="text-[16px] text-white/70 mt-5 leading-relaxed">
                Manna is designed to meet the compliance and security standards
                European finance teams expect. Your funds are held with regulated
                custodians and your data is protected under EU law.
              </p>
              <a
                href="https://exponential.fi/pools/yo-yoeur-vault-base/7abd13e6-51de-4660-a5e3-4b4042e15b15"
		target="_blank"
		rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-6 text-[15px] text-[#4ec99b] hover:text-white transition-colors"
              >
                Read our security overview →
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <ShieldCheck size={22} className="text-[#4ec99b]" />,
                  title: "Regulated custodian",
                  body: "Your funds are held with EU-regulated financial institutions, separate from Manna's operating accounts.",
                },
                {
                  icon: <Globe size={22} className="text-[#4ec99b]" />,
                  title: "GDPR compliant",
                  body: "All data is processed and stored in the EU. We never sell your data.",
                },
                {
                  icon: <Lock size={22} className="text-[#4ec99b]" />,
                  title: "Bank-level encryption",
                  body: "256-bit encryption in transit and at rest. SOC 2 Type II audit in progress.",
                },
                {
                  icon: <TrendingUp size={22} className="text-[#4ec99b]" />,
                  title: "Audited yield strategy",
                  body: "Yield powered by YO Protocol\u2019s yoEUR vault \u2014 rated B (Good) by Exponential.fi.",
                },
              ].map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-[16px] p-5"
                  style={{
                    background: "#141c2e",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="mb-3">{icon}</div>
                  <div className="text-[15px] font-semibold text-white mb-2">
                    {title}
                  </div>
                  <p className="text-[13px] text-white/55 leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-24 px-6"
        style={{
          background:
            "linear-gradient(160deg, #fafaf5 0%, #f0f5f2 50%, #e8f5ef 100%)",
        }}
      >
        <div className="max-w-[680px] mx-auto text-center">
          <h2 className="text-[32px] md:text-[44px] font-bold text-[#0d1321] tracking-tight leading-tight">
            Your idle cash could be earning 15% today
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#4b5563] mt-4 leading-relaxed">
            Join 500+ European finance teams already using Manna. No lengthy
            onboarding. No crypto. Just returns.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 mt-8 bg-[#2d9f6f] text-white font-semibold text-[16px] rounded-full px-8 py-4 hover:bg-[#1f7a52] hover:-translate-y-px transition-all shadow-[0_4px_16px_-4px_rgba(45,159,111,0.40)]"
          >
            Get started — it&apos;s free
            <ArrowRight size={16} />
          </Link>
          <div className="mt-3 text-[13px] text-[#9ca3af]">
            Free to create an account · No minimum balance · Cancel anytime
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d1321] px-6 pt-16 pb-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="col-span-2 md:col-span-1">
              <div className="text-xl font-bold text-[#4ec99b] mb-3">manna</div>
              <p className="text-[14px] text-white/50 leading-relaxed">
                Treasury management for European companies.
              </p>
            </div>
            {[
              {
                heading: "Product",
                links: ["Dashboard", "Transfers", "Virtual Card", "Security"],
              },
              {
                heading: "Company",
                links: ["About", "Blog", "Careers", "Press"],
              },
              {
                heading: "Legal",
                links: [
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Regulatory Disclosures",
                ],
              },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <div className="text-[12px] font-semibold text-white/60 uppercase tracking-[0.06em] mb-4">
                  {heading}
                </div>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[14px] text-white/40 hover:text-white/70 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3">
            <span className="text-[12px] text-white/35">
              © 2026 Manna Technologies SAS. All rights reserved.
            </span>
            <span className="text-[12px] text-white/35">
              Regulated activity carried out by our licensed partners.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
