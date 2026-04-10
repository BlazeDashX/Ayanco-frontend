import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL || "refat00021@gmail.com";

/* ─── Security: HTML escape ─────────────────────────────────────── */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ─── Rate Limiting ─────────────────────────────────────────────── */
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60_000;

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

/* ─── Email Templates ───────────────────────────────────────────── */

/** Internal notification — sent to Ayanco trade desk */
function buildInternalEmail(params: {
  refId: string; safeName: string; safeCompany: string;
  safeEmail: string; safePhone: string; safeCategory: string;
  safeSpecs: string; submittedAt: string;
}): string {
  const { refId, safeName, safeCompany, safeEmail, safePhone, safeCategory, safeSpecs, submittedAt } = params;
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F4F4F5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#09090B;padding:28px 36px;border-radius:8px 8px 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <div style="font-size:11px;color:#C4882A;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:6px;">Ayanco Trade Corporation</div>
                  <div style="font-size:22px;color:#FFFFFF;font-weight:700;">New RFQ Received</div>
                  <div style="font-size:13px;color:#9CA3AF;margin-top:4px;">${submittedAt}</div>
                </td>
                <td align="right" style="vertical-align:top;">
                  <div style="background:#C4882A;color:#09090B;font-weight:800;font-size:13px;padding:8px 16px;border-radius:4px;letter-spacing:1px;">
                    ATC-${refId}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Alert banner -->
        <tr>
          <td style="background:#92400E;padding:12px 36px;">
            <p style="margin:0;color:#FDE68A;font-size:12px;font-weight:600;letter-spacing:1px;">
              ⚡ ACTION REQUIRED — Respond within 24 hours per service guarantee
            </p>
          </td>
        </tr>

        <!-- Details table -->
        <tr>
          <td style="background:#FFFFFF;padding:32px 36px;">
            <p style="margin:0 0 20px 0;font-size:14px;color:#374151;font-weight:600;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #F3F4F6;padding-bottom:12px;">
              Request Details
            </p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;color:#6B7280;font-size:13px;width:140px;vertical-align:top;">Contact Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;color:#111827;font-size:13px;font-weight:600;vertical-align:top;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;color:#6B7280;font-size:13px;vertical-align:top;">Company</td>
                <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;color:#111827;font-size:13px;font-weight:600;vertical-align:top;">${safeCompany}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;color:#6B7280;font-size:13px;vertical-align:top;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;font-size:13px;font-weight:600;vertical-align:top;">
                  <a href="mailto:${safeEmail}" style="color:#C4882A;text-decoration:none;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;color:#6B7280;font-size:13px;vertical-align:top;">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;color:#111827;font-size:13px;font-weight:600;vertical-align:top;">${safePhone}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;color:#6B7280;font-size:13px;vertical-align:top;">Category</td>
                <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;vertical-align:top;">
                  <span style="background:#FEF3C7;color:#92400E;font-size:11px;font-weight:700;padding:3px 10px;border-radius:99px;">${safeCategory}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0 0 0;color:#6B7280;font-size:13px;vertical-align:top;">Specifications</td>
                <td style="padding:12px 0 0 0;color:#111827;font-size:13px;line-height:1.7;vertical-align:top;">${safeSpecs}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer note -->
        <tr>
          <td style="background:#F9FAFB;padding:20px 36px;border:1px solid #E5E7EB;border-top:none;border-radius:0 0 8px 8px;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;line-height:1.6;">
              This notification was automatically generated by the Ayanco Trade quotation system.
              Reply directly to <a href="mailto:${safeEmail}" style="color:#C4882A;">${safeEmail}</a> to respond to this enquiry.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Client auto-acknowledgment — sent to the enquirer */
function buildClientEmail(params: {
  refId: string; safeName: string; safeCompany: string;
  safeCategory: string; safeSpecs: string; submittedAt: string;
}): string {
  const { refId, safeName, safeCategory, safeSpecs, submittedAt } = params;
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F4F4F5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#09090B;padding:32px 36px 24px;border-radius:8px 8px 0 0;text-align:center;">
            <div style="font-size:11px;color:#C4882A;font-weight:700;letter-spacing:4px;text-transform:uppercase;margin-bottom:16px;">Ayanco Trade Corporation</div>
            <!-- Gold divider -->
            <div style="width:48px;height:2px;background:#C4882A;margin:0 auto 20px;"></div>
            <div style="font-size:26px;color:#FFFFFF;font-weight:700;margin-bottom:8px;">Request Received</div>
            <div style="font-size:14px;color:#9CA3AF;">Your quotation request has been successfully logged.</div>
          </td>
        </tr>

        <!-- Reference ID box -->
        <tr>
          <td style="background:#141419;padding:24px 36px;text-align:center;border-left:1px solid #27272A;border-right:1px solid #27272A;">
            <div style="font-size:10px;color:#6B7280;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;">Reference Number</div>
            <div style="font-size:28px;color:#C4882A;font-weight:800;font-family:'Courier New',monospace;letter-spacing:4px;">ATC-${refId}</div>
            <div style="font-size:11px;color:#6B7280;margin-top:8px;">Please save this reference for all follow-up communications.</div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#FFFFFF;padding:32px 36px;">

            <p style="margin:0 0 8px;font-size:15px;color:#111827;font-weight:600;">Dear ${safeName},</p>
            <p style="margin:0 0 24px;font-size:14px;color:#4B5563;line-height:1.7;">
              Thank you for reaching out to <strong>Ayanco Trade Corporation</strong>. We have successfully received your Request for Quotation (RFQ) and our global trade desk is reviewing your requirements.
            </p>

            <!-- What happens next -->
            <div style="background:#FFFBEB;border-left:4px solid #C4882A;padding:16px 20px;border-radius:0 6px 6px 0;margin-bottom:28px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#92400E;text-transform:uppercase;letter-spacing:1px;">What happens next</p>
              <ul style="margin:0;padding-left:18px;color:#4B5563;font-size:13px;line-height:2;">
                <li>Our trade desk will review your specifications within <strong>24 hours</strong></li>
                <li>A dedicated manager will be assigned to your enquiry</li>
                <li>You will receive a detailed quotation via email</li>
              </ul>
            </div>

            <!-- Request summary -->
            <p style="margin:0 0 12px;font-size:12px;color:#9CA3AF;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Your Request Summary</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="padding:9px 0;border-bottom:1px solid #F3F4F6;color:#6B7280;font-size:13px;width:140px;">Submitted</td>
                <td style="padding:9px 0;border-bottom:1px solid #F3F4F6;color:#111827;font-size:13px;font-weight:500;">${submittedAt}</td>
              </tr>
              <tr>
                <td style="padding:9px 0;border-bottom:1px solid #F3F4F6;color:#6B7280;font-size:13px;">Category</td>
                <td style="padding:9px 0;border-bottom:1px solid #F3F4F6;font-size:13px;">
                  <span style="background:#FEF3C7;color:#92400E;font-size:11px;font-weight:700;padding:2px 10px;border-radius:99px;">${safeCategory}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:9px 0;color:#6B7280;font-size:13px;vertical-align:top;">Specifications</td>
                <td style="padding:9px 0;color:#374151;font-size:13px;line-height:1.7;">${safeSpecs}</td>
              </tr>
            </table>

            <!-- Urgent contact -->
            <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:6px;padding:18px 20px;margin-bottom:8px;">
              <p style="margin:0 0 4px;font-size:12px;color:#6B7280;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Need immediate assistance?</p>
              <p style="margin:0;font-size:13px;color:#374151;line-height:1.6;">
                Email: <a href="mailto:corporate@ayanco.com" style="color:#C4882A;font-weight:600;text-decoration:none;">corporate@ayanco.com</a><br>
                Phone: <a href="tel:+8801711000000" style="color:#C4882A;font-weight:600;text-decoration:none;">+880 1711-000000</a>
              </p>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#09090B;padding:24px 36px;border-radius:0 0 8px 8px;text-align:center;">
            <div style="width:32px;height:1px;background:#C4882A;margin:0 auto 16px;"></div>
            <p style="margin:0 0 4px;font-size:11px;color:#C4882A;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Ayanco Trade Corporation</p>
            <p style="margin:0;font-size:11px;color:#4B5563;line-height:1.6;">
              Banani Model Town, Dhaka-1213, Bangladesh<br>
              Saturday – Thursday, 9:00 AM – 6:00 PM (BST)
            </p>
            <p style="margin:16px 0 0;font-size:10px;color:#3F3F46;line-height:1.5;">
              This is an automated acknowledgment. Please do not reply to this email.<br>
              For enquiries, contact <a href="mailto:corporate@ayanco.com" style="color:#6B7280;">corporate@ayanco.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ─── POST Handler ──────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  /* Rate limiting */
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

    /* Server-side validation */
    if (!name?.trim() || !company?.trim() || !email?.trim() || !specs?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured. Please contact us directly." },
        { status: 500 }
      );
    }

    /* Sanitize */
    const safeName     = escapeHtml(name);
    const safeCompany  = escapeHtml(company);
    const safeEmail    = escapeHtml(email);
    const safePhone    = escapeHtml(phone || "Not provided");
    const safeCategory = escapeHtml(category || "General");
    const safeSpecs    = escapeHtml(specs).replace(/\n/g, "<br>");

    /* Generate reference ID */
    const refId = Date.now().toString().slice(-6);

    /* Submission timestamp (BST) */
    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      dateStyle: "long",
      timeStyle: "short",
    });

    const emailParams = { refId, safeName, safeCompany, safeEmail, safePhone, safeCategory, safeSpecs, submittedAt };

    /* 1. Internal notification → Ayanco trade desk (fire-and-forget) */
    resend.emails.send({
      from: "Ayanco Trade <onboarding@resend.dev>",
      to: [RESEND_TO_EMAIL],
      replyTo: email,
      subject: `New RFQ — ${safeCompany} [ATC-${refId}]`,
      html: buildInternalEmail(emailParams),
    }).catch(err => console.error("[Resend] Internal email error:", err));

    /* 2. Client auto-acknowledgment
     * NOTE: Resend's onboarding@resend.dev test domain can only send to the
     * account owner's verified email. For production, add a verified domain
     * (e.g. noreply@ayanco.com) to send to arbitrary recipients.
     *
     * Current workaround: we send the client ACK to your verified inbox too,
     * clearly labelled, so you can forward it manually until the domain is verified.
     * When a verified domain is added, change `to: [RESEND_TO_EMAIL]` → `to: [email]`.
     */
    resend.emails.send({
      from: "Ayanco Trade <onboarding@resend.dev>",
      to: [RESEND_TO_EMAIL],            // ← change to `to: [email]` after verifying domain
      subject: `[CLIENT ACK — FORWARD TO ${email}] RFQ Received — ATC-${refId}`,
      html: buildClientEmail(emailParams),
    }).catch(err => console.error("[Resend] Client ACK email error:", err));

    return NextResponse.json({ success: true, data: null, refId });
  } catch (error) {
    console.error("[API] quote error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
