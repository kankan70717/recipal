import "dotenv/config";
import { db } from "@/lib/db/db";
import {
  stores,
  users,
  company,
  vendors,
  ingredients,
  ingredient_categories,
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
    email: "admin@recipal.com",
    name: "Admin User",
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
    .values({
      name: "Vegetables",
      description: "Fresh vegetables",
	  company_id: companyId,
    })
    .returning({ id: ingredient_categories.id });

  const ingredientCategoryId = insertedCategory.id;

  /* ingredients */
  await db.insert(ingredients).values({
    name: "Carrot",
    name_ja: "にんじん",
    status: "active",
    store_id: storeId,
    ingredient_category_id: ingredientCategoryId,
    image_url: "",
    vendor_id: vendorId,
    purchase_amount: 100,
    purchase_unit: "g",
    purchase_price: 2.5,
    unit_conversion_rate: 1,
    usage_unit: "g",
    yield_rate: 1,
    updated_at: new Date(),
    created_at: new Date(),
    created_by: "admin@recipal.com",
	company_id: companyId,
  });

  console.log("✅ Seed finished");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
