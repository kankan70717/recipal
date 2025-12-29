import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/serverClient";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  try {
    const supabase = await createSupabaseServerClient();

    await supabase.auth.signOut({ scope: "local" }).catch(() => undefined);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      return NextResponse.json({ error: error?.message || "Login failed" }, { status: 401 });
    }

    return NextResponse.json({ user: data.user }, { status: 200 });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 500 }
    );
  }
};
