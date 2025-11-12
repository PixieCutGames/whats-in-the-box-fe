export const loginFn = async (data: { email: string; password: string }) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  return res.json();
};

export const registerationFn = async (data: {
  name: String;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Registeration failed");
  }

  return res.json();
};
