import { createSupabaseServerClient } from "@/lib/supabase/serverClient";
import { NextResponse } from "next/server";
import { Role, roleList } from "@/db/schema";

export async function POST(req: Request) {
  const { email, password, role, store_id } = await req.json();

  const allowedRoles: Role[] = [...roleList];

  if (!allowedRoles.includes(role)) {
    return NextResponse.json({ error: "Invalid role", message:`Role must be one of: ${allowedRoles.join(", ")}, your role: ${role}` }, { status: 400 });
  }

  const supabaseServerClient = await createSupabaseServerClient();

  const { data: currentUser, error: getUserError } =
    await supabaseServerClient.auth.getUser();
  if (
    getUserError ||
    !currentUser.user ||
    currentUser.user.user_metadata.role !== "admin"
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseServerClient.auth.admin.createUser({
    email,
    password,
    user_metadata: { role, store_id },
    email_confirm: true,
  });

  if (error){
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ user: data.user });
}
