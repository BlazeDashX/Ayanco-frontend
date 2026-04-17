import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { queryD1 } from "@/lib/db";
import { nanoid } from "nanoid";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const services = await queryD1("SELECT * FROM services ORDER BY order_index ASC");

    // Enrich each service with its children
    const enriched = await Promise.all(
      (services.results || []).map(async (svc: any) => {
        const [features, benefits, steps] = await Promise.all([
          queryD1("SELECT * FROM service_features WHERE service_id = ? ORDER BY order_index", [svc.id]),
          queryD1("SELECT * FROM service_benefits WHERE service_id = ? ORDER BY order_index", [svc.id]),
          queryD1("SELECT * FROM service_process_steps WHERE service_id = ? ORDER BY order_index", [svc.id]),
        ]);
        return {
          ...svc,
          features: features.results || [],
          benefits: benefits.results || [],
          process_steps: steps.results || [],
        };
      })
    );

    return Response.json(enriched);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const id = nanoid();

    await queryD1(
      `INSERT INTO services (id, num, icon, tag, title, description, detailed_description, image_url, size, case_study, is_published, order_index)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.num || "",
        body.icon || "Globe",
        body.tag || "",
        body.title,
        body.description || "",
        body.detailed_description || "",
        body.image_url || "",
        body.size || "sm",
        body.case_study || "",
        body.is_published ?? 1,
        body.order_index ?? 0,
      ]
    );

    // Insert features (expects array of strings)
    if (body.features?.length) {
      for (let i = 0; i < body.features.length; i++) {
        await queryD1(
          "INSERT INTO service_features (id, service_id, text, order_index) VALUES (?, ?, ?, ?)",
          [nanoid(), id, body.features[i], i]
        );
      }
    }

    // Insert benefits
    if (body.benefits?.length) {
      for (let i = 0; i < body.benefits.length; i++) {
        await queryD1(
          "INSERT INTO service_benefits (id, service_id, text, order_index) VALUES (?, ?, ?, ?)",
          [nanoid(), id, body.benefits[i], i]
        );
      }
    }

    // Insert process steps
    if (body.process_steps?.length) {
      for (let i = 0; i < body.process_steps.length; i++) {
        await queryD1(
          "INSERT INTO service_process_steps (id, service_id, text, order_index) VALUES (?, ?, ?, ?)",
          [nanoid(), id, body.process_steps[i], i]
        );
      }
    }

    return Response.json({ id }, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
