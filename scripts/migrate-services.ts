/**
 * Migration script — adds missing 'icon' and 'tag' columns to the services table.
 * Run with: npx tsx scripts/migrate-services.ts
 */

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
    return { error: data.errors?.[0]?.message || "D1 query failed" };
  }
  return { success: true, result: data.result[0] };
}

async function migrate() {
  console.log("🛠️ Starting Services Table Migration...");

  try {
    // Add icon column
    console.log("  ➡️ Adding 'icon' column...");
    const iconRes = await queryD1("ALTER TABLE services ADD COLUMN icon TEXT DEFAULT 'Globe'");
    if (iconRes.error && !iconRes.error.includes("duplicate column")) {
        console.error("    ❌ Failed to add icon:", iconRes.error);
    } else {
        console.log("    ✅ Icon column added or already exists.");
    }

    // Add tag column
    console.log("  ➡️ Adding 'tag' column...");
    const tagRes = await queryD1("ALTER TABLE services ADD COLUMN tag TEXT DEFAULT ''");
    if (tagRes.error && !tagRes.error.includes("duplicate column")) {
        console.error("    ❌ Failed to add tag:", tagRes.error);
    } else {
        console.log("    ✅ Tag column added or already exists.");
    }

    console.log("\n✨ Migration complete!");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

migrate();
