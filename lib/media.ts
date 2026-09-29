import fs from "node:fs";
import path from "node:path";

export type MediaType = "image" | "video";

export interface MediaItem {
  /** File name on disk, e.g. "demo.mp4" */
  name: string;
  /** Friendly caption derived from the file name, e.g. "demo" */
  label: string;
  type: MediaType;
  /** URL served by app/api/media/[folder]/[file]/route.ts */
  url: string;
}

/** Every project folder lives in here: app/assets/<Folder>/<files> */
export const ASSETS_DIR = path.join(process.cwd(), "app", "assets");

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg"]);
const VIDEO_EXT = new Set([".mp4", ".webm", ".mov", ".m4v", ".ogv"]);

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

/**
 * Returns every image/video inside app/assets/<folder>, sorted naturally
 * (1.png, 2.png, 10.png). A missing folder returns [] instead of throwing,
 * so a project without media yet never breaks the page.
 */
export function getProjectMedia(folder?: string): MediaItem[] {
  if (!folder) return [];

  const safeFolder = path.basename(folder);
  let files: string[];
  try {
    files = fs.readdirSync(path.join(ASSETS_DIR, safeFolder));
  } catch {
    return [];
  }

  return files
    .filter((file) => !file.startsWith("."))
    .sort(collator.compare)
    .flatMap<MediaItem>((file) => {
      const ext = path.extname(file).toLowerCase();
      const type: MediaType | null = IMAGE_EXT.has(ext)
        ? "image"
        : VIDEO_EXT.has(ext)
          ? "video"
          : null;
      if (!type) return [];

      return [
        {
          name: file,
          label: path.basename(file, ext).replace(/[-_]+/g, " ").trim(),
          type,
          url: `/api/media/${encodeURIComponent(safeFolder)}/${encodeURIComponent(file)}`,
        },
      ];
    });
}