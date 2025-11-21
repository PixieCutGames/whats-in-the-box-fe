import { Grid3x3, List, Plus } from "lucide-react";
import { useState } from "react";
import useContainers from "../../shared/hooks/useContainers";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useNavigate } from "react-router";
import AddEditContainerDialog from "../../shared/components/AddEditDialog";
import EmptyState from "./EmptyState";
import GridView from "./GridView";
import ListView from "./ListView";
import ContainerGridViewSkeleton from "../../shared/components/skeleton/ContainerGridViewSkeleton";
import ContainerListViewSkeleton from "../../shared/components/skeleton/ContainerListViewSkeleton";

function ContainersPage() {
  const navigate = useNavigate();
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");
  // TODO: handle containersError
  const { containersDetails, containersIsLoading } = useContainers();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);

  const createNewContainer = () => {
    if (notDesktop) {
      navigate("/box/new");
      return;
    }
    setOpenCreateDialog(true);
  };

  const getView = () => {
    if (containersIsLoading) {
      if (viewMode === "grid") return <ContainerGridViewSkeleton />;
      else return <ContainerListViewSkeleton />;
    }
    if (containersDetails?.containers.length === 0)
      return <EmptyState createNewContainer={createNewContainer} />;
    if (containersDetails?.containers.length && viewMode === "grid")
      return <GridView containers={containersDetails.containers} />;
    if (containersDetails?.containers.length && viewMode === "list")
      return <ListView containers={containersDetails.containers} />;
    return null;
  };
  return (
    <div className="space-y-6">
      {/* Header with View Controls */}
      <div className="flex items-center justify-between">
        <h1 className="text-text-primary text-2xl font-medium">Boxes</h1>
        {!!containersDetails?.containers.length && (
          <div className="flex items-center gap-2">
            {/* View Toggle Buttons */}
            <div className="flex items-center gap-1 bg-background-surface border border-border rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary-surface text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-accent"
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-primary-surface text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-accent"
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Add Button */}
            <button
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors"
              onClick={createNewContainer}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Box</span>
            </button>
          </div>
        )}
      </div>
      {getView()}
      <AddEditContainerDialog
        type="container"
        isOpen={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      />
    </div>
  );
}

export default ContainersPage;
