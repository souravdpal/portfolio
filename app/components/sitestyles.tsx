import React from "react";

/** Rendered once at the page root. Every other component just uses these classes. */
export function SiteStyles() {
  return (
    <style>{`
      :root {
        --radius-lg: 24px;
        --radius-md: 16px;
        --radius-sm: 10px;
      }

      * { box-sizing: border-box; }

      .page {
        min-height: 100vh;
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        position: relative;
        overflow-x: hidden;
        transition: background-color 0.4s ease, color 0.4s ease;
      }

      h1, h2, h3, .brand, .eyebrow {
        font-family: "Space Grotesk", "Inter", sans-serif;
      }

      /* ---------- THEME TOKENS ---------- */
      .theme-dark {
        background: #0a0d16;
        color: #eef1f8;
        --glass-bg: rgba(255, 255, 255, 0.06);
        --glass-border: rgba(255, 255, 255, 0.14);
        --glass-shadow: rgba(0, 0, 0, 0.45);
        --muted: rgba(238, 241, 248, 0.65);
        --accent: #8fa4ff;
        --accent-strong: #6e8cff;
        --track-bg: linear-gradient(135deg, #2a2f45, #1c2033);
        --input-bg: rgba(255, 255, 255, 0.05);
      }

      .theme-light {
        background: #f4f5f9;
        color: #12131a;
        --glass-bg: rgba(255, 255, 255, 0.55);
        --glass-border: rgba(255, 255, 255, 0.8);
        --glass-shadow: rgba(30, 41, 82, 0.12);
        --muted: rgba(18, 19, 26, 0.62);
        --accent: #4d5fd1;
        --accent-strong: #3b4bc4;
        --track-bg: linear-gradient(135deg, #dfe4f7, #eef0fb);
        --input-bg: rgba(255, 255, 255, 0.6);
      }

      /* ---------- AURORA BACKGROUND ---------- */
      .aurora {
        position: fixed;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
      }

      .blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(90px);
        opacity: 0.55;
        will-change: transform;
      }

      .theme-dark .blob-a { background: #5b6ee8; width: 46vw; height: 46vw; top: -12vw; left: -8vw; animation: drift-a 22s ease-in-out infinite; }
      .theme-dark .blob-b { background: #9b5de5; width: 38vw; height: 38vw; top: 20vh; right: -10vw; animation: drift-b 26s ease-in-out infinite; }
      .theme-dark .blob-c { background: #2fd9c6; width: 34vw; height: 34vw; bottom: -14vw; left: 20vw; animation: drift-c 30s ease-in-out infinite; opacity: 0.35; }

      .theme-light .blob-a { background: #b9c6ff; width: 46vw; height: 46vw; top: -12vw; left: -8vw; animation: drift-a 22s ease-in-out infinite; opacity: 0.6; }
      .theme-light .blob-b { background: #f3c4e8; width: 38vw; height: 38vw; top: 20vh; right: -10vw; animation: drift-b 26s ease-in-out infinite; opacity: 0.55; }
      .theme-light .blob-c { background: #c3f2e6; width: 34vw; height: 34vw; bottom: -14vw; left: 20vw; animation: drift-c 30s ease-in-out infinite; opacity: 0.5; }

      @keyframes drift-a {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(6vw, 8vh) scale(1.08); }
      }
      @keyframes drift-b {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-5vw, 6vh) scale(1.05); }
      }
      @keyframes drift-c {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(4vw, -6vh) scale(1.1); }
      }

      .grain {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
        background-size: 3px 3px;
        mix-blend-mode: overlay;
      }

      @media (prefers-reduced-motion: reduce) {
        .blob { animation: none !important; }
      }

      /* ---------- GLASS ---------- */
      .glass {
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        backdrop-filter: blur(24px) saturate(160%);
        -webkit-backdrop-filter: blur(24px) saturate(160%);
        box-shadow: 0 8px 32px var(--glass-shadow);
        border-radius: var(--radius-lg);
      }

      /* ---------- NAVBAR ---------- */
      .navbar {
        position: fixed;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        width: min(920px, calc(100% - 32px));
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        padding: 12px 20px;
        border-radius: 999px;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        backdrop-filter: blur(20px) saturate(160%);
        -webkit-backdrop-filter: blur(20px) saturate(160%);
        box-shadow: 0 6px 24px var(--glass-shadow);
        transition: box-shadow 0.3s ease, padding 0.3s ease;
      }

      .navbar--scrolled { box-shadow: 0 10px 36px var(--glass-shadow); }

      .brand {
        font-weight: 600;
        font-size: 1.05rem;
        text-decoration: none;
        color: inherit;
        letter-spacing: -0.01em;
      }

      .nav-links { display: flex; gap: 22px; list-style: none; margin: 0; padding: 0; }
      .nav-links a { text-decoration: none; color: var(--muted); font-size: 0.92rem; transition: color 0.2s ease; }
      .nav-links a:hover { color: inherit; }

      .nav-actions { display: flex; align-items: center; gap: 14px; }

      /* ---------- THEME TOGGLE ---------- */
      .theme-toggle { background: none; border: none; cursor: pointer; padding: 0; line-height: 0; }

      .toggle-track {
        position: relative;
        display: flex;
        align-items: center;
        width: 52px;
        height: 28px;
        border-radius: 999px;
        padding: 0 7px;
        background: var(--track-bg);
        border: 1px solid var(--glass-border);
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.25);
        transition: background 0.35s ease;
      }

      .toggle-icon { position: relative; z-index: 1; color: var(--muted); transition: color 0.35s ease, opacity 0.35s ease; }
      .toggle-icon--sun { margin-right: auto; }
      .toggle-icon--moon { margin-left: auto; }

      .toggle-track.dark .toggle-icon--moon { color: #ffd76a; }
      .toggle-track.dark .toggle-icon--sun { opacity: 0.35; }
      .toggle-track.light .toggle-icon--sun { color: #e08a2c; }
      .toggle-track.light .toggle-icon--moon { opacity: 0.35; }

      .toggle-thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: linear-gradient(160deg, #ffffff, #d8dcf0);
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        transition: transform 0.35s cubic-bezier(0.65, 0, 0.35, 1);
      }

      .toggle-track.dark .toggle-thumb {
        transform: translateX(24px);
        background: linear-gradient(160deg, #3a3f57, #21243a);
      }

      .cta {
        text-decoration: none;
        font-size: 0.88rem;
        font-weight: 600;
        padding: 8px 16px;
        border-radius: 999px;
        background: var(--accent-strong);
        color: #fff;
        white-space: nowrap;
        transition: filter 0.2s ease, transform 0.2s ease;
      }
      .cta:hover { filter: brightness(1.12); transform: translateY(-1px); }

      /* ---------- LAYOUT ---------- */
      main { position: relative; z-index: 1; max-width: 1040px; margin: 0 auto; padding: 140px 24px 40px; }
      section { margin-bottom: 96px; }

      .hero-card { padding: clamp(32px, 6vw, 64px); }

      .eyebrow { margin: 0 0 14px; font-size: 0.85rem; color: var(--muted); }

      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.4rem);
        line-height: 1.12;
        margin: 0 0 20px;
        font-weight: 600;
        letter-spacing: -0.02em;
        max-width: 20ch;
      }
      .hero h1 em { font-style: normal; color: var(--accent); }

      .hero-copy { max-width: 52ch; color: var(--muted); font-size: 1.05rem; line-height: 1.6; margin: 0 0 32px; }

      .hero-buttons { display: flex; gap: 14px; flex-wrap: wrap; }

      /* ---------- BUTTONS ---------- */
      .btn-primary, .btn-ghost {
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
        padding: 12px 22px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        border: none;
        font-family: inherit;
      }

      .btn-icon { transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }

      .btn-primary {
        background: var(--accent-strong);
        color: #fff;
        box-shadow: 0 4px 18px rgba(110, 140, 255, 0.35);
        transition: filter 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
      }
      .btn-primary:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(110, 140, 255, 0.45); }
      .btn-primary:hover .btn-icon { transform: translate(3px, -3px); }
      .btn-primary:active { transform: translateY(0); }
      .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

      .btn-ghost {
        color: inherit;
        border: 1px solid var(--glass-border);
        background: rgba(128,128,128,0.08);
        transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
      }
      .btn-ghost:hover { background: rgba(128,128,128,0.18); border-color: var(--accent); transform: translateY(-2px); }
      .btn-ghost:hover .btn-icon { transform: translate(3px, -3px); }

      .view-all { margin-top: 24px; font-size: 0.9rem; padding: 10px 18px; }

      .section-head { margin-bottom: 28px; }
      .section-head h2 { font-size: 1.7rem; margin: 0 0 8px; font-weight: 600; }
      .section-head p { color: var(--muted); margin: 0; }

      /* ---------- PROJECT CARDS ---------- */
      .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }

      .project-card {
        padding: 26px;
        color: inherit;
        transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
      }
      .project-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px var(--glass-shadow); border-color: var(--accent); }

      .project-card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
      .project-card h3 { margin: 0; font-size: 1.15rem; }

      .project-icon-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        color: #181717;
        background: #eef0f3;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;
      }
      .project-icon-link:hover { color: #fff; background: var(--accent-strong); transform: rotate(8deg); }

      .project-card p { margin: 0 0 18px; color: var(--muted); font-size: 0.92rem; line-height: 1.55; }

      .tag-row { display: flex; gap: 8px; flex-wrap: wrap; }
      .tag { font-size: 0.75rem; padding: 4px 10px; border-radius: 999px; background: rgba(128,128,128,0.15); color: var(--muted); }

      .project-site-link { margin-top: 16px; font-size: 0.85rem; padding: 8px 16px; width: 100%; justify-content: center; }

      .about-card, .contact-card { padding: clamp(28px, 5vw, 48px); }
      .about-card p, .contact-card p { color: var(--muted); line-height: 1.65; max-width: 64ch; }

      .contact-card h2 { margin-bottom: 10px; }

      /* ---------- SOCIAL ROW ---------- */
      .social-row { display: flex; gap: 10px; margin: 20px 0 28px; }
      .social-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        color: var(--muted);
        background: rgba(128,128,128,0.1);
        border: 1px solid var(--glass-border);
        transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;
      }
      .social-link:hover { color: #fff; background: var(--accent-strong); transform: translateY(-2px); }

      /* ---------- CONTACT FORM ---------- */
      .contact-form { display: flex; flex-direction: column; gap: 16px; max-width: 460px; }

      .form-row { display: flex; flex-direction: column; gap: 6px; }
      .form-row label { font-size: 0.82rem; color: var(--muted); }

      .form-row input, .form-row textarea {
        font-family: inherit;
        font-size: 0.95rem;
        color: inherit;
        background: var(--input-bg);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-sm);
        padding: 10px 14px;
        resize: vertical;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .form-row input::placeholder, .form-row textarea::placeholder { color: var(--muted); }
      .form-row input:focus, .form-row textarea:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(110, 140, 255, 0.2);
      }

      .contact-form .btn-primary { align-self: flex-start; }

      .form-status { margin: 0; font-size: 0.85rem; }
      .form-status--ok { color: #35d68a; }
      .form-status--err { color: #ff8080; }

      .footer { position: relative; z-index: 1; text-align: center; padding: 28px 24px 40px; color: var(--muted); font-size: 0.85rem; }

      @media (max-width: 720px) {
        .nav-links { display: none; }
        .navbar { border-radius: var(--radius-md); }
      }
    `}</style>
  );
}