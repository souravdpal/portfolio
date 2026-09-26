'use client'

import React, { useState } from "react";
import { Send } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="contact-form translate-x-33 ml-10" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </div>

      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="you@email.com"
        />
      </div>

      <div className="form-row">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="What are you building?"
        />
      </div>

      <button className="btn-primary translate-x-30" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
        <Send size={15} className="btn-icon" />
      </button>

      {status === "sent" && (
        <p className="form-status form-status--ok">Message sent , I'll reply soon.</p>
      )}
      {status === "error" && (
        <p className="form-status form-status--err">
          Something went wrong. Try emailing me directly instead.
        </p>
      )}
    </form>
  );
}