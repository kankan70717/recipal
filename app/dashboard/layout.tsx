"use client";

import BottomNav from "@/components/layout/BottomNav";
import Sidebar from "@/components/layout/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

	return (
		<div className="flex">

			{/* Sidebar */}
			<div className="hidden md:block">
				<Sidebar />
			</div>

			{/* Main Content */}
			<div className="flex flex-col">
				{children}
			</div>

			{/* Bottom Navigation */}
			<BottomNav />
		</div>
	);
};

export default DashboardLayout;
