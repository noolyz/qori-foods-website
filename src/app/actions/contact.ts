"use server";

import { buildContactSchema, type ContactInput } from "@/lib/validation";

export type ContactState = {
  ok: boolean;
  error?: "validation" | "server" | "not_configured";
};

/** Temporary test inbox for RFQ submissions. Replace with company email before launch. */
const TEST_CONTACT_EMAIL = "thiagokm0410@gmail.com";

/** Resend sandbox sender — works without a verified domain. */
const DEFAULT_FROM = "Qori Foods <onboarding@resend.dev>";

/**
 * Handle an RFQ / contact submission via Resend.
 * Requires RESEND_API_KEY in `.env.local` (not `.env.example`).
 * TODO: set CONTACT_TO_EMAIL to comercial@qorifoods.com for production.
 */
export async function submitContact(input: ContactInput): Promise<ContactState> {
  const parsed = buildContactSchema().safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "validation" };
  }

  const data = parsed.data;

  // Honeypot triggered — pretend success without doing anything.
  if (data.website && data.website.length > 0) {
    return { ok: true };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY is missing. Copy .env.example to .env.local and restart the dev server.",
    );
    return { ok: false, error: "not_configured" };
  }

  const to = process.env.CONTACT_TO_EMAIL?.trim() || TEST_CONTACT_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `New RFQ from ${data.name}${data.company ? ` (${data.company})` : ""}`,
        text: formatMessage(data),
        html: formatHtml(data),
      }),
    });

    const body = await res.text();
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, body);
      return { ok: false, error: "server" };
    }

    console.info("[contact] Email sent to", to, body);
    return { ok: true };
  } catch (err) {
    console.error("[contact] Unexpected error", err);
    return { ok: false, error: "server" };
  }
}

function formatMessage(d: ContactInput): string {
  return [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Company: ${d.company || "—"}`,
    `Destination country: ${d.country}`,
    `Product of interest: ${d.product || "—"}`,
    `Estimated volume: ${d.volume || "—"}`,
    "",
    "Message:",
    d.message,
  ].join("\n");
}

function formatHtml(d: ContactInput): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${label}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`;

  return `
    <h2 style="font-family:sans-serif;color:#22381e">New RFQ — Qori Foods</h2>
    <table style="font-family:sans-serif;font-size:14px;line-height:1.5">
      ${row("Name", d.name)}
      ${row("Email", d.email)}
      ${row("Company", d.company || "—")}
      ${row("Country", d.country)}
      ${row("Product", d.product || "—")}
      ${row("Volume", d.volume || "—")}
    </table>
    <p style="font-family:sans-serif;font-size:14px;margin-top:16px"><strong>Message:</strong></p>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(d.message)}</p>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
