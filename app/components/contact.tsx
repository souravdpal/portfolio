import React from "react";
import { ContactForm } from "./contactform";
import { SocialLinks } from "./sociallinks";

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="glass contact-card">
        <h2>Let's build something.</h2>
        <p>Open to freelance and full-time roles for late 2026.</p>

        <SocialLinks />
        <ContactForm />
      </div>
    </section>
  );
}