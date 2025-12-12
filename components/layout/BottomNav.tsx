'use client';

import { Home, Search, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
	const pathname = usePathname();

	const navItems = [
		{ href: "/dashboard", label: "Home", Icon: Home },
		{ href: "/dashboard/search", label: "Search", Icon: Search },
		{ href: "/dashboard/settings", label: "Settings", Icon: Settings },
	];

	return (
		<nav className="block md:hidden fixed bottom-0 w-full rounded-t-2xl shadow-3xl bg-gray-50 px-4 pt-5 pb-6">
			<ul className="flex justify-evenly gap-3">
				{navItems.map(({ href, Icon }) => {
					const isActive = pathname === href;

					return (
						<li key={href} className={`rounded-full py-1 px-3 ${isActive ? " bg-primary-50" : ""}`}>
							<Link
								href={href}
								className={`flex flex-col items-center gap-1 py-2 rounded-md transition-colors`}>
								<Icon
									width={25}
									height={25}
								/>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default BottomNav;
