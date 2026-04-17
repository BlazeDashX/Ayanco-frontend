// For API routes running in Node.js (Vercel), we use Cloudflare D1 via REST API
// For local dev, we use wrangler's local D1 simulation via better-sqlite3

export async function queryD1(sql: string, params: any[] = []) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID!;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN!;

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
    }
  );

  const data = await response.json();
  if (!data.success) throw new Error(data.errors?.[0]?.message || "D1 query failed");
  return data.result[0];
}