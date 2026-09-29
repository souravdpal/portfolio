import React from "react";

/**
 * Extra styles for project cards (cover + click), the project page, the gallery
 * and the lightbox. Render it right AFTER <SiteStyles /> so these rules win ties.
 */
export function MediaStyles() {
  return (
    <style>{`
      /* ---------- PROJECT CARD (clickable + cover) ---------- */
      .project-card { position: relative; overflow: hidden; display: flex; flex-direction: column; }

      .project-title-link { color: inherit; text-decoration: none; }
      .project-title-link::after { content: ""; position: absolute; inset: 0; z-index: 1; }
      .project-title-link:focus-visible { outline: none; }
      .project-card:has(.project-title-link:focus-visible) { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(110, 140, 255, 0.35); }

      /* real links inside the card stay clickable above the overlay */
      .project-icon-link, .project-site-link { position: relative; z-index: 2; }

      .project-cover {
        position: relative;
        margin: -26px -26px 20px;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        background: var(--track-bg);
      }
      .project-cover img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
      .project-card:hover .project-cover img { transform: scale(1.04); }
      .project-cover-count {
        position: absolute; left: 12px; bottom: 12px;
        font-size: 0.72rem; padding: 4px 10px; border-radius: 999px;
        color: #fff; background: rgba(8, 10, 18, 0.6);
        backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      }

      .project-more {
        margin-top: auto; padding-top: 18px;
        display: inline-flex; align-items: center; gap: 4px;
        font-size: 0.85rem; font-weight: 600; color: var(--accent);
      }
      .project-card:hover .project-more .btn-icon { transform: translate(3px, -3px); }

      /* ---------- PROJECT PAGE ---------- */
      .project-main { max-width: 1040px; }

      .back-link {
        display: inline-flex; align-items: center; gap: 6px;
        margin-bottom: 20px; font-size: 0.9rem;
        color: var(--muted); text-decoration: none;
        transition: color 0.2s ease, transform 0.2s ease;
      }
      .back-link:hover { color: var(--accent); transform: translateX(-3px); }

      .project-hero { padding: clamp(28px, 5vw, 56px); margin-bottom: 48px; }
      .project-hero h1 {
        font-size: clamp(2rem, 5.5vw, 3.2rem);
        line-height: 1.1; margin: 0 0 16px;
        font-weight: 600; letter-spacing: -0.02em;
        overflow-wrap: anywhere;
      }
      .project-lead { color: var(--muted); font-size: clamp(1rem, 1.6vw, 1.1rem); line-height: 1.65; max-width: 62ch; margin: 0 0 22px; }
      .project-hero .tag-row { margin-bottom: 28px; }
      .project-actions { display: flex; gap: 12px; flex-wrap: wrap; }

      .media-section { margin-bottom: 56px; }

      .project-empty { padding: clamp(28px, 5vw, 44px); text-align: center; color: var(--muted); }
      .project-empty h3 { margin: 12px 0 6px; color: inherit; font-size: 1.1rem; }
      .project-empty p { margin: 0 auto; max-width: 46ch; line-height: 1.6; font-size: 0.92rem; }
      .project-empty code { font-size: 0.85em; padding: 2px 6px; border-radius: 6px; background: rgba(128,128,128,0.18); }

      .project-pager { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      .pager-link {
        display: flex; flex-direction: column; gap: 4px; padding: 20px 24px;
        color: inherit; text-decoration: none; min-width: 0;
        transition: transform 0.25s ease, border-color 0.25s ease;
      }
      .pager-link:hover { transform: translateY(-3px); border-color: var(--accent); }
      .pager-link--next { text-align: right; align-items: flex-end; grid-column: 2; }
      .pager-label { display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; color: var(--muted); }
      .pager-title { font-family: "Space Grotesk", "Inter", sans-serif; font-weight: 600; font-size: 1.1rem; overflow-wrap: anywhere; }

      /* ---------- GALLERY ---------- */
      .media-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; margin-bottom: 18px; }
      .media-summary { margin: 0; color: var(--muted); font-size: 0.92rem; }

      .media-tabs {
        display: inline-flex; gap: 4px; padding: 4px; border-radius: 999px;
        background: var(--glass-bg); border: 1px solid var(--glass-border);
      }
      .media-tab {
        font: inherit; font-size: 0.85rem; font-weight: 600;
        padding: 7px 16px; border-radius: 999px; border: none; cursor: pointer;
        color: var(--muted); background: transparent;
        transition: background 0.2s ease, color 0.2s ease;
      }
      .media-tab:hover { color: inherit; }
      .media-tab[aria-pressed="true"] { background: var(--accent-strong); color: #fff; }

      .media-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        grid-auto-rows: clamp(150px, 20vw, 220px);
        grid-auto-flow: dense;
        gap: 14px;
      }

      .media-tile {
        position: relative; padding: 0; overflow: hidden; cursor: zoom-in;
        border-radius: var(--radius-md);
        border: 1px solid var(--glass-border);
        background: var(--track-bg);
        box-shadow: 0 6px 20px var(--glass-shadow);
        transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
      }
      .media-tile:hover { transform: translateY(-3px); border-color: var(--accent); box-shadow: 0 14px 34px var(--glass-shadow); }
      .media-tile:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
      .media-tile--feature { grid-column: span 2; grid-row: span 2; }

      .media-tile img, .media-tile video {
        position: absolute; inset: 0; width: 100%; height: 100%;
        object-fit: cover; display: block; transition: transform 0.5s ease;
      }
      .media-tile:hover img, .media-tile:hover video { transform: scale(1.05); }

      .media-play {
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
        width: 52px; height: 52px; border-radius: 50%;
        display: inline-flex; align-items: center; justify-content: center;
        color: #fff; background: rgba(8, 10, 18, 0.55);
        border: 1px solid rgba(255, 255, 255, 0.35);
        backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      }
      .media-play svg { margin-left: 2px; }

      .media-caption {
        position: absolute; left: 0; right: 0; bottom: 0;
        padding: 28px 14px 10px; text-align: left;
        font-size: 0.8rem; color: #fff;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        background: linear-gradient(to top, rgba(8, 10, 18, 0.7), transparent);
        opacity: 0; transition: opacity 0.25s ease;
      }
      .media-tile:hover .media-caption, .media-tile:focus-visible .media-caption { opacity: 1; }
      @media (hover: none) { .media-caption { opacity: 1; } }

      /* ---------- LIGHTBOX ---------- */
      .lightbox {
        position: fixed; inset: 0; z-index: 100;
        display: flex; flex-direction: column;
        background: rgba(6, 8, 14, 0.93);
        backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
        animation: lb-in 0.2s ease;
      }
      @keyframes lb-in { from { opacity: 0; } to { opacity: 1; } }

      .lightbox-bar {
        display: flex; align-items: center; gap: 12px;
        padding: max(12px, env(safe-area-inset-top)) 16px 12px;
        color: #eef1f8; font-size: 0.9rem;
      }
      .lightbox-count { font-variant-numeric: tabular-nums; }
      .lightbox-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(238, 241, 248, 0.65); }

      .lightbox-btn {
        flex: none; width: 42px; height: 42px; border-radius: 50%;
        display: inline-flex; align-items: center; justify-content: center;
        color: #fff; cursor: pointer;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: background 0.2s ease;
      }
      .lightbox-btn:hover { background: var(--accent-strong); }
      .lightbox-btn:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }

      .lightbox-stage {
        position: relative; flex: 1; min-height: 0; overflow: hidden;
        display: flex; align-items: center; justify-content: center;
        padding: 0 72px max(16px, env(safe-area-inset-bottom));
      }
      .lightbox-media {
        max-width: 100%; max-height: 100%;
        object-fit: contain; border-radius: var(--radius-sm);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        background: #000;
      }
      .lightbox-nav { position: absolute; top: 50%; transform: translateY(-50%); z-index: 2; }
      .lightbox-nav--prev { left: 16px; }
      .lightbox-nav--next { right: 16px; }

      /* ---------- RESPONSIVE ---------- */
      @media (max-width: 720px) {
        .project-pager { grid-template-columns: 1fr; }
        .pager-link--next { grid-column: 1; }
      }

      @media (max-width: 560px) {
        .project-cover { margin: -26px -26px 18px; }
        .media-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 34vw; gap: 10px; }
        .media-tile--feature { grid-column: span 2; grid-row: span 1; }
        .media-tabs { width: 100%; }
        .media-tab { flex: 1; }

        .lightbox-stage { padding: 0 12px calc(76px + env(safe-area-inset-bottom)); }
        .lightbox-nav { top: auto; bottom: calc(16px + env(safe-area-inset-bottom)); transform: none; }
        .lightbox-nav--prev { left: calc(50% - 52px); }
        .lightbox-nav--next { right: calc(50% - 52px); }
      }

      @media (prefers-reduced-motion: reduce) {
        .lightbox { animation: none; }
        .media-tile, .media-tile img, .media-tile video, .project-cover img { transition: none; }
      }
    `}</style>
  );
}