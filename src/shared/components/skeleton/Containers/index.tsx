import ContainerGridViewSkeleton from "../ContainerGridViewSkeleton";

function Containers() {
  return (
    <div className="space-y-6">
      {/* Header with View Controls */}
      <div className="flex items-center justify-between animate-pulse">
        {/* Title */}
        <div className="h-8 w-28 bg-background-accent rounded" />

        {/* Right Side: View Toggle + Add Button */}
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-background-surface border border-border rounded-lg p-1">
            <div className="h-8 w-8 bg-background-accent rounded-md" />
            <div className="h-8 w-8 bg-background-accent rounded-md" />
          </div>

          {/* Add Button */}
          <div className="flex items-center gap-2 px-4 py-2 bg-background-accent rounded-lg">
            {/* Icon */}
            <div className="h-4 w-4 bg-background-accent/70 rounded" />

            {/* Text (hidden on mobile — matching your real UI) */}
            <div className="hidden sm:block h-4 w-16 bg-background-accent/70 rounded" />
          </div>
        </div>
      </div>
      {/* TODO: get saved pref and display the correct view  */}
      <ContainerGridViewSkeleton />
    </div>
  );
}

export default Containers;
