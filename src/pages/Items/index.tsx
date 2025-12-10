import { Plus } from "lucide-react";
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
import usePreference from "../../shared/hooks/usePreference";
import ErrorState from "./ErrorState";
import ViewToggleButtons from "../../shared/components/Layout/ViewToggleButtons";
import { Button } from "../../shared/components/ui/Button";

function Items() {
  const navigate = useNavigate();
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");

  const { itemsDetails, itemsIsLoading, itemsError, refetchItems } = useItems();
  const { containersDetails, containersIsLoading } = useContainers();
  const [viewMode, setViewMode] = usePreference<"grid" | "list">(
    "Items",
    "view",
    "grid"
  );
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
    if (itemsError) return <ErrorState refetch={refetchItems} />;
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
        <h1 className="text-text-primary dark:text-text-dark-primary text-2xl font-medium">
          Items
        </h1>
        {!!itemsDetails?.items.length && (
          <div className="flex items-center gap-2">
            {/* View Toggle Buttons */}
            <ViewToggleButtons viewMode={viewMode} setViewMode={setViewMode} />

            {/* Add Button */}
            <Button
              onClick={createNewItem}
              className="hover:bg-primary-hover py-5"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Item</span>
            </Button>
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
