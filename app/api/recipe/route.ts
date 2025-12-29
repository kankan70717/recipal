import { getUserInfo } from "@/lib/auth/getUserInfo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { supabase, user, companyId } = await getUserInfo();
  if (!user || !companyId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const name = formData.get("name") as string;
  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json({ error: "Image is required" }, { status: 400 });
  }

  // --- 1. Upload Image in Storage ---
  const filePath = `company_${companyId}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("company-assets")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
      metadata: {
        company_id: companyId,
      },
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // --- 2. 公開URL取得 ---
  const { data: urlData } = supabase.storage
    .from("images")
    .getPublicUrl(filePath);

  const imageUrl = urlData.publicUrl;

  // --- 3. DB 保存 ---
  const { error: dbError } = await supabase.from("recipes").insert({
    name,
    image_url: imageUrl,
  });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ url: imageUrl }, { status: 200 });
}

export async function GET(req: NextRequest) {
  const { supabase, user, company_id, store_id } = await getUserInfo();
  if (!user || !company_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const recipe_type = req.nextUrl.searchParams.get("recipe_type");
  const name = req.nextUrl.searchParams.get("name");
  const name_ja = req.nextUrl.searchParams.get("name_ja");
  const status = req.nextUrl.searchParams.get("status");
  const category_id = req.nextUrl.searchParams.get("category_id");
  const vendor_id = req.nextUrl.searchParams.get("vendor_id");
  const tag_ids = req.nextUrl.searchParams.getAll("tag_ids");
  const exclude_allergen_ids = req.nextUrl.searchParams.getAll(
    "exclude_allergen_ids"
  );

  const allowedTypes = ["ingredient", "prep", "dish"];
  if (!recipe_type || !allowedTypes.includes(recipe_type)) {
    return NextResponse.json({ error: "Invalid recipe_type" }, { status: 400 });
  }

  /* ************************ */
  /* search safe ingredients */
  /* ************************ */
  let safeIngredientIds: string[] = [];
  if (exclude_allergen_ids.length > 0) {
    const { data: ngIngredients, error: ngError } = await supabase
      .from("ingredient_allergens")
      .select("ingredient_id")
      .in("allergen_id", exclude_allergen_ids);

    if (ngError) {
      return NextResponse.json({ error: ngError.message }, { status: 500 });
    }
    const ngIngredientIds = ngIngredients.map((i) => i.ingredient_id);
    const { data, error } = await supabase
      .from("ingredient")
      .select("id")
      .not("id", "in", `(${ngIngredientIds.join(",")})`);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    safeIngredientIds = data.map((d) => d.id);
    console.log("Safe Ingredient IDs:", safeIngredientIds);
  }

  /* ************************ */
  /* search safe preps recursively */
  /* ************************ */
  let safePrepIds: string[] | null = null;

  if (exclude_allergen_ids.length > 0 && safeIngredientIds.length > 0) {
    const { data: unsafePrepData, error: unsafeError } = await supabase.rpc(
      "get_unsafe_preps_recursive",
      { safe_ingredient_ids: safeIngredientIds }
    );

    if (unsafeError) {
      return NextResponse.json({ error: unsafeError.message }, { status: 500 });
    }

    const unsafePrepIds = unsafePrepData.map((p) => p.id);
    console.log("Unsafe Prep IDs:", unsafePrepIds);

    // safe prep は全 prep から unsafe prep を除外
    const { data: allPreps, error: allError } = await supabase
      .from("prep")
      .select("id")
      .not("id", "in", `(${unsafePrepIds.join(",")})`);

    if (allError) {
      return NextResponse.json({ error: allError.message }, { status: 500 });
    }

    safePrepIds = allPreps.map((p) => p.id);
    console.log("Safe Prep IDs:", safePrepIds);
  }

  /* ************************ */
  /* Main Query */
  /* ************************ */
  let query;
  if (recipe_type === "ingredient") {
    query = supabase.from(recipe_type).select(
      `
		*,
		${recipe_type}_tags${tag_ids.length > 0 ? "!inner" : ""}(
			tag_id,
			${recipe_type}_tag_lists(
				name
				)
		),
		ingredient_allergens(
			allergen_id,
			allergens(
				name
			)
		)	
	`
    );
  } else if (recipe_type === "prep") {
    query = supabase.from(recipe_type).select(
      `
		*,
		${recipe_type}_tags${tag_ids.length > 0 ? "!inner" : ""}(
			tag_id,
			${recipe_type}_tag_lists(
				name
				)
		)
	`
    );

    if (safePrepIds && safePrepIds.length > 0) {
      query = query.in("id", safePrepIds);
    }
  } else if (recipe_type === "dish") {
  } else {
    return NextResponse.json({ error: "Invalid recipe_type" }, { status: 400 });
  }

  if (query) {
    query = query.eq("company_id", company_id).eq("store_id", store_id);

    if (name) {
      query = query.ilike("name", `%${name}%`);
    }
    if (name_ja) {
      query = query.ilike("name_ja", `%${name_ja}%`);
    }
    if (status) {
      query = query.eq("status", status);
    }
    if (store_id) {
      query = query.eq("store_id", store_id);
    }
    if (category_id) {
      query = query.eq("category_id", category_id);
    }
    if (vendor_id) {
      query = query.eq("vendor_id", vendor_id);
    }
    if (tag_ids.length > 0) {
      query = query.in(`${recipe_type}_tags.tag_id`, tag_ids);
    }
    if (recipe_type === "ingredient" && exclude_allergen_ids.length > 0) {
      query = query.in("id", safeIngredientIds);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching recipes:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ recipes: data }, { status: 200 });
  }
}
