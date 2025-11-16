import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/apiClient";
import { Container } from "../../../types";

function useContainerDetails(id?: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getContainer", id],
    queryFn: async () => {
      return apiClient<{ container: Container }>(`/container/${id}`);
    },
    retry: true,
    enabled: !!id,
  });
  return {
    container: data?.container,
    error,
    isLoading,
  };
}

export default useContainerDetails;
