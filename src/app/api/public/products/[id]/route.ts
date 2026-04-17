import { queryD1 } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const productResult = await queryD1("SELECT * FROM products WHERE id = ? AND is_published = 1", [id]);
    const product = productResult.results?.[0];
    if (!product) return Response.json({ error: "Not found" }, { status: 404 });

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

    return Response.json({
      ...product,
      features: features.results || [],
      applications: applications.results || [],
      operate_steps: operateSteps.results || [],
      tech_specs: techSpecs.results || [],
      gallery_images: images.results || [],
      models: modelsWithCells,
      model_columns: columns.results || [],
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
