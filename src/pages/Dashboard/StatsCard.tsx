import { Link } from "react-router-dom";
import { Container, Item } from "../../types";
import DashboardStatsSkeleton from "../../shared/components/skeleton/Dashboard/DashboardStatsSkeleton";
import UIState from "../../shared/components/Layout/UIState";
import ErrorState from "./ErrorState";

type StatsCardProps = {
  stats?: {
    containers: number;
    items: number;
    lastUpdatedContainer?: Container;
    lastUpdatedItem?: Item;
  };
  isLoading?: boolean;
  isError?: boolean;
  refetch: () => void;
};
function StatsCard({ stats, isLoading, refetch, isError }: StatsCardProps) {
  return (
    <UIState loading={isLoading} error={isError}>
      <ErrorState refetch={refetch} />;
      <DashboardStatsSkeleton />
      <div data-data className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Boxes */}
        <div className="bg-background-surface border border-border rounded-lg p-6 transition-shadow">
          <p className="text-text-secondary mb-2">Total Boxes</p>
          <p className="text-text-primary text-2xl font-meduim">
            {stats?.containers}
          </p>
        </div>

        {/* Total Items */}
        <div className="bg-background-surface border border-border rounded-lg p-6 transition-shadow">
          <p className="text-text-secondary mb-2">Total Items</p>
          <p className="text-text-primary text-2xl font-meduim">
            {stats?.items}
          </p>
        </div>

        {/* Recently Updated Box */}
        <div className="bg-background-surface border border-border rounded-lg p-6 transition-shadow">
          <p className="text-text-secondary mb-2">Recently Updated Box</p>
          {stats?.lastUpdatedContainer ? (
            <Link
              to={`/box/${stats.lastUpdatedContainer.id}`}
              className="text-text-primary text-lg font-meduim truncate"
            >
              {stats.lastUpdatedContainer.name ?? "-"}{" "}
            </Link>
          ) : (
            <p className="text-text-primary text-xl font-meduim">-</p>
          )}
        </div>

        {/* Recently Updated Item */}
        <div className="bg-background-surface border border-border rounded-lg p-6 transition-shadow">
          <p className="text-text-secondary mb-2">Recently Updated Item</p>
          {stats?.lastUpdatedItem ? (
            <Link
              to={`/item/${stats.lastUpdatedItem.id}`}
              className="text-text-primary text-lg font-meduim truncate"
            >
              {stats.lastUpdatedItem.name ?? "-"}
            </Link>
          ) : (
            <p className="text-text-primary text-xl font-meduim">-</p>
          )}
        </div>
      </div>
    </UIState>
  );
}

export default StatsCard;
