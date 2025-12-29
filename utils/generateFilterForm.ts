import { UIFilterFormMap, UIFilterRecipeBaseForm, UIFilterRecipeDishForm, UIFilterRecipeIngredientForm, UIFilterRecipePrepForm } from "@/types/ui/recipeFilterForm";


export const generateFilterForm = (): UIFilterFormMap => ({
  ingredient: generateIngredientFilterForm(),
  prep: generatePrepFilterForm(),
  dish: generateDishFilterForm(),
});

/* **************************
 * Base Filter Form
 *****************************/
export const generateBaseFilterForm = (): UIFilterRecipeBaseForm => ({
  name: "",
  name_ja: "",
  status: "active",
  store_id: "",
  category: { id: "", name: "", description: "" },
  tag: [],
  exclude_allergen_ids: [],
});

/* **************************
 * Ingredient Filter Form
 *****************************/
export const generateIngredientFilterForm = (): UIFilterRecipeIngredientForm => ({
  ...generateBaseFilterForm(),
  vendor_id: "",
});

/* **************************
 * Prep Filter Form
 *****************************/
export const generatePrepFilterForm = (): UIFilterRecipePrepForm => ({
  ...generateBaseFilterForm(),
  exclude_allergen_ids: [],
});

/* **************************
 * Dish Filter Form
 *****************************/
export const generateDishFilterForm = (): UIFilterRecipeDishForm => ({
  ...generateBaseFilterForm(),
  exclude_allergen_ids: [],
});
