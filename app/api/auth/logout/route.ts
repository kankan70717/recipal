import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/serverClient";

export const POST = async (req: Request) => {
  try {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
	
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 500 }
    );
  }
};
