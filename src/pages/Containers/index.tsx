import { Grid3x3, List, Package, Plus } from "lucide-react";
import { useState } from "react";
import useContainers from "./useContainers";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useNavigate } from "react-router";
import CreateNewContainerDialog from "./CreateNewContainerDialog";

function ContainersPage() {
  const navigate = useNavigate();
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");
  const { containersDetails, containersError, containersIsLoading } =
    useContainers();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);

  const createNewContainer = () => {
    if (notDesktop) {
      navigate("/boxes/new");
      return;
    }
    setOpenCreateDialog(true);
  };
  return (
    <div className="space-6">
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
      {containersIsLoading ?? <div>Loading</div>}
      {/* Empty State */}
      {containersDetails?.containers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="h-24 w-24 rounded-full bg-background-accent flex items-center justify-center mb-6">
            <Package className="h-12 w-12 text-text-secondary" />
          </div>
          <h2 className="text-text-primary mb-2">No boxes yet</h2>
          <p className="text-text-secondary text-center mb-6 max-w-md">
            Get started by creating your first box to organize your items
          </p>
          <button
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors"
            onClick={createNewContainer}
          >
            <Plus className="h-5 w-5" />
            Create Your First Box
          </button>
        </div>
      )}
      <CreateNewContainerDialog
        isOpen={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      />
    </div>
  );
}

export default ContainersPage;
