import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { Container } from "../../types";

function useContainers(limit?: number) {
  const {
    data: containersDetails,
    error: containersError,
    isLoading: containersIsLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["getContainers"],
    queryFn: async () => {
      return apiClient<{ containers: Container[] }>(
        `/containers/${limit ?? ""}`
      );
    },
  });
  return {
    containersDetails,
    containersError,
    containersIsLoading: containersIsLoading || isRefetching,
    refetchContainers: refetch,
  };
}

export default useContainers;
