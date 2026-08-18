"use client";

import React, { useEffect, useState, useRef } from "react";
import { Github, Mail, ExternalLink, Menu, X, Code2, FlaskConical, Rocket, Trophy, GraduationCap, Linkedin, Minus, ArrowUp } from "lucide-react";

const PROJECTS = [
  {
    num: "01",
    title: "ResQR - Disaster Relief Management System",
    category: "Web Development",
    desc: "Developed a QR code-based disaster relief management system for registering beneficiaries, monitoring relief distribution, and coordinating emergency response operations.",
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
    desc: "Developed an RFID-based student monitoring system that automates attendance tracking through RFID scanning, photo capture, email notifications, Google Drive export, and administrative reporting. Awarded Best Capstone Paper and Best Capstone System.",
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
    desc: "Developed an RFID-based terminal management system for monitoring driver attendance, managing routes and queues, processing payments, and providing real-time operational analytics.",
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
    desc: "Developed a document tracking system for organizing, archiving, tagging, and approving official letters, with Google Drive integration for centralized document storage and synchronization.",
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
    desc: "Developed a web-based boarding house rental platform for managing property listings, bookings, payments, and reviews, with separate access and features for students, landlords, and administrators.",
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
    group: "IT, Web Development & QA",
    description:
      "Building and testing functional digital systems, from database-driven web applications to RFID and QR-based solutions, with a focus on reliability, usability, and practical problem-solving.",
    visual: "qa",
    size: "large",
    items: [
      "Web Development",
      "System Testing",
      "Bug Identification",
      "System Analysis",
      "Database Management",
      "MySQL",
      "PHP",
      "Python",
      "HTML",
      "CSS",
      "JavaScript",
      "RFID & QR Integration",
    ],
  },
  {
    group: "VA & Digital Operations",
    description: "Supporting teams with organized data, documentation, research, and digital workflows while helping keep day-to-day operations accurate and efficient.",
    visual: "va",
    items: [
      "Data Entry",
      "Data Validation",
      "Document Management",
      "Online Research",
      "Administrative Support",
      "Google Workspace",
      "Social Media Management",
      "Content Optimization",
    ],
  },
];

const SOCIALS = [
  { label: "Email", value: "miculobrichardvictor@gmail.com", href: "mailto:miculobrichardvictor@gmail.com", icon: Mail, color: "#000000" },
  { label: "GitHub", value: "github.com/chardoxx-3", href: "https://github.com/chardoxx-3", icon: Github, color: "#000000" },
  { label: "LinkedIn", value: "linkedin.com/in/richard-victor-miculob", href: "https://www.linkedin.com/in/richard-victor-miculob/", icon: Linkedin, color: "#000000" },
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
    title: "General Virtual Assistance 2.0",
    subtitle: "A Paradigm Shift in AI-Powered Interaction",
    org: "Department of Information and Communications Technology",
    date: "April to May 2026",
    desc: "Completed a 20-day intensive virtual assistance training focused on VA fundamentals, client communication, productivity, AI-powered workflows, and social media management. Gained hands-on experience in niche development, content creation, page management, post scheduling, client outreach, and improving workflows to deliver efficient virtual assistance services.",
    certificates: [
      { name: "Certificate of Completion", link: "/certificates/Virtual_Assistance.pdf" },
    ],
    images: [
      "/images/experience/va/1.jpg",
      "/images/experience/va/2.jpg",
    ],
  },
  {
    title: "Tech-Tuesdays",
    org: "Department of Information and Communications Technology",
    date: "March 31, 2026",
    imageLeft: true,
    desc: "Participated in a team-based digital solution development activity focused on addressing the needs of local MSMEs and the tourism sector. Contributed to the development and presentation of an online platform designed to showcase and promote local MSME products. Gained experience in collaborative problem-solving, digital solution design, and pitching technology-based solutions.",
    certificates: [
      { name: "Certificate of Appreciation", link: "/certificates/Tech-Tuesdays.pdf" },
    ],
    images: [
      "/images/experience/techtuesday/1.jpg",
      "/images/experience/techtuesday/2.jpg",
    ],
  },  
  {
    title: "HACK FOR GOV 4",
    org: "Department of Information and Communications Technology",
    date: "November 10, 2025",
    desc: "Participated in a 9-hour Capture the Flag (CTF) cybersecurity competition involving hands-on challenges in identifying vulnerabilities, analyzing systems, and finding hidden flags. Developed practical skills in cybersecurity, ethical hacking, logical reasoning, troubleshooting, and time-constrained problem-solving.",
    certificates: [
      { name: "Certificate of Participation", link: "/certificates/Hack_for_Gov.pdf" },
    ],
    images: [
      "/images/experience/hackforgov/1.jpg",
      "/images/experience/hackforgov/2.jpg",
      "/images/experience/hackforgov/3.jpg",
      "/images/experience/hackforgov/4.jpg",
      "/images/experience/hackforgov/5.jpg",
    ],
  },
  {
    title: "AI Ideas for Impact",
    org: "Department of Information and Communications Technology",
    date: "September 23-24, 2025",
    imageLeft: true,
    desc: "Participated in a digital innovation activity focused on applying artificial intelligence to improve existing systems and workflows. Collaborated with a team to develop and present AI-powered solutions designed to make processes more efficient, faster, and accessible.",
    certificates: [
      { name: "Certificate of Participation", link: "/certificates/AIdeas.pdf" },
      { name: "Most Promising Prototype", link: "/certificates/Most_Promising_Prototype.pdf" },
    ],
    images: [
      "/images/experience/aideas/1.jpg",
      "/images/experience/aideas/2.jpg",
      "/images/experience/aideas/3.jpg",
      "/images/experience/aideas/4.jpg",
      "/images/experience/aideas/5.jpg",
    ],
  },
  {
    title: "Reverse Pitching",
    org: "Department of Information and Communications Technology",
    date: "June 25-26, 2025",
    desc: "Participated in a reverse-pitching activity where participants selected real-world problems presented by organizations and developed technology-driven solutions to address them. Contributed to the development and presentation of a digital platform concept aimed at improving the efficiency of municipal and MSME operations.",
    certificates: [
      { name: "Certificate of Participation", link: "/certificates/Reverse_Pitching.pdf" },
    ],
    images: [
      "/images/experience/reverse/1.jpg",
      "/images/experience/reverse/2.jpg",
      "/images/experience/reverse/3.jpg",
      "/images/experience/reverse/4.jpg",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalMinimized, setIsModalMinimized] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showCoffee, setShowCoffee] = useState(false);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [coffeePop, setCoffeePop] = useState(false);
  const activeProject = PROJECTS[activeIndex];

  useEffect(() => {
    const saved = localStorage.getItem('coffeeCount');
    if (saved) {
      setCoffeeCount(parseInt(saved, 10));
    }
  }, []);

  const goTo = (index) => {
    const normalized = ((index % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
    setActiveIndex(normalized);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCoffeeClick = (e) => {
    e.preventDefault();
    const hasClicked = localStorage.getItem('coffeeClicked');
    if (!hasClicked) {
      const newCount = coffeeCount + 1;
      setCoffeeCount(newCount);
      localStorage.setItem('coffeeCount', newCount.toString());
      localStorage.setItem('coffeeClicked', 'true');
    }
    setCoffeePop(true);
  };

  useEffect(() => {
    if (!coffeePop) return;
    const id = setTimeout(() => setCoffeePop(false), 400);
    return () => clearTimeout(id);
  }, [coffeePop]);

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
      setShowBackToTop(window.scrollY > 400);
      setShowCoffee(window.scrollY > window.innerHeight * 0.5);
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
        <a href="#hero" className="nav-left">
          <div className="nav-logo">R</div>
          <div className="nav-brand">RICHARD</div>
        </a>
        <div className="nav-center hidden md:flex">
          <a href="#work" className="nav-link">Work</a>
          <a href="#what-i-can-do" className="nav-link">What I Can Do</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#awards" className="nav-link">Awards</a>
          <a href="#trainings" className="nav-link">Trainings</a>
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
          <a href="#awards" className="nav-link" onClick={() => setMenuOpen(false)}>Awards</a>
          <a href="#trainings" className="nav-link" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#contact" className="nav-cta" style={{ textAlign: 'center' }} onClick={() => setMenuOpen(false)}>Hire Me</a>
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="hero-root">

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
          <img src="/images/profile.png" alt="RICHARD" className="profile-image" draggable={false} />
        </div>

        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span className="scroll-text">Scroll Down</span>
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
                    <img src={project.image} alt={project.title} className="work-album-img" draggable={false} />
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
                I combine technical, problem-solving, and digital skills to build reliable systems, test systems, manage data, and support efficient digital workflows.
              </div>
              <div className="tech-stack">
                <div className="tech-stack-column">
                  <div className="tech-stack-item">
                    <img src="/images/logos/html.png" alt="HTML" draggable={false} />
                    <span className="tech-stack-label">HTML</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/css.png" alt="CSS" draggable={false} />
                    <span className="tech-stack-label">CSS</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/js.png" alt="JavaScript" draggable={false} />
                    <span className="tech-stack-label">JavaScript</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/react.png" alt="React" draggable={false} />
                    <span className="tech-stack-label">React</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/python.png" alt="Python" draggable={false} />
                    <span className="tech-stack-label">Python</span>
                  </div>
                </div>
                <div className="tech-stack-column">
                  <div className="tech-stack-item">
                    <img src="/images/logos/flask.png" alt="Flask" draggable={false} />
                    <span className="tech-stack-label">Flask</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/django.png" alt="Django" draggable={false} />
                    <span className="tech-stack-label">Django</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/php.png" alt="PHP" draggable={false} />
                    <span className="tech-stack-label">PHP</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/codeigniter.png" alt="CodeIgniter" draggable={false} />
                    <span className="tech-stack-label">CodeIgniter</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/logos/mysql.png" alt="MySQL" draggable={false} />
                    <span className="tech-stack-label">MySQL</span>
                  </div>
                </div>
                <div className="tech-stack-column workspace-column">
                  <div className="tech-stack-item">
                    <img src="/images/workspace/meta.png" alt="Meta" draggable={false} />
                    <span className="tech-stack-label">Meta Suite</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/workspace/notion.png" alt="Notion" draggable={false} />
                    <span className="tech-stack-label">Notion</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/workspace/google.png" alt="Google" draggable={false} />
                    <span className="tech-stack-label">Google</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/workspace/trello.png" alt="Trello" draggable={false} />
                    <span className="tech-stack-label">Trello</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/workspace/canva.png" alt="Canva" draggable={false} />
                    <span className="tech-stack-label">Canva</span>
                  </div>
                </div>
                <div className="tech-stack-column workspace-column">
                  <div className="tech-stack-item">
                    <img src="/images/workspace/figma.png" alt="Figma" draggable={false} />
                    <span className="tech-stack-label">Figma</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="/images/workspace/capcut.png" alt="CapCut" draggable={false} />
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
                      <img src="/images/gif/coding.gif" alt="Web Development & QA" className="bento-gif" draggable={false} />
                    )}
                    {index === 1 && (
                      <img src="/images/gif/assistant.gif" alt="Virtual Assistance" className="bento-gif" draggable={false} />
                    )}
                    {index === 2 && (
                      <img src="/images/gif/social.gif" alt="Content & Digital" className="bento-gif" draggable={false} />
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
                <img src="/images/about/profile.png" alt="Profile" className="about-profile-image" draggable={false} />
              </div>
              <div className="about-profile-info">
                <div className="about-profile-name">
                  RICHARD VICTOR M. MICULOB
                  <img src="/images/about/badge.png" alt="Verified" className="about-profile-badge" draggable={false} />
                </div>
                <div className="about-profile-stats">
                  <div className="about-stat-item">
                    <span className="about-stat-label">PROJECTS</span>
                    <span className="about-stat-value">20+</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="about-stat-label">CERTIFICATIONS</span>
                    <span className="about-stat-value">9</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="about-stat-label">BSIT GRADUATED</span>
                    <span className="about-stat-value">2026</span>
                  </div>
                </div>
                <div className="about-description">
                  <p>
                    I’m a BSIT graduate focused on software testing, web development, and digital systems. I enjoy turning ideas and real-world problems into practical digital solutions, particularly through web applications, databases, and system testing. Throughout my studies, I gained hands-on experience building database-driven systems and working with technologies such as RFID and QR-based solutions. My work was recognized through awards including Dean’s List, and Best Capstone Paper and System. I’ve also completed training in virtual assistance and AI-powered workflows, giving me experience across both technical and digital operations.
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

      {/* AWARDS */}
      <section id="awards" className="section">
        <Reveal>
          <div className="section-label">Recognition</div>
          <div className="section-title">Awards and Achievements</div>
          <div className="section-desc">
            A collection of academic and professional recognitions that reflect my dedication to excellence.
          </div>
        </Reveal>

        <div className="awards-layout">
          <img src="/images/awards/awards.png" alt="Awards" className="awards-img" />
          <div className="awards-column">
            <a href="/awards/Dean_Lister.pdf" className="award-item" target="_blank" rel="noopener noreferrer">
              <div className="award-icon"><GraduationCap size={18} /></div>
              <div className="award-title">Dean’s Lister</div>
              <ExternalLink size={12} style={{ marginLeft: 'auto', flexShrink: 0 }} />
            </a>
            <a href="/awards/Best_Capstone_Paper.pdf" className="award-item" target="_blank" rel="noopener noreferrer">
              <div className="award-icon"><Trophy size={18} /></div>
              <div className="award-title">Best Capstone Paper</div>
              <ExternalLink size={12} style={{ marginLeft: 'auto', flexShrink: 0 }} />
            </a>
            <a href="/awards/Best_Capstone_System.pdf" className="award-item" target="_blank" rel="noopener noreferrer">
              <div className="award-icon"><Trophy size={18} /></div>
              <div className="award-title">Best Capstone System</div>
              <ExternalLink size={12} style={{ marginLeft: 'auto', flexShrink: 0 }} />
            </a>
          </div>
        </div>
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
            <div key={i} className={`experience-card${exp.imageLeft ? " experience-card-reverse" : ""}`}>
              <div className="experience-text">
                <div className="experience-header">
                  <div className="experience-title">
                    {exp.title}
                    {exp.subtitle && <div className="experience-subtitle">{exp.subtitle}</div>}
                  </div>
                  <div className="experience-date">{exp.date}</div>
                </div>
                <div className="experience-org">{exp.org}</div>
                <div className="experience-desc">{exp.desc}</div>
                {exp.certificates && exp.certificates.map((cert, i) => (
                  <div key={i}>
                    <a href={cert.link} className="experience-certificate" target="_blank" rel="noopener noreferrer">
                      {cert.name}
                      <ExternalLink size={12} style={{ marginLeft: 6 }} />
                    </a>
                  </div>
                ))}
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
        <div className="contact-grid">
          <div className="contact-left">
            <Reveal>
              <div className="contact-eyebrow">GET IN TOUCH</div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="contact-headline">
                LET'S<br />
                <span className="contact-headline-accent">WORK</span><br />
                TOGETHER
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="contact-description">Looking for the next problem worth solving.</p>
            </Reveal>
            <Reveal delay={300}>
              <p className="contact-secondary">
                I'm open to opportunities where I can contribute to software testing, web development, IT operations, and digital workflows.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <a href="#" className="contact-resume-btn">DOWNLOAD RESUME →</a>
            </Reveal>
          </div>

          <div className="contact-right">
            <div className="contact-cards">
              <Reveal delay={200}>
                <a href="mailto:miculobrichardvictor@gmail.com" className="contact-card" target="_blank" rel="noopener noreferrer">
                  <span className="contact-card-number">01</span>
                  <div className="contact-card-icon">
                    <Mail size={20} />
                  </div>
                  <div className="contact-card-info">
                    <div className="contact-card-label">EMAIL</div>
                    <div className="contact-card-value">miculobrichardvictor@gmail.com</div>
                  </div>
                </a>
              </Reveal>
              <Reveal delay={280}>
                <a href="https://github.com/chardoxx-3" className="contact-card" target="_blank" rel="noopener noreferrer">
                  <span className="contact-card-number">02</span>
                  <div className="contact-card-icon">
                    <Github size={20} />
                  </div>
                  <div className="contact-card-info">
                    <div className="contact-card-label">GITHUB</div>
                    <div className="contact-card-value">github.com/chardoxx-3</div>
                  </div>
                  <ExternalLink size={16} className="contact-card-arrow" />
                </a>
              </Reveal>
              <Reveal delay={360}>
                <a href="https://www.linkedin.com/in/richard-victor-miculob/" className="contact-card" target="_blank" rel="noopener noreferrer">
                  <span className="contact-card-number">03</span>
                  <div className="contact-card-icon">
                    <Linkedin size={20} />
                  </div>
                  <div className="contact-card-info">
                    <div className="contact-card-label">LINKEDIN</div>
                    <div className="contact-card-value">linkedin.com/in/richard-victor-miculob</div>
                  </div>
                  <ExternalLink size={16} className="contact-card-arrow" />
                </a>
              </Reveal>
            </div>
            <Reveal delay={440}>
              <button className="contact-cta" onClick={() => { setIsModalOpen(true); setIsModalMinimized(false); }}>
                SEND ME A MESSAGE →
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className={`contact-modal${isModalMinimized ? " contact-modal--minimized" : ""}`}>
          <div className="contact-modal-header" onClick={() => isModalMinimized && setIsModalMinimized(false)}>
            <h3 className="contact-modal-title">Send Me a Message</h3>
            <div className="contact-modal-controls">
              <button
                type="button"
                className="contact-modal-icon-btn"
                aria-label={isModalMinimized ? "Expand" : "Minimize"}
                onClick={(e) => { e.stopPropagation(); setIsModalMinimized((v) => !v); }}
              >
                <Minus size={16} />
              </button>
              <button
                type="button"
                className="contact-modal-icon-btn"
                aria-label="Close"
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isModalMinimized && (
            <div className="contact-modal-inner">
              <form
                className="contact-modal-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const data = {
                    name: form.name.value.trim(),
                    email: form.email.value.trim(),
                    message: form.message.value.trim(),
                  };

                  setFormStatus("submitting");

                   try {
                     await fetch('https://script.google.com/macros/s/AKfycbz68sln0VIOOVOegEYiQLJwTdLonmPHMzq8jqzWCaqdgUAG2-LWxJVuRaEM5HQl6ABH/exec', {
                       method: 'POST',
                       mode: 'no-cors',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify(data),
                     });
                     setFormStatus("success");
                     form.reset();
                     setIsModalOpen(false);
                     setShowSuccessModal(true);
                   } catch (error) {
                     setFormStatus("error");
                   }
                }}
              >
                <div className="contact-modal-field">
                  <label className="contact-modal-label">Full Name</label>
                  <input type="text" name="name" className="contact-modal-input" placeholder="Your full name" required />
                </div>

                <div className="contact-modal-field">
                  <label className="contact-modal-label">Email Address</label>
                  <input type="email" name="email" className="contact-modal-input" placeholder="your.email@example.com" required />
                </div>

                <div className="contact-modal-field contact-modal-field--grow">
                  <label className="contact-modal-label">Message</label>
                  <textarea rows="6" name="message" className="contact-modal-input" placeholder="Tell me about your project..." required />
                </div>

                <button type="submit" className="contact-modal-submit" disabled={formStatus === "submitting"}>
                  {formStatus === "submitting" ? "SENDING..." : formStatus === "success" ? "MESSAGE SENT" : "SEND MESSAGE →"}
                </button>

                {formStatus === "error" && (
                  <div className="contact-modal-error">
                    Failed to send message. Please try again or contact me directly.
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      )}

      {showSuccessModal && (
        <div className="success-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <button className="success-modal-close" onClick={() => setShowSuccessModal(false)}>
              <X size={20} />
            </button>
            <div className="success-modal-icon">✓</div>
            <h3 className="success-modal-title">Message Sent!</h3>
            <p className="success-modal-text">Thanks for reaching out. I'll get back to you as soon as possible.</p>
            <button className="success-modal-btn" onClick={() => setShowSuccessModal(false)}>
              CONTINUE BROWSING
            </button>
          </div>
        </div>
      )}

      {showBackToTop && !isModalOpen && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <ArrowUp size={20} />
        </button>
      )}

      <a href="#" className={`coffee-btn${showCoffee ? " coffee-btn--visible" : ""}`} aria-label="Get me a coffee" onClick={handleCoffeeClick}>
        <span className="coffee-text">Get me a coffee</span>
        <img src="/images/gif/coffee.gif" alt="Coffee" className={`coffee-gif${coffeePop ? " coffee-gif--pop" : ""}`} />
        <span className="coffee-count">{coffeeCount}</span>
      </a>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-text">
          &copy; {new Date().getFullYear()} RICHARD — Built with discipline.
        </div>
      </footer>
    </div>
  );
}