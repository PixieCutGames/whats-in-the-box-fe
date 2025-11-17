import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { Item } from "../../types";

function useItems() {
  const {
    data: itemsDetails,
    error: itemsError,
    isLoading: itemsIsLoading,
  } = useQuery({
    queryKey: ["getItems"],
    queryFn: async () => {
      return apiClient<{ items: Item[] }>("/items/");
    },
    retry: true,
  });
  return {
    itemsDetails,
    itemsError,
    itemsIsLoading,
  };
}

export default useItems;
