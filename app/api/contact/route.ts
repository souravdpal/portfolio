import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const GMAIL_USER = (process.env.gmail_user ?? process.env.GMAIL_USER)?.trim();
const GMAIL_APP_PASSWORD = (
  process.env.gmail_app_password ?? process.env.GMAIL_APP_PASSWORD
)?.replace(/\s+/g, "");
const TO_EMAIL = GMAIL_USER ?? "iamsouravhere1@gmail.com";

const OWNER_NAME = "Sourav";
const BOT_NAME = "SOURAV-BOT // Relay";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = sanitizeHeader(body.name?.trim() ?? "");
  const email = sanitizeHeader(body.email?.trim() ?? "");
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  if (name.length > 100 || email.length > 150 || message.length > 5000) {
    return NextResponse.json({ error: "Input exceeds maximum length" }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.log("[contact form — env vars missing, logging instead]", {
      name,
      email,
      message,
    });
    return NextResponse.json({ ok: true, mode: "logged" });
  }

  // Diagnostic log (safe: only logs email + password length, remove once working)
  console.log("SMTP check:", {
    user: GMAIL_USER,
    passLen: GMAIL_APP_PASSWORD.length,
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  const sentAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  try {
    // 1. Send the contact message to your inbox
    await transporter.sendMail({
      from: `"Portfolio Inbox" <${GMAIL_USER}>`,
      to: TO_EMAIL,
      replyTo: `"${name}" <${email}>`,
      subject: `[Portfolio] New message from ${name}`,
      text: `New message from ${name} (${email})\nReceived: ${sentAt}\n\n${message}`,
      html: buildOwnerEmailHtml({ name, email, message, sentAt }),
    });
  } catch (err) {
    console.error("Gmail send error (owner notification):", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
  }

  // 2. Send the no-reply bot confirmation to the visitor
  const noReplyAddress = GMAIL_USER.includes("@")
    ? GMAIL_USER.replace("@", "+noreply@")
    : GMAIL_USER;

  try {
    await transporter.sendMail({
      from: `"${BOT_NAME} (No-Reply)" <${GMAIL_USER}>`,
      to: email,
      replyTo: noReplyAddress,
      subject: `Transmission received — ${OWNER_NAME} will reply soon`,
      text: [
        `Hey ${name},`,
        ``,
        `Beep boop. I'm ${BOT_NAME}, ${OWNER_NAME}'s automated inbox courier.`,
        `Your message has landed safely in ${OWNER_NAME}'s inbox, and he'll reply back soon.`,
        ``,
        `--- Your message ---`,
        message,
        ``,
        `(This is an automated no-reply confirmation—no need to reply to this email.)`,
      ].join("\n"),
      html: buildVisitorAutoReplyHtml({ name, message, sentAt }),
    });
  } catch (err) {
    console.error("Gmail send error (visitor auto-reply):", err);
  }

  return NextResponse.json({ ok: true, mode: "sent" });
}

function buildOwnerEmailHtml({
  name,
  email,
  message,
  sentAt,
}: {
  name: string;
  email: string;
  message: string;
  sentAt: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

  return `
  <!DOCTYPE html>
  <html>
    <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:580px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
              <tr>
                <td style="background-color:#09090b;padding:24px 28px;">
                  <p style="margin:0;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#a1a1aa;font-weight:600;">
                    Portfolio Contact
                  </p>
                  <h1 style="margin:6px 0 0;font-size:20px;color:#ffffff;font-weight:600;">
                    New message from ${safeName}
                  </h1>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 28px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#fafafa;border:1px solid #e4e4e7;border-radius:8px;margin-bottom:20px;">
                    <tr>
                      <td style="padding:14px 16px;font-size:13px;line-height:1.6;color:#3f3f46;">
                        <div><strong style="color:#18181b;">From:</strong> ${safeName}</div>
                        <div><strong style="color:#18181b;">Email:</strong> <a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none;">${safeEmail}</a></div>
                        <div><strong style="color:#18181b;">Received:</strong> ${escapeHtml(sentAt)}</div>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#71717a;">
                    Message
                  </p>
                  <div style="font-size:15px;line-height:1.65;color:#18181b;background-color:#ffffff;padding:4px 0;">
                    ${safeMessage}
                  </div>
                  <div style="margin-top:26px;">
                    <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: Your message on ${OWNER_NAME}'s portfolio`)}"
                       style="display:inline-block;background-color:#09090b;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:11px 20px;border-radius:8px;">
                      Reply to ${safeName} &rarr;
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 28px;background-color:#fafafa;border-top:1px solid #e4e4e7;font-size:12px;color:#71717a;">
                  Hitting Reply in Gmail will automatically address ${safeEmail}.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

function buildVisitorAutoReplyHtml({
  name,
  message,
  sentAt,
}: {
  name: string;
  message: string;
  sentAt: string;
}) {
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

  return `
  <!DOCTYPE html>
  <html>
    <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:580px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
              <tr>
                <td style="background-color:#09090b;padding:24px 28px;">
                  <span style="display:inline-block;background-color:#18181b;border:1px solid #27272a;color:#4ade80;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;padding:4px 10px;border-radius:999px;">
                    &#9679; ${escapeHtml(BOT_NAME)}
                  </span>
                  <h1 style="margin:12px 0 0;font-size:20px;color:#ffffff;font-weight:600;">
                    Message delivered, ${safeName}.
                  </h1>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 28px;font-size:15px;line-height:1.65;color:#27272a;">
                  <p style="margin:0 0 14px;">
                    Hey ${safeName},
                  </p>
                  <p style="margin:0 0 18px;">
                    I&rsquo;m <strong>${escapeHtml(BOT_NAME)}</strong>, ${escapeHtml(OWNER_NAME)}&rsquo;s automated inbox courier. I just dropped your note straight into ${escapeHtml(OWNER_NAME)}&rsquo;s primary inbox—he&rsquo;ll review it and reply back to you soon.
                  </p>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#fafafa;border-left:3px solid #09090b;border-radius:6px;margin:20px 0;">
                    <tr>
                      <td style="padding:14px 16px;">
                        <p style="margin:0 0 6px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#71717a;">
                          Copy of your message &bull; ${escapeHtml(sentAt)}
                        </p>
                        <div style="font-size:14px;line-height:1.6;color:#3f3f46;">
                          ${safeMessage}
                        </div>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:18px 0 0;font-size:14px;color:#52525b;">
                    Talk soon,<br/>
                    <strong style="color:#18181b;">${escapeHtml(BOT_NAME)}</strong>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 28px;background-color:#fafafa;border-top:1px solid #e4e4e7;font-size:12px;color:#71717a;">
                  Automated no-reply confirmation from ${escapeHtml(OWNER_NAME)}&rsquo;s portfolio. Please don&rsquo;t reply directly to this bot message.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

function sanitizeHeader(input: string) {
  return input.replace(/[\r\n]+/g, " ");
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}