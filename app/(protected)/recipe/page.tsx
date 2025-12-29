'use client';

import PageContent from "@/components/layout/PageContent";
import PageHeader from "@/components/layout/PageHeader";
import { fetchRecipes } from "@/lib/api/recipe";
import { Plus, SlidersHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { RecipeType, recipeTypeList } from "@/db/schema";
import FilterModal from "@/components/modal/FilterModal";
import FormModal from "@/components/modal/FormModal";
import { generateFilterForm } from "@/utils/generateFilterForm";
import Pill from "@/components/ui/Pill";
import { UIFilterFormMap, UIFilterRecipeDishForm, UIFilterRecipeIngredientForm, UIFilterRecipePrepForm } from "@/types/ui/recipeFilterForm";
import { RecipeFilterRequest } from "@/types/api/recipeFilter";
import { RecipeCardList } from "@/components/recipe/RecipeCardList";

const RecipePage = () => {

	const [selectedRecipeType, setSelectedRecipeType] = useState<RecipeType>(recipeTypeList[0]);
	const [filterForms, setFilterForms] = useState<UIFilterFormMap>(generateFilterForm());

	const [filterModalOpen, setFilterModalOpen] = useState(false);
	const [formModalOpen, setFormModalOpen] = useState(false);
	const [recipes, setRecipes] = useState([]);
	console.log("recipes:", recipes);
	
	useEffect(() => {

		const initFetch = async () => {
			try {
				const data = await fetchRecipes("dish");
				setRecipes(data.recipes);
			} catch (error) {
				console.error("Error fetching recipes:", error);
			}
		};

		initFetch();
	}, []);

	const normalizeFilter = (form: UIFilterRecipeIngredientForm | UIFilterRecipePrepForm | UIFilterRecipeDishForm): RecipeFilterRequest => ({
		name: form.name || null,
		status: form.status || null,
		category_id: form.category.id || null,
		tag_ids: form.tag.length > 0 ? form.tag.map(t => t.id) : null,
		store_id: form.store_id || null,
		exclude_allergen_ids: form.exclude_allergen_ids.length > 0 ? form.exclude_allergen_ids : null,
	});

	const handleFilterApply = async (recipeType: RecipeType, filterForm: UIFilterFormMap) => {

		try {
			const normalizedFilterForm = normalizeFilter(filterForm[recipeType]);
			const data = await fetchRecipes(recipeType, normalizedFilterForm);
			setRecipes(data.recipes);
			setFilterModalOpen(false);
		} catch (error) {
			console.error("Error fetching recipes with filters:", error);
		}
	};

	return (
		<>
			<div className="flex flex-col relative h-dvh">
				<PageHeader title="Recipe" />

				<FilterModal
					isOpen={filterModalOpen}
					onClose={() => { setFilterModalOpen(false); }}
					selectedRecipeType={selectedRecipeType}
					setSlectedRecipeType={setSelectedRecipeType}
					filterForms={filterForms}
					setFilterForms={setFilterForms}
					onApply={handleFilterApply}
				/>

				<FormModal isOpen={formModalOpen} onClose={() => setFormModalOpen(false)} />

				<PageContent>
					{/* content header */}
					<div className="flex mb-5 gap-5 justify-end items-center">
						<div className="mr-auto flex flex-col gap-2">
							<span className="capitalize text-lg font-semibold whitespace-nowrap">{selectedRecipeType}: {filterForms[selectedRecipeType].status}</span>
							<div className="flex flex-wrap gap-2">
								{
									filterForms[selectedRecipeType].name !== "" && (<Pill label={filterForms[selectedRecipeType].name} />)
								}
								{
									filterForms[selectedRecipeType].category.name !== "" && (<Pill label={filterForms[selectedRecipeType].category.name} />)
								}
								{
									filterForms[selectedRecipeType].tag.length > 0 && filterForms[selectedRecipeType].tag.map((tag, index) => (
										<Pill key={index} label={tag.name} />
									))
								}
							</div>
						</div>
						<span className="flex items-center gap-2 md:px-4 p-2 border border-primary-500 rounded-full cursor-pointer" onClick={() => setFilterModalOpen(true)}>
							<SlidersHorizontalIcon width={20} height={20} />
							<span className="hidden md:block">Filter</span>
						</span>

						<span className="md:flex hidden items-center gap-2 md:px-4 p-2 border border-primary-500 bg-primary-500 text-white rounded-full cursor-pointer" onClick={() => setFormModalOpen(true)}>
							<Plus width={20} height={20} />
							<span className="hidden md:block">Add</span>
						</span>
					</div>

					{/* list */}
					<RecipeCardList recipes={recipes} />

					{/* <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 bg-white">
						{
							recipes.length > 0
								? recipes.map((recipe: Ingredient | Prep | Dish) => (
									<div key={recipe.id} className="rounded-2xl shadow-2xl">
										<div className="relative w-full h-auto aspect-square flex items-center justify-center">
											{
												recipe.image_url
													? (<Image src={recipe.image_url} alt={recipe.name} fill={true} objectFit="cover" className="rounded-t-2xl" />)
													: (<ImageOff className="w-1/2 h-1/2 text-primary-100" />)
											}
										</div>
										<div className="p-4">
											<h3 className="text-lg font-semibold">{recipe.name}</h3>
										</div>
									</div>
								))
								: <div className="col-span-full flex flex-col items-center justify-center p-10 text-primary-200">
									<span className="mb-4"><SearchX width={100} height={100} /></span>
									<span>No recipes found</span>
								</div>
						}
					</div> */}
				</PageContent>

				{/* mobile add btn */}
				<div className="md:hidden block fixed bg-primary-500 text-white right-5 bottom-25 p-2 rounded-full" onClick={() => setFormModalOpen(true)}>
					<Plus width={30} height={30} />
				</div>

			</div>
		</>
	);
};

export default RecipePage;