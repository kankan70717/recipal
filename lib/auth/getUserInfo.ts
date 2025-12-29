
import { createSupabaseServerClient } from "@/lib/supabase/serverClient";

export const getUserInfo = async () => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      supabase,
      user: null,
      companyId: null,
      role: null,
    };
  }

  const { data: userData } = await supabase
    .from("users")
    .select("company_id, role, store_id")
    .eq("id", user.id)
    .single();

  return {
    supabase,
    user,
    company_id: userData?.company_id ?? null,
	store_id: userData?.store_id ?? null,
    role: userData?.role ?? null,
  };
};
