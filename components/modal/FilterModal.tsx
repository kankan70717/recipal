'use client';

import RadioBtn from "../form/RadioBtn";
import LabeledInput from "../form/LabeledInput";
import LabeledSelect from "../form/LabeledSelect";
import SubmitBtn from "../form/SubmitBtn";
import { useEffect, useState } from "react";
import { fetchAllergens, fetchRecipeCategories, fetchRecipeTags } from "@/lib/api/recipe";
import BaseModal from "./BaseModal";
import LabeledMultiSelect from "../form/LabeledMultiSelect";
import { RecipeTaxonomyMap } from "@/types/api/recipeTaxonomy";
import { generateRecipeTaxonomyMap } from "@/utils/generateRecipeTaxonomyMap";
import { RecipeStatus, recipeStatusList, RecipeType, recipeTypeList } from "@/types/domain/recipe";
import { UIFilterFormMap } from "@/types/ui/recipeFilterForm";
import { generateFilterForm } from "@/utils/generateFilterForm";
import SecondaryButton from "../form/SecondaryButton";
import LabeledAllergenSelect from "../form/LabeledAllergenSelect";

const FilterModal = ({
	isOpen,
	onClose,
	selectedRecipeType,
	setSlectedRecipeType,
	filterForms,
	setFilterForms,
	onApply
}: {
	isOpen: boolean;
	onClose: () => void;
	selectedRecipeType: RecipeType;
	setSlectedRecipeType: React.Dispatch<React.SetStateAction<RecipeType>>;
	filterForms: UIFilterFormMap;
	setFilterForms: React.Dispatch<React.SetStateAction<UIFilterFormMap>>;
	onApply: (recipeType: RecipeType, filterForm: UIFilterFormMap) => void;
}) => {

	const [localForm, setLocalForm] = useState(structuredClone(filterForms));
	const [localRecipeType, setLocalRecipeType] = useState<RecipeType>(selectedRecipeType);

	/* List for Select */
	const [recipeTaxonomyMap, setRecipeTaxonomyMap] = useState<RecipeTaxonomyMap>(generateRecipeTaxonomyMap());

	const updateLocalForm = (patch: Partial<UIFilterFormMap[RecipeType]>) => {
		setLocalForm(prev => ({
			...prev,
			[localRecipeType]: {
				...prev[localRecipeType],
				...patch
			}
		}));
	};

	const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setSlectedRecipeType(localRecipeType);
		setFilterForms(structuredClone(localForm));

		onApply(localRecipeType, localForm);

		onClose();
	};

	const handleClear = () => {
		const emptyForm = generateFilterForm();
		setLocalForm(structuredClone(emptyForm));
		setLocalRecipeType('dish');
	};

	useEffect(() => {

		const fetchCategoriesAndTagsList = async () => {

			/* fetch only if not fetched yet */
			if (localRecipeType === "ingredient" && recipeTaxonomyMap.ingredient.categories.length > 0 && recipeTaxonomyMap.ingredient.tags.length > 0) return;
			if (localRecipeType === "prep" && recipeTaxonomyMap.prep.categories.length > 0 && recipeTaxonomyMap.prep.tags.length > 0) return;
			if (localRecipeType === "dish" && recipeTaxonomyMap.dish.categories.length > 0 && recipeTaxonomyMap.dish.tags.length > 0) return;

			try {
				const categoryObj = await fetchRecipeCategories(localRecipeType);
				const tagObj = await fetchRecipeTags(localRecipeType);

				setRecipeTaxonomyMap(prev => ({
					...prev,
					[localRecipeType]: {
						categories: categoryObj.data || [],
						tags: tagObj.data || [],
						allergens: prev.allergens,
					},
				}));

			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategoriesAndTagsList();

	}, [recipeTaxonomyMap.dish.categories.length, recipeTaxonomyMap.dish.tags.length, recipeTaxonomyMap.ingredient.categories.length, recipeTaxonomyMap.ingredient.tags.length, recipeTaxonomyMap.prep.categories.length, recipeTaxonomyMap.prep.tags.length, localRecipeType]);

	useEffect(() => {
		const fetchAllergenList = async () => {
			if (recipeTaxonomyMap.allergens.length > 0) return;

			try {
				const allergenObj = await fetchAllergens();
				console.log("Fetched allergens:", allergenObj);
				setRecipeTaxonomyMap(prev => ({
					...prev,
					allergens: allergenObj || [],
				}));

			} catch (error) {
				console.error("Error fetching allergens:", error);
			}
		};

		fetchAllergenList();
	}, [recipeTaxonomyMap.allergens.length]);

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				setLocalForm(structuredClone(filterForms));
				setLocalRecipeType(selectedRecipeType);
			}, 0);
		}
	}, [isOpen, filterForms, selectedRecipeType]);

	return (
		<BaseModal title="Filter" isOpen={isOpen} onClose={onClose}>
			<form className="relative mt-15 overflow-y-auto max-h-[60vh] flex flex-col gap-5" onSubmit={(e) => handleApply(e)}>

				{/* recipe type */}
				<RadioBtn<RecipeType>
					label="Recipe Type"
					list={recipeTypeList}
					selected={localRecipeType}
					setSelected={setLocalRecipeType} />

				{/* status */}
				<RadioBtn<RecipeStatus>
					label="Status"
					list={recipeStatusList}
					selected={localForm[localRecipeType].status}
					setSelected={(value) => updateLocalForm({ status: value })} />

				{/* japanese name */}
				<LabeledInput
					selectedValue={localForm[localRecipeType].name}
					setSelected={(value) => updateLocalForm({ name: value })}
					type="text"
					placeholder="Recipe Name..."
					labelName="name" />

				{/* jpanese name */}
				<LabeledInput
					selectedValue={localForm[localRecipeType].name_ja}
					setSelected={(value) => updateLocalForm({ name_ja: value })}
					type="text"
					placeholder="Recipe Name (Japanese)..."
					labelName="name (ja)" />

				{/* category */}
				<LabeledSelect
					selectedValue={localForm[localRecipeType].category}
					setSelected={(value) => updateLocalForm({ category: value })}
					placeholder="Select Category"
					labelName="category"
					dataList={recipeTaxonomyMap[localRecipeType].categories} />

				{/* tag */}
				<LabeledMultiSelect
					selectedValues={localForm[localRecipeType].tag}
					setSelectedValues={(value) => updateLocalForm({ tag: value })}
					placeholder="Select Tag"
					labelName="tag"
					dataList={recipeTaxonomyMap[localRecipeType].tags} />

				{/* allergen */}
				<LabeledAllergenSelect
					labelName="Excluded Allergens"
					selectedValues={localForm[localRecipeType].exclude_allergen_ids}
					setSelectedValues={(value) => updateLocalForm({ exclude_allergen_ids: value })}
					dataList={recipeTaxonomyMap.allergens}
				/>

				{/* button */}
				<div className="flex gap-5 sticky bottom-0 bg-white pt-5">
					<SecondaryButton label="Clear" onClick={handleClear} />
					<SubmitBtn label="Apply" />
				</div>
			</form>
		</BaseModal>
	);
};

export default FilterModal;