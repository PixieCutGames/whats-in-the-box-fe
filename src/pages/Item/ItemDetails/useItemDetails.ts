import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/apiClient";
import { Item } from "../../../types";

function useItemDetails(id?: string) {
  const { data, error, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["getItem", id],
    queryFn: async () => {
      return apiClient<{ item: Item }>(`/item/${id}`);
    },
    enabled: !!id,
  });
  return {
    item: data?.item,
    error,
    isLoading: isLoading || isRefetching,
    refetch,
  };
}

export default useItemDetails;
