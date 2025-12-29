'use client';

const PageHeader = (
	{
		title,
	}: {
		title: string;
	}
) => {

	return (
		<>
			<header className="h-20 shrink-0 flex items-center justify-between gap-3 sticky top-0 right-0 left-0 bg-white px-10 py-5 border-b border-gray-200">
				<h2 className="text-2xl font-bold">{title}</h2>
			</header>
		</>
	);
};

export default PageHeader;