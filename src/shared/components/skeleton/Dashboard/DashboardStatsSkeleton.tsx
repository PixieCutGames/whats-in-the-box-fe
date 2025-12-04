export default function DashboardStatsSkeleton() {
  return (
    <div
      data-loading
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse"
    >
      {/* Repeat for 4 cards */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg p-6"
        >
          {/* Label */}
          <div className="h-4 w-24 bg-background-accent dark:bg-background-accent/10 rounded mb-3" />

          {/* Value / Link */}
          <div className="h-7 w-20 bg-background-accent dark:bg-background-accent/10 rounded" />
        </div>
      ))}
    </div>
  );
}
