import React from "react";

export function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Sourav. Built with Next.js.</p>
    </footer>
  );
}