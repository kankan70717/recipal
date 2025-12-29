import Label from "./Label";

const LabeledInput = ({
	selectedValue,
	setSelected,
	type = "text",
	placeholder,
	labelName,
	className
}: {
	selectedValue: string;
	setSelected: (value: string) => void;
	type?: string;
	placeholder?: string;
	labelName?: string;
	className?: string
}) => {
	return (
		<div className={`flex flex-wrap items-center justify-around gap-2 ${className}`}>
			<Label key={`${labelName}-label`} htmlFor={`${labelName}-input-field`}>{labelName}</Label>
			<input
				id={`${labelName}-input-field`}
				name={labelName}
				type={type}
				placeholder={placeholder}
				value={selectedValue}
				onChange={(e) => setSelected(e.target.value)}
				className="flex-1 border border-primary-500 rounded-full px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
				autoComplete="off"
			/>
		</div>
	);
};

export default LabeledInput;