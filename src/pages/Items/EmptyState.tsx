import { Blocks, Plus } from "lucide-react";
import { Button } from "../../shared/components/ui/Button";

type EmptyStateProps = {
  createNewContainer: () => void;
  createNewItem: () => void;
  hasContainers: boolean;
};
function EmptyState({
  createNewContainer,
  createNewItem,
  hasContainers,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="h-24 w-24 rounded-full bg-primary-surface/20 dark:bg-primary-dark-surface/20 flex items-center justify-center mb-6">
        <Blocks className="h-12 w-12 text-primary dark:text-primary-dark" />
      </div>
      <h2 className="text-text-primary dark:text-text-dark-primary mb-2">
        No items {!hasContainers && "or boxes"} yet
      </h2>
      <p className="text-text-secondary dark:text-text-dark-secondary text-center mb-6 max-w-md">
        Get started by creating your first {hasContainers ? "item" : "box"} to
        organize your items
      </p>
      {hasContainers ? (
        <Button
          className="has-[>svg]:px-6 py-3 rounded-lg text-base h-auto hover:bg-primary-hover"
          onClick={createNewItem}
        >
          <Plus className="h-4 w-4" />
          Create Your First Item
        </Button>
      ) : (
        <Button
          className="has-[>svg]:px-6 py-3 rounded-lg text-base h-auto hover:bg-primary-hover"
          onClick={createNewContainer}
        >
          <Plus className="h-4 w-4" />
          Create Your First Box
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
