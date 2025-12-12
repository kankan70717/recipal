import { createSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { email, password, name, company_name } = await req.json();

  const supabaseAdminClient = await createSupabaseAdminClient();

  /* ********** */
  /* authentication */
  /* ********** */
  const { data: authData, error: authError } =
    await supabaseAdminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  /* ********** */
  /* company */
  /* ********** */
  const { data: companyData, error: companyError } = await supabaseAdminClient
    .from("companies")
    .insert({ name: company_name })
    .select()
    .single();

  if (companyError) {
    return NextResponse.json({ error: companyError.message }, { status: 400 });
  }

  /* ********** */
  /* user */
  /* ********** */
  const { data: userData, error: userError } = await supabaseAdminClient
    .from("users")
    .insert({
      id: authData.user.id,
      name,
      company_id: companyData.id,
      role: "admin",
    });

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 400 });
  }

  return NextResponse.json({ user: userData }, { status: 201 });
};
