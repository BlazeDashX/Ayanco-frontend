import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL || "refat00021@gmail.com";

export async function POST(request: NextRequest) {
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

    // Generate reference ID
    const refId = Date.now().toString().slice(-6);

    // Send email via Resend
    const { data, error } = await resend.emails.send({
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
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #09090B; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">Company</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #09090B; font-weight: 500;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #09090B; font-weight: 500;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">Phone</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #09090B; font-weight: 500;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">Category</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #09090B; font-weight: 500;">${category}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">Specifications</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #09090B; font-weight: 500;">${specs.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; padding: 20px; background: #F5F4F0; border-left: 4px solid #C4882A;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This request was submitted via the Ayanco Trade website quotation form. Please respond within 24 hours as per our service guarantee.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data, refId });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
