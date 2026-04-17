/**
 * Migration script — adds tables for all homepage content blocks.
 * Run with: npx tsx scripts/migrate-homepage-blocks.ts
 */

export {};
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!;
const DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID!;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN!;

async function queryD1(sql: string, params: any[] = []) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
    }
  );
  const data = await response.json();
  if (!data.success) {
    console.error("D1 error:", data.errors);
    throw new Error(data.errors?.[0]?.message || "D1 query failed");
  }
  return data.result[0];
}

async function main() {
  console.log("🚀 Creating homepage content tables...");

  const queries = [
    // Stats
    `CREATE TABLE IF NOT EXISTS homepage_stats (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      value REAL NOT NULL,
      suffix TEXT,
      icon TEXT,
      decimals INTEGER DEFAULT 0,
      order_index INTEGER DEFAULT 0
    )`,
    // Portfolio Verticals
    `CREATE TABLE IF NOT EXISTS homepage_portfolios (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      icon TEXT,
      image_url TEXT,
      category_id TEXT,
      order_index INTEGER DEFAULT 0
    )`,
    // Testimonials
    `CREATE TABLE IF NOT EXISTS homepage_testimonials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT,
      company TEXT,
      quote TEXT NOT NULL,
      country TEXT,
      rating INTEGER DEFAULT 5,
      order_index INTEGER DEFAULT 0
    )`,
    // Process Steps
    `CREATE TABLE IF NOT EXISTS homepage_process (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      icon TEXT,
      order_index INTEGER DEFAULT 0
    )`,
    // Marquee / Ticker
    `CREATE TABLE IF NOT EXISTS homepage_marquee (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      order_index INTEGER DEFAULT 0
    )`
  ];

  for (const sql of queries) {
    await queryD1(sql);
  }

  console.log("✅ All homepage tables created successfully.");
}

main().catch(console.error);
