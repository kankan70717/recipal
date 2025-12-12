export const createInitialAdmin = async (email: string, password: string) => {
  const res = await fetch("/api/admin/init", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error((await res.json()).error);
  }
  
  return res.json();
};
