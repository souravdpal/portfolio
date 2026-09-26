import React from "react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons";
import type { Project } from "./projects";

export function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="glass project-card">
            <div className="project-card-head">
                <h3>{project.title}</h3>
                {project.repoUrl && (
                    <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-icon-link"
                        aria-label={`Open ${project.title} on GitHub`}
                    >
                        <GithubIcon size={16} />
                    </a>
                )}
            </div>

            <p>{project.description}</p>

            <div className="tag-row">
                {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                        {tag}
                    </span>
                ))}
            </div>

            {project.siteUrl && (
                <a
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost project-site-link"
                >
                    Visit site
                    <ArrowUpRight size={15} className="btn-icon" />
                </a>
            )}
        </div>
    );
}