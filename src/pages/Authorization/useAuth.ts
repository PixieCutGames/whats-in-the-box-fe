import { useMutation } from "@tanstack/react-query";
import { loginFn, registerationFn } from "./apis";
import { tokenManager } from "../../lib/tokenManager";

function useAuth() {
  const {
    mutate: loginMutate,
    data: loginData,
    status: loginStatus,
    error: loginError,
  } = useMutation({ mutationFn: loginFn });

  const {
    mutate: registerMutate,
    data: registerData,
    status: registerStatus,
    error: registerError,
  } = useMutation({ mutationFn: registerationFn });

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

  const register = (
    name: string,
    email: string,
    password: string,
    onSuccess: () => void,
    onError: () => void
  ) => {
    registerMutate(
      { name, email, password },
      {
        onSuccess: (data) => {
          console.log(data);
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
    register,
    registerData,
    registerError,
    loadingRegister: registerStatus === "pending",
  };
}

export default useAuth;
