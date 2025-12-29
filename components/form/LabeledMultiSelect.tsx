'use client';

import { ChevronDown, ChevronUp, X } from "lucide-react";
import Label from "./Label";
import { useMemo, useState } from "react";
import { RecipeTaxonomy } from "@/types/api/recipeTaxonomy";
import { UIFilterCategoryTag } from "@/types/ui/recipeFilterForm";

const LabeledMultiSelect = (
	{
		selectedValues,
		setSelectedValues,
		placeholder,
		labelName,
		dataList,
		className
	}: {
		selectedValues: UIFilterCategoryTag[];
		setSelectedValues: (values: UIFilterCategoryTag[]) => void;
		placeholder?: string;
		labelName?: string;
		dataList?: RecipeTaxonomy[];
		className?: string;
	}
) => {

	const [optionsVisible, setOptionsVisible] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const filteredOptions = useMemo(() => {
		if (!dataList) return [];

		return dataList.filter(item =>
			!selectedValues.map(v => v.id).includes(item.id) &&
			item.name.toLowerCase().includes(inputValue.toLowerCase())
		);
	}, [dataList, selectedValues, inputValue]);

	return (
		<div className={`relative flex flex-wrap items-center gap-2 ${className}`}>
			<Label htmlFor={`${labelName}-input`}>{labelName}</Label>
			<div className="flex-1 relative">
				<input
					id={`${labelName}-input`}
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onFocus={() => setOptionsVisible(true)}
					onBlur={() => setOptionsVisible(false)}
					placeholder={placeholder}
					className="w-full border border-primary-500 rounded-full px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
					autoComplete="off"
				/>

				{/* pill */}
				{selectedValues.length > 0 &&
					<div className="flex flex-wrap gap-2 mt-3">
						{selectedValues.map((item, index) => (
							<div
								key={index}
								className="bg-primary-500 text-white px-4 py-2 rounded-full cursor-pointer flex items-center gap-1 capitalize"
							>
								{item.name}
								<X width={15} height={15} onClick={() => {
									setSelectedValues(selectedValues.filter(v => v.id !== item.id));
								}} />
							</div>
						))}
					</div>
				}

				{/* dropdown */}
				{optionsVisible && filteredOptions.length > 0 && (
					<ul className="absolute bg-white top-12 left-0 right-0 mt-1 px-4 py-2 max-h-40 overflow-y-auto border border-primary-500 rounded-2xl shadow-2xl z-30">
						{filteredOptions.map((item, index) => (
							<li
								key={index}
								className="px-4 py-2 hover:bg-primary-50 cursor-pointer capitalize rounded-2xl"
								onMouseDown={() => {
									setInputValue("");
									setOptionsVisible(true);
									setSelectedValues([...selectedValues, item as UIFilterCategoryTag]);
								}}
							>
								{item.name}
							</li>
						))}
					</ul>
				)}

				<div className="pointer-events-none absolute top-0.5 right-4 flex flex-col items-center">
					<ChevronUp width={20} height={20} />
					<ChevronDown width={20} height={20} />
				</div>
			</div>

		</div>
	);
};

export default LabeledMultiSelect;
