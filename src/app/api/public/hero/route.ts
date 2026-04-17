import { queryD1 } from "@/lib/db";

export async function GET() {
  try {
    const result = await queryD1(
      "SELECT * FROM hero_slides WHERE is_active = 1 ORDER BY order_index ASC"
    );
    return Response.json(result.results);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
