"use client";

import React, { useRef, useState, useEffect } from "react";

export default function ThemeToggle({ className, style }) {
  const [dark, setDark] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [clipStyle, setClipStyle] = useState({});
  const buttonRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("theme");
      if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        setDark(true);
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = (e) => {
    if (animating) return;
    const next = !dark;
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    setAnimating(true);
    const targetBg = next ? "#0f1115" : "#D9DADD";
    setClipStyle({
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      pointerEvents: "none",
      background: targetBg,
      clipPath: `circle(0px at ${x}px ${y}px)`,
      transition: `clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1)`,
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setClipStyle((prev) => ({
          ...prev,
          clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
        }));
      });
    });

    setTimeout(() => {
      setDark(next);
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem("theme", next ? "dark" : "light");

      setTimeout(() => {
        setClipStyle({});
        setAnimating(false);
      }, 50);
    }, 500);
  };

  return (
    <>
      <button
        ref={buttonRef}
        className={className}
        onClick={toggleTheme}
        aria-label="Toggle theme"
        style={style}
      >
        <Sun className="icon-sun" size={18} />
        <Moon className="icon-moon" size={18} />
      </button>
      {animating && (
        <div className="theme-transition-circle" style={clipStyle} aria-hidden="true" />
      )}
    </>
  );
}
