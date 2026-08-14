"use client";

import React, { useEffect, useState, useRef } from "react";
import { Github, Mail, ExternalLink, ChevronRight, Menu, X } from "lucide-react";

const PROJECTS = [
  {
    id: "P01",
    title: "Payroll Management System",
    org: "LGU-Mahinog",
    status: "LIVE",
    desc: "Full payroll cycle for a local government unit — GSIS, Pag-IBIG and bank deductions, quincena periods, deduction management with automatic net-pay recalculation, Excel import for employee records, and batch payslip generation.",
    tags: ["PHP", "CodeIgniter 4", "MySQL", "PhpSpreadsheet"],
    color: "#000000",
  },
  {
    id: "P02",
    title: "Smart Mobile Kitchen",
    org: "Disaster Relief Distribution",
    status: "PILOT",
    desc: "QR-based claim tracking for disaster relief food distribution — per-person claim limits, live cooked-food inventory deduction, kiosk mode with idle-loop demo screen, Bisaya-language scan feedback, and a 5-second polling admin monitor.",
    tags: ["PHP", "CodeIgniter 4", "QR Scan", "Live Polling"],
    color: "#333333",
  },
  {
    id: "P03",
    title: "iTRAK RFID Driver Terminal",
    org: "Motorela Fleet Management",
    status: "LIVE",
    desc: "RFID tap terminal for tricycle drivers — two-step preview-then-accept scan guard, duplicate-tap cooldown, violation reporting, a driver-facing queue portal, and multi-event support with a persisted event selector.",
    tags: ["PHP", "RFID", "CodeIgniter 4", "Realtime UI"],
    color: "#1F2933",
  },
  {
    id: "P04",
    title: "Barangay Resident Management",
    org: "Community Administration",
    status: "LIVE",
    desc: "Structured resident records for barangay-level governance — registration, lookups, and reporting built for day-to-day frontline staff use.",
    tags: ["PHP", "CodeIgniter 4", "MySQL"],
    color: "#6B6B6B",
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
  { label: "Email", value: "youremail@example.com", href: "mailto:youremail@example.com", icon: Mail, color: "#000000" },
  { label: "GitHub", value: "github.com/yourusername", href: "https://github.com/yourusername", icon: Github, color: "#000000" },
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
  const marqueeTrackRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    const syncMarqueeSpeed = () => {
      const enterSeconds = 8; // matches marquee-enter duration in CSS
      const pxPerSecond = window.innerWidth / enterSeconds; // entrance travels 100vw in 4s
      const loopDistance = track.scrollWidth / 2; // loop travels -50% of the doubled track
      const loopSeconds = loopDistance / pxPerSecond;
      track.style.setProperty("--marquee-loop-duration", `${loopSeconds}s`);
    };

    syncMarqueeSpeed();
    window.addEventListener("resize", syncMarqueeSpeed);
    return () => window.removeEventListener("resize", syncMarqueeSpeed);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={rootRef}>
      <svg className="bg-lines" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{width:'100%',height:'100%'}}>
        <path d="M-100 120 C 200 40, 500 200, 800 100 C 1100 0, 1300 180, 1540 80" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.32"/>
        <path d="M0 260 C 300 180, 600 340, 900 260 C 1200 180, 1400 320, 1440 240" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.28"/>
        <path d="M-50 400 C 250 320, 550 480, 850 400 C 1150 320, 1380 460, 1490 380" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.25"/>
        <path d="M0 540 C 200 460, 500 620, 800 540 C 1100 460, 1300 600, 1440 520" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.3"/>
        <path d="M-100 680 C 300 600, 600 760, 900 680 C 1200 600, 1400 740, 1540 660" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.22"/>
        <path d="M0 820 C 350 780, 650 880, 950 820 C 1250 760, 1400 860, 1440 800" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.18"/>
        <path d="M-80 160 C 180 100, 400 220, 700 140 C 1000 60, 1220 200, 1520 120" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.2"/>
        <path d="M0 450 C 280 380, 580 520, 880 440 C 1180 360, 1380 500, 1440 420" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.15"/>
        <path d="M-60 610 C 220 550, 520 670, 820 590 C 1120 510, 1340 650, 1500 570" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.26"/>
        <path d="M0 760 C 320 700, 620 820, 920 740 C 1220 660, 1420 800, 1440 720" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.24"/>
      </svg>
      {/* NAVIGATION */}
      <nav className={`nav-bar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-left">
          <div className="nav-logo">R</div>
          <div className="nav-brand">RICHARD</div>
        </div>
        <div className="nav-center hidden md:flex">
          <a href="#work" className="nav-link">Work</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <div className="nav-right">
          <a href="#contact" className="nav-cta hidden md:block">Hire Me</a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--surface)',
          padding: '24px',
          borderRadius: '18px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minWidth: '200px'
        }}>
          <a href="#work" className="nav-link" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="#contact" className="nav-cta" style={{ textAlign: 'center' }} onClick={() => setMenuOpen(false)}>Hire Me</a>
        </div>
      )}

      {/* HERO */}
      <section className="hero-root">
        <svg className="bg-lines" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M-120 180 C 180 80, 420 260, 780 160 C 1140 60, 1320 240, 1560 120" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.35"/>
          <path d="M0 340 C 320 260, 620 420, 940 340 C 1260 260, 1420 400, 1440 320" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.3"/>
          <path d="M-80 520 C 260 440, 560 600, 860 520 C 1160 440, 1380 580, 1520 500" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.28"/>
          <path d="M0 720 C 340 660, 640 780, 940 700 C 1240 620, 1420 760, 1440 680" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.24"/>
          <path d="M-140 80 C 200 40, 480 160, 820 100 C 1160 40, 1340 140, 1580 80" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.22"/>
          <path d="M0 860 C 300 800, 600 920, 900 840 C 1200 760, 1400 900, 1440 820" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.2"/>
        </svg>

<div className="bg-name-marquee">
          <div className="bg-name-track" ref={marqueeTrackRef}>
            <span className="bg-name-text">RICHARD MICULOB</span>
            <span className="bg-name-text">RICHARD MICULOB</span>
          </div>
        </div>

        <div className="concentric-circles">
          <div className="circle circle-1" />
          <div className="circle circle-2" />
          <div className="circle circle-3" />
        </div>

        <div className="profile-wrap">
          <img src="/images/profile.png" alt="RICHARD" className="profile-image" />
        </div>

        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span className="scroll-text">Scroll Down</span>
        </div>
      </section>

      {/* WORK GALLERY */}
      <section id="work" className="section">
        <svg className="bg-lines" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M-100 120 C 220 60, 500 220, 800 140 C 1100 60, 1300 200, 1540 100" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.3"/>
          <path d="M0 280 C 280 220, 580 360, 880 280 C 1180 200, 1380 340, 1440 260" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.28"/>
          <path d="M-60 460 C 240 400, 540 540, 840 460 C 1140 380, 1360 520, 1500 440" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.32"/>
          <path d="M0 640 C 320 580, 620 720, 920 640 C 1220 560, 1420 700, 1440 620" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.26"/>
          <path d="M-80 800 C 260 740, 560 860, 860 780 C 1160 700, 1380 840, 1520 760" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.24"/>
        </svg>
        <Reveal>
          <div className="section-label">Selected Work</div>
          <div className="section-title">Work Gallery</div>
        </Reveal>

        <div className="work-grid">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 100}>
              <div className="work-card">
                <div className="work-image" style={{ background: `linear-gradient(135deg, ${project.color}08, ${project.color}03)` }}>
                  <svg viewBox="0 0 320 200" fill="none" style={{ width: "100%", height: "100%", position: 'absolute', inset: 0 }}>
                    <rect width="320" height="200" rx="8" fill={project.color} opacity="0.03" />
                    <rect x="12" y="12" width="8" height="8" rx="2" fill={project.color} opacity="0.2" />
                    <rect x="26" y="12" width="8" height="8" rx="2" fill={project.color} opacity="0.15" />
                    <rect x="40" y="12" width="8" height="8" rx="2" fill={project.color} opacity="0.1" />
                    <rect x="12" y="32" width="60" height="6" rx="3" fill={project.color} opacity="0.15" />
                    <rect x="12" y="44" width="120" height="4" rx="2" fill={project.color} opacity="0.1" />
                    <rect x="12" y="54" width="100" height="4" rx="2" fill={project.color} opacity="0.08" />
                    <rect x="12" y="64" width="90" height="4" rx="2" fill={project.color} opacity="0.08" />
                    <rect x="12" y="80" width="140" height="60" rx="4" fill={project.color} opacity="0.05" />
                    <rect x="160" y="80" width="148" height="60" rx="4" fill={project.color} opacity="0.03" />
                    <rect x="170" y="90" width="80" height="6" rx="3" fill={project.color} opacity="0.2" />
                    <rect x="170" y="102" width="120" height="4" rx="2" fill={project.color} opacity="0.1" />
                    <rect x="170" y="112" width="100" height="4" rx="2" fill={project.color} opacity="0.08" />
                    <rect x="12" y="150" width="296" height="32" rx="4" fill={project.color} opacity="0.02" />
                    <rect x="20" y="158" width="80" height="16" rx="4" fill={project.color} opacity="0.1" />
                    <rect x="108" y="158" width="80" height="16" rx="4" fill={project.color} opacity="0.05" />
                    <rect x="196" y="158" width="100" height="16" rx="4" fill={project.color} opacity="0.03" />
                  </svg>
                </div>
                <div className="work-content">
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: project.color, letterSpacing: '0.05em' }}>{project.id}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', padding: '4px 10px', borderRadius: '6px', background: 'var(--surface-2)', color: 'var(--muted)', border: '1px solid var(--line)', letterSpacing: '0.05em' }}>{project.status}</span>
                  </div>
                  <div className="work-title">{project.title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '12px' }}>{project.org}</div>
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
        <svg className="bg-lines" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M-140 160 C 200 100, 480 240, 820 180 C 1160 120, 1340 260, 1580 200" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.34"/>
          <path d="M0 340 C 320 280, 620 420, 920 360 C 1220 300, 1420 440, 1440 380" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.3"/>
          <path d="M-80 540 C 240 480, 540 620, 840 560 C 1140 500, 1360 640, 1500 580" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.28"/>
          <path d="M0 740 C 340 680, 640 820, 940 760 C 1240 700, 1420 840, 1440 780" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.26"/>
          <path d="M-100 900 C 260 840, 560 960, 860 900 C 1160 840, 1380 980, 1520 920" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.22"/>
          <path d="M0 100 C 300 40, 600 180, 900 120 C 1200 60, 1400 200, 1440 140" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.2"/>
        </svg>
        <Reveal>
          <div className="section-label">About Me</div>
          <div className="section-title">Story, Skills & Background</div>
        </Reveal>

        <div className="about-grid">
          <Reveal delay={100}>
            <div className="about-story">
              <p>
                <strong>I'm RICHARD, a BSIT graduate specializing in QA, software testing, system development, and web development.</strong>
              </p>
              <p>
                My journey in technology started with a deep curiosity about how systems work and how to make them better. I focus on ensuring software quality through rigorous testing, building robust back-end systems, and creating clean, functional web interfaces.
              </p>
              <p>
                I specialize in QA methodologies, manual and automated testing, and full-stack development with PHP and CodeIgniter 4. Every project I deliver is built with precision, maintainability, and the end-user experience in mind.
              </p>
              <p>
                Based in the Philippines, I'm passionate about creating reliable, efficient, and well-tested software solutions that help organizations operate more effectively.
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
        <svg className="bg-lines" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M-120 200 C 240 140, 540 280, 860 220 C 1180 160, 1380 300, 1560 240" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.32"/>
          <path d="M0 400 C 300 340, 600 480, 900 420 C 1200 360, 1400 500, 1440 440" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.3"/>
          <path d="M-60 600 C 260 540, 560 680, 860 620 C 1160 560, 1360 700, 1500 640" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.26"/>
          <path d="M0 800 C 320 740, 620 860, 920 800 C 1220 740, 1420 880, 1440 820" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.24"/>
          <path d="M-80 50 C 220 0, 500 120, 840 80 C 1180 40, 1360 160, 1520 100" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.2"/>
          <path d="M0 950 C 300 900, 600 1020, 900 960 C 1200 900, 1400 1040, 1440 980" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.18"/>
        </svg>
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
                    <div className="timeline-dot" style={{ borderColor: "var(--muted)" }} />
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
        <svg className="bg-lines" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M-140 140 C 200 80, 480 220, 820 160 C 1160 100, 1340 240, 1580 180" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.36"/>
          <path d="M0 320 C 320 260, 620 400, 920 340 C 1220 280, 1420 420, 1440 360" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.32"/>
          <path d="M-80 520 C 240 460, 540 600, 840 540 C 1140 480, 1360 620, 1500 560" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.3"/>
          <path d="M0 720 C 340 660, 640 800, 940 740 C 1240 680, 1420 820, 1440 760" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.28"/>
          <path d="M-100 880 C 260 820, 560 960, 860 900 C 1160 840, 1380 980, 1520 920" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.24"/>
          <path d="M0 60 C 300 20, 600 140, 900 80 C 1200 20, 1400 160, 1440 100" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.22"/>
        </svg>
        <Reveal>
          <div className="section-label">Get In Touch</div>
          <div className="section-title">Contact</div>
        </Reveal>

        <div className="contact-grid">
          <Reveal delay={100}>
            <div className="contact-info">
              {SOCIALS.map((social) => (
                <a key={social.label} href={social.href} className="contact-item" target="_blank" rel="noopener noreferrer">
                  <div className="contact-icon">
                    <social.icon size={20} style={{ color: 'var(--text)' }} />
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
        <svg className="bg-lines" viewBox="0 0 1440 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M-100 80 C 220 40, 520 140, 860 100 C 1200 60, 1380 160, 1540 120" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.34"/>
          <path d="M0 180 C 300 140, 600 240, 900 200 C 1200 160, 1400 260, 1440 220" stroke="var(--light-gray)" strokeWidth="1" fill="none" opacity="0.3"/>
          <path d="M-80 260 C 240 220, 540 320, 840 280 C 1140 240, 1360 340, 1520 300" stroke="var(--light-gray)" strokeWidth="1.5" fill="none" opacity="0.26"/>
        </svg>
        <div className="footer-text">
          &copy; {new Date().getFullYear()} RICHARD — Built with discipline.
        </div>
      </footer>
    </div>
  );
}
