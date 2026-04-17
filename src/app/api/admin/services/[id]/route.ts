import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { queryD1 } from "@/lib/db";
import { nanoid } from "nanoid";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const result = await queryD1("SELECT * FROM services WHERE id = ?", [id]);
    const service = result.results?.[0];
    if (!service) return Response.json({ error: "Not found" }, { status: 404 });

    const [features, benefits, steps] = await Promise.all([
      queryD1("SELECT * FROM service_features WHERE service_id = ? ORDER BY order_index", [id]),
      queryD1("SELECT * FROM service_benefits WHERE service_id = ? ORDER BY order_index", [id]),
      queryD1("SELECT * FROM service_process_steps WHERE service_id = ? ORDER BY order_index", [id]),
    ]);

    return Response.json({
      ...service,
      features: features.results || [],
      benefits: benefits.results || [],
      process_steps: steps.results || [],
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();

    await queryD1(
      `UPDATE services SET num = ?, title = ?, description = ?, detailed_description = ?,
       image_url = ?, size = ?, case_study = ?, is_published = ?, order_index = ? WHERE id = ?`,
      [
        body.num || "",
        body.title,
        body.description || "",
        body.detailed_description || "",
        body.image_url || "",
        body.size || "sm",
        body.case_study || "",
        body.is_published ?? 1,
        body.order_index ?? 0,
        id,
      ]
    );

    // Delete old children and re-insert
    await Promise.all([
      queryD1("DELETE FROM service_features WHERE service_id = ?", [id]),
      queryD1("DELETE FROM service_benefits WHERE service_id = ?", [id]),
      queryD1("DELETE FROM service_process_steps WHERE service_id = ?", [id]),
    ]);

    if (body.features?.length) {
      for (let i = 0; i < body.features.length; i++) {
        const text = typeof body.features[i] === "string" ? body.features[i] : body.features[i].text;
        await queryD1(
          "INSERT INTO service_features (id, service_id, text, order_index) VALUES (?, ?, ?, ?)",
          [nanoid(), id, text, i]
        );
      }
    }

    if (body.benefits?.length) {
      for (let i = 0; i < body.benefits.length; i++) {
        const text = typeof body.benefits[i] === "string" ? body.benefits[i] : body.benefits[i].text;
        await queryD1(
          "INSERT INTO service_benefits (id, service_id, text, order_index) VALUES (?, ?, ?, ?)",
          [nanoid(), id, text, i]
        );
      }
    }

    if (body.process_steps?.length) {
      for (let i = 0; i < body.process_steps.length; i++) {
        const text = typeof body.process_steps[i] === "string" ? body.process_steps[i] : body.process_steps[i].text;
        await queryD1(
          "INSERT INTO service_process_steps (id, service_id, text, order_index) VALUES (?, ?, ?, ?)",
          [nanoid(), id, text, i]
        );
      }
    }

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;

    await Promise.all([
      queryD1("DELETE FROM service_features WHERE service_id = ?", [id]),
      queryD1("DELETE FROM service_benefits WHERE service_id = ?", [id]),
      queryD1("DELETE FROM service_process_steps WHERE service_id = ?", [id]),
    ]);

    await queryD1("DELETE FROM services WHERE id = ?", [id]);
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
