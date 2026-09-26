import React from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS } from "./projects";

export function Work() {
  return (
    <section id="work" className="work">
      <div className="section-head">
        <h2>Selected work</h2>
        <p>A handful of products shipped end to end, from first sketch to production.</p>
      </div>

      <div className="project-grid">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <a
        href="https://github.com/souravdpal"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-ghost view-all"
      >
        More on GitHub
        <ArrowUpRight size={16} className="btn-icon" />
      </a>
    </section>
  );
}