"use client";

import React, { useEffect, useState, useRef } from "react";
import { Github, Mail, ExternalLink, ChevronRight } from "lucide-react";

const PROJECTS = [
  {
    id: "P01",
    title: "Payroll Management System",
    org: "LGU-Mahinog",
    status: "LIVE",
    desc: "Full payroll cycle for a local government unit — GSIS, Pag-IBIG and bank deductions, quincena periods, deduction management with automatic net-pay recalculation, Excel import for employee records, and batch payslip generation.",
    tags: ["PHP", "CodeIgniter 4", "MySQL", "PhpSpreadsheet"],
    color: "#ff3366",
    icon: "P",
  },
  {
    id: "P02",
    title: "Smart Mobile Kitchen",
    org: "Disaster Relief Distribution",
    status: "PILOT",
    desc: "QR-based claim tracking for disaster relief food distribution — per-person claim limits, live cooked-food inventory deduction, kiosk mode with idle-loop demo screen, Bisaya-language scan feedback, and a 5-second polling admin monitor.",
    tags: ["PHP", "CodeIgniter 4", "QR Scan", "Live Polling"],
    color: "#00d4ff",
    icon: "S",
  },
  {
    id: "P03",
    title: "iTRAK RFID Driver Terminal",
    org: "Motorela Fleet Management",
    status: "LIVE",
    desc: "RFID tap terminal for tricycle drivers — two-step preview-then-accept scan guard, duplicate-tap cooldown, violation reporting, a driver-facing queue portal, and multi-event support with a persisted event selector.",
    tags: ["PHP", "RFID", "CodeIgniter 4", "Realtime UI"],
    color: "#ffcc00",
    icon: "i",
  },
  {
    id: "P04",
    title: "Barangay Resident Management",
    org: "Community Administration",
    status: "LIVE",
    desc: "Structured resident records for barangay-level governance — registration, lookups, and reporting built for day-to-day frontline staff use.",
    tags: ["PHP", "CodeIgniter 4", "MySQL"],
    color: "#aa66ff",
    icon: "B",
  },
];

const SKILLS = [
  {
    group: "Backend",
    items: ["PHP", "CodeIgniter 4", "REST APIs", "Query Builder & raw SQL", "Session & role-based auth"],
  },
  {
    group: "Data & Ops",
    items: ["MySQL / MariaDB", "PhpSpreadsheet", "RFID & QR integration", ".env credential hygiene", "Git & GitHub"],
  },
  {
    group: "Frontend",
    items: ["JavaScript", "jQuery", "Bootstrap", "Chart.js dashboards", "Responsive layouts"],
  },
  {
    group: "Domain",
    items: ["LGU payroll & compliance", "Disaster relief logistics", "Resident records", "Fleet & transit systems"],
  },
];

const SOCIALS = [
  { label: "Email", value: "youremail@example.com", href: "mailto:youremail@example.com", icon: Mail, color: "#ff3366" },
  { label: "GitHub", value: "github.com/yourusername", href: "https://github.com/yourusername", icon: Github, color: "#00d4ff" },
];

const TRAININGS = [
  {
    title: "Web Development Bootcamp",
    org: "Tech Academy Philippines",
    date: "2023",
    desc: "Intensive full-stack web development training covering modern PHP frameworks, database design, and deployment workflows.",
    tags: ["PHP", "MySQL", "REST APIs"],
  },
  {
    title: "CodeIgniter 4 Advanced Workshop",
    org: "CI4 Community",
    date: "2023",
    desc: "Deep-dive into CodeIgniter 4 features including models, libraries, HMVC modules, and security best practices.",
    tags: ["CodeIgniter 4", "MVC", "Security"],
  },
  {
    title: "Government Systems Design",
    org: "LGU Digital Transformation",
    date: "2022",
    desc: "Training on designing compliant back-office systems for local government units including payroll and resident management requirements.",
    tags: ["LGU Compliance", "Payroll", "Systems Design"],
  },
];

const HACKATHONS = [
  {
    title: "Civic Tech Hackathon 2023",
    org: "Philippine Tech Community",
    date: "2023",
    desc: "Built a QR-based disaster relief tracking prototype in 24 hours. The concept later evolved into the Smart Mobile Kitchen system.",
    tags: ["Prototype", "QR Code", "Relief Logistics"],
  },
  {
    title: "Open Source LGU Systems Challenge",
    org: "DevCon Philippines",
    date: "2022",
    desc: "Developed an open-source barangay resident management module with role-based access and reporting features.",
    tags: ["Open Source", "Barangay", "Community"],
  },
  {
    title: "Fleet Management Hackathon",
    org: "Transit Tech PH",
    date: "2022",
    desc: "Created an RFID-based fleet terminal prototype with real-time tracking and driver authentication flows.",
    tags: ["RFID", "Fleet", "Realtime"],
  },
];

function ProjectMockup({ color, icon, title }) {
  return (
    <div style={{ width: "100%", maxWidth: 320, position: "relative" }}>
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
        <rect width="320" height="200" rx="8" fill={`${color}15`} />
        <rect x="1" y="1" width="318" height="198" rx="7" stroke={`${color}40`} strokeWidth="1" />
        <rect x="12" y="12" width="8" height="8" rx="2" fill={color} opacity="0.6" />
        <rect x="26" y="12" width="8" height="8" rx="2" fill={color} opacity="0.4" />
        <rect x="40" y="12" width="8" height="8" rx="2" fill={color} opacity="0.3" />
        <rect x="12" y="32" width="60" height="6" rx="3" fill={color} opacity="0.3" />
        <rect x="12" y="44" width="120" height="4" rx="2" fill="white" opacity="0.08" />
        <rect x="12" y="54" width="100" height="4" rx="2" fill="white" opacity="0.06" />
        <rect x="12" y="64" width="90" height="4" rx="2" fill="white" opacity="0.06" />
        <rect x="12" y="80" width="140" height="60" rx="4" fill={color} opacity="0.08" />
        <rect x="160" y="80" width="148" height="60" rx="4" fill="white" opacity="0.03" />
        <rect x="170" y="90" width="80" height="6" rx="3" fill={color} opacity="0.4" />
        <rect x="170" y="102" width="120" height="4" rx="2" fill="white" opacity="0.08" />
        <rect x="170" y="112" width="100" height="4" rx="2" fill="white" opacity="0.06" />
        <rect x="12" y="150" width="296" height="32" rx="4" fill="white" opacity="0.02" />
        <rect x="20" y="158" width="80" height="16" rx="4" fill={color} opacity="0.2" />
        <rect x="108" y="158" width="80" height="16" rx="4" fill="white" opacity="0.05" />
        <rect x="196" y="158" width="100" height="16" rx="4" fill="white" opacity="0.03" />
        <text x="160" y="105" textAnchor="middle" fill={color} opacity="0.5" fontSize="32" fontFamily="sans-serif" fontWeight="bold">{icon}</text>
      </svg>
    </div>
  );
}

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
      <span className="pf-status-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: isLive ? "#4caf6d" : "#c9a227", animation: "pf-blink 2.4s ease-in-out infinite" }} />
      {status}
    </span>
  );
}

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
      { threshold: 0.1 }
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
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rootRef = useRef(null);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div ref={rootRef}>
      {/* HERO */}
      <section className="hero-root">
        <div className="noise" />
        <div className="grid-lines" />

        <div
          className="blob blob-1"
          style={{ transform: `translate(${mouse.x * 20}px, ${mouse.y * 20}px)` }}
        />
        <div
          className="blob blob-2"
          style={{ transform: `translate(${mouse.x * -15}px, ${mouse.y * -15}px)` }}
        />
        <div
          className="blob blob-3"
          style={{ transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)` }}
        />

        <div className="orbit orbit-1">
          <div className="orbit-dot" />
        </div>
        <div className="orbit orbit-2">
          <div className="orbit-dot" style={{ background: "var(--accent-1)", boxShadow: "0 0 10px var(--accent-1)" }} />
        </div>

        <div className="content">
          <div className="mono-label">FULL-STACK DEVELOPER</div>

          <div className="name-wrap">
            <div
              className="name-main"
              style={{ transform: `translate(${mouse.x * 3}px, ${mouse.y * 3}px)` }}
            >
              RICHARD
            </div>
          </div>

          <div className="accent-bar" />

          <div className="tagline">
            I build robust back-office systems for local government and civic operations — payroll, logistics, and resident management software that works when it matters most.
          </div>

          <div className="cta-row">
            <a href="#work" className="cta cta-primary">
              View My Work <ChevronRight size={14} />
            </a>
            <a href="#contact" className="cta cta-secondary">
              Get In Touch
            </a>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-dot" />
          </div>
          <span className="scroll-text">Scroll</span>
        </div>
      </section>

      {/* WORK GALLERY */}
      <section id="work" className="section">
        <Reveal>
          <div className="section-label">Selected Work</div>
          <div className="section-title">Work Gallery</div>
        </Reveal>

        <div className="work-grid">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 100}>
              <div className="work-card">
                <div className="work-image" style={{ background: `linear-gradient(135deg, ${project.color}11, ${project.color}05)` }}>
                  <ProjectMockup color={project.color} icon={project.icon} title={project.title} />
                </div>
                <div className="work-content">
                  <div className="flex items-center justify-between mb-3">
                    <span className="pf-mono text-xs" style={{ color: project.color }}>{project.id}</span>
                    <StatusPill status={project.status} />
                  </div>
                  <div className="work-title">{project.title}</div>
                  <div className="text-xs mb-3" style={{ color: "var(--muted)" }}>{project.org}</div>
                  <div className="work-desc">{project.desc}</div>
                  <div className="work-tags">
                    {project.tags.map((t) => (
                      <span key={t} className="work-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section" style={{ borderTop: "1px solid var(--line)" }}>
        <Reveal>
          <div className="section-label">About Me</div>
          <div className="section-title">Story, Skills & Background</div>
        </Reveal>

        <div className="about-grid">
          <Reveal delay={100}>
            <div className="about-story">
              <p>
                <strong>I'm RICHARD, a full-stack developer specializing in back-office systems for local government and civic operations.</strong>
              </p>
              <p>
                My journey started with a simple observation: the people who keep communities running — payroll officers, disaster response coordinators, barangay staff — are often stuck using spreadsheets and paper forms.
              </p>
              <p>
                I build the software in between. Systems that handle real money, real people, and real deadlines. From GSIS-compliant payroll processing to RFID fleet terminals and QR-based relief distribution, I focus on software that works when it matters most.
              </p>
              <p>
                Currently based in the Philippines, I work primarily with PHP and CodeIgniter 4, with a strong foundation in MySQL, REST APIs, and practical front-end tooling. Every project I deliver is built to be maintained by the staff who will use it on Monday mornings.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="skills-list">
              {SKILLS.map((skill) => (
                <div key={skill.group} className="skill-group">
                  <div className="skill-group-title">{skill.group.toUpperCase()}</div>
                  <div className="skill-items">
                    {skill.items.map((item) => (
                      <span key={item} className="skill-item">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRAININGS & HACKATHONS */}
      <section id="trainings" className="section" style={{ borderTop: "1px solid var(--line)" }}>
        <Reveal>
          <div className="section-label">Growth & Experience</div>
          <div className="section-title">Trainings & Hackathons</div>
        </Reveal>

        <div className="about-grid">
          <Reveal delay={100}>
            <div>
              <div className="section-label" style={{ marginBottom: 24 }}>Trainings</div>
              <div className="timeline">
                {TRAININGS.map((t, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-dot" />
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <div className="timeline-title">{t.title}</div>
                        <div className="timeline-date">{t.date}</div>
                      </div>
                      <div className="timeline-org">{t.org}</div>
                      <div className="timeline-desc">{t.desc}</div>
                      <div className="timeline-tags">
                        {t.tags.map((tag) => (
                          <span key={tag} className="timeline-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div>
              <div className="section-label" style={{ marginBottom: 24 }}>Hackathons</div>
              <div className="timeline">
                {HACKATHONS.map((h, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-dot" style={{ borderColor: "var(--accent-1)" }} />
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <div className="timeline-title">{h.title}</div>
                        <div className="timeline-date">{h.date}</div>
                      </div>
                      <div className="timeline-org">{h.org}</div>
                      <div className="timeline-desc">{h.desc}</div>
                      <div className="timeline-tags">
                        {h.tags.map((tag) => (
                          <span key={tag} className="timeline-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section" style={{ borderTop: "1px solid var(--line)" }}>
        <Reveal>
          <div className="section-label">Get In Touch</div>
          <div className="section-title">Contact</div>
        </Reveal>

        <div className="contact-grid">
          <Reveal delay={100}>
            <div className="contact-info">
              {SOCIALS.map((social) => (
                <a key={social.label} href={social.href} className="contact-item" target="_blank" rel="noopener noreferrer">
                  <div className="contact-icon" style={{ background: `${social.color}22`, border: `1px solid ${social.color}44` }}>
                    <social.icon size={20} style={{ color: social.color }} />
                  </div>
                  <div>
                    <div className="contact-label">{social.label}</div>
                    <div className="contact-value">{social.value}</div>
                  </div>
                  <ExternalLink size={14} style={{ color: "var(--muted)", marginLeft: "auto" }} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" className="contact-input" />
              <input type="email" placeholder="Your Email" className="contact-input" />
              <textarea placeholder="Tell me about your project..." className="contact-input" />
              <button type="submit" className="contact-submit">
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-text">
          &copy; {new Date().getFullYear()} RICHARD — Built with discipline.
        </div>
      </footer>
    </div>
  );
}
