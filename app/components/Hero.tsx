import React from "react";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="glass hero-card">
        <p className="eyebrow">Full-stack developer, building AI that feels present</p>
        <h1>
          I build software that <em>remembers it's talking to someone.</em>
        </h1>
        <p className="hero-copy">
          Based in Delhi. Most of what I ship are autonomous agents and companion
          AI — the kind of software people come back to talk to, not just use.
        </p>
        <div className="hero-buttons">
          <a className="btn-primary" href="#work">
            See the work
            <ArrowUpRight size={16} className="btn-icon" />
          </a>
          <a className="btn-ghost" href="#about">
            About me
          </a>
        </div>
      </div>
    </section>
  );
}