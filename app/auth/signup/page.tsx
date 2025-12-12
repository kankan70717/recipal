"use client";

import { FormEvent } from "react";
import LabeledInput from "@/components/form/LabeledInput";
import SubmitBtn from "@/components/form/SubmitBtn";
import { createInitialAdmin } from "@/lib/api/admin";

export default function SignupPage() {

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		try {
			await createInitialAdmin(email, password);
		} catch (error) {
			console.error("Error creating initial admin:", error);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<h1 className="text-2xl text-center font-bold">Sign Up</h1>
			<LabeledInput label="Email" id="email" name="email" type="email" required />
			<LabeledInput label="Password" id="password" name="password" type="password" required />
			<SubmitBtn label="Create Account" />
		</form>

	);
}
