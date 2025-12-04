import { Package, Plus } from "lucide-react";
import { Button } from "../../shared/components/ui/Button";

type EmptyStateProps = {
  createNewContainer: () => void;
};
function EmptyState({ createNewContainer }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="h-32 w-32 rounded-full bg-primary-surface/20 dark:bg-primary-dark-surface/20 flex items-center justify-center mb-6">
        <Package className="h-16 w-16 text-primary dark:text-primary-dark" />
      </div>
      <h2 className="text-text-primary dark:text-text-dark-primary mb-2">
        No boxes yet
      </h2>
      <p className="text-text-secondary dark:text-text-dark-secondary text-center mb-6 max-w-md">
        Get started by creating your first box to organize your items
      </p>
      <Button
        className="has-[>svg]:px-6 py-3 rounded-lg text-base h-auto hover:bg-primary-hover"
        onClick={createNewContainer}
      >
        <Plus className="h-4 w-4" />
        Create Your First Box
      </Button>
    </div>
  );
}

export default EmptyState;
