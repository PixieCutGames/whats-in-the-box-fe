export default function QuickSearchResultsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* BOXES SECTION */}
      <div>
        {/* Title */}
        <h3 className="text-text-secondary dark:text-text-dark-secondary mb-3">
          Boxes
        </h3>

        {/* Results */}
        <div className="space-y-1">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-background-surface/50 dark:bg-background-dark-surface/50"
            >
              {/* Icon */}
              <div className="h-5 w-5 bg-background-accent dark:bg-background-accent/10 rounded shrink-0" />

              {/* Text area */}
              <div className="flex-1 min-w-0 space-y-1">
                {/* Name */}
                <div className="h-4 w-3/4 bg-background-accent dark:bg-background-accent/10 rounded" />
                {/* Location */}
                <div className="h-3 w-1/2 bg-background-accent dark:bg-background-accent/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ITEMS SECTION */}
      <div>
        {/* Title */}
        <h3 className="text-text-secondary dark:text-text-dark-secondary mb-3">
          Items
        </h3>

        {/* Results */}
        <div className="space-y-1">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-background-surface/50 dark:bg-background-dark-surface/50"
            >
              {/* Icon */}
              <div className="h-5 w-5 bg-background-accent dark:bg-background-accent/10 rounded shrink-0" />

              {/* Text area */}
              <div className="flex-1 min-w-0 space-y-1">
                {/* Name */}
                <div className="h-4 w-3/4 bg-background-accent dark:bg-background-accent/10 rounded" />
                {/* Container name */}
                <div className="h-3 w-1/2 bg-background-accent dark:bg-background-accent/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
