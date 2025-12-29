'use client';

import { createContext, ReactNode, useContext } from "react";

export type UserInfo = {
	email: string;
	name: string;
	role: string;
};

export const UserContext = createContext<UserInfo | null>(null);

export const useUserContext = () => {
	const context = useContext(UserContext);

	if (!context) throw new Error("useUser must be used within UserProvider");

	return context;
}

export function UserProviderClient({
	children,
	userInfo,
}: {
	children: ReactNode;
	userInfo: UserInfo;
}) {
	return <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>;
}