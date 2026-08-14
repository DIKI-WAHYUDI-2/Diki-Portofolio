"use client";

import React, { useEffect, useState, useRef } from "react";
import { Github, Mail, ExternalLink, ChevronRight, Menu, X } from "lucide-react";

const PROJECTS = [
  {
    num: "01",
    title: "RFID-Based CPSC Student Monitoring System",
    category: "Capstone Project",
    desc: "Automated attendance tracking using RFID readers with photo capture, Google Drive export, email notifications, and admin reporting.",
    tech: ["Python Django", "MySQL", "RFID", "Email Automation"],
    awards: ["Best Capstone Paper", "Best Capstone System"],
    image: "/images/Capstone/login.png",
    link: "https://github.com/chardoxx-3/RFID-Student-Monitoring-System",
    linkText: "View Project →",
  },
  {
    num: "02",
    title: "ResQR - Disaster Relief Management System",
    category: "Web Development",
    desc: "A QR code-based disaster relief management system for registering beneficiaries, tracking relief distribution, and coordinating emergency response operations.",
    tech: ["HTML", "CSS", "PHP", "MySQL"],
    awards: [],
    image: "/images/ResQR/login.png",
    link: "#",
    linkText: "View Project →",
  },
  {
    num: "03",
    title: "iTrak - Terminal Management System",
    category: "Web Development",
    desc: "RFID-based terminal management system for tracking driver attendance, managing routes and queues, processing payments, and generating real-time analytics.",
    tech: ["PHP", "MySQL", "HTML", "CSS"],
    awards: [],
    image: "/images/iTrak/Screenshot%202026-08-14%20175457.png",
    link: "#",
    linkText: "View Project →",
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
    <div ref={rootRef} style={{ position: 'relative' }}>
      <svg className="bg-lines" viewBox="0 0 1440 5000" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{width:'100%',height:'100%'}}>
        <g opacity="0.28">
          <path d="M-100 200 C 200 100, 500 300, 800 200 C 1100 100, 1300 280, 1540 180" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 350 C 300 250, 600 400, 900 320 C 1200 240, 1400 380, 1440 300" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-80 500 C 240 420, 540 580, 840 500 C 1140 420, 1360 560, 1500 480" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
        </g>
        <g opacity="0.32">
          <path d="M0 700 C 320 620, 620 780, 920 700 C 1220 620, 1420 760, 1440 680" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-100 850 C 260 780, 560 920, 860 860 C 1160 800, 1380 940, 1540 880" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 1000 C 300 940, 600 1060, 900 1000 C 1200 940, 1400 1080, 1440 1020" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
        </g>
        <g opacity="0.22">
          <path d="M-120 1250 C 200 1180, 500 1320, 820 1260 C 1140 1200, 1340 1340, 1560 1280" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 1400 C 280 1340, 580 1460, 880 1400 C 1180 1340, 1380 1480, 1440 1420" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-60 1550 C 240 1490, 540 1610, 840 1550 C 1140 1490, 1360 1630, 1500 1570" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 1700 C 320 1640, 620 1760, 920 1700 C 1220 1640, 1420 1780, 1440 1720" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
        </g>
        <g opacity="0.3">
          <path d="M-140 1950 C 220 1880, 520 2020, 860 1960 C 1200 1900, 1400 2040, 1580 1980" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 2100 C 300 2040, 600 2160, 900 2100 C 1200 2040, 1400 2180, 1440 2120" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-80 2250 C 240 2190, 540 2310, 840 2250 C 1140 2190, 1360 2330, 1500 2270" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
        </g>
        <g opacity="0.26">
          <path d="M0 2500 C 320 2440, 620 2560, 920 2500 C 1220 2440, 1420 2580, 1440 2520" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-100 2650 C 260 2590, 560 2710, 860 2650 C 1160 2590, 1380 2730, 1540 2670" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 2800 C 300 2740, 600 2860, 900 2800 C 1200 2740, 1400 2880, 1440 2820" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-60 2950 C 240 2890, 540 3010, 840 2950 C 1140 2890, 1360 3030, 1500 2970" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
        </g>
        <g opacity="0.34">
          <path d="M-120 3250 C 200 3180, 500 3320, 820 3260 C 1140 3200, 1340 3340, 1560 3280" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 3400 C 280 3340, 580 3460, 880 3400 C 1180 3340, 1380 3480, 1440 3420" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-80 3550 C 240 3490, 540 3610, 840 3550 C 1140 3490, 1360 3630, 1500 3570" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 3700 C 320 3640, 620 3760, 920 3700 C 1220 3640, 1420 3780, 1440 3720" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
        </g>
        <g opacity="0.24">
          <path d="M-100 4050 C 260 3990, 560 4110, 860 4050 C 1160 3990, 1380 4130, 1540 4070" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 4200 C 300 4140, 600 4260, 900 4200 C 1200 4140, 1400 4280, 1440 4220" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-60 4350 C 240 4290, 540 4410, 840 4350 C 1140 4290, 1360 4430, 1500 4370" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
        </g>
        <g opacity="0.3">
          <path d="M-140 4600 C 220 4540, 520 4660, 860 4600 C 1200 4540, 1400 4680, 1580 4620" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 4750 C 300 4690, 600 4810, 900 4750 C 1200 4690, 1400 4830, 1440 4770" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
        </g>
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

        <div className="hero-text">
          <div className="hero-name">Richard Victor M. Miculob</div>
          <div className="hero-subtitle">IT Graduate | Virtual Assistant | Web Development</div>
          <div className="hero-statement">I’m a recent BSIT graduate passionate about building systems, testing software, managing data, and supporting digital operations. I enjoy turning ideas into practical technology solutions while bringing strong organization and attention to detail to every project.</div>
        </div>
      </section>

      {/* WORK GALLERY */}
      <section id="work" className="section">
        <Reveal>
          <div className="section-label">Selected Work</div>
          <div className="section-title">Work Gallery</div>
          <div className="section-desc">A collection of systems, digital projects, and technical work I've built.</div>
        </Reveal>

        <Reveal delay={100}>
          <div className="work-album">
            <div className="work-album-side">
              <img src={PROJECTS[1].image} alt={PROJECTS[1].title} className="work-album-img" />
            </div>
            <div className="work-album-center">
              <img src={PROJECTS[0].image} alt={PROJECTS[0].title} className="work-album-img" />
            </div>
            <div className="work-album-side">
              <img src={PROJECTS[2].image} alt={PROJECTS[2].title} className="work-album-img" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="work-album-action">
            <a href="https://github.com/chardoxx-3/RFID-Student-Monitoring-System" className="work-album-btn" target="_blank" rel="noopener noreferrer">
              View Projects <ExternalLink size={14} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
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
      <section id="trainings" className="section">
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
      <section id="contact" className="section">
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
        <div className="footer-text">
          &copy; {new Date().getFullYear()} RICHARD — Built with discipline.
        </div>
      </footer>
    </div>
  );
}
