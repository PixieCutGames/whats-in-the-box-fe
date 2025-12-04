import { Blocks, ChevronRight } from "lucide-react";
import { Item } from "../../types";
import DaysAgo from "../../shared/components/ui/DaysAgo";
import { Link } from "react-router-dom";

type ListViewProps = {
  items: Item[];
};
function ListView({ items }: ListViewProps) {
  return (
    <div className="bg-background-surface dark:bg-background-dark-surface  border border-border dark:border-border-dark rounded-lg overflow-hidden">
      {items.map((item, index) => (
        <Link
          to={`/item/${item.id}`}
          key={item.id}
          className={`flex items-center gap-4 p-4 hover:bg-background-accent dark:hover:bg-background-accent/10 transition-colors no-underline ${
            index !== items.length - 1
              ? "border-b border-border-light dark:border-border-dark-light"
              : ""
          }`}
        >
          {/* Image/Icon */}
          <div className="h-12 w-12 rounded-lg bg-background-accent dark:bg-background-accent/10 flex items-center justify-center shrink-0">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Blocks className="h-6 w-6 text-text-secondary dark:text-text-dark-secondary" />
            )}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <h3 className="text-text-primary dark:text-text-dark-primary truncate text-lg font-medium">
              {item.name}
            </h3>
            {/* Location */}
            <p className="text-text-secondary dark:text-text-dark-secondary whitespace-nowrap mt-2 truncate">
              Box: {item.container.name}
            </p>
          </div>

          {/* Quantity */}
          <div>
            <p className="text-text-secondary dark:text-text-dark-secondary whitespace-nowrap">
              Qty: {item.quantity}
            </p>
          </div>

          {/* Updated Date */}
          <div className="hidden md:block">
            <p className="text-text-secondary dark:text-text-dark-secondary whitespace-nowrap">
              Updated: <DaysAgo date={item.updatedAt} />
            </p>
          </div>

          {/* Chevron */}
          <ChevronRight className="h-5 w-5 text-text-secondary dark:text-text-dark-secondary shrink-0" />
        </Link>
      ))}
    </div>
  );
}

export default ListView;
