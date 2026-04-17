import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { queryD1 } from "@/lib/db";
import { nanoid } from "nanoid";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const result = await queryD1("SELECT * FROM hero_slides ORDER BY order_index ASC");
    return Response.json(result.results);
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
      `INSERT INTO hero_slides (id, badge, title, highlight, subtitle, bg_image_url, primary_cta_label, primary_cta_href, secondary_cta_label, secondary_cta_href, order_index, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.badge,
        body.title,
        body.highlight,
        body.subtitle,
        body.bg_image_url,
        body.primary_cta_label,
        body.primary_cta_href,
        body.secondary_cta_label,
        body.secondary_cta_href,
        body.order_index ?? 0,
        body.is_active ?? 1,
      ]
    );

    return Response.json({ id }, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
