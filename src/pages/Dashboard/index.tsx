import { useNavigate, Link } from "react-router";
import useUser from "../../shared/hooks/useUser";
import { ChevronRight, Plus } from "lucide-react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useState } from "react";
import AddEditDialog from "../../shared/components/AddEditDialog";
import useDashboard from "./useDashboard";
import useContainers from "../../shared/hooks/useContainers";
import RecentActivities from "./RecentActivities";
import GridView from "../Containers/GridView";
import StatsCard from "./StatsCard";
import ContainerGridViewSkeleton from "../../shared/components/skeleton/ContainerGridViewSkeleton";
import DashboardSkeleton from "../../shared/components/skeleton/Dashboard";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";

function Dashboard() {
  const { userDetails } = useUser();
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    stats,
    statsIsLoading,
    refetchStats,
    statsError,
    logs,
    logsIsloading,
    logsError,
    refetchLogs,
  } = useDashboard("all");
  const {
    containersDetails,
    containersIsLoading,
    containersError,
    refetchContainers,
  } = useContainers(4);

  const createNewContainer = () => {
    if (notDesktop) {
      navigate("/box/new");
      return;
    }
    setOpenCreateDialog(true);
  };

  if (statsIsLoading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-text-primary text-2xl font-medium">
          Welcome {userDetails?.user.name ?? userDetails?.user.email}
        </h1>
        {/* Add Button */}
        {!!stats?.containers && (
          <button
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors"
            onClick={createNewContainer}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Box</span>
          </button>
        )}
      </div>
      {/* Empty State Content */}
      {stats?.containers === 0 && (
        <EmptyState createNewContainer={createNewContainer} />
      )}
      {!!stats?.containers && (
        <>
          {/* Stats Cards */}
          <StatsCard
            stats={stats}
            isLoading={statsIsLoading}
            isError={!!statsError}
            refetch={refetchStats}
          />
          {/* Recent Activity */}
          <RecentActivities
            logs={logs}
            logsIsloading={logsIsloading}
            logsError={!!logsError}
            refetchLogs={refetchLogs}
          />
          {/* Your boxes */}
          {containersError ? (
            <ErrorState refetch={refetchContainers} />
          ) : (
            <div className="bg-background-surface border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-text-primary text-xl font-medium">
                  Your Boxes
                  <span className="max-md:hidden ml-1">(Recently Updated)</span>
                </h2>
                <Link
                  to="/boxes"
                  className="text-primary-default hover:text-primary-hover transition-colors flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              {containersIsLoading ? (
                <ContainerGridViewSkeleton />
              ) : (
                <GridView containers={containersDetails?.containers ?? []} />
              )}
            </div>
          )}
        </>
      )}
      <AddEditDialog
        type="container"
        isOpen={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      />
    </div>
  );
}

export default Dashboard;
