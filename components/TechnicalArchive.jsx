"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import TypewriterTitle from "./TypewriterTitle";
import Reveal from "./Reveal";

const TECH_LOGOS = {
  "Python Django": "/images/logos/django.png",
  "PHP": "/images/logos/php.png",
  "MySQL": "/images/logos/mysql.png",
  "HTML": "/images/logos/html.png",
  "CSS": "/images/logos/css.png",
  "JavaScript": "/images/logos/js.png",
  "CodeIgniter 4": "/images/logos/codeigniter.png",
  "Python": "/images/logos/python.png",
  "Flask": "/images/logos/flask.png",
  "Laravel": "/images/logos/laravel.png",
  "Spring Boot": "/images/logos/springboot.png",
  "NextJs": "/images/logos/next.png",
  "PostgreSQL": "/images/logos/postgresql.png",
  "Figma": "/images/logos/figma.png",
  "Docker": "/images/logos/docker.png",
  "Flutter": "/images/logos/flutter.png",
};

function TechTag({ tech }) {
  const logo = TECH_LOGOS[tech];
  if (logo) {
    return (
      <span className="archive-tag">
        <img src={logo} alt={tech} className="archive-tag-img" />
      </span>
    );
  }
  return <span className="archive-tag">{tech}</span>;
}

export default function TechnicalArchive({ projects = [] }) {
  return (
    <section className="archive-section" id="technical">
      <Reveal>
        <div className="archive-header">
          <div className="archive-header-left">
            <div className="section-label">Archive</div>
            <TypewriterTitle text="Technical Projects" />
            <p className="archive-description">
              A complete collection of my technical work, systems, and digital
              projects.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="archive-list">
          {projects.map((project) => (
            <div key={project.num} className="archive-row">
              <span className="archive-row-num">{project.num}</span>

              <div className="archive-row-main">
                <div className="archive-row-title">{project.title}</div>

                <div className="archive-row-desc">{project.desc}</div>

                <div className="archive-row-tags">
                  <span className="archive-row-category">
                    {project.category}
                  </span>

                  <div className="archive-row-tech">
                    {project.tech.map((t) => (
                      <TechTag key={t} tech={t} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="archive-row-action">
                {project.links?.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    className="archive-row-link"
                    target="_blank"
                    rel="noopener noreferrer">
                    {link.text}
                    <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
