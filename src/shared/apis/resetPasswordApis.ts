export const forgotPasswordFn = async (data: { email: string }) => {
  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/auth/forgot-password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Request failed");
  }

  return res.json();
};

export const resetPasswordFn = async (data: {
  token: string;
  newPassword: string;
}) => {
  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/auth/reset-password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Request failed");
  }

  return res.json();
};
