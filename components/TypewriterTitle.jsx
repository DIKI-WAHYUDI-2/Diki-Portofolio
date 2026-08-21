"use client";

import React, { useEffect, useState } from "react";

export default function TypewriterTitle({ text, speed = 55, className = "", ...props }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let index = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayed(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <div
      ref={ref}
      className={`section-title typewriter-title ${className}`}
      {...props}
    >
      <span className="typewriter-text" style={{ whiteSpace: "pre-line" }}>{displayed}</span>
      {started && <span className="typewriter-cursor">|</span>}
    </div>
  );
}
