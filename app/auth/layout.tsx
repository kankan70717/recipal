const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-dvh flex flex-col items-center justify-center bg-gray-200">
			<div className="py-8 px-5 bg-white rounded-2xl shadow-2xl">
				{children}
			</div>
		</div>
	)
};
export default AuthLayout;