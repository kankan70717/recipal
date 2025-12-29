"use client";

import { FormEvent } from "react";
import SubmitBtn from "@/components/form/SubmitBtn";
import { createInitialAdmin } from "@/lib/api/admin";
import LabeledInput from "@/components/form/LabeledInput";

export default function SignupPage() {

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const name = formData.get("name") as string;
		const company_name = formData.get("company_name") as string;

		try {
			await createInitialAdmin(email, password, name, company_name);
		} catch (error) {
			console.error("Error creating initial admin:", error);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<h1 className="text-2xl text-center font-bold">Sign Up</h1>
			<LabeledInput labelName="email" placeholder="email" type="email" />
			<LabeledInput labelName="password" placeholder="password" type="password" />
			<LabeledInput labelName="name" placeholder="name" type="text" />
			<LabeledInput labelName="company_name" placeholder="company name" type="text" />
			<SubmitBtn label="Create Account"/>
		</form>

	);
}
