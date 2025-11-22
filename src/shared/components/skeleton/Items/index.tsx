import usePreference from "../../../hooks/usePreference";
import ItemGridViewSkeleton from "../ItemGridViewSkeleton";
import ItemsListViewSkeleton from "../ItemsListViewSkeleton";

function Items() {
  const [viewMode] = usePreference<"grid" | "list">("Items", "view", "grid");
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-pulse">
        {/* Title */}
        <div className="h-8 w-28 bg-background-accent rounded" />
      </div>
      {viewMode === "grid" ? (
        <ItemGridViewSkeleton />
      ) : (
        <ItemsListViewSkeleton />
      )}
    </div>
  );
}

export default Items;
