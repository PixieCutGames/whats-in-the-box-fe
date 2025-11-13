export const resendVerificationFn = async (data: {
  email?: string;
  token?: string;
}) => {
  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/auth/resend-verification`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Resend Verification failed");
  }

  return res.json();
};

export const verifyEmailFn = async (token: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/auth/verify-email?token=${token}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Verification failed");
  }

  return res.json();
};
