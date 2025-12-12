const SubmitBtn = ({ label }: { label: string }) => {
	return (
		<button
			type="submit"
			className="mt-4 px-4 py-2 bg-black text-white rounded-md"
		>
			{label}
		</button>
	);
};

export default SubmitBtn;