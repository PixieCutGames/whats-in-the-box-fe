import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { Container, Item } from "../../types";

function useQuickSearch(query?: string) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["quickSearch", query],
    queryFn: async () => {
      return apiClient<{ items: Item[]; containers: Container[] }>(
        `/quick/${query}`
      );
    },
    staleTime: 0,
    enabled: !!query,
  });
  return {
    data,
    isLoading,
    error,
    refetch,
  };
}

export default useQuickSearch;
