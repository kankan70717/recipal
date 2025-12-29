import { redirect } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import Sidebar from "@/components/layout/Sidebar";
import { UserProviderClient } from "@/context/UserContext";
import { createSupabaseServerClient } from "@/lib/supabase/serverClient";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
	const supabase = await createSupabaseServerClient();

	const { data: { user }, error } = await supabase.auth.getUser();

	if (!user || error) {
		console.error("Authentication error:", error);
		redirect("/auth/login");
	}

	const { data: userInfo, error: profileError } = await supabase
		.from("users")
		.select("email, name, role")
		.eq("id", user.id)
		.single();

	if (profileError || !userInfo) {
		console.error("User profile error:", profileError);
		redirect("/auth/login");
	}

	return (
		<UserProviderClient userInfo={userInfo}>
			<div className="flex">
				<Sidebar className="shrink-0" />
				<div className="relative w-full">{children}</div>
				<BottomNav />
			</div>
		</UserProviderClient>
	);
}
