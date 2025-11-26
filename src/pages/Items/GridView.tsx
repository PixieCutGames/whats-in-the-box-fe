import { Blocks } from "lucide-react";
import { Item } from "../../types";
import DaysAgo from "../../shared/components/ui/DaysAgo";
import { Link } from "react-router-dom";

type GridViewProps = {
  items: Item[];
};
function GridView({ items }: GridViewProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {items.map((items) => (
        <Link
          to={`/item/${items.id}`}
          key={items.id}
          className="bg-background-surface border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group no-underline"
        >
          {/* Image/Icon */}
          <div className="aspect-square bg-background-accent flex items-center justify-center group-hover:bg-primary-surface/20 transition-colors">
            {items.imageUrl ? (
              <img
                src={items.imageUrl}
                alt={items.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Blocks className="h-16 w-16 text-text-secondary group-hover:text-primary transition-colors" />
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-1">
            <h3 className="text-text-primary text-lg font-medium">
              {items.name}
            </h3>
            <p className="text-text-secondary">Box: {items.container.name}</p>
            <p className="text-text-secondary">Qty: {items.quantity}</p>
            <p className="text-text-secondary">
              Updated: <DaysAgo date={items.updatedAt} />
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default GridView;
