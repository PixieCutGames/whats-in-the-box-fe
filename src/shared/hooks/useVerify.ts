import { useMutation, useQuery } from "@tanstack/react-query";
import { resendVerificationFn, verifyEmailFn } from "../apis/verificationApis";

function useVerify(token?: string) {
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

  const {
    data: verifyDetails,
    error: verifyError,
    isLoading: verifyIsLoading,
  } = useQuery({
    queryKey: ["verify-email", token],
    queryFn: () => verifyEmailFn(token!),
    enabled: !!token, // don't run if no token
  });

  return {
    resendVerification,
    resendData,
    loadingResend: resendStatus === "pending",
    resendError,
    verifyDetails,
    verifyError,
    loadingVerify: verifyIsLoading,
  };
}

export default useVerify;
