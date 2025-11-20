import { useNavigate, Link } from "react-router";
import useUser from "../../shared/hooks/useUser";
import { ChevronRight, Package, Plus } from "lucide-react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useState } from "react";
import AddEditDialog from "../../shared/components/AddEditDialog";
import useDashboard from "./useDashboard";
import useContainers from "../../shared/hooks/useContainers";
import RecentActivities from "./RecentActivities";
import GridView from "../Containers/GridView";
import StatsCard from "./StatsCard";
import ContainerGridViewSkeleton from "../../shared/components/skeleton/ContainerGridViewSkeleton";

function Dashboard() {
  const { userDetails } = useUser();
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  // TODO: handle errors
  const { logs, logsIsloding, stats, statsIsLoading } = useDashboard();
  const { containersDetails, containersIsLoading } = useContainers(4);

  const createNewContainer = () => {
    if (notDesktop) {
      navigate("/box/new");
      return;
    }
    setOpenCreateDialog(true);
  };

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
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="h-32 w-32 rounded-full bg-primary-surface/20 flex items-center justify-center mb-6">
            <Package className="h-16 w-16 text-primary" />
          </div>
          <h2 className="text-text-primary mb-2 text-center">
            Welcome to What's in the Box!
          </h2>
          <p className="text-text-secondary text-center mb-2 max-w-md">
            You have no boxes yet.
          </p>
          <p className="text-text-secondary text-center mb-8 max-w-md">
            Start by creating your first box to add and track items.
          </p>
          <button
            onClick={createNewContainer}
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5" />
            Create Your First Box
          </button>
        </div>
      )}
      {/* Stats Cards */}
      <StatsCard stats={stats} isLoding={statsIsLoading} />
      {/* Recent Activity */}
      <RecentActivities logs={logs} logsIsloding={logsIsloding} />
      <>
        {/* Your boxes */}
        <div className="bg-background-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-text-primary text-xl font-medium">
              Your Boxes{" "}
              <span className="max-md:hidden">(Recently Updated)</span>
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
      </>
      <AddEditDialog
        type="container"
        isOpen={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      />
    </div>
  );
}

export default Dashboard;
