import { Blocks } from "lucide-react";
import { ContainerItem } from "../../../types";
import DaysAgo from "../../../shared/components/ui/DaysAgo";
import { Link } from "react-router-dom";

type GridViewProps = {
  items: ContainerItem[];
};
function GridView({ items }: GridViewProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {items.map((item) => (
        <Link
          to={`/item/${item.id}`}
          key={item.id}
          className="bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group no-underline"
        >
          {/* Image/Icon */}
          <div className="aspect-square bg-background-accent dark:bg-background-accent/10 flex items-center justify-center group-hover:bg-primary-surface/20 dark:group-hover:bg-primary-dark-surface/10 transition-colors">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Blocks className="h-16 w-16 text-text-secondary dark:text-text-dark-secondary group-hover:text-primary dark:group-hover:text-primary-dark transition-colors" />
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-1">
            <h3 className="text-text-primary dark:text-text-dark-primary text-lg font-medium truncate">
              {item.name}
            </h3>
            <p className="text-text-secondary dark:text-text-dark-secondary">
              Qty: {item.quantity}
            </p>
            <p className="text-text-secondary dark:text-text-dark-secondary">
              Updated: <DaysAgo date={item.updatedAt} />
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default GridView;
