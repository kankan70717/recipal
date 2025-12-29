'use client';

import { RecipeGroupedAllergen } from "@/types/api/recipeTaxonomy";
import Label from "./Label";

const LabeledAllergenSelect = ({
	className,
	labelName,
	dataList,
	selectedValues,
	setSelectedValues
}: {
	className?: string;
	labelName: string
	dataList: RecipeGroupedAllergen[];
	selectedValues: string[];
	setSelectedValues: (value: string[]) => void;
}) => {

	return (
		<div className={`relative flex flex-wrap items-center gap-5 ${className}`}>
			<Label htmlFor={`${labelName}-input`} toolTipText={`Select allergens to exclude from the recipe search results. \n\n 選択されたアレルゲンは検索結果から除外されます。`}>{labelName}</Label>
			<div className="basis-full grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
				{
					dataList.map((groupedAllergen) => (
						<div key={groupedAllergen.name} className="flex flex-col gap-2 border rounded-2xl p-2">
							<div className="flex items-center justify-between">
								<div className="font-semibold px-2">{groupedAllergen.name}</div>
								<button
									type="button"
									className="border rounded-2xl px-4 py-1 text-sm"
									onClick={() => {
										const allIds = groupedAllergen.allergens.map(a => a.id);
										setSelectedValues([...new Set([...selectedValues, ...allIds])]);
									}} >
									Select All
								</button>
							</div>
							{
								groupedAllergen.allergens.map((allergen) => (
									<div key={allergen.id}>
										<label className="inline-flex items-center mr-4">
											<input
												type="checkbox"
												className="form-checkbox h-5 w-5 text-primary-600"
												value={allergen.id}
												checked={selectedValues.includes(allergen.id)}
												onChange={(e) => {
													if (e.target.checked) {
														setSelectedValues([...selectedValues, allergen.id]);
													} else {
														setSelectedValues(selectedValues.filter((id) => id !== allergen.id));
													}
												}}
											/>
											<span className="ml-2 capitalize">{allergen.name}</span>
										</label>
									</div>
								))
							}
						</div>
					))
				}
			</div>
		</div>
	);
};

export default LabeledAllergenSelect;
