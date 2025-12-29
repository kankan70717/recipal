import { RecipeStatus } from "../domain/recipe";

export type UIFilterCategoryTag = {
  id: string;
  name: string;
  description?: string;
};

export type UIFilterRecipeBaseForm = {
  name: string;
  name_ja: string;
  status: RecipeStatus;
  store_id: string;
  category: UIFilterCategoryTag;
  tag: UIFilterCategoryTag[];
  exclude_allergen_ids: string[];
};

export type UIFilterRecipeIngredientForm = UIFilterRecipeBaseForm & {
  vendor_id: string;
};

export type UIFilterRecipePrepForm = UIFilterRecipeBaseForm;
export type UIFilterRecipeDishForm = UIFilterRecipeBaseForm;

export type UIFilterFormMap = {
  ingredient: UIFilterRecipeIngredientForm;
  prep: UIFilterRecipePrepForm;
  dish: UIFilterRecipeDishForm;
};
