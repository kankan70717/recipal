const SecondaryButton = ({ label, onClick, className }: { label: string; onClick?: () => void; className?: string }) => {
	return (
		<button
			type="button"
			className={`px-4 py-3 rounded-2xl border border-primary-500 bg-white text-primary-500 w-1/2 mx-auto ${className}`}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default SecondaryButton;