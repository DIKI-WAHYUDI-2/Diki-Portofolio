"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function TechnicalArchive({ projects = [], categories = [] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCategory = activeCategory === "ALL" || p.category === activeCategory;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [projects, query, activeCategory]);

  return (
    <section className="archive-section">
      <div className="archive-header">
        <div className="archive-header-left">
          <div className="work-eyebrow">ARCHIVE</div>
          <h2 className="archive-heading">Technical Projects</h2>
          <p className="archive-description">Browse the complete collection by category or technology.</p>
        </div>
        <div className="archive-header-right">
          <input
            type="text"
            className="archive-search"
            placeholder="Search projects, technologies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="archive-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`archive-filter-pill${activeCategory === category ? " archive-filter-pill--active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="archive-meta">
        <span className="archive-count">{filtered.length} project{filtered.length === 1 ? "" : "s"}</span>
      </div>

      <div className="archive-list">
        {filtered.map((project) => (
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
                {project.tech.map((t) => (
                  <span key={t} className="archive-tag">{t}</span>
                ))}
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
