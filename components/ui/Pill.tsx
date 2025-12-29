const Pill = ({ label }: { label: string }) => {
	return (
		<div className="bg-white text-primary-500 px-4 py-2 border border-primary-500 rounded-full cursor-pointer flex items-center gap-1 capitalize">
			{label}
		</div>
	);
};

export default Pill;