"use client";

import React from "react";

export default function DigitalGallery({ projects = [] }) {
  const [hero, ...rest] = projects;

  return (
    <section className="digital-section">
      <div className="digital-header">
        <div className="section-label">Digital Projects</div>
        <div className="section-title">Beyond Code</div>
        <div className="section-desc">
          Creative, visual, content, and digital projects developed alongside my technical work.
        </div>
      </div>

      {hero && (
        <div className="digital-card digital-card--hero">
          <div className="digital-image-wrap digital-image-wrap--hero">
            <img src={hero.image} alt={hero.title} className="digital-image" />
          </div>
          <div className="digital-content">
            <h3 className="digital-title">{hero.title}</h3>
            <p className="digital-desc">{hero.desc}</p>
          </div>
        </div>
      )}

      <div className="digital-grid">
        {rest.map((project) => (
          <div
            key={project.num}
            className="digital-card"
          >
            <div className="digital-image-wrap">
              <img src={project.image} alt={project.title} className="digital-image" />
            </div>
            <div className="digital-content">
              <h3 className="digital-title">{project.title}</h3>
              <p className="digital-desc">{project.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
