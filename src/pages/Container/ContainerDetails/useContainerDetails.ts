import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/apiClient";
import { Container } from "../../../types";

function useContainerDetails(id?: string) {
  const { data, error, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["getContainer", id],
    queryFn: async () => {
      return apiClient<{ container: Container }>(`/container/${id}`);
    },
    enabled: !!id,
    staleTime: 0,
  });
  return {
    container: data?.container,
    error,
    isLoading: isLoading || isRefetching,
    refetch,
  };
}

export default useContainerDetails;
