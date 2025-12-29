'use client';

import { CircleAlert } from "lucide-react";
import { useState } from "react";

export const ToolTip = ({ text }: { text: string }) => {
	const [open, setOpen] = useState(false);

	return (
		<div
			className="relative flex items-center overflow-visible"
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<button
				type="button"
				className="flex items-center"
				aria-label="Show tooltip"
			>
				<CircleAlert />
			</button>

			{open && (
				<div
					className="absolute bottom-full -right-20 mb-2 rounded-md bg-primary-500 text-white text-sm font-medium p-2 w-50 whitespace-pre-line"
				>
					{text}
				</div>
			)}
		</div>
	);
};
