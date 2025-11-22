import { Package, Plus } from "lucide-react";

type EmptyStateProps = {
  createNewContainer: () => void;
};
function EmptyState({ createNewContainer }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="h-32 w-32 rounded-full bg-primary-surface/20 flex items-center justify-center mb-6">
        <Package className="h-16 w-16 text-primary" />
      </div>
      <h2 className="text-text-primary mb-2 text-center">
        Welcome to What's in the Box!
      </h2>
      <p className="text-text-secondary text-center mb-2 max-w-md">
        You have no boxes yet.
      </p>
      <p className="text-text-secondary text-center mb-8 max-w-md">
        Start by creating your first box to add and track items.
      </p>
      <button
        onClick={createNewContainer}
        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors"
      >
        <Plus className="h-5 w-5" />
        Create Your First Box
      </button>
    </div>
  );
}

export default EmptyState;
