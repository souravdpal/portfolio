"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (status === "sent" || status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error && err.message !== "Request failed"
          ? err.message
          : "Something went wrong. Try emailing me directly instead."
      );
    }
  };

  return (
    <form
      className="contact-form w-full max-w-lg mx-auto text-left space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-row flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-medium text-white/80">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-indigo-400/70 focus:bg-white/10 focus:ring-2 focus:ring-indigo-400/20"
          />
        </div>

        <div className="form-row flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-medium text-white/80">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-indigo-400/70 focus:bg-white/10 focus:ring-2 focus:ring-indigo-400/20"
          />
        </div>
      </div>

      <div className="form-row flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-medium text-white/80">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="What are you building?"
          className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-indigo-400/70 focus:bg-white/10 focus:ring-2 focus:ring-indigo-400/20"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send size={15} className="btn-icon" />
          </>
        )}
      </button>

      {status === "sent" && (
        <div
          role="status"
          className="form-status form-status--ok flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-xs sm:text-sm text-emerald-200"
        >
          <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
          <span>
            Message sent! Check your inbox for a confirmation—I&apos;ll reply soon.
          </span>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="form-status form-status--err flex items-center justify-center gap-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-2.5 text-xs sm:text-sm text-rose-200"
        >
          <AlertCircle size={16} className="shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}
    </form>
  );
}