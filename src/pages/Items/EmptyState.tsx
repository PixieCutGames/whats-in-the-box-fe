import { Blocks, Plus } from "lucide-react";

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
      <div className="h-24 w-24 rounded-full bg-background-accent flex items-center justify-center mb-6">
        <Blocks className="h-12 w-12 text-text-secondary" />
      </div>
      <h2 className="text-text-primary mb-2">
        No items {!hasContainers && "or boxes"} yet
      </h2>
      <p className="text-text-secondary text-center mb-6 max-w-md">
        Get started by creating your first {hasContainers ? "item" : "box"} to
        organize your items
      </p>
      {hasContainers ? (
        <button
          className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors"
          onClick={createNewItem}
        >
          <Plus className="h-5 w-5" />
          Create Your First Item
        </button>
      ) : (
        <button
          className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors"
          onClick={createNewContainer}
        >
          <Plus className="h-5 w-5" />
          Create Your First Box
        </button>
      )}
    </div>
  );
}

export default EmptyState;
