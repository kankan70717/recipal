'use client';

import { ChefHat, ChevronLeft, ChevronRight, Home, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useUserContext } from "@/context/UserContext";

const Sidebar = ({ className }: { className?: string }) => {

	const userInfo = useUserContext();
	const [isOpen, setIsOpen] = useState(true);
	const pathname = usePathname();

	const navItems = [
		{ href: "/home", label: "Home", Icon: Home, addionalClasses: "" },
		{ href: "/recipe", label: "Recipe", Icon: ChefHat, addionalClasses: "" },
		{ href: "/profile", label: userInfo.name, Icon: User, addionalClasses: "mt-auto" },
	];

	return (
		<aside className={`hidden relative md:flex flex-col text-primary-500 bg-gray-50 h-screen py-5 px-3 ease-in-out duration-300 ${isOpen ? "w-52" : "w-20"} ${className}`}>
			<div className="absolute -right-3 top-6 rounded-full bg-primary-900 text-primary-50 flex justify-center items-center z-50">
				{
					isOpen ?
						(<ChevronLeft width={30} height={30} onClick={() => setIsOpen(false)} />)
						: (<ChevronRight width={30} height={30} onClick={() => setIsOpen(true)} />)
				}
			</div>
			<Link href="/home">
				<div className="flex gap-1 justify-center items-center mb-10">
					<div>
						<Image src="/logo.png" alt="Logo" width={40} height={40} />
					</div>
					<h1 className={`text-xl font-semibold mt-1 ${isOpen ? "block" : "hidden"}`}>ReciPal</h1>
				</div>
			</Link>
			<nav className="flex-1 flex flex-col">
				<ul className={`flex-1 flex flex-col gap-3`}>
					{navItems.map(({ href, label, Icon, addionalClasses }) => {
						const isActive = pathname === href;
						return (
							<li key={href} className={`rounded-full py-1 px-3 hover:bg-primary-50 ${isActive ? " bg-primary-50" : ""} ${isOpen ? "" : "flex items-center justify-center w-15 h-15"} ${addionalClasses}`}>
								<Link href={href} className={`flex gap-3 items-center ${isOpen ? "py-2 px-3" : "px-0 py-0 justify-center"}`}>
									<Icon
										width={25}
										height={25}
									/>
									<span className={`${isOpen ? "block" : "hidden"}`}>{label}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;