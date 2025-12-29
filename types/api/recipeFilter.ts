import { RecipeStatus } from "../domain/recipe";

export type RecipeFilterRequest = {
  name: string | null;
  status: string | null;
  category_id: string | null;
  tag_ids: string[] | null;
  store_id: string | null;
  exclude_allergen_ids: string[] | null;
};

export type RecipeFilterBaseResponse = {
  id: string;
  name: string;
  status: RecipeStatus;
  name_ja: string | null;
  store_id: string;
  category_id: string | null;
  tag_ids: string[] | null;
  image_url: string | null;
};
