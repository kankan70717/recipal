import { getUserInfo } from "@/lib/auth/getUserInfo";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { supabase, user, company_id } = await getUserInfo();
  if (!user || !company_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const recipe_type = req.nextUrl.searchParams.get("recipe_type");

  if (!recipe_type) {
    return NextResponse.json(
      { error: "recipe_type is required" },
      { status: 400 }
    );
  }

  const dbName = recipe_type + "_categories";
  const { data, error } = await supabase
    .from(dbName)
    .select("id, name, description")
    .eq("company_id", company_id);

  if (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ data });
};
