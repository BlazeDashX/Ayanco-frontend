import { queryD1 } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let sql = "SELECT * FROM products WHERE is_published = 1";
    const params: any[] = [];

    if (category) {
      sql += " AND category = ?";
      params.push(category);
    }

    sql += " ORDER BY order_index ASC";

    const result = await queryD1(sql, params);
    return Response.json(result.results);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
