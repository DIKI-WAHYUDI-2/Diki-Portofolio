"use client";

import React from "react";
import Header from "../../components/Header";
import TechnicalArchive from "../../components/TechnicalArchive";
import WorkCTA from "../../components/WorkCTA";
import { PROJECTS } from "../../lib/projects";

const technical = PROJECTS.filter((p) => !p.category.includes("Digital"));

export default function Work() {
  return (
    <main style={{ position: "relative" }}>
      <Header alwaysShowCoffee alwaysShowBackToTop />

      <TechnicalArchive projects={technical} />

      <WorkCTA />
    </main>
  );
}
