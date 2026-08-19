"use client";

import React from "react";
import Header from "../../components/Header";
import FeaturedProjects from "../../components/FeaturedProjects";
import TechnicalArchive from "../../components/TechnicalArchive";
import WorkCTA from "../../components/WorkCTA";
import { PROJECTS, TECHNICAL_CATEGORIES } from "../../lib/projects";

const featuredIds = ["02", "03", "01", "04"];
const featured = PROJECTS.filter((p) => featuredIds.includes(p.num));
const technical = PROJECTS.filter((p) => !p.category.includes("Digital"));

const stats = [
  { label: "Technical Projects", value: "21" },
  { label: "Digital Projects", value: "5" },
  { label: "Award-Winning Systems", value: "2" },
];

export default function Work() {
  return (
    <main style={{ position: "relative" }}>
      <Header alwaysShowCoffee alwaysShowBackToTop />

      <section className="work-section-intro">
        <div className="work-section-intro-inner">
          <div className="work-eyebrow">TECHNICAL WORK</div>
          <h1 className="work-heading">
            Projects built to solve real problems.
          </h1>
          <p className="work-description">
            A collection of systems, applications, databases, and experiments developed through academic work, internships, and independent projects.
          </p>
          <div className="work-stats">
            {stats.map((stat, i) => (
              <div key={i} className="work-stat">
                <div className="work-stat-value">{stat.value}</div>
                <div className="work-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProjects projects={featured} />

      <TechnicalArchive
        projects={technical}
        categories={TECHNICAL_CATEGORIES}
      />

      <WorkCTA />
    </main>
  );
}
