import { useMutation, useQuery } from "@tanstack/react-query";
import { tokenManager } from "../../lib/tokenManager";
import { apiClient } from "../../lib/apiClient";
import { User } from "../../types";

function useUser() {
  const tokens = tokenManager.getTokens();

  const {
    data: userDetails,
    error: userError,
    isLoading: userIsLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      if (!tokens?.accessToken) throw new Error("No token");
      return apiClient<{
        user: User;
      }>("/auth/me");
    },
    enabled: !!tokens?.accessToken, // don't run if no token
    retry: false,
  });

  const {
    mutate: updateProfileMutate,
    data: updateProfileData,
    status: updateProfileStatus,
    error: updateProfileError,
  } = useMutation({
    mutationFn: async (data: { name: string }) => {
      return apiClient<{ user: User }>(`/auth/update`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
  });

  const {
    mutate: changePasswordMutate,
    data: changePasswordData,
    status: changePasswordStatus,
    error: changePasswordError,
  } = useMutation({
    mutationFn: async (data: {
      newPassword: string;
      currentPassword: string;
    }) => {
      return apiClient<{ user: User }>(`/auth/change-password`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  });

  const changeName = (
    name: string,
    onSuccess: () => void,
    onError: () => void
  ) => {
    updateProfileMutate(
      { name },
      {
        onSuccess: (newData) => {
          console.log(newData);
          onSuccess();
        },
        onError,
      }
    );
  };

  const changePassword = (
    data: { newPassword: string; currentPassword: string },
    onSuccess: () => void,
    onError: () => void
  ) => {
    changePasswordMutate(data, {
      onSuccess: (newData) => {
        console.log(newData);
        onSuccess();
      },
      onError: (err) => {
        onError();
        console.log(err);
      },
    });
  };

  const logout = () => {
    tokenManager.clear();
  };
  return {
    userDetails,
    userError,
    userIsLoading,
    userIsAuthenticated: !!userDetails && !!tokenManager.getTokens(),
    userIsVerified: userDetails?.user.isVerified,
    userEmail: userDetails?.user.email,
    refetchUser,
    updateProfileError,
    updateProfileData,
    updateProfileIsLoading: updateProfileStatus === "pending",
    changeName,
    changePasswordError,
    changePasswordData,
    changePasswordIsLoading: changePasswordStatus === "pending",
    changePassword,
    logout,
  };
}

export default useUser;
