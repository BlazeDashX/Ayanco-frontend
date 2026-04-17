import { queryD1 } from "@/lib/db";

export async function GET() {
  try {
    const sql = "SELECT * FROM services WHERE is_published = 1 ORDER BY order_index ASC";
    const result = await queryD1(sql);
    const services = result.results || [];

    // Map DB fields to UI-friendly names if needed (e.g., image_url -> image)
    const formatted = services.map((s: any) => ({
      ...s,
      image: s.image_url,
    }));

    return Response.json(formatted);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
