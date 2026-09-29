import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons";
import { getProjectSlug, type Project } from "./projects";
import { getProjectMedia } from "../../lib/media";

export function ProjectCard({ project }: { project: Project }) {
  const slug = getProjectSlug(project);
  const media = getProjectMedia(project.prof_pic);
  const cover = media.find((m) => m.type === "image");
  const photos = media.filter((m) => m.type === "image").length;
  const videos = media.length - photos;

  return (
    <article className="glass project-card">
      {cover && (
        <div className="project-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover.url} alt="" loading="lazy" decoding="async" />
          <span className="project-cover-count">
            {photos > 0 && `${photos} photo${photos > 1 ? "s" : ""}`}
            {photos > 0 && videos > 0 && ", "}
            {videos > 0 && `${videos} video${videos > 1 ? "s" : ""}`}
          </span>
        </div>
      )}

      <div className="project-card-head">
        <h3>
          {/* Stretched link: the ::after overlay makes the whole card clickable */}
          <Link href={`/projects/${slug}`} className="project-title-link">
            {project.title}
          </Link>
        </h3>
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
        {project.tags.filter(Boolean).map((tag) => (
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

      <span className="project-more" aria-hidden="true">
        View project
        <ArrowUpRight size={15} className="btn-icon" />
      </span>
    </article>
  );
}