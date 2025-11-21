export default function RecentActivitySkeleton() {
  return (
    <div className="bg-background-surface border border-border rounded-lg p-6 animate-pulse">
      {/* Title */}
      <div className="h-5 w-32 bg-background-accent rounded mb-4" />

      {/* Activity Rows */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-start gap-3 pb-3 last:pb-0 border-b border-border-light last:border-0"
          >
            {/* Bullet Circle */}
            <div className="h-2 w-2 rounded-full bg-background-accent mt-2 shrink-0" />

            {/* Message Placeholder */}
            <div className="flex-1 min-w-0">
              <div className="h-4 w-full bg-background-accent rounded" />
            </div>

            {/* Timestamp Placeholder */}
            <div className="hidden sm:block">
              <div className="h-4 w-12 bg-background-accent rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
