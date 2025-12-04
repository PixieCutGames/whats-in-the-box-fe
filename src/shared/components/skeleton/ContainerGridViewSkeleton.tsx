function ContainerGridViewSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg overflow-hidden"
        >
          {/* Image/Icon Placeholder */}
          <div className="aspect-square bg-background-accent/50 dark:bg-background-accent/5" />

          {/* Content */}
          <div className="p-4 space-y-2">
            {/* Title */}
            <div className="h-5 w-3/4 bg-background-accent dark:bg-background-accent/10 rounded" />
            {/* Items count */}
            <div className="h-4 w-1/2 bg-background-accent dark:bg-background-accent/10 rounded" />
            {/* Updated date */}
            <div className="h-4 w-2/3 bg-background-accent dark:bg-background-accent/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContainerGridViewSkeleton;
