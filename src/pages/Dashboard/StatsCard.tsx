import { Link } from "react-router-dom";
import { Container, Item } from "../../types";
import DashboardStatsSkeleton from "../../shared/components/skeleton/Dashboard/DashboardStatsSkeleton";

type StatsCardProps = {
  stats?: {
    containers: number;
    items: number;
    lastUpdatedContainer?: Container;
    lastUpdatedItem?: Item;
  };
  isLoding?: boolean;
};
function StatsCard({ stats, isLoding }: StatsCardProps) {
  if (isLoding) return <DashboardStatsSkeleton />;
  if (stats)
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Boxes */}
        <div className="bg-background-surface border border-border rounded-lg p-6 transition-shadow">
          <p className="text-text-secondary mb-2">Total Boxes</p>
          <p className="text-text-primary text-2xl font-meduim">
            {stats.containers}
          </p>
        </div>

        {/* Total Items */}
        <div className="bg-background-surface border border-border rounded-lg p-6 transition-shadow">
          <p className="text-text-secondary mb-2">Total Items</p>
          <p className="text-text-primary text-2xl font-meduim">
            {stats.items}
          </p>
        </div>

        {/* Recently Updated Box */}
        <div className="bg-background-surface border border-border rounded-lg p-6 transition-shadow">
          <p className="text-text-secondary mb-2">Recently Updated Box</p>
          {stats.lastUpdatedContainer ? (
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
          {stats.lastUpdatedItem ? (
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
    );
  return null;
}

export default StatsCard;
