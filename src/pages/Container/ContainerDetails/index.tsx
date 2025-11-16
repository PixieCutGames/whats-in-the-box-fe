import { Grid3x3, List, Package, Plus } from "lucide-react";
import { useParams } from "react-router";
import useContainerDetails from "./useContainerDetails";
import DaysAgo from "../../../shared/components/DaysAgo";
import { useState } from "react";
import ContainerImage from "./ContainerImage";
import ContainerHeader from "./ContainerHeader";

function ContainerDetails() {
  const { id } = useParams();
  // TODO: handle containersError
  const { container, isLoading, refetch } = useContainerDetails(id);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (isLoading) return <div>Loading</div>;
  return (
    <div className="space-y-6">
      {/* Header */}
      <ContainerHeader container={container} onUpdate={() => refetch()} />
      {/* Container details */}
      <div className="lg:hidden">
        {/* Box Photo */}
        <ContainerImage
          imageUrl={container?.imageUrl}
          name={container?.name ?? ""}
        />
      </div>
      <div className="bg-background-surface border border-border rounded-lg p-6 lg:flex block gap-6">
        <div className="hidden lg:block w-sm">
          {/* Box Photo */}
          <ContainerImage
            imageUrl={container?.imageUrl}
            name={container?.name ?? ""}
          />
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-text-secondary text-lg font-medium mb-1">
              Location:
            </h3>
            <p className="text-text-primary">{container?.location}</p>
          </div>
          <div>
            <h3 className="text-text-secondary text-lg font-medium mb-1">
              Description:
            </h3>
            <p className="text-text-primary">{container?.description}</p>
          </div>
          <div>
            <h3 className="text-text-secondary text-lg font-medium mb-1">
              Last Updated:
            </h3>
            <p className="text-text-primary">
              {!!container && <DaysAgo date={container.updatedAt} />}
            </p>
          </div>
        </div>
      </div>

      {/* Items Section Header */}
      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-text-primary">Items</h2>
          {!!container?.items.length && (
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
          )}
        </div>
        {container?.items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-background-surface border border-border rounded-lg">
            <div className="h-20 w-20 rounded-full bg-background-accent flex items-center justify-center mb-6">
              <Package className="h-10 w-10 text-text-secondary" />
            </div>
            <h3 className="text-text-primary mb-2">No items yet</h3>
            <p className="text-text-secondary text-center mb-6 max-w-md">
              Start adding items to this box to keep track of what's inside
            </p>
            <button
              onClick={() => {}}
              className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add Your First Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContainerDetails;
