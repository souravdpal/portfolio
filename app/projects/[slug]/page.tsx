import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, ImageOff } from "lucide-react";

import { ThemeProvider } from "../../components/context_theme";
import { AuroraBackground } from "../../components/Aurorabackground";
import { Navbar } from "../../components/nav";
import { Footer } from "../../components/footer";
import { SiteStyles } from "../../components/sitestyles";
import { MediaStyles } from "../../components/mediastyles";
import { MediaGallery } from "../../components/mediaGallery";
import { GithubIcon } from "../../components/icons";
import { PROJECTS, getProjectBySlug, getProjectSlug } from "../../components/projects";
import { getProjectMedia } from "../../../lib/media";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: getProjectSlug(p) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return project
    ? { title: `${project.title} — Sourav`, description: project.description }
    : { title: "Project not found" };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const media = getProjectMedia(project.prof_pic);
  const index = PROJECTS.indexOf(project);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const showPager = PROJECTS.length > 1;
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <ThemeProvider>
      <AuroraBackground />
      <Navbar />
      <main className="project-main">
        <Link href="/#work" className="back-link">
          <ArrowLeft size={16} />
          All work
        </Link>

        <header className="glass project-hero">
          <h1>{project.title}</h1>
          <p className="project-lead">{project.description}</p>

          <div className="tag-row">
            {project.tags.filter(Boolean).map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          {(project.siteUrl || project.repoUrl) && (
            <div className="project-actions">
              {project.siteUrl && (
                <a className="btn-primary" href={project.siteUrl} target="_blank" rel="noopener noreferrer">
                  Visit site
                  <ArrowUpRight size={16} className="btn-icon" />
                </a>
              )}
              {project.repoUrl && (
                <a className="btn-ghost" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <GithubIcon size={16} />
                  Source code
                </a>
              )}
            </div>
          )}
        </header>

        {project.prof_pic && (
          <section className="media-section" aria-labelledby="gallery-title">
            <div className="section-head">
              <h2 id="gallery-title">Gallery</h2>
            </div>

            {media.length > 0 ? (
              <MediaGallery items={media} title={project.title} />
            ) : (
              <div className="glass project-empty">
                <ImageOff size={28} />
                <h3>No media yet</h3>
                <p>
                  {isDev ? (
                    <>
                      Add images or videos to <code>app/assets/{project.prof_pic}/</code> and refresh.
                    </>
                  ) : (
                    "Screenshots and demos for this project are coming soon."
                  )}
                </p>
              </div>
            )}
          </section>
        )}

        {showPager && (
          <nav className="project-pager" aria-label="More projects">
            <Link href={`/projects/${getProjectSlug(prev)}`} className="glass pager-link">
              <span className="pager-label">
                <ArrowLeft size={14} />
                Previous
              </span>
              <span className="pager-title">{prev.title}</span>
            </Link>
            <Link href={`/projects/${getProjectSlug(next)}`} className="glass pager-link pager-link--next">
              <span className="pager-label">
                Next
                <ArrowRight size={14} />
              </span>
              <span className="pager-title">{next.title}</span>
            </Link>
          </nav>
        )}
      </main>
      <Footer />
      <SiteStyles />
      <MediaStyles />
    </ThemeProvider>
  );
}