
export type UserInfo = {
  userId: string;
  companyId: string;
  role: string;
};

/**
 * Get Company ID and Role of the logged-in user
 * @param supabase SupabaseClient
 * @returns UserInfo
 */
export async function fetchUserInfo() {
  const res = await fetch("/api/user", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error((await res.json()).error);
  }

  return res.json();
}