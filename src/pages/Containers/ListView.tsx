import { ChevronRight, Package } from "lucide-react";
import { Container } from "../../types";
import DaysAgo from "../../shared/components/ui/DaysAgo";
import { Link } from "react-router-dom";
import PinIcon from "../../shared/components/PinIcon";

type ListViewProps = {
  containers: Container[];
};
function ListView({ containers }: ListViewProps) {
  return (
    <div className="bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg overflow-hidden">
      {containers.map((container, index) => (
        <Link
          to={`/box/${container.id}`}
          key={container.id}
          className={`relative flex items-center gap-4 p-4 hover:bg-background-accent dark:hover:bg-background-accent/10 transition-colors no-underline ${
            index !== containers.length - 1
              ? "border-b border-border-light dark:border-border-dark-light"
              : ""
          }`}
        >
          {/* Image/Icon */}
          <div className="h-12 w-12 rounded-lg bg-background-accent dark:bg-background-accent/10 flex items-center justify-center shrink-0">
            {container.imageUrl ? (
              <img
                src={container.imageUrl}
                alt={container.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Package className="h-6 w-6 text-text-secondary dark:text-text-dark-secondary" />
            )}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <h3 className="text-text-primary dark:text-text-dark-primary truncate text-lg font-medium">
              {container.name}
            </h3>
            <p className="text-text-secondary dark:text-text-dark-secondary whitespace-nowrap md:hidden">
              Items: {container.itemsCount}
            </p>
          </div>

          {/* Items Count */}
          <div className="hidden md:block">
            <p className="text-text-secondary dark:text-text-dark-secondary whitespace-nowrap">
              Items: {container.itemsCount}
            </p>
          </div>

          {/* Updated Date */}
          <div className="hidden md:block">
            <p className="text-text-secondary dark:text-text-dark-secondary whitespace-nowrap">
              Updated: <DaysAgo date={container.updatedAt} />
            </p>
          </div>

          {/* Star Button */}
          <PinIcon container={container} />

          {/* Chevron */}
          <ChevronRight className="h-5 w-5 text-text-secondary dark:text-text-dark-secondary shrink-0" />
        </Link>
      ))}
    </div>
  );
}

export default ListView;
