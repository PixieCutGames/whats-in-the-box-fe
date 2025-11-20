import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/apiClient";
import { Item } from "../../../types";

function useItemDetails(id?: string) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["getItem", id],
    queryFn: async () => {
      return apiClient<{ item: Item }>(`/item/${id}`);
    },
    enabled: !!id,
    staleTime: 0,
  });
  return {
    item: data?.item,
    error,
    isLoading,
    refetch,
  };
}

export default useItemDetails;
