import { useMutation } from "@tanstack/react-query";
import { resendVerificationFn } from "./apis";

function useVerify() {
  const {
    mutate: resendVerificationMutate,
    data: resendData,
    status: resendStatus,
    error: resendError,
  } = useMutation({ mutationFn: resendVerificationFn });

  const resendVerification = (
    data: { email: string; token?: string },
    onSuccess: () => void,
    onError: () => void
  ) => {
    resendVerificationMutate(data, {
      onSuccess: (data) => {
        console.log(data);
        onSuccess();
      },
      onError,
    });
  };

  return {
    resendVerification,
    resendData,
    loadingResend: resendStatus === "pending",
    resendError,
  };
}

export default useVerify;
