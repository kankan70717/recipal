const SubmitBtn = ({ label, className }: { label: string; className?: string }) => {
	return (
		<button
			type="submit"
			className={`px-4 py-3 rounded-2xl border border-primary-500 bg-primary-500 text-white w-1/2 mx-auto ${className}`}
		>
			{label}
		</button>
	);
};

export default SubmitBtn;