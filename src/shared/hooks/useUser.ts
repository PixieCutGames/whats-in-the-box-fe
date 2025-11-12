import { useQuery } from "@tanstack/react-query";
import { tokenManager } from "../../lib/tokenManager";
import { apiClient } from "../../lib/apiClient";

function useUser() {
  const tokens = tokenManager.getTokens();

  const {
    data: userDetails,
    error: userError,
    isLoading: userIsLoading,
  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      if (!tokens?.accessToken) throw new Error("No token");
      return apiClient<{ user: { name: string } }>("/auth/me");
    },
    enabled: !!tokens?.accessToken, // don't run if no token
    retry: false,
  });

  const logout = () => {
    tokenManager.clear();
  };
  return {
    userDetails,
    userError,
    userIsLoading,
    userIsAuthenticated: !!userDetails,
    logout,
  };
}

export default useUser;
