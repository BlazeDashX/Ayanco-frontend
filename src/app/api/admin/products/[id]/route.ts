import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { queryD1 } from "@/lib/db";
import { nanoid } from "nanoid";

async function getProductWithRelations(id: string) {
  const productResult = await queryD1("SELECT * FROM products WHERE id = ?", [id]);
  const product = productResult.results?.[0];
  if (!product) return null;

  const [features, applications, operateSteps, techSpecs, images, models, columns] =
    await Promise.all([
      queryD1("SELECT * FROM product_features WHERE product_id = ? ORDER BY order_index", [id]),
      queryD1("SELECT * FROM product_applications WHERE product_id = ? ORDER BY order_index", [id]),
      queryD1("SELECT * FROM product_operate_steps WHERE product_id = ? ORDER BY order_index", [id]),
      queryD1("SELECT * FROM product_tech_specs WHERE product_id = ? ORDER BY order_index", [id]),
      queryD1("SELECT * FROM product_images WHERE product_id = ? ORDER BY order_index", [id]),
      queryD1("SELECT * FROM product_models WHERE product_id = ? ORDER BY order_index", [id]),
      queryD1("SELECT * FROM model_spec_columns WHERE product_id = ? ORDER BY order_index", [id]),
    ]);

  // Get cells for each model
  const modelsWithCells = await Promise.all(
    (models.results || []).map(async (model: any) => {
      const cells = await queryD1("SELECT * FROM model_spec_cells WHERE model_id = ?", [model.id]);
      return { ...model, cells: cells.results || [] };
    })
  );

  return {
    ...product,
    features: features.results || [],
    applications: applications.results || [],
    operate_steps: operateSteps.results || [],
    tech_specs: techSpecs.results || [],
    gallery_images: images.results || [],
    models: modelsWithCells,
    model_columns: columns.results || [],
  };
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const product = await getProductWithRelations(id);
    if (!product) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json(product);
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

    // Update main product
    await queryD1(
      `UPDATE products SET title = ?, description = ?, category = ?, market = ?, specs = ?,
       image_url = ?, video_url = ?, how_it_works = ?, is_published = ?, order_index = ?,
       updated_at = datetime('now') WHERE id = ?`,
      [
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
        id,
      ]
    );

    // Delete old child rows and re-insert
    await Promise.all([
      queryD1("DELETE FROM product_features WHERE product_id = ?", [id]),
      queryD1("DELETE FROM product_applications WHERE product_id = ?", [id]),
      queryD1("DELETE FROM product_operate_steps WHERE product_id = ?", [id]),
      queryD1("DELETE FROM product_tech_specs WHERE product_id = ?", [id]),
      queryD1("DELETE FROM product_images WHERE product_id = ?", [id]),
    ]);

    // Delete models (cascade will handle cells)
    const existingModels = await queryD1("SELECT id FROM product_models WHERE product_id = ?", [id]);
    for (const model of existingModels.results || []) {
      await queryD1("DELETE FROM model_spec_cells WHERE model_id = ?", [model.id]);
    }
    await queryD1("DELETE FROM product_models WHERE product_id = ?", [id]);
    await queryD1("DELETE FROM model_spec_columns WHERE product_id = ?", [id]);

    // Re-insert features
    if (body.features?.length) {
      for (let i = 0; i < body.features.length; i++) {
        const text = typeof body.features[i] === "string" ? body.features[i] : body.features[i].text;
        await queryD1(
          "INSERT INTO product_features (id, product_id, text, order_index) VALUES (?, ?, ?, ?)",
          [nanoid(), id, text, i]
        );
      }
    }

    // Re-insert applications
    if (body.applications?.length) {
      for (let i = 0; i < body.applications.length; i++) {
        const text = typeof body.applications[i] === "string" ? body.applications[i] : body.applications[i].text;
        await queryD1(
          "INSERT INTO product_applications (id, product_id, text, order_index) VALUES (?, ?, ?, ?)",
          [nanoid(), id, text, i]
        );
      }
    }

    // Re-insert operate steps
    if (body.operate_steps?.length) {
      for (let i = 0; i < body.operate_steps.length; i++) {
        const text = typeof body.operate_steps[i] === "string" ? body.operate_steps[i] : body.operate_steps[i].text;
        await queryD1(
          "INSERT INTO product_operate_steps (id, product_id, text, order_index) VALUES (?, ?, ?, ?)",
          [nanoid(), id, text, i]
        );
      }
    }

    // Re-insert tech specs
    if (body.tech_specs?.length) {
      for (let i = 0; i < body.tech_specs.length; i++) {
        await queryD1(
          "INSERT INTO product_tech_specs (id, product_id, label, value, order_index) VALUES (?, ?, ?, ?, ?)",
          [nanoid(), id, body.tech_specs[i].label, body.tech_specs[i].value, i]
        );
      }
    }

    // Re-insert gallery images
    if (body.gallery_images?.length) {
      for (let i = 0; i < body.gallery_images.length; i++) {
        await queryD1(
          "INSERT INTO product_images (id, product_id, url, alt, order_index) VALUES (?, ?, ?, ?, ?)",
          [nanoid(), id, body.gallery_images[i].url, body.gallery_images[i].alt || "", i]
        );
      }
    }

    // Re-insert models
    if (body.models?.length && body.model_columns?.length) {
      const columnIds: string[] = [];
      for (let i = 0; i < body.model_columns.length; i++) {
        const colLabel = typeof body.model_columns[i] === "string" ? body.model_columns[i] : body.model_columns[i].label;
        const colId = nanoid();
        columnIds.push(colId);
        await queryD1(
          "INSERT INTO model_spec_columns (id, product_id, label, order_index) VALUES (?, ?, ?, ?)",
          [colId, id, colLabel, i]
        );
      }

      for (let i = 0; i < body.models.length; i++) {
        const modelId = nanoid();
        const modelName = typeof body.models[i] === "string" ? body.models[i] : body.models[i].name || body.models[i].model_name;
        await queryD1(
          "INSERT INTO product_models (id, product_id, model_name, order_index) VALUES (?, ?, ?, ?)",
          [modelId, id, modelName, i]
        );

        const cells = body.models[i].cells || [];
        for (let j = 0; j < cells.length; j++) {
          if (columnIds[j]) {
            const cellValue = typeof cells[j] === "string" ? cells[j] : cells[j].value;
            await queryD1(
              "INSERT INTO model_spec_cells (id, model_id, column_id, value) VALUES (?, ?, ?, ?)",
              [nanoid(), modelId, columnIds[j], cellValue || ""]
            );
          }
        }
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

    // Manually delete children since D1 may not enforce CASCADE
    const models = await queryD1("SELECT id FROM product_models WHERE product_id = ?", [id]);
    for (const model of models.results || []) {
      await queryD1("DELETE FROM model_spec_cells WHERE model_id = ?", [model.id]);
    }

    await Promise.all([
      queryD1("DELETE FROM product_features WHERE product_id = ?", [id]),
      queryD1("DELETE FROM product_applications WHERE product_id = ?", [id]),
      queryD1("DELETE FROM product_operate_steps WHERE product_id = ?", [id]),
      queryD1("DELETE FROM product_tech_specs WHERE product_id = ?", [id]),
      queryD1("DELETE FROM product_images WHERE product_id = ?", [id]),
      queryD1("DELETE FROM product_models WHERE product_id = ?", [id]),
      queryD1("DELETE FROM model_spec_columns WHERE product_id = ?", [id]),
    ]);

    await queryD1("DELETE FROM products WHERE id = ?", [id]);
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
