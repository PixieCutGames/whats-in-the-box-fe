import { useMutation } from "@tanstack/react-query";
import { loginFn } from "./apis";
import { tokenManager } from "../../lib/tokenManager";

function useAuth() {
  const {
    mutate: loginMutate,
    data: loginData,
    status: loginStatus,
    error: loginError,
  } = useMutation({ mutationFn: loginFn });

  const login = (
    email: string,
    password: string,
    remeberMe: boolean,
    onSuccess: () => void,
    onError: () => void
  ) => {
    loginMutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log(data);
          tokenManager.setTokens(
            {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            },
            remeberMe
          );
          onSuccess();
        },
        onError,
      }
    );
  };

  return {
    login,
    loginData,
    loadingLogin: loginStatus === "pending",
    loginError,
  };
}

export default useAuth;
