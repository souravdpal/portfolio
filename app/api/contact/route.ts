import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * POST /api/contact
 *
 * Sends the contact form to your Gmail inbox using Gmail's own SMTP
 * server via Nodemailer. No domain, no DNS records, no third-party
 * mail provider needed — Gmail is already a trusted sending domain.
 *
 * ONE-TIME SETUP (Gmail requires this, your regular password won't work):
 *   1. Turn on 2-Step Verification on your Google account:
 *      https://myaccount.google.com/security
 *   2. Generate an "App Password":
 *      https://myaccount.google.com/apppasswords
 *      - App: "Mail", Device: "Other" -> name it "portfolio"
 *      - Google gives you a 16-character password like: abcd efgh ijkl mnop
 *   3. Add both values to .env.local (never commit this file):
 *
 *        GMAIL_USER=iamsouravhere1@gmail.com
 *        GMAIL_APP_PASSWORD=abcdefghijklmnop   (no spaces)
 *
 *   4. Restart your dev server so Next.js picks up the new env vars.
 *   5. On Render: add the same two variables under
 *      Dashboard -> your service -> Environment.
 *
 * Install the dependency once:
 *   npm install nodemailer
 *   npm install -D @types/nodemailer
 */

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

// Where messages land. Defaults to your own Gmail if unset.
const TO_EMAIL = GMAIL_USER ?? "iamsouravhere1@gmail.com";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.log("[contact form — GMAIL_USER / GMAIL_APP_PASSWORD not set, logging instead]", {
      name,
      email,
      message,
    });
    return NextResponse.json({ ok: true, mode: "logged" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio contact form" <${GMAIL_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true, mode: "sent" });
  } catch (err) {
    console.error("Gmail send error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
  }
}

// Minimal escaping so form input can't inject markup into the HTML email.
function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}