"use client";

import React from "react";
import Link from "next/link";

export default function WorkCTA() {
  return (
    <section className="work-cta">
      <div className="work-cta-inner">
        <div className="work-cta-eyebrow">HAVE A PROJECT IN MIND?</div>

        <div className="work-cta-main">
          <h2 className="work-cta-heading">Let&apos;s build something useful.</h2>
          <Link href="#contact" className="work-cta-button">
            Hire Me →
          </Link>
        </div>

        <div className="work-cta-meta">
          <span>RICHARD M. · TECHNICAL · DIGITAL · CREATIVE</span>
          <span>20+ PROJECTS · 2026</span>
        </div>
      </div>
    </section>
  );
}
