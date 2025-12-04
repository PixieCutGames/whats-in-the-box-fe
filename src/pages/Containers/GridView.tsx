import { Package } from "lucide-react";
import { Container } from "../../types";
import DaysAgo from "../../shared/components/ui/DaysAgo";
import { Link } from "react-router-dom";

type GridViewProps = {
  containers: Container[];
};
function GridView({ containers }: GridViewProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {containers.map((container) => (
        <Link
          to={`/box/${container.id}`}
          key={container.id}
          className="bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group no-underline"
        >
          {/* Image/Icon */}
          <div className="aspect-square bg-background-accent dark:bg-background-accent/10 flex items-center justify-center group-hover:bg-primary-surface/20 dark:group-hover:bg-primary-dark-surface/10 transition-colors">
            {container.imageUrl ? (
              <img
                src={container.imageUrl}
                alt={container.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package className="h-16 w-16 text-text-secondary dark:text-text-dark-secondary group-hover:text-primary dark:group-hover:text-primary-dark transition-colors" />
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-1">
            <h3 className="text-text-primary dark:text-text-dark-primary text-lg font-medium">
              {container.name}
            </h3>
            <p className="text-text-secondary dark:text-text-dark-secondary">
              Items: {container.itemsCount}
            </p>
            <p className="text-text-secondary dark:text-text-dark-secondary">
              Updated: <DaysAgo date={container.updatedAt} />
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default GridView;
