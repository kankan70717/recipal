import { SearchX } from "lucide-react";

import { RecipeCard } from "./RecipeCard";

export const RecipeCardList = ({ recipes }) => {
	if (recipes.length === 0) {
		return (
			<div className="col-span-full flex flex-col items-center justify-center p-10 text-primary-200">
				<span className="mb-4"><SearchX width={200} height={200} /></span>
				<span className="text-2xl capitalize">No recipes found</span>
			</div>
		);
	}

	return (
		<div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 bg-white">
			{
				recipes.map((recipe,index) => (
					<RecipeCard key={index} recipe={recipe} />
				))
			}
		</div>
	);


};