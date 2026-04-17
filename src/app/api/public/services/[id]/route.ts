import { queryD1 } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await queryD1(
      "SELECT * FROM services WHERE id = ? AND is_published = 1",
      [id]
    );
    const service = result.results?.[0];
    if (!service) return Response.json({ error: "Not found" }, { status: 404 });

    const [features, benefits, steps] = await Promise.all([
      queryD1(
        "SELECT * FROM service_features WHERE service_id = ? ORDER BY order_index",
        [id]
      ),
      queryD1(
        "SELECT * FROM service_benefits WHERE service_id = ? ORDER BY order_index",
        [id]
      ),
      queryD1(
        "SELECT * FROM service_process_steps WHERE service_id = ? ORDER BY order_index",
        [id]
      ),
    ]);

    return Response.json({
      ...service,
      image: service.image_url,
      features: (features.results || []).map((f: any) => f.text),
      benefits: (benefits.results || []).map((b: any) => b.text),
      process: (steps.results || []).map((s: any) => s.text),
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}