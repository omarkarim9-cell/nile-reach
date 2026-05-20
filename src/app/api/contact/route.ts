import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
} from "@getbrevo/brevo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, country, interest, quantity, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "info@nile-reach.com";
    // From address — must be a sender or domain you've verified in Brevo
    const fromEmail = process.env.BREVO_FROM_EMAIL || "noreply@nile-reach.com";
    const fromName = process.env.BREVO_FROM_NAME || "Nile Reach Website";

    // If no API key configured (e.g. local dev), just log and return success
    if (!apiKey) {
      console.log("[Contact form] No BREVO_API_KEY — would have sent:", body);
      return NextResponse.json({ success: true, dev: true });
    }

    const html = `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A1A;">
        <div style="background: #0E2A47; color: #FAF7F2; padding: 24px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; font-size: 20px;">New Inquiry — Nile Reach Global</h2>
        </div>
        <div style="background: #FAF7F2; padding: 24px; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #5C6F82; width: 140px;"><strong>Name</strong></td><td style="padding: 8px 0;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 8px 0; color: #5C6F82;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            ${company ? `<tr><td style="padding: 8px 0; color: #5C6F82;"><strong>Company</strong></td><td style="padding: 8px 0;">${escapeHtml(company)}</td></tr>` : ""}
            ${phone ? `<tr><td style="padding: 8px 0; color: #5C6F82;"><strong>Phone</strong></td><td style="padding: 8px 0;">${escapeHtml(phone)}</td></tr>` : ""}
            ${country ? `<tr><td style="padding: 8px 0; color: #5C6F82;"><strong>Destination</strong></td><td style="padding: 8px 0;">${escapeHtml(country)}</td></tr>` : ""}
            ${interest ? `<tr><td style="padding: 8px 0; color: #5C6F82;"><strong>Interest</strong></td><td style="padding: 8px 0;">${escapeHtml(interest)}</td></tr>` : ""}
            ${quantity ? `<tr><td style="padding: 8px 0; color: #5C6F82;"><strong>Quantity</strong></td><td style="padding: 8px 0;">${escapeHtml(quantity)}</td></tr>` : ""}
          </table>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5D6BC;">
            <p style="color: #5C6F82; margin: 0 0 8px 0;"><strong>Message</strong></p>
            <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
          </div>
        </div>
      </div>
    `;

    const api = new TransactionalEmailsApi();
    api.setApiKey(TransactionalEmailsApiApiKeys.apiKey, apiKey);

    const smtpEmail = new SendSmtpEmail();
    smtpEmail.subject = `New inquiry from ${name}${company ? ` (${company})` : ""}`;
    smtpEmail.htmlContent = html;
    smtpEmail.sender = { name: fromName, email: fromEmail };
    smtpEmail.to = [{ email: toEmail }];
    smtpEmail.replyTo = { email, name };

    try {
      await api.sendTransacEmail(smtpEmail);
    } catch (sendErr) {
      console.error("[Brevo] send failed:", sendErr);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
