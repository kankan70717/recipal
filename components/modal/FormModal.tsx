'use client';

import RadioBtn from "../form/RadioBtn";
import { DishCategory, IngredientCategory, PrepCategory, RecipeType, recipeTypeList } from "@/db/schema";
import LabeledInput from "../form/LabeledInput";
import LabeledSelect from "../form/LabeledSelect";
import SubmitBtn from "../form/SubmitBtn";
import { useEffect, useState } from "react";
import { fetchRecipeCategories, fetchRecipeTags } from "@/lib/api/recipe";
import BaseModal from "./BaseModal";
import { generateEmptyIngredientForm } from "@/utils/generateIngredientForm";
import LabeledMultiSelect from "../form/LabeledMultiSelect";

const FormModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {

	const [selectedRecipeType, setSelectedRecipeType] = useState<RecipeType>(recipeTypeList[0]);
	const [ingredientFormData, setIngredientFormData] = useState(generateEmptyIngredientForm());

	const [ingredientCategories, setIngredientCategories] = useState<string[] | null>(null);
	const [ingredientTags, setIngredientTags] = useState<string[] | null>(null);

	const [prepCategories, setPrepCategories] = useState<string[] | null>(null);
	const [prepTags, setPrepTags] = useState<string[] | null>(null);

	const [dishCategories, setDishCategories] = useState<string[] | null>(null);
	const [dishTags, setDishTags] = useState<string[] | null>(null);

	useEffect(() => {

		const fetchCategoriesAndTags = async () => {

			/* init form */
			setIngredientFormData(generateEmptyIngredientForm());

			if (selectedRecipeType === "ingredient" && ingredientCategories !== null && ingredientTags !== null) return;
			if (selectedRecipeType === "prep" && prepCategories !== null && prepTags !== null) return;
			if (selectedRecipeType === "dish" && dishCategories !== null && dishTags !== null) return;

			try {
				const categoryObj = await fetchRecipeCategories(selectedRecipeType);
				const tags = await fetchRecipeTags(selectedRecipeType);

				if (selectedRecipeType === "ingredient") {
					setIngredientCategories(categoryObj.data.map((category: IngredientCategory) => category.name));
					setIngredientTags(tags.data);

				} else if (selectedRecipeType === "prep") {
					setPrepCategories(categoryObj.data.map((category: PrepCategory) => category.name));
					setPrepTags(tags.data);

				} else if (selectedRecipeType === "dish") {
					setDishCategories(categoryObj.data.map((category: DishCategory) => category.name));
					setDishTags(tags.data);
				}

			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategoriesAndTags();

	}, [selectedRecipeType]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget as HTMLFormElement);
		console.log("Form Data:", formData);

		onClose();
	};

	return (
		<BaseModal title="New Recipe" isOpen={isOpen} onClose={onClose}>
			<form className="mt-15 overflow-y-auto max-h-[60vh] flex flex-col gap-5 p-1" onSubmit={handleSubmit}>
				<RadioBtn<RecipeType> label="Recipe Type" list={recipeTypeList} selected={selectedRecipeType} setSelected={setSelectedRecipeType} />

				{/*　name */}
				<LabeledInput
					selectedValue={ingredientFormData.name}
					setSelected={(value) => setIngredientFormData({ ...ingredientFormData, name: value })}
					type="text"
					placeholder="Recipe Name..."
					labelName="name" />

				{/* category */}
				<LabeledSelect
					selectedValue={ingredientFormData.ingredient_category_id}
					setSelected={(value) => setIngredientFormData({ ...ingredientFormData, ingredient_category_id: value })}
					placeholder="Select Category"
					labelName="category"
					dataList={
						selectedRecipeType === "ingredient"
							? ingredientCategories
							: selectedRecipeType === "prep"
								? prepCategories
								: dishCategories} />

				{/* tag */}
				<LabeledMultiSelect
					selectedValues={ingredientFormData.ingredient_tag_id}
					setSelectedValues={(value) => setIngredientFormData({ ...ingredientFormData, ingredient_tag_id: value })}
					placeholder="Select Tag"
					labelName="tag"
					dataList={
						selectedRecipeType === "ingredient"
							? ingredientTags
							: selectedRecipeType === "prep"
								? prepTags
								: dishTags} />

				<SubmitBtn label="Create" />
			</form>
		</BaseModal>
	);
};

export default FormModal;