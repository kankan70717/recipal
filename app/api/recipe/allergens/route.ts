import { getUserInfo } from "@/lib/auth/getUserInfo";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { supabase, user, company_id } = await getUserInfo();
  if (!user || !company_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("allergen_groups")
    .select(
      `
      id,
      name,
      allergens (
        id,
      	name
      )
    `
    )
    .eq("company_id", company_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};
