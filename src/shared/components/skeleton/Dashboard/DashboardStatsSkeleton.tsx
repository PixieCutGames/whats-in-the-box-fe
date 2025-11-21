export default function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
      {/* Repeat for 4 cards */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-background-surface border border-border rounded-lg p-6"
        >
          {/* Label */}
          <div className="h-4 w-24 bg-background-accent rounded mb-3" />

          {/* Value / Link */}
          <div className="h-7 w-20 bg-background-accent rounded" />
        </div>
      ))}
    </div>
  );
}
