import usePreference from "../../../hooks/usePreference";
import ContainerGridViewSkeleton from "../ContainerGridViewSkeleton";
import ContainerListViewSkeleton from "../ContainerListViewSkeleton";

function Containers() {
  const [viewMode] = usePreference<"grid" | "list">(
    "ContainerDetails",
    "view",
    "grid"
  );
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-pulse">
        {/* Title */}
        <div className="h-8 w-28 bg-background-accent dark:bg-background-accent/10 rounded" />
      </div>
      {viewMode === "grid" ? (
        <ContainerGridViewSkeleton />
      ) : (
        <ContainerListViewSkeleton />
      )}
    </div>
  );
}

export default Containers;
