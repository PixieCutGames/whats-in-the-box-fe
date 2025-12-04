import { Link } from "react-router-dom";
import { Container, Item } from "../../types";
import DashboardStatsSkeleton from "../../shared/components/skeleton/Dashboard/DashboardStatsSkeleton";
import UIState from "../../shared/components/Layout/UIState";
import ErrorState from "./ErrorState";
import { Card } from "../../shared/components/ui/Card";

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
        <Card className="rounded-lg p-6 block">
          <p className="text-text-secondary dark:text-text-dark-secondary mb-2">
            Total Boxes
          </p>
          <p className="text-text-primary dark:text-text-dark-primary text-2xl font-meduim">
            {stats?.containers}
          </p>
        </Card>

        {/* Total Items */}
        <Card className="rounded-lg p-6 block">
          <p className="text-text-secondary dark:text-text-dark-secondary mb-2">
            Total Items
          </p>
          <p className="text-text-primary dark:text-text-dark-primary text-2xl font-meduim">
            {stats?.items}
          </p>
        </Card>

        {/* Recently Updated Box */}
        <Card className="rounded-lg p-6 block">
          <p className="text-text-secondary dark:text-text-dark-secondary mb-2">
            Recently Updated Box
          </p>
          {stats?.lastUpdatedContainer ? (
            <Link
              to={`/box/${stats.lastUpdatedContainer.id}`}
              className="text-text-primary dark:text-text-dark-primary text-lg font-meduim truncate block"
            >
              {stats.lastUpdatedContainer.name ?? "-"}{" "}
            </Link>
          ) : (
            <p className="text-text-primary dark:text-text-dark-primary text-xl font-meduim">
              -
            </p>
          )}
        </Card>

        {/* Recently Updated Item */}
        <Card className="rounded-lg p-6 block">
          <p className="text-text-secondary dark:text-text-dark-secondary mb-2">
            Recently Updated Item
          </p>
          {stats?.lastUpdatedItem ? (
            <Link
              to={`/item/${stats.lastUpdatedItem.id}`}
              className="text-text-primary dark:text-text-dark-primary text-lg font-meduim truncate block"
            >
              {stats.lastUpdatedItem.name ?? "-"}
            </Link>
          ) : (
            <p className="text-text-primary dark:text-text-dark-primary text-xl font-meduim">
              -
            </p>
          )}
        </Card>
      </div>
    </UIState>
  );
}

export default StatsCard;
