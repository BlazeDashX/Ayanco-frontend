import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { queryD1 } from "@/lib/db";
import { nanoid } from "nanoid";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const products = await queryD1("SELECT * FROM products ORDER BY order_index ASC");
    return Response.json(products.results);
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

    // Insert main product
    await queryD1(
      `INSERT INTO products (id, title, description, category, market, specs, image_url, video_url, how_it_works, is_published, order_index)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.title,
        body.description || "",
        body.category,
        body.market || "",
        body.specs || "",
        body.image_url || "",
        body.video_url || "",
        body.how_it_works || "",
        body.is_published ?? 0,
        body.order_index ?? 0,
      ]
    );

    // Insert features
    if (body.features?.length) {
      for (let i = 0; i < body.features.length; i++) {
        await queryD1(
          "INSERT INTO product_features (id, product_id, text, order_index) VALUES (?, ?, ?, ?)",
          [nanoid(), id, body.features[i], i]
        );
      }
    }

    // Insert applications
    if (body.applications?.length) {
      for (let i = 0; i < body.applications.length; i++) {
        await queryD1(
          "INSERT INTO product_applications (id, product_id, text, order_index) VALUES (?, ?, ?, ?)",
          [nanoid(), id, body.applications[i], i]
        );
      }
    }

    // Insert operate steps
    if (body.operate_steps?.length) {
      for (let i = 0; i < body.operate_steps.length; i++) {
        await queryD1(
          "INSERT INTO product_operate_steps (id, product_id, text, order_index) VALUES (?, ?, ?, ?)",
          [nanoid(), id, body.operate_steps[i], i]
        );
      }
    }

    // Insert tech specs
    if (body.tech_specs?.length) {
      for (let i = 0; i < body.tech_specs.length; i++) {
        await queryD1(
          "INSERT INTO product_tech_specs (id, product_id, label, value, order_index) VALUES (?, ?, ?, ?, ?)",
          [nanoid(), id, body.tech_specs[i].label, body.tech_specs[i].value, i]
        );
      }
    }

    // Insert gallery images
    if (body.gallery_images?.length) {
      for (let i = 0; i < body.gallery_images.length; i++) {
        await queryD1(
          "INSERT INTO product_images (id, product_id, url, alt, order_index) VALUES (?, ?, ?, ?, ?)",
          [nanoid(), id, body.gallery_images[i].url, body.gallery_images[i].alt || "", i]
        );
      }
    }

    // Insert models and their spec columns/cells
    if (body.models?.length && body.model_columns?.length) {
      // Insert columns first
      const columnIds: string[] = [];
      for (let i = 0; i < body.model_columns.length; i++) {
        const colId = nanoid();
        columnIds.push(colId);
        await queryD1(
          "INSERT INTO model_spec_columns (id, product_id, label, order_index) VALUES (?, ?, ?, ?)",
          [colId, id, body.model_columns[i], i]
        );
      }

      // Insert models and cells
      for (let i = 0; i < body.models.length; i++) {
        const modelId = nanoid();
        await queryD1(
          "INSERT INTO product_models (id, product_id, model_name, order_index) VALUES (?, ?, ?, ?)",
          [modelId, id, body.models[i].name, i]
        );

        // Insert cells for this model
        if (body.models[i].cells) {
          for (let j = 0; j < body.models[i].cells.length; j++) {
            if (columnIds[j]) {
              await queryD1(
                "INSERT INTO model_spec_cells (id, model_id, column_id, value) VALUES (?, ?, ?, ?)",
                [nanoid(), modelId, columnIds[j], body.models[i].cells[j] || ""]
              );
            }
          }
        }
      }
    }

    return Response.json({ id }, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
