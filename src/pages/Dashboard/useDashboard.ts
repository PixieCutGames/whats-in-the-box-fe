import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { Item, Container, Activity } from "../../types";

function useDashboard() {
  const {
    data: stats,
    error: statsError,
    isLoading: statsIsLoading,
  } = useQuery({
    queryKey: ["getStats"],
    queryFn: async () => {
      return apiClient<{
        items: number;
        containers: number;
        lastUpdatedContainer?: Container;
        lastUpdatedItem?: Item;
      }>(`/dashboard/stats`);
    },
    staleTime: 0,
  });

  const {
    data: logsData,
    error: logsError,
    isLoading: logsIsloding,
  } = useQuery({
    queryKey: ["getActivities"],
    queryFn: async () => {
      return apiClient<{
        logs: Activity[];
      }>(`/dashboard/activities`);
    },
    staleTime: 0,
  });
  return {
    stats,
    statsError,
    statsIsLoading,
    logs: logsData?.logs,
    logsError,
    logsIsloding,
  };
}

export default useDashboard;
