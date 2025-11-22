import { Maybe } from "yup";
import ContainerGridViewSkeleton from "../../../shared/components/skeleton/ContainerGridViewSkeleton";
import ContainerListViewSkeleton from "../../../shared/components/skeleton/ContainerListViewSkeleton";
import ItemGridViewSkeleton from "../../../shared/components/skeleton/ItemGridViewSkeleton";
import ItemsListViewSkeleton from "../../../shared/components/skeleton/ItemsListViewSkeleton";

type SearchSkeletonProps = {
  type: Maybe<string>;
  viewMode: "list" | "grid";
};
function SearchSkeleton({ type, viewMode }: SearchSkeletonProps) {
  return (
    <>
      <div>
        {type !== "container" && (
          <h3 className="text-text-secondary mb-3">Boxes</h3>
        )}
        <div className="space-y-1">
          {viewMode === "list" && <ContainerListViewSkeleton />}
          {viewMode === "grid" && <ContainerGridViewSkeleton />}
        </div>
      </div>
      <div>
        {type !== "item" && <h3 className="text-text-secondary mb-3">Items</h3>}
        <div className="space-y-1">
          {viewMode === "list" && <ItemsListViewSkeleton />}
          {viewMode === "grid" && <ItemGridViewSkeleton />}
        </div>
      </div>
    </>
  );
}

export default SearchSkeleton;
