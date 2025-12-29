import { RecipeTaxonomyMap } from "@/types/api/recipeTaxonomy";

export const generateRecipeTaxonomyMap = (): RecipeTaxonomyMap => {
  return {
    ingredient: {
      categories: [],
      tags: [],
    },
    prep: {
      categories: [],
      tags: [],
    },
    dish: {
      categories: [],
      tags: [],
    },
	allergens: [],
  };
};
