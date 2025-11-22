import { useQuery } from "@tanstack/react-query";
import { Container, Item } from "../../../types";
import { apiClient } from "../../../lib/apiClient";

function useSearch(query?: string) {
  const { data, error, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["quickSearch", query],
    queryFn: async () => {
      return apiClient<{ items: Item[]; containers: Container[] }>(
        `/search?${query}`
      );
    },
    staleTime: 0,
    enabled: !!query,
  });
  return { data, isLoading: isLoading || isRefetching, error, refetch };
}

export default useSearch;
