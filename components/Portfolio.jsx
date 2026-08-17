"use client";

import React, { useEffect, useState, useRef } from "react";
import { Github, Mail, ExternalLink, Menu, X, Code2, FlaskConical, Rocket } from "lucide-react";

const PROJECTS = [
  {
    num: "01",
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
    num: "02",
    title: "RFID-Based CPSC Student Monitoring System with Automated Photo Capture and Email Notification",
    category: "Capstone Project",
    desc: "Automated attendance tracking using RFID readers with photo capture, Google Drive export, email notifications, and admin reporting.",
    tech: ["Python Django", "MySQL", "RFID", "Email Automation"],
    awards: ["Best Capstone Paper", "Best Capstone System"],
    image: "/images/Capstone/login.png",
    link: "https://github.com/chardoxx-3/RFID-Student-Monitoring-System",
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
  {
    num: "04",
    title: "DocuTrack - Document Tracking System",
    category: "Web Development",
    desc: "DocuTRACK: a document tracking system for archiving, tagging, approving, and syncing letters with Google Drive.",
    tech: ["PHP", "MySQL", "HTML", "CSS", "Google Drive API"],
    awards: [],
    image: "/images/DocuTrack/login.png",
    link: "#",
    linkText: "View Project →",
  },
  {
    num: "05",
    title: "Boarding House Rental System",
    category: "Web Development",
    desc: "A web-based boarding house rental system for managing listings, bookings, payments, and reviews with separate access for students, landlords, and administrators.",
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    awards: [],
    image: "/images/BHRental/login.png",
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

const WHAT_I_CAN_DO = [
  {
    group: "WEB DEVELOPMENT & QA",
    description:
      "Building functional digital systems while testing, validating, and improving their reliability, usability, and performance.",
    visual: "qa",
    size: "large",
    items: [
      "System Testing",
      "Bug Identification",
      "Web Development",
      "Database Management",
      "MySQL",
      "Python",
      "HTML",
      "CSS",
    ],
  },
  {
    group: "Virtual Assistance",
    description: "Supporting teams with accurate data, organized documents, research, and administrative workflows.",
    visual: "va",
    items: [
      "Data Entry",
      "Data Validation",
      "Document Management",
      "Google Workspace",
      "Online Research",
      "Administrative Support",
    ],
  },
  {
    group: "Content & Digital",
    description: "Creating and optimizing digital content while supporting social media and research activities.",
    visual: "digital",
    items: [
      "Social Media Management",
      "Content Optimization",
      "Analytics",
      "Research",
      "Basic Digital Marketing",
    ],
  },
];

const SOCIALS = [
  { label: "Email", value: "youremail@example.com", href: "mailto:youremail@example.com", icon: Mail, color: "#000000" },
  { label: "GitHub", value: "github.com/yourusername", href: "https://github.com/yourusername", icon: Github, color: "#000000" },
];

const CARDS = [
  "Problem Solver",
  "Detail-Oriented",
  "Reliable",
  "Organized",
  "Curious",
  "Quick Learner",
  "Creative",
  "Adaptable",
  "User-Focused",
  "Open to Feedback",
];

// Fixed "chaotic" rotation/offset per card so each trait keeps its own
// scattered position as it cycles through the stack (looks like a messy
// pile of photos rather than a neat deck).
const CARD_SCATTER = [
  { rot: -7, x: 6, y: -4 },
  { rot: 5, x: -8, y: 3 },
  { rot: -3, x: 10, y: 6 },
  { rot: 9, x: -5, y: -6 },
  { rot: -10, x: 4, y: 5 },
  { rot: 4, x: -10, y: -2 },
  { rot: -5, x: 9, y: -5 },
  { rot: 8, x: -3, y: 7 },
  { rot: -8, x: 7, y: 2 },
  { rot: 3, x: -6, y: -7 },
];

const CURRENTLY = [
  { icon: Code2, label: "Building", detail: "Web & digital projects" },
  { icon: FlaskConical, label: "Exploring", detail: "Software testing & QA" },
  { icon: Rocket, label: "Learning", detail: "Full-stack development" },
];

const EXPERIENCE = [
  {
    title: "Tech-Tuesdays",
    org: "Department of Information and Communications Technology",
    date: "March 31, 2026",
    desc: "Participated in a team-based digital solution development activity focused on addressing the needs of local MSMEs and the tourism sector. Contributed to the development and presentation of an online platform designed to showcase and promote local MSME products. Gained experience in collaborative problem-solving, digital solution design, and pitching technology-based solutions.",
    certificate: "Certificate of Appreciation",
    certificateLink: "/certificates/techtuesday.pdf",
    images: [
      "/images/experience/hackforgov/1.jpg",
      "/images/experience/hackforgov/2.jpg",
      "/images/experience/hackforgov/3.jpg",
      "/images/experience/hackforgov/4.jpg",
      "/images/experience/hackforgov/5.jpg",
    ],
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

// Same click-to-flick mechanic as the About-me trait cards: the front image
// flies off and the next one in the pile takes its place.
function ExperienceImageStack({ images, title }) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  return (
    <div
      className="experience-image-stack"
      onClick={() => setIndex((prev) => (prev + 1) % count)}
    >
      {images.map((src, i) => {
        const offset = (i - index + count) % count;
        const isExiting = offset === count - 1;
        // Only the front 3 images and the one that just got flicked away are rendered.
        if (offset > 2 && !isExiting) return null;

        const scatter = CARD_SCATTER[i % CARD_SCATTER.length];
        let style;

        if (isExiting) {
          style = {
            "--tx": `${scatter.x + 100}px`,
            "--ty": `${scatter.y - 40}px`,
            "--rot": `${scatter.rot + 25}deg`,
            "--sc": 0.88,
            "--op": 0,
            zIndex: 5,
          };
        } else {
          const depth = offset;
          const isFront = depth === 0;
          const calm = 0.4; // dampens the scatter chaos for the album stack
          const dir = depth % 2 === 1 ? -1 : 1; // alternate: mid card peeks up, back card peeks down
          style = {
            "--tx": isFront ? "0px" : `${scatter.x * calm + depth * 8}px`,
            "--ty": isFront ? "0px" : `${scatter.y * calm + dir * depth * 10}px`,
            "--rot": isFront ? "0deg" : `${scatter.rot * calm + depth * (scatter.rot >= 0 ? 1.5 : -1.5)}deg`,
            "--sc": isFront ? 1 : 1 - depth * 0.06,
            "--op": isFront ? 1 : 0.75 - (depth - 1) * 0.2,
            zIndex: 30 - depth * 10,
          };
        }

        return (
          <img
            key={src}
            src={src}
            alt={`${title} ${i + 1}`}
            className={`stacked-image${offset === 0 ? " stacked-image-front" : ""}`}
            style={style}
          />
        );
      })}
    </div>
  );
}

export default function Portfolio() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rootRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardPaused, setCardPaused] = useState(false);
  const activeProject = PROJECTS[activeIndex];

  const goTo = (index) => {
    const normalized = ((index % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
    setActiveIndex(normalized);
  };

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

  useEffect(() => {
    if (cardPaused) return;
    const id = setInterval(() => {
      setCardIndex((prev) => (prev + 1) % CARDS.length);
    }, 1500);
    return () => clearInterval(id);
  }, [cardPaused]);

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
          <a href="#what-i-can-do" className="nav-link">What I Can Do</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#trainings" className="nav-link">Trainings</a>
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
          <a href="#what-i-can-do" className="nav-link" onClick={() => setMenuOpen(false)}>What I Can Do</a>
          <a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#trainings" className="nav-link" onClick={() => setMenuOpen(false)}>Experience</a>
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
          <div className="work-header">
            <div>
              <div className="section-label">Selected Work</div>
              <div className="section-title">Work Gallery</div>
              <div className="section-desc">A collection of systems, digital projects, and technical work I've built.</div>
            </div>
            <a href="https://github.com/chardoxx-3/RFID-Student-Monitoring-System" className="work-album-btn-top" target="_blank" rel="noopener noreferrer">
              View Projects <ExternalLink size={14} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="work-album">
            <div className="work-album-inner">
              {PROJECTS.map((project, index) => {
                const total = PROJECTS.length;

                let diff = (index - activeIndex + total) % total;
                if (diff > total / 2) diff -= total;

                const isCenter = diff === 0;
                const distance = Math.abs(diff);
                const dir = isCenter ? 0 : diff / distance;

                const style = isCenter
                  ? {
                      transform: "translate(-50%, -50%) scale(1)",
                      zIndex: 5,
                      opacity: 1,
                    }
                  : {
                      transform: `translate(calc(-50% + ${
                        dir * (200 + (distance - 1) * 130)
                      }px), -50%) scale(${Math.max(0.55, 1 - distance * 0.28)})`,
                      zIndex: 5 - distance,
                      opacity: distance <= 2 ? Math.max(0, 0.85 - (distance - 1) * 0.55) : 0,
                      pointerEvents: distance <= 2 ? "auto" : "none",
                    };

                return (
                  <div
                    key={project.num}
                    className={`work-album-item${isCenter ? " work-album-item-center" : ""}`}
                    style={style}
                    onClick={() => !isCenter && goTo(index)}
                  >
                    <img src={project.image} alt={project.title} className="work-album-img" />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="work-info" key={activeProject.num}>
          <h3 className="work-info-title">{activeProject.title}</h3>
          <p className="work-info-desc">{activeProject.desc}</p>

          <a
            href={activeProject.link}
            className="work-info-link"
            target={activeProject.link !== "#" ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            {activeProject.linkText}
          </a>
        </div>
      </section>

      {/* WHAT I CAN DO */}
      <section id="what-i-can-do" className="section">
        <div className="what-i-can-do-grid">
          <div className="what-i-can-do-left">
            <Reveal>
              <div className="section-label">My Capabilities</div>
              <div className="section-title">What I Can Do</div>
              <div className="what-i-can-do-desc">
                Beyond technical skills, I bring a practical blend of software QA, development, virtual assistance, and digital content capabilities to every role.
              </div>
              <div className="tech-stack">
                <div className="tech-stack-column">
                  <div className="tech-stack-item">
                    <img src="/images/logos/html.png" alt="HTML" />
                    <span className="tech-stack-label">HTML</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/css.png" alt="CSS" />
                    <span className="tech-stack-label">CSS</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/js.png" alt="JavaScript" />
                    <span className="tech-stack-label">JavaScript</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/react.png" alt="React" />
                    <span className="tech-stack-label">React</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/python.png" alt="Python" />
                    <span className="tech-stack-label">Python</span>
                  </div>
                </div>
                <div className="tech-stack-column">
                  <div className="tech-stack-item">
                    <img src="/images/logos/flask.png" alt="Flask" />
                    <span className="tech-stack-label">Flask</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/django.png" alt="Django" />
                    <span className="tech-stack-label">Django</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/php.png" alt="PHP" />
                    <span className="tech-stack-label">PHP</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/codeigniter.png" alt="CodeIgniter" />
                    <span className="tech-stack-label">CodeIgniter</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/mysql.png" alt="MySQL" />
                    <span className="tech-stack-label">MySQL</span>
                  </div>
                </div>
                <div className="tech-stack-column workspace-column">
                  <div className="tech-stack-item">
                    <img src="/images/workspace/meta.png" alt="Meta" />
                    <span className="tech-stack-label">Meta Suite</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/workspace/notion.png" alt="Notion" />
                    <span className="tech-stack-label">Notion</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/workspace/google.png" alt="Google" />
                    <span className="tech-stack-label">Google</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/workspace/trello.png" alt="Trello" />
                    <span className="tech-stack-label">Trello</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/workspace/canva.png" alt="Canva" />
                    <span className="tech-stack-label">Canva</span>
                  </div>
                </div>
                <div className="tech-stack-column workspace-column">
                  <div className="tech-stack-item">
                    <img src="/images/workspace/figma.png" alt="Figma" />
                    <span className="tech-stack-label">Figma</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/workspace/capcut.png" alt="CapCut" />
                    <span className="tech-stack-label">CapCut</span>
                  </div>
            </div>
          </div>
        </Reveal>
          </div>

          <div className="what-i-can-do-right">
            {WHAT_I_CAN_DO.map((group, index) => (
              <Reveal key={group.group} delay={150 + index * 120}>
                <div className={`bento-card ${group.size === "large" ? "bento-large" : "bento-medium"}`}>
                  <div className="bento-header">
                    <div className="bento-number">{String(index + 1).padStart(2, "0")}</div>
                    <div className="bento-category">{group.group}</div>
                  </div>

                  <div className="bento-visual">
                    {index === 0 && (
                      <img src="/images/gif/coding.gif" alt="Web Development & QA" className="bento-gif" />
                    )}
                    {index === 1 && (
                      <img src="/images/gif/assistant.gif" alt="Virtual Assistance" className="bento-gif" />
                    )}
                    {index === 2 && (
                      <img src="/images/gif/social.gif" alt="Content & Digital" className="bento-gif" />
                    )}
                  </div>

                  <p className="bento-desc">{group.description}</p>

                  <div className="bento-skills">
                    {group.items.map((item) => (
                      <span key={item} className="bento-tag">{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <Reveal>
          <div className="section-label">ABOUT ME</div>
          <div className="section-title">Problem Solver. Digital Generalist.</div>
        </Reveal>

        <Reveal delay={100}>
          <div className="about-profile-card">
            <div className="about-profile-header">
              <div className="about-profile-image-wrapper">
                <img src="/images/about/profile.png" alt="Profile" className="about-profile-image" />
              </div>
              <div className="about-profile-info">
                <div className="about-profile-name">
                  RICHARD VICTOR M. MICULOB
                  <img src="/images/about/badge.png" alt="Verified" className="about-profile-badge" />
                </div>
                <div className="about-profile-stats">
                  <div className="about-stat-item">
                    <span className="about-stat-label">PROJECTS</span>
                    <span className="about-stat-value">20+</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="about-stat-label">CERTIFICATIONS</span>
                    <span className="about-stat-value">5</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="about-stat-label">BSIT GRADUATED</span>
                    <span className="about-stat-value">2026</span>
                  </div>
                </div>
                <div className="about-description">
                  <p>
                    I build websites and digital solutions while supporting administrative tasks with a strong eye for detail and organization. I'm a hardworking and adaptable IT graduate who enjoys designing interfaces, solving problems, and learning new technologies as I work toward becoming a full-stack web developer. Outside of technology, I enjoy gaming and watching movies and shows. I'm always looking to improve my skills, grow in the tech industry, and take on opportunities where I can create something useful.
                  </p>
                  <p>
                    Want to know more about my experience? <a href="#" className="about-resume-link">Download my resume</a>.
                  </p>
                </div>
              </div>
            </div>
            {/* CURRENTLY + CARD STACK */}
            <div className="about-bottom-row">
              <div className="currently-strip">
                <div className="currently-strip-label">CURRENTLY</div>
                <div className="currently-strip-items">
                  {CURRENTLY.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div className="currently-item" key={item.label}>
                        <span className="currently-icon">
                          <Icon size={16} strokeWidth={2} />
                        </span>
                        <div className="currently-text">
                          <div className="currently-item-label">{item.label}</div>
                          <div className="currently-item-detail">{item.detail}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="card-stack">
                <div
                  className="card-stack-container"
                  onClick={() => setCardIndex((prev) => (prev + 1) % CARDS.length)}
                  onMouseEnter={() => setCardPaused(true)}
                  onMouseLeave={() => setCardPaused(false)}
                >
                {CARDS.map((trait, i) => {
                  const offset = (i - cardIndex + CARDS.length) % CARDS.length;
                  const isExiting = offset === CARDS.length - 1;
                  // Only the front 3 cards and the one that just got flicked away are rendered.
                  if (offset > 2 && !isExiting) return null;

                  const scatter = CARD_SCATTER[i];
                  let style;

                  if (isExiting) {
                    style = {
                      "--tx": `${scatter.x + 140}px`,
                      "--ty": `${scatter.y - 60}px`,
                      "--rot": `${scatter.rot + 40}deg`,
                      "--sc": 0.85,
                      "--op": 0,
                      zIndex: 5,
                    };
                  } else {
                    const depth = offset;
                    style = {
                      "--tx": `${scatter.x + depth * 10}px`,
                      "--ty": `${scatter.y + depth * 8}px`,
                      "--rot": `${scatter.rot + depth * (scatter.rot >= 0 ? 5 : -5)}deg`,
                      "--sc": 1 - depth * 0.045,
                      "--op": depth === 0 ? 1 : 0.55 + (2 - depth) * 0.15,
                      zIndex: 30 - depth * 10,
                    };
                  }

                  return (
                    <div
                      key={trait}
                      className={`card-stack-card${offset === 0 ? " card-stack-card-front" : ""}`}
                      style={style}
                    >
                      <div className="card-stack-label">TRAIT</div>
                      <div className="card-stack-value">{trait}</div>
                    </div>
                  );
                })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
      <section id="trainings" className="section">
        <Reveal>
          <div className="section-label">Growth & Experience</div>
          <div className="section-title">Trainings & Hackathons</div>
          <div className="section-desc">
            A collection of trainings, workshops, and hackathons that shaped my technical and collaborative skills.
          </div>
        </Reveal>

        <div className="experience-list">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="experience-card">
              <div className="experience-text">
                <div className="experience-header">
                  <div className="experience-title">{exp.title}</div>
                  <div className="experience-date">{exp.date}</div>
                </div>
                <div className="experience-org">{exp.org}</div>
                <div className="experience-desc">{exp.desc}</div>
                {exp.certificate && (
                  <a href={exp.certificateLink} className="experience-certificate" target="_blank" rel="noopener noreferrer">
                    {exp.certificate}
                  </a>
                )}
              </div>
              {exp.images && exp.images.length > 0 && (
                <ExperienceImageStack images={exp.images} title={exp.title} />
              )}
            </div>
          ))}
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