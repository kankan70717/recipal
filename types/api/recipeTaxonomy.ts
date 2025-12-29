export type RecipeTaxonomy = {
  id: string;
  name: string;
  description: string | null;
};

export type RecipeGroupedAllergen= {
  id: string;
  name: string;
  allergens: {
    id: string;
    name: string;
  }[];
};

export type RecipeTaxonomyMap = {
  ingredient: {
    categories: RecipeTaxonomy[];
    tags: RecipeTaxonomy[];
  };
  prep: {
    categories: RecipeTaxonomy[];
    tags: RecipeTaxonomy[];
  };
  dish: {
    categories: RecipeTaxonomy[];
    tags: RecipeTaxonomy[];
  };
  allergens: RecipeGroupedAllergen[];
};
