import { Search } from "lucide-react";

type EmptyStateProps = {
  quickSearch?: boolean;
};
function EmptyState({ quickSearch }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="h-24 w-24 rounded-full bg-background-accent flex items-center justify-center mb-6">
        <Search className="h-12 w-12 text-text-secondary" />
      </div>
      <h2 className="text-text-primary mb-2">No results found</h2>
      <p className="text-text-secondary text-center mb-6 max-w-mdd">
        Try adjusting your search {!quickSearch && `or filter`} to find what
        you're looking for.
      </p>
    </div>
  );
}

export default EmptyState;
