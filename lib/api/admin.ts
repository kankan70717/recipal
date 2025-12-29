export const createInitialAdmin = async (email: string, password: string, name: string, company_name: string) => {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, company_name }),
  });

  if (!res.ok) {
    throw new Error((await res.json()).error);
  }
  
  return res.json();
};

export const login = async (email: string, password: string) => {
  const res = await fetch("/api/auth/login", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error((await res.json()).error);
  }
  
  return res.json();
};

export const logout = async () => {
  const res = await fetch("/api/auth/logout", {
	method: "POST",
  });

  if (!res.ok) {
    throw new Error((await res.json()).error);
  }
  
  return res.json();
};