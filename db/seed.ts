import "dotenv/config";
import { db } from "@/lib/db/db";
import {
  stores,
  users,
  company,
  vendors,
  ingredient,
  ingredient_categories,
  allergens,
  allergen_groups,
  ingredient_allergens,
  ingredient_tag_lists,
  ingredient_tags,
  prep,
  prep_ingredient,
  prep_categories,
  prep_prep,
} from "./schema";

async function main() {
  /* company */
  const [insertedCompany] = await db
    .insert(company)
    .values({
      name: "ReciPal Corp",
      address: "123 Main St",
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning({ id: company.id });

  const companyId = insertedCompany.id;

  /* stores */
  const [insertedStore] = await db
    .insert(stores)
    .values({
      name: "Main Store",
      address: "123 Main St",
      company_id: companyId,
      notes: "Flagship store",
    })
    .returning({ id: stores.id });

  const storeId = insertedStore.id;

  /* users */
  await db.insert(users).values({
    id: "bf1f2d0c-4c9c-4deb-81bd-7e60eda8b33a",
    email: "sample@gmail.com",
    name: "Test User",
    role: "admin",
    store_id: storeId,
    company_id: companyId,
    created_at: new Date(),
    updated_at: new Date(),
  });

  /* vendors */
  const [insertedVendor] = await db
    .insert(vendors)
    .values({
      name: "Fresh Veggies Ltd",
      contact_email: "contact@freshveggies.com",
      contact_phone: "1234567890",
      address: "456 Vendor St",
      company_id: companyId,
    })
    .returning({ id: vendors.id });

  const vendorId = insertedVendor.id;

  /* ingredient_categories */
  const [insertedCategory] = await db
    .insert(ingredient_categories)
    .values([
      {
        name: "vegetaglee",
        description: "Fresh vegetable",
        company_id: companyId,
        store_id: storeId,
      },
      {
        name: "fruit",
        description: "Fresh fruit",
        company_id: companyId,
        store_id: storeId,
      },
    ])
    .returning({ id: ingredient_categories.id });
  const ingredientCategoryId = insertedCategory.id;

  /* ingredient_tag_lists */
  const ingredientTagLists = await db
    .insert(ingredient_tag_lists)
    .values([
      {
        name: "chrismas",
        description: "tags for christmas special menu",
        company_id: companyId,
      },
      {
        name: "winter",
        description: "tags for winter special menu",
        company_id: companyId,
      },
      {
        name: "holiday",
        description: "tags for holiday special menu",
        company_id: companyId,
      },
    ])
    .returning({ id: ingredient_tag_lists.id });

  /* ingredient */
  const insertedIngredient = await db
    .insert(ingredient)
    .values([
      {
        name: "Carrot",
        name_ja: "にんじん",
        status: "active",
        store_id: storeId,
        category_id: ingredientCategoryId,
        image_url:
          "https://qdqhttlktqplyvrcepbs.supabase.co/storage/v1/object/sign/company-assets/annie-spratt-m1t-RJ1iCIU-unsplash.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YzEyNWY2Zi01MGVmLTQxMmEtYjIzMS05MDVjN2I3MmMxYjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb21wYW55LWFzc2V0cy9hbm5pZS1zcHJhdHQtbTF0LVJKMWlDSVUtdW5zcGxhc2guanBnIiwiaWF0IjoxNzY1OTI3Mjk3LCJleHAiOjE3NjY1MzIwOTd9.qyFAyUUXapaUuiDc2Khh0I6KhaBcPhV7_8pBU4DyeO0",
        vendor_id: vendorId,
        purchase_amount: 100,
        purchase_unit: "g",
        purchase_price: 2.5,
        usage_unit: "g",
        yield_rate: 0.95,
        updated_at: new Date(),
        created_at: new Date(),
        created_by: "admin@recipal.com",
        company_id: companyId,
      },
      {
        name: "Onion",
        name_ja: "たまねぎ",
        status: "active",
        store_id: storeId,
        category_id: ingredientCategoryId,
        image_url:
          "https://qdqhttlktqplyvrcepbs.supabase.co/storage/v1/object/sign/company-assets/annie-spratt-m1t-RJ1iCIU-unsplash.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YzEyNWY2Zi01MGVmLTQxMmEtYjIzMS05MDVjN2I3MmMxYjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb21wYW55LWFzc2V0cy9hbm5pZS1zcHJhdHQtbTF0LVJKMWlDSVUtdW5zcGxhc2guanBnIiwiaWF0IjoxNzY1OTI3Mjk3LCJleHAiOjE3NjY1MzIwOTd9.qyFAyUUXapaUuiDc2Khh0I6KhaBcPhV7_8pBU4DyeO0",
        vendor_id: vendorId,
        purchase_amount: 200,
        purchase_unit: "g",
        purchase_price: 1.8,
        usage_unit: "g",
        yield_rate: 0.9,
        updated_at: new Date(),
        created_at: new Date(),
        created_by: "admin@recipal.com",
        company_id: companyId,
      },
      {
        name: "Potato",
        name_ja: "じゃがいも",
        status: "active",
        store_id: storeId,
        category_id: ingredientCategoryId,
        image_url:
          "https://qdqhttlktqplyvrcepbs.supabase.co/storage/v1/object/sign/company-assets/annie-spratt-m1t-RJ1iCIU-unsplash.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YzEyNWY2Zi01MGVmLTQxMmEtYjIzMS05MDVjN2I3MmMxYjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb21wYW55LWFzc2V0cy9hbm5pZS1zcHJhdHQtbTF0LVJKMWlDSVUtdW5zcGxhc2guanBnIiwiaWF0IjoxNzY1OTI3Mjk3LCJleHAiOjE3NjY1MzIwOTd9.qyFAyUUXapaUuiDc2Khh0I6KhaBcPhV7_8pBU4DyeO0",
        vendor_id: vendorId,
        purchase_amount: 300,
        purchase_unit: "g",
        purchase_price: 3.2,
        usage_unit: "g",
        yield_rate: 0.85,
        updated_at: new Date(),
        created_at: new Date(),
        created_by: "admin@recipal.com",
        company_id: companyId,
      },
      {
        name: "Garlic",
        name_ja: "にんにく",
        status: "active",
        store_id: storeId,
        category_id: ingredientCategoryId,
        image_url:
          "https://qdqhttlktqplyvrcepbs.supabase.co/storage/v1/object/sign/company-assets/annie-spratt-m1t-RJ1iCIU-unsplash.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YzEyNWY2Zi01MGVmLTQxMmEtYjIzMS05MDVjN2I3MmMxYjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb21wYW55LWFzc2V0cy9hbm5pZS1zcHJhdHQtbTF0LVJKMWlDSVUtdW5zcGxhc2guanBnIiwiaWF0IjoxNzY1OTI3Mjk3LCJleHAiOjE3NjY1MzIwOTd9.qyFAyUUXapaUuiDc2Khh0I6KhaBcPhV7_8pBU4DyeO0",
        vendor_id: vendorId,
        purchase_amount: 50,
        purchase_unit: "g",
        purchase_price: 1.2,
        usage_unit: "g",
        yield_rate: 0.8,
        updated_at: new Date(),
        created_at: new Date(),
        created_by: "admin@recipal.com",
        company_id: companyId,
      },
      {
        name: "Tomato",
        name_ja: "トマト",
        status: "active",
        store_id: storeId,
        category_id: ingredientCategoryId,
        image_url:
          "https://qdqhttlktqplyvrcepbs.supabase.co/storage/v1/object/sign/company-assets/annie-spratt-m1t-RJ1iCIU-unsplash.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YzEyNWY2Zi01MGVmLTQxMmEtYjIzMS05MDVjN2I3MmMxYjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb21wYW55LWFzc2V0cy9hbm5pZS1zcHJhdHQtbTF0LVJKMWlDSVUtdW5zcGxhc2guanBnIiwiaWF0IjoxNzY1OTI3Mjk3LCJleHAiOjE3NjY1MzIwOTd9.qyFAyUUXapaUuiDc2Khh0I6KhaBcPhV7_8pBU4DyeO0",
        vendor_id: vendorId,
        purchase_amount: 250,
        purchase_unit: "g",
        purchase_price: 2.9,
        usage_unit: "g",
        yield_rate: 0.88,
        updated_at: new Date(),
        created_at: new Date(),
        created_by: "admin@recipal.com",
        company_id: companyId,
      },
      {
        name: "Cabbage",
        name_ja: "キャベツ",
        status: "active",
        store_id: storeId,
        category_id: ingredientCategoryId,
        image_url:
          "https://qdqhttlktqplyvrcepbs.supabase.co/storage/v1/object/sign/company-assets/annie-spratt-m1t-RJ1iCIU-unsplash.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YzEyNWY2Zi01MGVmLTQxMmEtYjIzMS05MDVjN2I3MmMxYjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb21wYW55LWFzc2V0cy9hbm5pZS1zcHJhdHQtbTF0LVJKMWlDSVUtdW5zcGxhc2guanBnIiwiaWF0IjoxNzY1OTI3Mjk3LCJleHAiOjE3NjY1MzIwOTd9.qyFAyUUXapaUuiDc2Khh0I6KhaBcPhV7_8pBU4DyeO0",
        vendor_id: vendorId,
        purchase_amount: 500,
        purchase_unit: "g",
        purchase_price: 3.5,
        usage_unit: "g",
        yield_rate: 0.75,
        updated_at: new Date(),
        created_at: new Date(),
        created_by: "admin@recipal.com",
        company_id: companyId,
      },
      {
        name: "Chicken Breast",
        name_ja: "鶏むね肉",
        status: "active",
        store_id: storeId,
        category_id: ingredientCategoryId,
        image_url:
          "https://qdqhttlktqplyvrcepbs.supabase.co/storage/v1/object/sign/company-assets/annie-spratt-m1t-RJ1iCIU-unsplash.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YzEyNWY2Zi01MGVmLTQxMmEtYjIzMS05MDVjN2I3MmMxYjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb21wYW55LWFzc2V0cy9hbm5pZS1zcHJhdHQtbTF0LVJKMWlDSVUtdW5zcGxhc2guanBnIiwiaWF0IjoxNzY1OTI3Mjk3LCJleHAiOjE3NjY1MzIwOTd9.qyFAyUUXapaUuiDc2Khh0I6KhaBcPhV7_8pBU4DyeO0",
        vendor_id: vendorId,
        purchase_amount: 400,
        purchase_unit: "g",
        purchase_price: 5.8,
        usage_unit: "g",
        yield_rate: 0.92,
        updated_at: new Date(),
        created_at: new Date(),
        created_by: "admin@recipal.com",
        company_id: companyId,
      },
      {
        name: "Pork Belly",
        name_ja: "豚バラ肉",
        status: "active",
        store_id: storeId,
        category_id: ingredientCategoryId,
        image_url:
          "https://qdqhttlktqplyvrcepbs.supabase.co/storage/v1/object/sign/company-assets/annie-spratt-m1t-RJ1iCIU-unsplash.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YzEyNWY2Zi01MGVmLTQxMmEtYjIzMS05MDVjN2I3MmMxYjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb21wYW55LWFzc2V0cy9hbm5pZS1zcHJhdHQtbTF0LVJKMWlDSVUtdW5zcGxhc2guanBnIiwiaWF0IjoxNzY1OTI3Mjk3LCJleHAiOjE3NjY1MzIwOTd9.qyFAyUUXapaUuiDc2Khh0I6KhaBcPhV7_8pBU4DyeO0",
        vendor_id: vendorId,
        purchase_amount: 500,
        purchase_unit: "g",
        purchase_price: 6.4,
        usage_unit: "g",
        yield_rate: 0.9,
        updated_at: new Date(),
        created_at: new Date(),
        created_by: "admin@recipal.com",
        company_id: companyId,
      },
      {
        name: "Consomme",
        name_ja: "コンソメ",
        status: "active",
        store_id: storeId,
        category_id: ingredientCategoryId,
        image_url:
          "https://qdqhttlktqplyvrcepbs.supabase.co/storage/v1/object/sign/company-assets/annie-spratt-m1t-RJ1iCIU-unsplash.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YzEyNWY2Zi01MGVmLTQxMmEtYjIzMS05MDVjN2I3MmMxYjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb21wYW55LWFzc2V0cy9hbm5pZS1zcHJhdHQtbTF0LVJKMWlDSVUtdW5zcGxhc2guanBnIiwiaWF0IjoxNzY1OTI3Mjk3LCJleHAiOjE3NjY1MzIwOTd9.qyFAyUUXapaUuiDc2Khh0I6KhaBcPhV7_8pBU4DyeO0",
        vendor_id: vendorId,
        purchase_amount: 1000,
        purchase_unit: "g",
        purchase_price: 4.0,
        usage_unit: "g",
        yield_rate: 1.0,
        updated_at: new Date(),
        created_at: new Date(),
        created_by: "admin@recipal.com",
        company_id: companyId,
      },
      {
        name: "Water",
        name_ja: "水",
        status: "active",
        store_id: storeId,
        category_id: ingredientCategoryId,
        image_url:
          "https://qdqhttlktqplyvrcepbs.supabase.co/storage/v1/object/sign/company-assets/annie-spratt-m1t-RJ1iCIU-unsplash.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YzEyNWY2Zi01MGVmLTQxMmEtYjIzMS05MDVjN2I3MmMxYjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb21wYW55LWFzc2V0cy9hbm5pZS1zcHJhdHQtbTF0LVJKMWlDSVUtdW5zcGxhc2guanBnIiwiaWF0IjoxNzY1OTI3Mjk3LCJleHAiOjE3NjY1MzIwOTd9.qyFAyUUXapaUuiDc2Khh0I6KhaBcPhV7_8pBU4DyeO0",
        vendor_id: vendorId,
        purchase_amount: 2000,
        purchase_unit: "g",
        purchase_price: 1.0,
        usage_unit: "g",
        yield_rate: 1.0,
        updated_at: new Date(),
        created_at: new Date(),
        created_by: "admin@recipal.com",
        company_id: companyId,
      },
    ])
    .returning({ id: ingredient.id });

  /* ingredient_tags */
  await db.insert(ingredient_tags).values([
    {
      ingredient_id: insertedIngredient[0].id,
      tag_id: ingredientTagLists[0].id,
      company_id: companyId,
    },
    {
      ingredient_id: insertedIngredient[0].id,
      tag_id: ingredientTagLists[1].id,
      company_id: companyId,
    },
    {
      ingredient_id: insertedIngredient[0].id,
      tag_id: ingredientTagLists[2].id,
      company_id: companyId,
    },
  ]);

  /* allergen group */
  const group = await db
    .insert(allergen_groups)
    .values([
      {
        name: "Shelfish",
        company_id: companyId,
      },
      {
        name: "Nuts",
        company_id: companyId,
      },
      {
        name: "Dairy",
        company_id: companyId,
      },
    ])
    .returning({ id: allergen_groups.id });

  /* allergens */
  const insertedAllergens = await db
    .insert(allergens)
    .values([
      {
        name: "crab",
        group_id: group[0].id,
        company_id: companyId,
      },
      {
        name: "shrimp",
        group_id: group[0].id,
        company_id: companyId,
      },
      {
        name: "seaurchin",
        group_id: group[0].id,
        company_id: companyId,
      },
      {
        name: "clam",
        group_id: group[0].id,
        company_id: companyId,
      },
      {
        name: "peanut",
        group_id: group[1].id,
        company_id: companyId,
      },
      {
        name: "almond",
        group_id: group[1].id,
        company_id: companyId,
      },
      {
        name: "milk",
        group_id: group[2].id,
        company_id: companyId,
      },
      {
        name: "cheese",
        group_id: group[2].id,
        company_id: companyId,
      },
    ])
    .returning({
      id: allergens.id,
      name: allergens.name,
    });

  /* ingredient_allergens */
  await db.insert(ingredient_allergens).values([
    {
      ingredient_id: insertedIngredient[0].id,
      allergen_id: insertedAllergens[0].id,
      company_id: companyId,
    },
    {
      ingredient_id: insertedIngredient[0].id,
      allergen_id: insertedAllergens[1].id,
      company_id: companyId,
    },
  ]);

  /********************
   ** prep
   ***********************/
  const insertedPrepCategories = await db
    .insert(prep_categories)
    .values([
      {
        name: "saurce",
        description: "Prep sauce category",
        company_id: companyId,
        store_id: storeId,
      },
    ])
    .returning({ id: ingredient_categories.id });

  const insertedPrep = await db
    .insert(prep)
    .values([
      {
        name: "vegetable saurce",
        name_ja: "野菜ソース",
        status: "active",
        store_id: storeId,
        category_id: insertedPrepCategories[0].id,
        image_url: null,
        instruction: "Chop all vegetables finely and mix well.",
        finished_amount: 1000,
        usage_unit: "g",
        updated_at: new Date(),
        created_at: new Date(),
        created_by: "test",
        company_id: companyId,
      },
      {
        name: "consomme soup",
        name_ja: "コンソメスープ",
        status: "active",
        store_id: storeId,
        category_id: insertedPrepCategories[0].id,
        image_url: null,
        instruction: "mix water and consomme powder well.",
        finished_amount: 1000,
        usage_unit: "g",
        updated_at: new Date(),
        created_at: new Date(),
        created_by: "test",
        company_id: companyId,
      },
      {
        name: "vegetable soup",
        name_ja: "野菜スープ",
        status: "active",
        store_id: storeId,
        category_id: insertedPrepCategories[0].id,
        image_url: null,
        instruction: "mix water and vegetable source well.",
        finished_amount: 1000,
        usage_unit: "g",
        updated_at: new Date(),
        created_at: new Date(),
        created_by: "test",
        company_id: companyId,
      },
    ])
    .returning({ id: prep.id });

  await db.insert(prep_ingredient).values([
    {
      prep_id: insertedPrep[0].id,
      ingredient_id: insertedIngredient[0].id,
      amount: 500,
      company_id: companyId,
    },
    {
      prep_id: insertedPrep[0].id,
      ingredient_id: insertedIngredient[1].id,
      amount: 300,
      company_id: companyId,
    },
    {
      prep_id: insertedPrep[0].id,
      ingredient_id: insertedIngredient[2].id,
      amount: 200,
      company_id: companyId,
    },
    {
      prep_id: insertedPrep[1].id,
      ingredient_id: insertedIngredient[8].id,
      amount: 100,
      company_id: companyId,
    },
    {
      prep_id: insertedPrep[1].id,
      ingredient_id: insertedIngredient[9].id,
      amount: 900,
      company_id: companyId,
    },
  ]);

  await db.insert(prep_prep).values([
    {
      parent_prep_id: insertedPrep[2].id,
      child_prep_id: insertedPrep[0].id,
      amount: 200,
      company_id: companyId,
    },
    {
      parent_prep_id: insertedPrep[2].id,
      child_prep_id: insertedPrep[1].id,
      amount: 300,
      company_id: companyId,
    },
  ]);

  /* Create View for prep ingredients and child preps */
/*   const createViewSQL = `
	DROP VIEW IF EXISTS prep_view;

	CREATE OR REPLACE VIEW prep_view AS
	WITH RECURSIVE prep_tree AS (
		-- ルート prep のみを起点にする
		SELECT
			p.id AS root_prep_id,
			p.id AS prep_id,
			p.name AS prep_name,
			ARRAY[p.id]::varchar[] AS path
		FROM prep p
		LEFT JOIN prep_prep pp
			ON pp.child_prep_id = p.id
		WHERE pp.parent_prep_id IS NULL

		UNION ALL

		-- 子 prep を再帰展開
		SELECT
			pt.root_prep_id,
			c.id AS prep_id,
			c.name AS prep_name,
			pt.path || c.id
		FROM prep_tree pt
		JOIN prep_prep pp
			ON pp.parent_prep_id = pt.prep_id
		JOIN prep c
			ON c.id = pp.child_prep_id
		WHERE NOT c.id = ANY(pt.path)
	)
	SELECT
		pt.root_prep_id,
		MIN(pt.prep_name) AS root_prep_name,
		array_agg(DISTINCT pp.child_prep_id) AS child_prep_ids,
		array_agg(DISTINCT pi.ingredient_id) AS ingredient_ids,
		array_agg(DISTINCT i.name) AS ingredient_names
	FROM prep_tree pt
	LEFT JOIN prep_prep pp
		ON pp.parent_prep_id = pt.prep_id
	LEFT JOIN prep_ingredient pi
		ON pi.prep_id = pt.prep_id
	LEFT JOIN ingredient i
		ON i.id = pi.ingredient_id
	GROUP BY pt.root_prep_id
	ORDER BY root_prep_name;  -- ← ここは SELECT 別名
`;

  await db.execute(createViewSQL); */
  console.log("View prep_view created!");

  console.log("✅ Seed finished");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
