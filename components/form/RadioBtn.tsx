import Label from "./Label";

const RadioBtn = <T,>(
	{
		label,
		list,
		selected,
		setSelected
	}: {
		label?: string;
		list: readonly T[];
		selected: T;
		setSelected: (value: T) => void;
	}) => {

	return (
		<div className="flex flex-wrap items-center justify-around gap-2">
			<Label>{label}</Label>
			{
				list.map((item, index) => (
					<label key={index} className="block cursor-pointer flex-1 basis-0 capitalize border border-primary-500 px-4 py-3 rounded-full transition w-35 text-center has-checked:bg-primary-500 has-checked:text-white peer-focus:ring-2 peer-focus:ring-primary-500">
						<input
							type="radio"
							name={label}
							value={String(item)}
							className="peer hidden"
							checked={selected === item}
							onChange={() => setSelected(item)}
						/>
						<span>
							{String(item)}
						</span>
					</label>

				))
			}
		</div>
	);
};


export default RadioBtn;