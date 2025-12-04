import { Plus } from "lucide-react";
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
import usePreference from "../../shared/hooks/usePreference";
import ErrorState from "./ErrorState";
import ViewToggleButtons from "../../shared/components/Layout/ViewToggleButtons";
import { Button } from "../../shared/components/ui/Button";

function ContainersPage() {
  const navigate = useNavigate();
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");

  const {
    containersDetails,
    containersIsLoading,
    containersError,
    refetchContainers,
  } = useContainers();
  const [viewMode, setViewMode] = usePreference<"grid" | "list">(
    "ContainersPage",
    "view",
    "grid"
  );
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
    if (containersError) return <ErrorState refetch={refetchContainers} />;
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
            <ViewToggleButtons viewMode={viewMode} setViewMode={setViewMode} />

            {/* Add Button */}
            <Button
              onClick={createNewContainer}
              className="hover:bg-primary-hover py-5"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Box</span>
            </Button>
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
