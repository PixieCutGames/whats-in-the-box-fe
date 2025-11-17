import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { Container } from "../../types";

function useContainers() {
  const {
    data: containersDetails,
    error: containersError,
    isLoading: containersIsLoading,
  } = useQuery({
    queryKey: ["getContainers"],
    queryFn: async () => {
      return apiClient<{ containers: Container[] }>("/containers/");
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
