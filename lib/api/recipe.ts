import { RecipeType } from "@/db/schema";
import { RecipeFilterRequest } from "@/types/api/recipeFilter";

export const fetchRecipeCategories = async (recipe_type: string) => {
  const res = await fetch(`/api/recipe/categories?recipe_type=${recipe_type}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error((await res.json()).error);
  }

  return res.json();
};

export const fetchRecipeTags = async (recipe_type: string) => {
  const res = await fetch(`/api/recipe/tags?recipe_type=${recipe_type}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error((await res.json()).error);
  }

  return res.json();
};

export const fetchAllergens = async () => {
  const res = await fetch(`/api/recipe/allergens`, {
	method: "GET",
	headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error((await res.json()).error);
  }
  console.log("fetchAllergens response:", res);
  return res.json();
};

export const fetchRecipes = async (
  recipe_type: RecipeType,
  filter?: RecipeFilterRequest
) => {
  const params = new URLSearchParams();
  params.append("recipe_type", recipe_type);

  if (filter) {
    Object.entries(filter).forEach(([key, value]) => {
      if (value == null) return;

      if (Array.isArray(value)) {
        value.forEach((v) => {
          params.append(key, String(v));
        });
      } else {
        params.append(key, String(value));
      }
    });
  }
  console.log("Fetching recipes with params:", params.toString());

  const res = await fetch(`/api/recipe?${params.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error((await res.json()).error);
  }

  return res.json();
};

export const samplePostRecipe = async () => {
  const res = await fetch("/api/recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Test2 Company",
    }),
  });
  if (!res.ok) {
    throw new Error((await res.json()).error);
  }

  return res.json();
};
