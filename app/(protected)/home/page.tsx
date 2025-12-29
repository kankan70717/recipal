"use client";

import PageContent from "@/components/layout/PageContent";
import PageHeader from "@/components/layout/PageHeader";
import { logout } from "@/lib/api/admin";
import { samplePostRecipe } from "@/lib/api/recipe";
import { useRouter } from "next/navigation";

const HomePage = () => {
	const router = useRouter();

	const insertData = async () => {
		try {
			const response = await samplePostRecipe();
			console.log("Test data:", response);
		} catch (error) {
			console.error("Error fetching diagnostics data:", error);
		}
	}

	const handleLogout = async () => {
		try {
			const response = await logout();
			router.push("/auth/login");
			console.log("Logout response:", response);
		} catch (error) {
			console.error("Error during logout:", error);
		}
	}

	return (
		<div className="flex flex-col">
			<PageHeader title="Home"/>
			<PageContent>
				Home page
				<button onClick={handleLogout}>logout</button>
			</PageContent>
		</div>
	);
}

export default HomePage;