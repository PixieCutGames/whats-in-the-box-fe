export default function RecentActivitySkeleton() {
  return (
    <div
      data-loading
      className="bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg p-6 animate-pulse"
    >
      {/* Title */}
      <div className="h-5 w-32 bg-background-accent dark:bg-background-accent/10 rounded mb-4" />

      {/* Activity Rows */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-start gap-3 pb-3 last:pb-0 border-b border-border-light dark:border-border-dark-light last:border-0"
          >
            {/* Bullet Circle */}
            <div className="h-2 w-2 rounded-full bg-background-accent dark:bg-background-accent/10 mt-2 shrink-0" />

            {/* Message Placeholder */}
            <div className="flex-1 min-w-0">
              <div className="h-4 w-full bg-background-accent dark:bg-background-accent/10 rounded" />
            </div>

            {/* Timestamp Placeholder */}
            <div className="hidden sm:block">
              <div className="h-4 w-12 bg-background-accent dark:bg-background-accent/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
