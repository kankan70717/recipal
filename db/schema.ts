import {
  pgTable,
  varchar,
  pgEnum,
  decimal,
  timestamp,
  primaryKey,
  json,
} from "drizzle-orm/pg-core";

/* ****************** */
/* enums */
/* ****************** */
export const recipeStatusEnum = pgEnum("recipe_status_enum", [
  "active",
  "inactive",
  "pending",
]);

export const unitEnum = pgEnum("unit_enum", [
  // Weight
  "mg",
  "g",
  "kg",
  "lb",
  "oz",
  // Volume
  "ml",
  "l",
  "gal",
  // Count / pieces
  "pcs",
  "dozen",
]);

/* ****************** */
/* stores */
/* ****************** */
export const stores = pgTable("stores", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  address: varchar("address", { length: 512 }),
  notes: varchar("notes", { length: 1024 }),
});

/* ****************** */
/* vendors */
/* ****************** */
export const vendors = pgTable("vendors", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  contact_email: varchar("contact_email", { length: 256 }),
  contact_phone: varchar("contact_phone", { length: 256 }),
  address: varchar("address", { length: 512 }),
});

/* ****************** */
/* allergens */
/* ****************** */
export const allergens = pgTable("allergens", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  group_id: varchar("group_id", { length: 256 })
    .notNull()
    .references(() => allergen_groups.id),
});

export const allergen_groups = pgTable("allergen_groups", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});

/* ****************** */
/* ingredients */
/* ****************** */
export const ingredients = pgTable("ingredients", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  name_ja: varchar("name_ja", { length: 256 }).notNull(),
  status: recipeStatusEnum("status").notNull(),
  store_id: varchar("store_id", { length: 256 })
    .notNull()
    .references(() => stores.id),
  ingredient_category_id: varchar("ingredient_category_id", { length: 256 })
    .notNull()
    .references(() => ingredient_categories.id),
  image_url: varchar("image_url", { length: 2083 }),
  vendor_id: varchar("vendor_id", { length: 256 })
    .notNull()
    .references(() => vendors.id),
  purchase_amount: decimal("purchase_amount").notNull(),
  purchase_unit: unitEnum("purchase_unit").notNull(),
  purchase_price: decimal("purchase_price").notNull(),
  unit_conversion_rate: decimal("unit_conversion_rate").notNull(),
  usage_unit: unitEnum("usage_unit").notNull(),
  yield_rate: decimal("yield_rate").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  created_at: timestamp("created_at").notNull(),
  created_by: varchar("created_by", { length: 256 }).notNull(),
});

export const ingredient_categories = pgTable("ingredient_categories", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 512 }).notNull(),
});

export const ingredient_allergens = pgTable(
  "ingredient_allergens",
  {
    ingredient_id: varchar("ingredient_id", { length: 256 })
      .notNull()
      .references(() => ingredients.id),
    allergen_id: varchar("allergen_id", { length: 256 })
      .notNull()
      .references(() => allergens.id),
  },
  (table) => [
    primaryKey({
      columns: [table.ingredient_id, table.allergen_id],
      name: "ingredient_allergens_pk",
    }),
  ]
);

export const ingredient_tags = pgTable(
  "ingredient_tags",
  {
    ingredient_id: varchar("ingredient_id", { length: 256 })
      .notNull()
      .references(() => ingredients.id),
    tag_id: varchar("tag_id", { length: 256 })
      .notNull()
      .references(() => ingredient_tag_lists.id),
  },
  (table) => [
    primaryKey({
      columns: [table.ingredient_id, table.tag_id],
      name: "ingredient_tags_pk",
    }),
  ]
);

export const ingredient_tag_lists = pgTable("ingredient_tag_lists", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 512 }).notNull(),
});

export const ingredient_snapshots = pgTable("ingredient_snapshots", {
  id: varchar("id", { length: 256 }).primaryKey(),
  ingredient_id: varchar("ingredient_id", { length: 256 })
    .notNull()
    .references(() => ingredients.id),
  snapshot_data: json("snapshot_data").notNull(),
  created_at: timestamp("created_at").notNull(),
  notes: varchar("notes", { length: 512 }),
});

/* ****************** */
/* preps */
/* ****************** */
export const preps = pgTable("preps", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  name_ja: varchar("name_ja", { length: 256 }).notNull(),
  status: recipeStatusEnum("status").notNull(),
  store_id: varchar("store_id", { length: 256 })
    .notNull()
    .references(() => stores.id),
  prep_category_id: varchar("prep_category_id", { length: 256 })
    .notNull()
    .references(() => prep_categories.id),
  image_url: varchar("image_url", { length: 2083 }),
  instruction: varchar("instruction", { length: 2048 }).notNull(),
  finished_amount: decimal("finished_amount").notNull(),
  usage_unit: unitEnum("usage_unit").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  created_at: timestamp("created_at").notNull(),
  created_by: varchar("created_by", { length: 256 }).notNull(),
});

export const prep_categories = pgTable("prep_categories", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 512 }).notNull(),
});

export const prep_tags = pgTable(
  "prep_tags",
  {
    prep_id: varchar("prep_id", { length: 256 })
      .notNull()
      .references(() => preps.id),
    tag_id: varchar("tag_id", { length: 256 })
      .notNull()
      .references(() => prep_tag_lists.id),
  },
  (table) => [
    primaryKey({
      columns: [table.prep_id, table.tag_id],
      name: "prep_tags_pk",
    }),
  ]
);

export const prep_tag_lists = pgTable("prep_tag_lists", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 512 }).notNull(),
});

export const prep_snapshots = pgTable("prep_snapshots", {
  id: varchar("id", { length: 256 }).primaryKey(),
  prep_id: varchar("prep_id", { length: 256 })
    .notNull()
    .references(() => preps.id),
  snapshot_data: json("snapshot_data").notNull(),
  created_at: timestamp("created_at").notNull(),
  notes: varchar("notes", { length: 512 }),
});

/* ****************** */
/* dishes */
/* ****************** */
export const dishes = pgTable("dishes", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  name_ja: varchar("name_ja", { length: 256 }).notNull(),
  status: recipeStatusEnum("status").notNull(),
  recipe_category_id: varchar("recipe_category_id", { length: 256 })
    .notNull()
    .references(() => recipe_categories.id),
  image_url: varchar("image_url", { length: 2083 }),
  description: varchar("description", { length: 1024 }).notNull(),
  instruction: varchar("instruction", { length: 2048 }).notNull(),
  selling_price: decimal("selling_price").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  created_at: timestamp("created_at").notNull(),
  created_by: varchar("created_by", { length: 256 }).notNull(),
});

export const recipe_categories = pgTable("recipe_categories", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 512 }).notNull(),
});

export const dish_tags = pgTable(
  "dish_tags",
  {
    dish_id: varchar("dish_id", { length: 256 }).notNull(),
    tag_id: varchar("tag_id", { length: 256 })
      .notNull()
      .references(() => dish_tag_lists.id),
  },
  (table) => [
    primaryKey({
      columns: [table.dish_id, table.tag_id],
      name: "dish_tags_pk",
    }),
  ]
);

export const dish_tag_lists = pgTable("dish_tag_lists", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 512 }).notNull(),
});

export const dish_snapshots = pgTable("dish_snapshots", {
  id: varchar("id", { length: 256 }).primaryKey(),
  dish_id: varchar("dish_id", { length: 256 })
    .notNull()
    .references(() => dishes.id),
  snapshot_data: json("snapshot_data").notNull(),
  created_at: timestamp("created_at").notNull(),
  notes: varchar("notes", { length: 512 }),
});

/* ****************** */
/* recipe relations */
/* ****************** */
export const dishes_ingredients = pgTable("dishes_ingredients", {
  dish_id: varchar("dish_id", { length: 256 }).notNull(),
  ingredient_id: varchar("ingredient_id", { length: 256 }).notNull(),
  amount: decimal("amount").notNull(),
  notes: varchar("notes", { length: 512 }),
});

export const dishes_ingredients_substitutes = pgTable(
  "dishes_ingredients_substitutes",
  {
    dish_id: varchar("dish_id", { length: 256 }).notNull(),
    original_ingredient_id: varchar("original_ingredient_id", {
      length: 256,
    })
      .notNull()
      .references(() => ingredients.id),
    substitute_ingredient_id: varchar("substitute_ingredient_id", {
      length: 256,
    })
      .notNull()
      .references(() => ingredients.id),
    amount: decimal("amount").notNull(),
    notes: varchar("notes", { length: 512 }),
  },
  (table) => [
    primaryKey({
      columns: [
        table.dish_id,
        table.original_ingredient_id,
        table.substitute_ingredient_id,
      ],
    }),
  ]
);

export const dishes_preps = pgTable(
  "dishes_preps",
  {
    dish_id: varchar("dish_id", { length: 256 }).notNull(),
    prep_id: varchar("prep_id", { length: 256 }).notNull(),
    amount: decimal("amount").notNull(),
    notes: varchar("notes", { length: 512 }),
  },
  (table) => [
    primaryKey({
      columns: [table.dish_id, table.prep_id],
      name: "dishes_preps_pk",
    }),
  ]
);

export const preps_preps_substitutes = pgTable(
  "preps_preps_substitutes",
  {
    prep_id: varchar("prep_id", { length: 256 }).notNull(),
    original_child_prep_id: varchar("original_child_prep_id", { length: 256 })
      .notNull()
      .references(() => preps.id),
    substitute_child_prep_id: varchar("substitute_child_prep_id", {
      length: 256,
    })
      .notNull()
      .references(() => preps.id),
    amount: decimal("amount").notNull(),
    notes: varchar("notes", { length: 512 }),
  },
  (table) => [
    primaryKey({
      columns: [
        table.prep_id,
        table.original_child_prep_id,
        table.substitute_child_prep_id,
      ],
    }),
  ]
);

export const preps_preps = pgTable(
  "preps_preps",
  {
    parent_prep_id: varchar("parent_prep_id", { length: 256 })
      .notNull()
      .references(() => preps.id),
    child_prep_id: varchar("child_prep_id", { length: 256 })
      .notNull()
      .references(() => preps.id),
    amount: decimal("amount").notNull(),
    notes: varchar("notes", { length: 512 }),
  },
  (table) => [
    primaryKey({
      columns: [table.parent_prep_id, table.child_prep_id],
      name: "preps_preps_pk",
    }),
  ]
);

export const preps_ingredients = pgTable(
  "preps_ingredients",
  {
    prep_id: varchar("prep_id", { length: 256 }).notNull(),
    ingredient_id: varchar("ingredient_id", { length: 256 }).notNull(),
    amount: decimal("amount").notNull(),
    notes: varchar("notes", { length: 512 }),
  },
  (table) => [
    primaryKey({
      columns: [table.prep_id, table.ingredient_id],
      name: "preps_ingredients_pk",
    }),
  ]
);

/* ****************** */
/* users */
/* ****************** */
export const users = pgTable("users", {
  id: varchar("id", { length: 256 }).primaryKey(),
  role: varchar("role", { length: 50 }).notNull(),
  store_id: varchar("store_id", { length: 256 })
	.notNull()
	.references(() => stores.id),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
});