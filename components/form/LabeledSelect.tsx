'use client';

import { ChevronDown, ChevronUp } from "lucide-react";
import Label from "./Label";
import { useState } from "react";
import { UIFilterCategoryTag } from "@/types/ui/recipeFilterForm";
import { RecipeTaxonomy } from "@/types/api/recipeTaxonomy";

const LabeledSelect = (
	{
		selectedValue,
		setSelected,
		placeholder,
		labelName,
		dataList,
		className
	}: {
		selectedValue: UIFilterCategoryTag;
		setSelected: (value: UIFilterCategoryTag) => void;
		type?: string;
		placeholder?: string;
		labelName?: string;
		dataList: RecipeTaxonomy[];
		className?: string
	}) => {

	const [optionsVisible, setOptionsVisible] = useState(false);

	return (
		<div className={`relative flex flex-wrap items-center justify-around gap-2 ${className}`}>
			<Label key={`${labelName}-label`} htmlFor={`${labelName}-select-field`}>{labelName}</Label>
			<div className="flex-1 relative">
				<input
					readOnly
					id={`${labelName}-select-field`}
					type="text"
					name={labelName}
					placeholder={placeholder}
					className="capitalize w-full border border-primary-500 rounded-full px-4 py-2 text-base appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
					value={selectedValue.name}
					onFocus={() => setOptionsVisible(true)}
					onBlur={() => setOptionsVisible(false)}
					autoComplete="off"
				/>
				{
					optionsVisible && dataList && dataList.length > 0 && (
						<ul className="absolute bg-white top-full left-0 right-0 mt-3 px-4 py-2 max-h-40 overflow-y-auto border border-primary-500 rounded-2xl shadow-2xl z-30">
							<li
								className="px-4 py-2 hover:bg-primary-50 cursor-pointer capitalize rounded-2xl"
								onMouseDown={() => {
									setSelected({ id: "", name: "", description: "" } as UIFilterCategoryTag);
									setOptionsVisible(false);
								}}>
								-- Select --
							</li>
							{
								dataList
									.map((item, index) => (
										<li
											key={`${labelName}-option-${index}`}
											className="px-4 py-2 hover:bg-primary-50 cursor-pointer capitalize rounded-2xl"
											onMouseDown={() => {
												setSelected(item as UIFilterCategoryTag);
												setOptionsVisible(false);
											}}
										>
											{item.name}
										</li>
									))
							}
						</ul>
					)
				}
			</div>

			<div className="pointer-events-none absolute bottom-0 right-4 flex flex-col items-center">
				<ChevronUp width={20} height={20} />
				<ChevronDown width={20} height={20} />
			</div>

		</div>
	);
};

export default LabeledSelect;


