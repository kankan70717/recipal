'use client';

import { ChefHat, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
	const pathname = usePathname();

	const navItems = [
		{ href: "/home", label: "Home", Icon: Home },
		{ href: "/recipe", label: "Recipe", Icon: ChefHat },
		{ href: "/profile", label: "Profile", Icon: Settings },
	];

	return (
		<nav className="block md:hidden fixed bottom-0 w-full rounded-t-2xl shadow-3xl px-4 pt-2 pb-5 ">
			<ul className="flex justify-evenly gap-3 rounded-full py-2 shadow-2xl bg-primary-50">
				{navItems.map(({ href, Icon, label }) => {
					const isActive = pathname === href;

					return (
						<Link
							href={href}
							key={label}
							className={`rounded-full p-3 ${isActive ? " bg-white text-primary-500" : ""}`}>
							<li key={href} className={`flex items-center justify-center`}>
								<Icon
									width={25}
									height={25}
								/>
							</li>
						</Link>
					);
				})}
			</ul>
		</nav>
	);
};

export default BottomNav;
