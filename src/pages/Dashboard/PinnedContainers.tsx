import { Link } from "react-router-dom";
import UIState from "../../shared/components/Layout/UIState";
import { Card } from "../../shared/components/ui/Card";
import useContainers from "../../shared/hooks/useContainers";
import ErrorState from "./ErrorState";
import { Package } from "lucide-react";

function PinnedContainers() {
  const {
    containersDetails,
    containersIsLoading,
    containersError,
    refetchContainers,
  } = useContainers({ pinned: true }, "-pinned");
  return (
    <UIState loading={containersIsLoading} error={!!containersError}>
      <ErrorState refetch={refetchContainers} />
      {!!containersDetails?.containers.length && (
        <Card data-data className="rounded-lg p-6 block">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-text-primary dark:text-text-dark-primary text-xl font-medium">
              Pinned Boxes
            </h2>
          </div>
          <div className="relative overflow-x-scroll flex gap-4">
            {containersDetails?.containers.map((container) => (
              <Link
                to={`/box/${container.id}`}
                key={container.id}
                className="bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group no-underline relative flex w-64 max-sm:w-56 shrink-0"
              >
                {/* Image/Icon */}
                <div className="aspect-square size-16 bg-background-accent dark:bg-background-accent/10 flex items-center justify-center group-hover:bg-primary-surface/20 dark:group-hover:bg-primary-dark-surface/10 transition-colors">
                  {container.imageUrl ? (
                    <img
                      src={container.imageUrl}
                      alt={container.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="size-12 text-text-secondary dark:text-text-dark-secondary group-hover:text-primary dark:group-hover:text-primary-dark transition-colors" />
                  )}
                </div>
                <div className="space-y-1 p-2 px-4 overflow-hidden">
                  <h3 className="text-text-primary dark:text-text-dark-primary text-base font-medium truncate">
                    {container.name}
                  </h3>
                  <p className="text-text-secondary dark:text-text-dark-secondary text-sm">
                    Items: {container.itemsCount}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      )}
    </UIState>
  );
}

export default PinnedContainers;
