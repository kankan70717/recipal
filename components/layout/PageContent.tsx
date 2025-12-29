const PageContent = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="p-5 pt-5 overflow-y-scroll h-full">
			{children}
		</main>
	);
};

export default PageContent;