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

export default function Work() {
  return (
    <main style={{ position: "relative" }}>
      <Header alwaysShowCoffee alwaysShowBackToTop />

      <FeaturedProjects projects={featured} />

      <TechnicalArchive
        projects={technical}
        categories={TECHNICAL_CATEGORIES}
      />

      <WorkCTA />
    </main>
  );
}
