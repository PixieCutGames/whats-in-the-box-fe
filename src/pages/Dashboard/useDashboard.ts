import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/apiClient";
import { Item, Container, Activity } from "../../types";

function useDashboard(section?: "stats" | "logs" | "all") {
  const {
    data: stats,
    error: statsError,
    isLoading: statsIsLoading,
    refetch: refetchStats,
    isRefetching: statsIsRefetching,
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
    enabled: section === "stats" || section === "all",
  });

  const {
    data: logsData,
    error: logsError,
    isLoading: logsIsloading,
    refetch: refetchLogs,
    isRefetching: logsIsRefetching,
  } = useQuery({
    queryKey: ["getActivities"],
    queryFn: async () => {
      return apiClient<{
        logs: Activity[];
      }>(`/dashboard/activities`);
    },
    staleTime: 0,
    enabled: section === "logs" || section === "all",
  });
  return {
    stats,
    statsError,
    statsIsLoading: statsIsLoading || statsIsRefetching,
    logs: logsData?.logs,
    logsError,
    logsIsloading: logsIsloading || logsIsRefetching,
    refetchLogs,
    refetchStats,
  };
}

export default useDashboard;
