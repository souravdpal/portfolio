import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { ASSETS_DIR } from "../../../../../lib/media";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ folder: string; file: string }> };

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".m4v": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".ogv": "video/ogg",
};

const notFound = () => new Response("Not found", { status: 404 });

export async function GET(req: Request, { params }: Ctx) {
  const { folder, file } = await params;

  // Block path traversal and hidden files.
  const unsafe = [folder, file].some(
    (s) => !s || s.includes("/") || s.includes("\\") || s.includes("..") || s.startsWith(".")
  );
  if (unsafe) return notFound();

  const full = path.join(ASSETS_DIR, folder, file);
  if (!full.startsWith(ASSETS_DIR + path.sep)) return notFound();

  const type = MIME[path.extname(file).toLowerCase()];
  if (!type) return notFound();

  let size: number;
  try {
    const stat = await fsp.stat(full);
    if (!stat.isFile()) return notFound();
    size = stat.size;
  } catch {
    return notFound();
  }

  const baseHeaders = {
    "Content-Type": type,
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=3600",
  };

  // Range requests: required for video seeking, and for Safari/iOS to play video at all.
  const range = req.headers.get("range");
  const match = range ? /^bytes=(\d*)-(\d*)$/.exec(range) : null;
  if (match) {
    let start = match[1] ? parseInt(match[1], 10) : NaN;
    let end = match[2] ? parseInt(match[2], 10) : NaN;

    if (Number.isNaN(start)) {
      if (Number.isNaN(end)) return new Response(null, { status: 416 });
      start = Math.max(size - end, 0);
      end = size - 1;
    } else if (Number.isNaN(end) || end >= size) {
      end = size - 1;
    }

    if (start > end || start >= size) {
      return new Response(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${size}` },
      });
    }

    const stream = Readable.toWeb(fs.createReadStream(full, { start, end })) as unknown as ReadableStream;
    return new Response(stream, {
      status: 206,
      headers: {
        ...baseHeaders,
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Content-Length": String(end - start + 1),
      },
    });
  }

  const stream = Readable.toWeb(fs.createReadStream(full)) as unknown as ReadableStream;
  return new Response(stream, {
    status: 200,
    headers: { ...baseHeaders, "Content-Length": String(size) },
  });
}