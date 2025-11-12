// src/lib/apiClient.ts
import { tokenManager } from "./tokenManager";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const tokens = tokenManager.getTokens();

  // Base headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Attach access token if available
  if (tokens?.accessToken) {
    headers["Authorization"] = `Bearer ${tokens.accessToken}`;
  }

  // Perform the request
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle token expiry (401) -
  // TODO: we’ll add refresh later if needed
  if (res.status === 401) {
    throw new Error("Unauthorized or session expired");
  }

  // Parse JSON safely
  let data: any;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    const message = data?.message || data?.error || `API Error (${res.status})`;
    throw new Error(message);
  }

  return data as T;
}
