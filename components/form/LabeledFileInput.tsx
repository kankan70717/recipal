const LabeledFileInput = ({
	labelName,
	placeholder,
}: {
	labelName: string;
	placeholder: string;
}) => {
	return (
		<div className="flex flex-col gap-1">
			<label
				htmlFor={labelName}
				className="text-sm font-medium text-gray-700"
			>
				{labelName.charAt(0).toUpperCase() + labelName.slice(1).replace(/_/g, " ")}
			</label>
			<input
				type="file"
				id={labelName}
				name={labelName}
				placeholder={placeholder}
				className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
	);
};

export default LabeledFileInput;