import { ImageOff } from "lucide-react";
import Image from "next/image";

export const RecipeCard = ({ recipe }) => {
	return (
		<div className="rounded-2xl shadow-2xl">
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
	);
};