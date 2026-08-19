"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink, Menu, X, ArrowUp } from "lucide-react";

export default function Header({ alwaysShowCoffee, alwaysShowBackToTop }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showCoffee, setShowCoffee] = useState(false);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [coffeePop, setCoffeePop] = useState(false);
  const [coffeeLoading, setCoffeeLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/coffee-count')
      .then(res => res.json())
      .then(data => {
        if (!cancelled && typeof data.count === 'number') {
          setCoffeeCount(data.count);
        }
        setCoffeeLoading(false);
      })
      .catch(() => setCoffeeLoading(false));
    return () => { cancelled = true; };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCoffeeClick = async (e) => {
    e.preventDefault();
    setCoffeePop(true);
    try {
      const res = await fetch('/api/coffee-count', { method: 'POST' });
      const data = await res.json();
      if (typeof data.count === 'number') {
        setCoffeeCount(data.count);
      }
    } catch {}
  };

  useEffect(() => {
    if (!coffeePop) return;
    const id = setTimeout(() => setCoffeePop(false), 400);
    return () => clearTimeout(id);
  }, [coffeePop]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(alwaysShowBackToTop || window.scrollY > 400);
      setShowCoffee(alwaysShowCoffee || window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysShowCoffee, alwaysShowBackToTop]);

  return (
    <>
      <nav className={`nav-bar ${scrolled ? "scrolled" : ""} ${menuOpen ? "nav-bar--expanded" : ""}`}>
        <div className="nav-mobile-header">
          <a href="/" className="nav-left">
            <div className="nav-logo">R</div>
            <div className="nav-brand">RICHARD</div>
          </a>
          <button className="md:hidden nav-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, position: 'relative', zIndex: 210 }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="nav-mobile-menu">
            <div className="nav-mobile-menu-inner">
              <a href="/#work" className="nav-link" onClick={() => setMenuOpen(false)}>Work</a>
              <a href="/#what-i-can-do" className="nav-link" onClick={() => setMenuOpen(false)}>What I Can Do</a>
              <a href="/#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</a>
              <a href="/#awards" className="nav-link" onClick={() => setMenuOpen(false)}>Awards</a>
              <a href="/#trainings" className="nav-link" onClick={() => setMenuOpen(false)}>Experience</a>
              <a href="/#contact" className="nav-cta" style={{ textAlign: 'center' }} onClick={() => setMenuOpen(false)}>Hire Me</a>
            </div>
          </div>
        )}
        <div className="nav-center hidden md:flex">
          <a href="/#work" className="nav-link">Work</a>
          <a href="/#what-i-can-do" className="nav-link">What I Can Do</a>
          <a href="/#about" className="nav-link">About</a>
          <a href="/#awards" className="nav-link">Awards</a>
          <a href="/#trainings" className="nav-link">Trainings</a>
        </div>
        <div className="nav-right">
          <a href="/#contact" className="nav-cta hidden md:block">Hire Me</a>
        </div>
      </nav>

      {showBackToTop && !menuOpen && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <ArrowUp size={20} />
        </button>
      )}

      <a href="#" className={`coffee-btn${showCoffee ? " coffee-btn--visible" : ""}`} aria-label="Get me a coffee" onClick={handleCoffeeClick}>
        <span className="coffee-text">Get me a coffee</span>
        <img src="/images/gif/coffee.gif" alt="Coffee" className={`coffee-gif${coffeePop ? " coffee-gif--pop" : ""}`} />
        <span className="coffee-count">{coffeeLoading ? "..." : coffeeCount}</span>
      </a>
    </>
  );
}
