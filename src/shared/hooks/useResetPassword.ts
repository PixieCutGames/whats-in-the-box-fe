import { useMutation } from "@tanstack/react-query";
import { forgotPasswordFn, resetPasswordFn } from "../apis/resetPasswordApis";

function useResetPassword() {
  const {
    mutate: forgotPasswordMutate,
    data: forgotPasswordData,
    status: forgotPasswordStatus,
    error: forgotPasswordError,
  } = useMutation({ mutationFn: forgotPasswordFn });

  const {
    mutate: resetPasswordMutate,
    data: resetPasswordData,
    status: resetPasswordStatus,
    error: resetPasswordError,
  } = useMutation({ mutationFn: resetPasswordFn });

  const generateResetPasswordLink = (
    email: string,
    onSuccess: () => void,
    onError: () => void
  ) => {
    forgotPasswordMutate(
      { email },
      {
        onSuccess,
        onError,
      }
    );
  };

  const resetPassword = (
    token: string,
    newPassword: string,
    onSuccess: () => void,
    onError: () => void
  ) => {
    resetPasswordMutate(
      { token, newPassword },
      {
        onSuccess,
        onError,
      }
    );
  };
  return {
    forgotPasswordData,
    loadingForgotPassword: forgotPasswordStatus === "pending",
    forgotPasswordError,
    generateResetPasswordLink,
    resetPasswordData,
    resetPasswordError,
    loadingResetPassword: resetPasswordStatus === "pending",
    resetPassword,
  };
}

export default useResetPassword;
