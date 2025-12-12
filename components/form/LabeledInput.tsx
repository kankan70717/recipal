const LabeledInput = ({
	label,
	id,
	type = "text",
	...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; id: string }) => {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={id} className="font-medium text-gray-700">
				{label}
			</label>
			<input
				id={id}
				type={type}
				className="px-3 py-1 border border-gray-300 rounded-lg"
				{...props}
			/>
		</div>
	);
};

export default LabeledInput;