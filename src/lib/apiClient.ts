// src/lib/apiClient.ts
import { tokenManager } from "./tokenManager";

const refreshToken = async () => {
  const tokens = tokenManager.getTokens();

  // Base headers
  const headers: Record<string, string> = {};

  // Attach access token if available
  if (tokens?.refreshToken) {
    headers["Authorization"] = `Bearer ${tokens.refreshToken}`;
  }

  // Perform the request
  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/auth/refresh-token`,
    {
      method: "POST",
      headers,
    }
  );

  // Handle token expiry (401) -
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

  return { success: true, data };
};

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
  isFile?: boolean
): Promise<T> {
  const tokens = tokenManager.getTokens();

  // Base headers
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (options.body && !isFile) {
    headers["Content-Type"] = "application/json";
  }

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
  if (res.status === 401) {
    const refreshedData = await refreshToken();

    if (!refreshedData) {
      // could not refresh → logout user
      tokenManager.clear();
      throw new Error("Unauthorized or session expired");
    } else {
      const local = tokenManager.isSavedLocaly();
      tokenManager.setTokens(
        {
          accessToken: refreshedData.data.accessToken,
          refreshToken: refreshedData.data.refreshToken,
        },
        local
      );
      return apiClient(endpoint, options);
    }
  }

  // Parse JSON safely
  let data: any;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    // ------------------------------
    // 1. FORM VALIDATION ERRORS
    // ------------------------------
    if (data.error === "ValidationError" && Array.isArray(data.details)) {
      const messages = data.details
        .map((detail: any) => detail.message)
        .join(", ");
      throw new Error(messages);
    }
    const message = data?.message || data?.error || `API Error (${res.status})`;
    throw new Error(message);
  }

  return data as T;
}
