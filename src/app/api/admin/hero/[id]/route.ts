import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { queryD1 } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();

    const fields: string[] = [];
    const values: any[] = [];

    const allowedFields = [
      "badge", "title", "highlight", "subtitle", "bg_image_url",
      "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href",
      "order_index", "is_active",
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(body[field]);
      }
    }

    if (fields.length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    values.push(id);
    await queryD1(`UPDATE hero_slides SET ${fields.join(", ")} WHERE id = ?`, values);

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
    await queryD1("DELETE FROM hero_slides WHERE id = ?", [id]);
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
