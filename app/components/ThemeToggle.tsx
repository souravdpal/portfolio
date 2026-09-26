'use client'

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../components/context_theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      aria-pressed={theme === "dark"}
    >
      <span className={`toggle-track ${theme}`}>
        <Sun size={13} strokeWidth={2} className="toggle-icon toggle-icon--sun" />
        <Moon size={13} strokeWidth={2} className="toggle-icon toggle-icon--moon" />
        <span className="toggle-thumb" />
      </span>
    </button>
  );
}