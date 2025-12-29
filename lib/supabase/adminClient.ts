import { createClient } from "@supabase/supabase-js";

export const createSupabaseAdminClient = async () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
  );

