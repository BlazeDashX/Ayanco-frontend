import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL || "refat00021@gmail.com";

/* ─── Security: HTML escape (server-safe, replaces browser-only DOMPurify) ─── */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ─── Rate Limiting (in-memory, per serverless instance) ─────────────── */
// NOTE: For production with multiple serverless instances, upgrade to
// @upstash/ratelimit or add Vercel Edge Middleware for true global limits.
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;       // max requests per window
const RATE_LIMIT_WINDOW = 60_000; // 60-second window

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  /* ── Rate Limiting ─────────────────────────────────────────── */
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before submitting again." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, company, email, phone, category, specs } = body;

    // Validate required fields
    if (!name || !company || !email || !specs) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured in .env.local");
      return NextResponse.json(
        { error: "Email service not configured. Please contact support directly." },
        { status: 500 }
      );
    }

    // Sanitize all user input before injecting into HTML email template
    const safeName    = escapeHtml(name);
    const safeCompany = escapeHtml(company);
    const safeEmail   = escapeHtml(email);
    const safePhone   = escapeHtml(phone || "Not provided");
    const safeCategory = escapeHtml(category);
    // specs: escape first, then convert newlines to <br> for readability
    const safeSpecs   = escapeHtml(specs).replace(/\n/g, "<br>");

    // Generate reference ID
    const refId = Date.now().toString().slice(-6);

    // Send email via Resend asynchronously to avoid blocking the client response
    resend.emails.send({
      from: "Ayanco Trade <onboarding@resend.dev>",
      to: [RESEND_TO_EMAIL],
      subject: `New RFQ Request - ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="border-bottom: 2px solid #C4882A; padding-bottom: 20px; margin-bottom: 20px;">
            <h1 style="color: #09090B; margin: 0;">New Quotation Request</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Reference ID: ATC-${refId}</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666; width: 150px;">Contact Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #09090B; font-weight: 500;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">Company</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #09090B; font-weight: 500;">${safeCompany}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #09090B; font-weight: 500;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">Phone</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #09090B; font-weight: 500;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">Category</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #09090B; font-weight: 500;">${safeCategory}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">Specifications</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #09090B; font-weight: 500;">${safeSpecs}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; padding: 20px; background: #F5F4F0; border-left: 4px solid #C4882A;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This request was submitted via the Ayanco Trade website quotation form. Please respond within 24 hours as per our service guarantee.
            </p>
          </div>
        </div>
      `,
    }).catch(error => {
      console.error("Resend async error:", error);
    });

    return NextResponse.json({ success: true, data: null, refId });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
