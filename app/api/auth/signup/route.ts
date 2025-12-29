import { createSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { email, password, name, company_name } = await req.json();

  const supabaseAdminClient = await createSupabaseAdminClient();
  const now = new Date().toISOString();

  let authUserId: string | null = null;

  try {
    /* ********** */
    /* Authentication */
    /* ********** */
    const { data: authData, error: authError } =
      await supabaseAdminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError || !authData.user)
      throw authError || new Error("Failed to create auth user");

    authUserId = authData.user.id;

    // company
    const { data: companyData, error: companyError } = await supabaseAdminClient
      .from("company")
      .insert({ name: company_name, created_at: now, updated_at: now })
      .select()
      .single();
    if (companyError || !companyData) throw companyError;

    // Store
    const { data: storeData, error: storeError } = await supabaseAdminClient
      .from("stores")
      .insert({
        name: "Main Store",
        company_id: companyData.id,
      })
      .select()
      .single();
    if (storeError || !storeData) throw storeError;

    // users
    const { data: userData, error: userError } = await supabaseAdminClient
      .from("users")
      .insert({
        id: authUserId,
        email,
        name,
        company_id: companyData.id,
        store_id: storeData.id,
        role: "admin",
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();
    if (userError || !userData) throw userError;

    return NextResponse.json({ user: userData }, { status: 201 });
  } catch (error) {
    console.error("Initial Admin Creation Error:", error);

    if (authUserId) {
      await supabaseAdminClient.auth.admin.deleteUser(authUserId);
    }

    return NextResponse.json({ error }, { status: 400 });
  }
};
