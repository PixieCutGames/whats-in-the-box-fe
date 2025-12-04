import { Plus } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import useContainerDetails from "./useContainerDetails";
import DaysAgo from "../../../shared/components/ui/DaysAgo";
import ContainerImage from "../../../shared/components/IconImage";
import ContainerHeader from "./ContainerHeader";
import EmptyState from "./EmptyState";
import GridView from "./GridView";
import ListView from "./ListView";
import ContainerDetailsSkeleton from "../../../shared/components/skeleton/ContainerDetails";
import usePreference from "../../../shared/hooks/usePreference";
import ErrorState from "./ErrorState";
import AddEditDialog from "../../../shared/components/AddEditDialog";
import { useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import ViewToggleButtons from "../../../shared/components/Layout/ViewToggleButtons";
import { Button } from "../../../shared/components/ui/Button";

function ContainerDetails() {
  const navigate = useNavigate();
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");
  const { id } = useParams();

  const { container, isLoading, refetch, error } = useContainerDetails(id);
  const [viewMode, setViewMode] = usePreference<"grid" | "list">(
    "ContainerDetails",
    "view",
    "grid"
  );
  const [openAddItemDialog, setOpenAddItemDialog] = useState<boolean>(false);

  const createNewItem = () => {
    if (notDesktop) {
      navigate("/item/new", {
        state: { containerId: container?.id },
      });
      return;
    }
    setOpenAddItemDialog(true);
  };

  if (isLoading) return <ContainerDetailsSkeleton />;
  if (error) return <ErrorState refetch={refetch} />;
  return (
    <div className="space-y-6">
      {/* Header */}
      <ContainerHeader container={container} />
      {/* Container details */}
      <div className="lg:hidden">
        {/* Box Photo */}
        <ContainerImage
          imageUrl={container?.imageUrl}
          name={container?.name ?? ""}
          type="container"
        />
      </div>
      <div className="bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg p-6 lg:flex block gap-6">
        <div className="hidden lg:block w-sm">
          {/* Box Photo */}
          <ContainerImage
            imageUrl={container?.imageUrl}
            name={container?.name ?? ""}
            type="container"
          />
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-text-secondary dark:text-text-dark-secondary text-lg font-medium mb-1">
              Location:
            </h3>
            <p className="text-text-primary dark:text-text-dark-primary">
              {container?.location}
            </p>
          </div>
          <div>
            <h3 className="text-text-secondary dark:text-text-dark-secondary text-lg font-medium mb-1">
              Description:
            </h3>
            <p className="text-text-primary dark:text-text-dark-primary">
              {container?.description}
            </p>
          </div>
          <div>
            <h3 className="text-text-secondary dark:text-text-dark-secondary text-lg font-medium mb-1">
              Last Updated:
            </h3>
            <p className="text-text-primary dark:text-text-dark-primary">
              {!!container && <DaysAgo date={container.updatedAt} />}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border dark:border-border-dark pt-6">
        {/* Items Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-text-primary dark:text-text-dark-primary">
            Items
          </h2>
          {!!container?.items.length && (
            <div className="flex items-center gap-2">
              <ViewToggleButtons
                viewMode={viewMode}
                setViewMode={setViewMode}
              />
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
        {/* EMPTY STATE */}
        {container?.items.length === 0 && <EmptyState />}
        {/* GRID VIEW */}
        {!!container?.items.length && viewMode === "grid" && (
          <GridView items={container.items} />
        )}
        {/* LIST VIEW */}
        {!!container?.items.length && viewMode === "list" && (
          <ListView items={container.items} />
        )}
      </div>
      <AddEditDialog
        isOpen={openAddItemDialog}
        onClose={(isRefetch) => {
          setOpenAddItemDialog(false);
          if (isRefetch) refetch();
        }}
        containerId={container?.id}
        type="item"
      />
    </div>
  );
}

export default ContainerDetails;
