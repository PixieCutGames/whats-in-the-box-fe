import { ChevronRight, Package } from "lucide-react";
import { Container } from "../../types";
import DaysAgo from "../../shared/components/DaysAgo";
import { Link } from "react-router-dom";

type ListViewProps = {
  containers: Container[];
};
function ListView({ containers }: ListViewProps) {
  return (
    <div className="bg-background-surface border border-border rounded-lg overflow-hidden">
      {containers.map((container, index) => (
        <Link
          to={`/box/${container.id}`}
          key={container.id}
          className={`flex items-center gap-4 p-4 hover:bg-background-accent transition-colors no-underline ${
            index !== containers.length - 1
              ? "border-b border-border-light"
              : ""
          }`}
        >
          {/* Image/Icon */}
          <div className="h-12 w-12 rounded-lg bg-background-accent flex items-center justify-center shrink-0">
            {container.imageUrl ? (
              <img
                src={container.imageUrl}
                alt={container.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Package className="h-6 w-6 text-text-secondary" />
            )}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <h3 className="text-text-primary truncate  text-lg font-medium">
              {container.name}
            </h3>
          </div>

          {/* Items Count */}
          <div>
            <p className="text-text-secondary whitespace-nowrap">
              Items: {container.items.length}
            </p>
          </div>

          {/* Updated Date */}
          <div className="hidden md:block">
            <p className="text-text-secondary whitespace-nowrap">
              Updated: <DaysAgo date={container.updatedAt} />
            </p>
          </div>

          {/* Chevron */}
          <ChevronRight className="h-5 w-5 text-text-secondary shrink-0" />
        </Link>
      ))}
    </div>
  );
}

export default ListView;
