export default function SearchPageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* SEARCH BAR */}
      <div className="my-4 relative">
        {/* Input placeholder */}
        <div className="w-full h-12 bg-background-accent rounded-lg border border-border" />
        {/* Search icon placeholder */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 bg-background-accent/70 rounded" />
      </div>

      {/* HEADER CONTROLS */}
      <div className="flex items-center justify-between max-md:items-end gap-4 mb-6 mt-2">
        {/* LEFT SIDE — Type Filter */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-24 lg:w-32 bg-background-accent rounded-md border border-border" />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 max-md:items-end max-md:flex-col-reverse">
          {/* Sort by */}
          <div className="flex items-center gap-1 w-full max-md:w-fit">
            <div className="h-4 w-14 bg-background-accent rounded" />
            <div className="h-9 w-24 lg:w-32 bg-background-accent rounded-md border border-border" />
          </div>

          {/* View Toggle Buttons */}
          <div className="flex items-center gap-1 bg-background-surface border border-border rounded-lg p-1">
            <div className="h-8 w-8 bg-background-accent rounded-md" />
            <div className="h-8 w-8 bg-background-accent rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
