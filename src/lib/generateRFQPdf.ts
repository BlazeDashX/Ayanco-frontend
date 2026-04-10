/**
 * generateRFQPdf.ts
 * Drop into: lib/generateRFQPdf.ts
 *
 * Generates a professional RFQ confirmation PDF entirely in the browser.
 * Uses jsPDF (no server needed).
 *
 * Install:  npm install jspdf
 * Usage:    import { generateRFQPdf } from "@/lib/generateRFQPdf";
 *           generateRFQPdf({ refId, fields });
 */

import jsPDF from "jspdf";

export interface RFQFields {
  name: string;
  company: string;
  email: string;
  phone?: string;
  category: string;
  specs: string;
}

export function generateRFQPdf({
  refId,
  fields,
}: {
  refId: string;
  fields: RFQFields;
}) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const PW = doc.internal.pageSize.getWidth();   // 595.28
  const PH = doc.internal.pageSize.getHeight();  // 841.89

  /* ── Palette ─────────────────────────────────────────────── */
  const GOLD   = "#C4882A";
  const BLACK  = "#09090B";
  const ZINC   = "#52525B";
  const LIGHT  = "#F4F4F5";
  const WHITE  = "#FFFFFF";
  const BORDER = "#E4E4E7";

  /* ── Helpers ─────────────────────────────────────────────── */
  const hex2rgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };
  const setFill   = (hex: string) => { const c = hex2rgb(hex); doc.setFillColor(c.r, c.g, c.b); };
  const setStroke = (hex: string) => { const c = hex2rgb(hex); doc.setDrawColor(c.r, c.g, c.b); };
  const setTxt    = (hex: string) => { const c = hex2rgb(hex); doc.setTextColor(c.r, c.g, c.b); };

  /* ── HEADER BAND ─────────────────────────────────────────── */
  setFill(BLACK);
  doc.rect(0, 0, PW, 90, "F");

  // Gold accent line at very top
  setFill(GOLD);
  doc.rect(0, 0, PW, 3, "F");

  // Company name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  setTxt(WHITE);
  doc.text("AYANCO TRADE CORPORATION", 40, 42);

  // Tagline
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  setTxt(GOLD);
  doc.text("Global Sourcing · Industrial Supply Chain Solutions", 40, 58);

  // Document label — right aligned
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  setTxt(WHITE);
  doc.text("REQUEST FOR QUOTATION", PW - 40, 42, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  setTxt(GOLD);
  doc.text("CONFIRMATION SLIP", PW - 40, 56, { align: "right" });

  /* ── REF / DATE STRIP ────────────────────────────────────── */
  setFill(GOLD);
  doc.rect(0, 90, PW, 32, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  setTxt(WHITE);
  doc.text(`Reference ID:  ATC-${refId}`, 40, 111);

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  doc.text(`Submitted: ${dateStr}  ·  ${timeStr}`, PW - 40, 111, { align: "right" });

  /* ── SECTION: CONTACT DETAILS ────────────────────────────── */
  let y = 150;

  // Section heading
  const sectionHeading = (label: string, yPos: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    setTxt(GOLD);
    doc.text(label.toUpperCase(), 40, yPos);
    setStroke(GOLD);
    doc.setLineWidth(0.75);
    doc.line(40, yPos + 4, PW - 40, yPos + 4);
  };

  // Row renderer — returns next y
  const row = (label: string, value: string, yPos: number, isLast = false): number => {
    const ROW_H = 30;

    // Alternating background
    const rowIdx = Math.round((yPos - 165) / ROW_H);
    if (rowIdx % 2 === 0) {
      setFill(LIGHT);
      doc.rect(40, yPos - 14, PW - 80, ROW_H, "F");
    }

    // Label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    setTxt(ZINC);
    doc.text(label, 52, yPos + 2);

    // Value
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    setTxt(BLACK);
    doc.text(value || "—", 200, yPos + 2);

    // Bottom border (skip last)
    if (!isLast) {
      setStroke(BORDER);
      doc.setLineWidth(0.4);
      doc.line(40, yPos + ROW_H - 14, PW - 40, yPos + ROW_H - 14);
    }

    return yPos + ROW_H;
  };

  sectionHeading("Contact Information", y);
  y += 18;
  y = row("Full Name",    fields.name,    y);
  y = row("Company",      fields.company, y);
  y = row("Email Address",fields.email,   y);
  y = row("Phone",        fields.phone || "Not provided", y, true);

  /* ── SECTION: REQUEST DETAILS ────────────────────────────── */
  y += 24;
  sectionHeading("Request Details", y);
  y += 18;
  y = row("Category",     fields.category, y, true);

  /* ── SPECIFICATIONS BLOCK ────────────────────────────────── */
  y += 24;
  sectionHeading("Product Specifications", y);
  y += 18;

  // Background box
  setFill(LIGHT);
  setStroke(BORDER);
  doc.setLineWidth(0.4);

  // Wrap specs text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const maxWidth = PW - 80 - 24; // inner width minus padding
  const lines = doc.splitTextToSize(fields.specs, maxWidth);
  const lineH = 14;
  const boxH = lines.length * lineH + 24;

  doc.rect(40, y - 4, PW - 80, boxH, "FD");

  // Gold left accent bar
  setFill(GOLD);
  doc.rect(40, y - 4, 3, boxH, "F");

  setTxt(BLACK);
  doc.text(lines, 64, y + 10);

  y += boxH + 12;

  /* ── STATUS BADGE ────────────────────────────────────────── */
  y += 8;
  // Pill background
  const badgeW = 180;
  const badgeX = (PW - badgeW) / 2;
  setFill("#F0FDF4");
  setStroke("#86EFAC");
  doc.setLineWidth(0.6);
  doc.roundedRect(badgeX, y, badgeW, 28, 4, 4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  setTxt("#166534");
  doc.text("✓  Request Successfully Received", PW / 2, y + 17, { align: "center" });

  /* ── FOOTER ──────────────────────────────────────────────── */
  const FY = PH - 60;

  // Divider
  setStroke(BORDER);
  doc.setLineWidth(0.5);
  doc.line(40, FY, PW - 40, FY);

  // Gold accent dot
  setFill(GOLD);
  doc.circle(PW / 2, FY, 2, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  setTxt(ZINC);
  doc.text("Ayanco Trade Corporation  ·  Dhaka, Bangladesh", PW / 2, FY + 16, { align: "center" });
  doc.text("trade@ayanco.com  ·  www.ayanco.com", PW / 2, FY + 28, { align: "center" });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  setTxt("#A1A1AA");
  doc.text(
    "Our trade desk will review your specifications and respond within 24 hours. Save this document for your records.",
    PW / 2, FY + 42, { align: "center" }
  );

  /* ── SAVE ─────────────────────────────────────────────────── */
  doc.save(`Ayanco-RFQ-ATC-${refId}.pdf`);
}