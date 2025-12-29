import { createSupabaseServerClient } from "@/lib/supabase/serverClient";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return new Response(
      JSON.stringify({ error: error?.message || "User not authenticated" }),
      { status: 401 }
    );
  }

  const { data: userInfo, error: userInfoError } = await supabase.from("users").select("*").eq("id", data.user.id).single();

  if (!userInfo || userInfoError) {
    return NextResponse.json({ error: userInfoError }, { status: 500 });
  }

  return NextResponse.json({ data: userInfo });
};
