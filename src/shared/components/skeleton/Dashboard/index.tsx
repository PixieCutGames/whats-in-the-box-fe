import ContainerGridViewSkeleton from "../ContainerGridViewSkeleton";
import DashboardStatsSkeleton from "./DashboardStatsSkeleton";
import RecentActivitySkeleton from "./RecentActivitySkeleton";

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6 animate-pulse">
        {/* Left: Welcome Text Placeholder */}
        <div className="h-8 w-40 bg-background-accent rounded" />

        {/* Right: Add Box Button Placeholder */}
        <div className="flex items-center gap-2 px-4 py-2 bg-background-accent rounded-lg">
          {/* Icon */}
          <div className="h-4 w-4 bg-background-accent/70 rounded" />
          {/* Text (hidden on mobile like real button) */}
          <div className="hidden sm:block h-4 w-16 bg-background-accent/70 rounded" />
        </div>
      </div>
      {/* Stats Cards */}
      <DashboardStatsSkeleton />
      {/* Recent Activity */}
      <RecentActivitySkeleton />
      {/* Container cards */}
      <div className="bg-background-surface border border-border rounded-lg p-6 animate-pulse">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          {/* Title */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-32 bg-background-accent rounded" />
            <div className="max-md:hidden h-5 w-28 bg-background-accent rounded" />
          </div>

          {/* View All */}
          <div className="flex items-center gap-1">
            <div className="h-4 w-16 bg-background-accent rounded" />
            <div className="h-4 w-4 bg-background-accent rounded" />
          </div>
        </div>

        <ContainerGridViewSkeleton />
      </div>
    </div>
  );
}

export default Dashboard;
