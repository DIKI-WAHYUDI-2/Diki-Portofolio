"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function TechnicalArchive({ projects = [] }) {
  return (
    <section className="archive-section">
      <div className="archive-header">
        <div className="archive-header-left">
          <div className="section-label">Archive</div>
          <div className="section-title">Technical Projects</div>
          <p className="archive-description">A complete collection of my technical work, systems, and digital projects.</p>
        </div>
      </div>

      <div className="archive-list">
        {projects.map((project) => (
          <Link
            key={project.num}
            href={project.link}
            className="archive-row"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="archive-row-num">{project.num}</span>
            <div className="archive-row-main">
              <div className="archive-row-title">{project.title}</div>
              <div className="archive-row-desc">{project.desc}</div>
              <div className="archive-row-tags">
                <span className="archive-row-category">{project.category}</span>
                <div className="archive-row-tech">
                  {project.tech.map((t) => (
                    <span key={t.name} className="archive-tag">{t.name} — {t.percentage}%</span>
                  ))}
                </div>
              </div>
            </div>
            <span className="archive-row-action">
              <ExternalLink size={16} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
