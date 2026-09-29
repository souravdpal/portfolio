'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";

// "/#section" works from the home page AND from /projects/[slug].
const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <Link className="brand" href="/">
        Sourav
      </Link>

      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        <ThemeToggle />
        <Link className="cta" href="/#contact">
          Say hello
        </Link>
      </div>
    </nav>
  );
}