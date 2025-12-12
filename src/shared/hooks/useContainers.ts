import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { Container, ContainersSearchQuery } from "../../types";

const buildquery = (query?: ContainersSearchQuery) => {
  if (!query) return "";
  const queryParts: string[] = [];
  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      const element = query[key as keyof ContainersSearchQuery];
      queryParts.push(`${key}=${element}`);
    }
  }
  return "?" + queryParts.join("&");
};
function useContainers(query?: ContainersSearchQuery, type: string = "") {
  const {
    data: containersDetails,
    error: containersError,
    isLoading: containersIsLoading,
    refetch,
  } = useQuery({
    queryKey: [`getContainers${type}`],
    queryFn: async () => {
      return apiClient<{ containers: Container[] }>(
        `/containers${buildquery(query)}`
      );
    },
  });
  return {
    containersDetails,
    containersError,
    containersIsLoading,
    refetchContainers: refetch,
  };
}

export default useContainers;
