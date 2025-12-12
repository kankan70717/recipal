"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/supabase/auth";

export default function LoginPage() {
	const router = useRouter();

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		try {
			const user = await login(email, password);
			console.log("Logged in user:", user);
			router.push("/dashboard");
		} catch (error) {
			console.error("Login error:", error);
		}
	}

	return (
		<div className="login-page">
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input type="email" name="email" placeholder="Email" required />
				<input type="password" name="password" placeholder="Password" required />
				<button type="submit">Login</button>
			</form>
		</div>
	);
}
