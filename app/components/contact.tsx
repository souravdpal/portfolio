import React from "react";
import { ContactForm } from "./contactform";
import { SocialLinks } from "./sociallinks";

export function Contact() {
  return (
    <section
      id="contact"
      className="contact scroll-mt-28 px-4 pt-24 pb-16 flex justify-center"
    >
      <div className="glass contact-card w-full max-w-2xl mx-auto p-6 sm:p-10 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 mb-4">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Open for freelance &amp; full-time roles • Late 2026
        </span>

        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Let&apos;s build something.
        </h2>
        <p className="mt-2 max-w-md text-sm sm:text-base text-white/70">
          Have a project, role, or idea in mind? Drop a note below and
          I&apos;ll get back to you soon.
        </p>

        <div className="mt-5 mb-7 flex justify-center">
          <SocialLinks />
        </div>

        <ContactForm />
      </div>
    </section>
  );
}