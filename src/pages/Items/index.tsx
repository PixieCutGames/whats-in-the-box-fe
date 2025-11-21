import { Grid3x3, List, Plus } from "lucide-react";
import useItems from "./useItems";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import AddEditDialog from "../../shared/components/AddEditDialog";
import EmptyState from "./EmptyState";
import useContainers from "../../shared/hooks/useContainers";
import GridView from "./GridView";
import ListView from "./ListView";
import ItemGridViewSkeleton from "../../shared/components/skeleton/ItemGridViewSkeleton";
import ItemsListViewSkeleton from "../../shared/components/skeleton/ItemsListViewSkeleton";

function Items() {
  const navigate = useNavigate();
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");
  // TODO: handle errors
  const { itemsDetails, itemsIsLoading } = useItems();
  const { containersDetails, containersIsLoading } = useContainers();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [openCreateItemDialog, setOpenCreateItemDialog] =
    useState<boolean>(false);
  const [openCreateBoxDialog, setOpenCreateBoxDialog] =
    useState<boolean>(false);

  const createNewContainer = () => {
    if (notDesktop) {
      navigate("/box/new");
      return;
    }
    setOpenCreateBoxDialog(true);
  };

  const createNewItem = () => {
    if (notDesktop) {
      navigate("/item/new");
      return;
    }
    setOpenCreateItemDialog(true);
  };

  const getView = () => {
    if (itemsIsLoading || containersIsLoading) {
      if (viewMode === "grid") return <ItemGridViewSkeleton />;
      else return <ItemsListViewSkeleton />;
    }
    if (
      itemsDetails?.items.length === 0 ||
      containersDetails?.containers.length === 0
    )
      return (
        <EmptyState
          createNewContainer={createNewContainer}
          createNewItem={createNewItem}
          hasContainers={!!containersDetails?.containers.length}
        />
      );
    if (itemsDetails?.items.length && viewMode === "grid")
      return <GridView items={itemsDetails.items} />;
    if (itemsDetails?.items.length && viewMode === "list")
      return <ListView items={itemsDetails.items} />;
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header with View Controls */}
      <div className="flex items-center justify-between">
        <h1 className="text-text-primary text-2xl font-medium">Items</h1>
        {!!itemsDetails?.items.length && (
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
              onClick={createNewItem}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Item</span>
            </button>
          </div>
        )}
      </div>
      {getView()}

      <AddEditDialog
        type="item"
        isOpen={openCreateItemDialog}
        onClose={() => setOpenCreateItemDialog(false)}
      />
      <AddEditDialog
        type="container"
        isOpen={openCreateBoxDialog}
        onClose={() => setOpenCreateBoxDialog(false)}
      />
    </div>
  );
}

export default Items;
