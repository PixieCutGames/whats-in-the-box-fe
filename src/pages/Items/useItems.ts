import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { Item } from "../../types";

function useItems() {
  const {
    data: itemsDetails,
    error: itemsError,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["getItems"],
    queryFn: async () => {
      return apiClient<{ items: Item[] }>("/items/");
    },
  });
  return {
    itemsDetails,
    itemsError,
    itemsIsLoading: isLoading || isRefetching,
    refetchItems: refetch,
  };
}

export default useItems;
