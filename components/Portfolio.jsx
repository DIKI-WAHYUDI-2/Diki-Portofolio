"use client";

import React, { useEffect, useState, useRef } from "react";
import { Github, Mail, ExternalLink, ChevronRight, Terminal, CircleDot } from "lucide-react";

const FONT_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

:root {
  --ink: #0b0f1a;
  --panel: #121729;
  --panel-line: #232a42;
  --gold: #c9a227;
  --gold-soft: #e4c460;
  --parchment: #ede6d6;
  --muted: #8891ac;
  --signal: #4caf6d;
  --rust: #b4553a;
}

.pf-root {
  background: var(--ink);
  color: var(--parchment);
  font-family: 'IBM Plex Sans', sans-serif;
  position: relative;
  overflow-x: hidden;
}

.pf-serif { font-family: 'Fraunces', serif; }
.pf-mono { font-family: 'IBM Plex Mono', monospace; }

.pf-scanlines {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(201,162,39,0.025) 0px,
    rgba(201,162,39,0.025) 1px,
    transparent 1px,
    transparent 3px
  );
  mix-blend-mode: overlay;
}

.pf-fade-up {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.pf-fade-up.pf-visible {
  opacity: 1;
  transform: translateY(0);
}

.pf-row {
  transition: background 0.25s ease, border-color 0.25s ease;
}
.pf-row:hover {
  background: rgba(201,162,39,0.05);
  border-color: var(--gold);
}

.pf-status-dot {
  animation: pf-blink 2.4s ease-in-out infinite;
}
@keyframes pf-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

.pf-underline {
  position: relative;
}
.pf-underline::after {
  content: '';
  position: absolute;
  left: 0; right: 100%;
  bottom: -3px;
  height: 1px;
  background: var(--gold);
  transition: right 0.35s ease;
}
.pf-underline:hover::after { right: 0; }

.pf-card-glow {
  box-shadow: 0 0 0 1px var(--panel-line);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.pf-card-glow:hover {
  box-shadow: 0 0 0 1px var(--gold), 0 8px 30px -12px rgba(201,162,39,0.35);
  transform: translateY(-2px);
}

.pf-boot-line {
  opacity: 0;
  animation: pf-boot-in 0.4s ease forwards;
}
@keyframes pf-boot-in {
  from { opacity: 0; transform: translateX(-6px); }
  to { opacity: 1; transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .pf-fade-up, .pf-boot-line { animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important; }
  .pf-status-dot { animation: none !important; }
}
`;

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`pf-fade-up ${visible ? "pf-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const SYSTEMS = [
  {
    id: "SYS-01",
    name: "Payroll Management System",
    org: "LGU-Mahinog",
    status: "LIVE",
    desc: "Full payroll cycle for a local government unit — GSIS, Pag-IBIG and bank deductions, quincena periods, deduction management with automatic net-pay recalculation, Excel import for employee records, and batch payslip generation.",
    tags: ["PHP", "CodeIgniter 4", "MySQL", "PhpSpreadsheet"],
  },
  {
    id: "SYS-02",
    name: "Smart Mobile Kitchen",
    org: "Disaster Relief Distribution",
    status: "PILOT",
    desc: "QR-based claim tracking for disaster relief food distribution — per-person claim limits, live cooked-food inventory deduction, kiosk mode with idle-loop demo screen, Bisaya-language scan feedback, and a 5-second polling admin monitor.",
    tags: ["PHP", "CodeIgniter 4", "QR Scan", "Live Polling"],
  },
  {
    id: "SYS-03",
    name: "iTRAK RFID Driver Terminal",
    org: "Motorela Fleet Management",
    status: "LIVE",
    desc: "RFID tap terminal for tricycle drivers — two-step preview-then-accept scan guard, duplicate-tap cooldown, violation reporting, a driver-facing queue portal, and multi-event support with a persisted event selector.",
    tags: ["PHP", "RFID", "CodeIgniter 4", "Realtime UI"],
  },
  {
    id: "SYS-04",
    name: "Barangay Resident Management",
    org: "Community Administration",
    status: "LIVE",
    desc: "Structured resident records for barangay-level governance — registration, lookups, and reporting built for day-to-day frontline staff use.",
    tags: ["PHP", "CodeIgniter 4", "MySQL"],
  },
];

const SKILLS = [
  { group: "Backend", items: ["PHP", "CodeIgniter 4", "REST APIs", "Query Builder & raw SQL", "Session & role-based auth"] },
  { group: "Data & Ops", items: ["MySQL / MariaDB", "PhpSpreadsheet", "RFID & QR integration", ".env credential hygiene", "Git & GitHub"] },
  { group: "Frontend", items: ["JavaScript", "jQuery", "Bootstrap", "Chart.js dashboards", "Responsive layouts"] },
  { group: "Domain", items: ["LGU payroll & compliance", "Disaster relief logistics", "Resident records", "Fleet & transit systems"] },
];

function StatusPill({ status }) {
  const isLive = status === "LIVE";
  return (
    <span
      className="pf-mono inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-sm"
      style={{
        color: isLive ? "#a8e0b8" : "#e8c98a",
        background: isLive ? "rgba(76,175,109,0.1)" : "rgba(201,162,39,0.1)",
        border: `1px solid ${isLive ? "rgba(76,175,109,0.35)" : "rgba(201,162,39,0.35)"}`,
      }}
    >
      <CircleDot size={10} className="pf-status-dot" />
      {status}
    </span>
  );
}

export default function Portfolio() {
  const [bootDone, setBootDone] = useState(false);
  const [openId, setOpenId] = useState(null);
  const bootLines = [
    "INIT payroll-mgt.service ......... OK",
    "INIT smk-relief.service ........... OK",
    "INIT itrak-rfid.service ............ OK",
    "INIT barangay-records.service ... OK",
    "SYSTEMS ONLINE",
  ];

  useEffect(() => {
    const t = setTimeout(() => setBootDone(true), bootLines.length * 260 + 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="pf-root min-h-screen w-full">
      <style>{FONT_STYLE}</style>
      <div className="pf-scanlines" />

      {/* NAV */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 border-b" style={{ borderColor: "var(--panel-line)" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-sm border flex items-center justify-center pf-mono text-sm" style={{ borderColor: "var(--gold)", color: "var(--gold)" }}>
            CD
          </div>
          <span className="pf-mono text-xs tracking-widest" style={{ color: "var(--muted)" }}>
            CIVIC SYSTEMS DEVELOPER
          </span>
        </div>
        <div className="hidden md:flex gap-8 pf-mono text-xs tracking-wider">
          {["REGISTRY", "SKILLS", "CONTACT"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="pf-underline" style={{ color: "var(--parchment)" }}>
              {l}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24 grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-3">
          <div className="pf-mono text-xs tracking-widest mb-4" style={{ color: "var(--gold)" }}>
            FULL-STACK DEVELOPER — PHP · CODEIGNITER 4
          </div>
          <h1 className="pf-serif text-4xl md:text-6xl leading-[1.08] mb-6" style={{ color: "var(--parchment)" }}>
            Building the systems<br />local government<br />
            <span style={{ color: "var(--gold-soft)" }}>actually runs on.</span>
          </h1>
          <p className="text-base md:text-lg max-w-xl mb-8" style={{ color: "var(--muted)" }}>
            I design and build back-office software for municipal operations —
            payroll, disaster relief logistics, resident records, and fleet
            terminals — where the requirement isn't a demo, it's a Monday
            morning that has to work.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#registry"
              className="pf-mono text-sm px-5 py-3 rounded-sm flex items-center gap-2 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--gold)", color: "var(--ink)" }}
            >
              View the systems registry <ChevronRight size={15} />
            </a>
            <a
              href="#contact"
              className="pf-mono text-sm px-5 py-3 rounded-sm border flex items-center gap-2 transition-colors hover:border-[var(--gold)]"
              style={{ borderColor: "var(--panel-line)", color: "var(--parchment)" }}
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Boot terminal card */}
        <div className="md:col-span-2">
          <div className="pf-card-glow rounded-md p-5" style={{ background: "var(--panel)" }}>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: "var(--panel-line)" }}>
              <Terminal size={14} style={{ color: "var(--gold)" }} />
              <span className="pf-mono text-xs" style={{ color: "var(--muted)" }}>system-status.log</span>
            </div>
            <div className="pf-mono text-xs leading-relaxed space-y-1.5">
              {bootLines.map((line, i) => (
                <div
                  key={i}
                  className="pf-boot-line"
                  style={{
                    animationDelay: `${i * 260}ms`,
                    color: i === bootLines.length - 1 ? "var(--signal)" : "var(--parchment)",
                  }}
                >
                  {i === bootLines.length - 1 ? "▸ " : "  "}{line}
                </div>
              ))}
              {bootDone && (
                <div className="pf-boot-line pt-2 mt-2 border-t" style={{ borderColor: "var(--panel-line)", animationDelay: "0ms", color: "var(--muted)" }}>
                  4 systems deployed · 3 live in production
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRY */}
      <section id="registry" className="relative z-10 px-6 md:px-12 py-16 md:py-20 border-t" style={{ borderColor: "var(--panel-line)" }}>
        <Reveal>
          <div className="flex items-baseline justify-between mb-10 flex-wrap gap-3">
            <h2 className="pf-serif text-3xl md:text-4xl" style={{ color: "var(--parchment)" }}>Systems Registry</h2>
            <span className="pf-mono text-xs" style={{ color: "var(--muted)" }}>4 ENTRIES</span>
          </div>
        </Reveal>

        <div className="border-t" style={{ borderColor: "var(--panel-line)" }}>
          {SYSTEMS.map((sys, i) => {
            const open = openId === sys.id;
            return (
              <Reveal key={sys.id} delay={i * 80}>
                <div
                  className="pf-row border-b cursor-pointer px-4 md:px-6 py-5"
                  style={{ borderColor: "var(--panel-line)" }}
                  onClick={() => setOpenId(open ? null : sys.id)}
                >
                  <div className="flex flex-wrap items-center gap-4 justify-between">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="pf-mono text-xs" style={{ color: "var(--gold)" }}>{sys.id}</span>
                      <div className="min-w-0">
                        <div className="pf-serif text-lg md:text-xl truncate" style={{ color: "var(--parchment)" }}>{sys.name}</div>
                        <div className="text-xs" style={{ color: "var(--muted)" }}>{sys.org}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <StatusPill status={sys.status} />
                      <ChevronRight
                        size={16}
                        style={{
                          color: "var(--muted)",
                          transform: open ? "rotate(90deg)" : "rotate(0deg)",
                          transition: "transform 0.25s ease",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      maxHeight: open ? "220px" : "0px",
                      overflow: "hidden",
                      transition: "max-height 0.35s ease",
                    }}
                  >
                    <p className="text-sm mt-4 mb-3 max-w-3xl" style={{ color: "var(--muted)" }}>{sys.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {sys.tags.map((t) => (
                        <span
                          key={t}
                          className="pf-mono text-[11px] px-2 py-1 rounded-sm"
                          style={{ border: "1px solid var(--panel-line)", color: "var(--gold-soft)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative z-10 px-6 md:px-12 py-16 md:py-20 border-t" style={{ borderColor: "var(--panel-line)" }}>
        <Reveal>
          <h2 className="pf-serif text-3xl md:text-4xl mb-10" style={{ color: "var(--parchment)" }}>Stack &amp; Domain</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILLS.map((s, i) => (
            <Reveal key={s.group} delay={i * 90}>
              <div className="pf-card-glow rounded-md p-5 h-full" style={{ background: "var(--panel)" }}>
                <div className="pf-mono text-xs tracking-widest mb-4" style={{ color: "var(--gold)" }}>{s.group.toUpperCase()}</div>
                <ul className="space-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="text-sm" style={{ color: "var(--parchment)" }}>{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 px-6 md:px-12 py-16 md:py-24 border-t" style={{ borderColor: "var(--panel-line)" }}>
        <Reveal>
          <div className="max-w-2xl">
            <div className="pf-mono text-xs tracking-widest mb-4" style={{ color: "var(--gold)" }}>REQUEST A SYSTEM</div>
            <h2 className="pf-serif text-3xl md:text-5xl mb-6" style={{ color: "var(--parchment)" }}>
              Have an office that runs on spreadsheets?
            </h2>
            <p className="mb-8" style={{ color: "var(--muted)" }}>
              I build the software in between — the part that turns a manual
              process into something your staff actually trust on payday.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:youremail@example.com"
                className="pf-mono text-sm px-5 py-3 rounded-sm flex items-center gap-2 transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--gold)", color: "var(--ink)" }}
              >
                <Mail size={15} /> youremail@example.com
              </a>
              <a
                href="https://github.com/yourusername"
                className="pf-mono text-sm px-5 py-3 rounded-sm border flex items-center gap-2 transition-colors hover:border-[var(--gold)]"
                style={{ borderColor: "var(--panel-line)", color: "var(--parchment)" }}
              >
                <Github size={15} /> github.com/yourusername <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="relative z-10 px-6 md:px-12 py-8 border-t pf-mono text-xs flex justify-between flex-wrap gap-2" style={{ borderColor: "var(--panel-line)", color: "var(--muted)" }}>
        <span>© {new Date().getFullYear()} — built with CodeIgniter-grade discipline.</span>
        <span>REGISTRY LAST SYNCED: TODAY</span>
      </footer>
    </div>
  );
}
