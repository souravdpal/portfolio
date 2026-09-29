export interface Project {
  title: string;
  description: string;
  tags: string[];
  /** Optional: link to the deployed/live version. Shown as a "Visit site" button. */
  siteUrl?: string;
  /** Optional: link to the source repo. Shown as a small icon-only chip. */
  repoUrl?: string;
  /**
   * Optional: name of the folder inside app/assets/ that holds this project's
   * images and videos. Case-sensitive. Comment it out to hide the gallery.
   */
  prof_pic?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Aiova",
    description:
      "An AI × human metaverse where AI characters come alive and hold real conversations — bring anyone into a living, social space.",
    tags: ["AI integration", "WebSockets", "Python", "SQL", "MongoDB", "Firebase"],
    repoUrl: "https://github.com/souravdpal/space_verse",
    prof_pic: "Aiova",
    // siteUrl: "https://your-deployed-site.com",
  },
  {
    title: "Hina AI",
    description:
      "A high-performance autonomous agent that controls your PC, manages music, and researches the web in real time, routing between local systems and LLMs through a custom intent guard.",
    tags: ["Shell", "EJS", "Python", "SQL", "Linux", "Docker", "MCP", "RPC", "Selenium"],
    repoUrl: "https://github.com/souravdpal/HINA-prod",
    prof_pic: "Hina",
    // siteUrl: "https://your-deployed-site.com",
  },
  {
    title: "SelfHelo",
    description:
      "A safe space for people who feel lonely or stuck — an emotionally intelligent AI companion for journaling, mood tracking, and support.",
    tags: ["Python", "MongoDB", "Groq"],
    repoUrl: "https://github.com/souravdpal/improve",
    prof_pic: "SelfHelo",
    // siteUrl: "https://your-deployed-site.com",
  },
  {
    title: "BuyMore",
    description:
      "A modern, secure, and highly flexible e-commerce platform built with Next.js, featuring an integrated AI-driven recommendation and decision-making engine. Designed for performance and intelligent user experiences.",
    tags: ["Python", "PostgreSql", "Auth System", "Next-JS 16", "Tailwind"],
    repoUrl: "https://github.com/souravdpal/improve",
    // prof_pic: "BuyMore",
    // siteUrl: "https://your-deployed-site.com",
  },
];

/** "Hina AI" -> "hina-ai" (used in /projects/hina-ai) */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProjectSlug(project: Project): string {
  return slugify(project.title);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => getProjectSlug(p) === slug);
}

// Add `siteUrl` to any project above once it has a live deployment —
// ProjectCard will automatically show a "Visit site" button for it.