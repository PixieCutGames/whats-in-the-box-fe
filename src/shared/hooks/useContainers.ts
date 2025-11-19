import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { Container } from "../../types";

function useContainers(limit?: number) {
  const {
    data: containersDetails,
    error: containersError,
    isLoading: containersIsLoading,
  } = useQuery({
    queryKey: ["getContainers"],
    queryFn: async () => {
      return apiClient<{ containers: Container[] }>(
        `/containers/${limit ?? ""}`
      );
    },
    retry: true,
  });
  return {
    containersDetails,
    containersError,
    containersIsLoading,
  };
}

export default useContainers;
