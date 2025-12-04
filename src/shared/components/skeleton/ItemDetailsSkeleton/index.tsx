export default function ItemDetailsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4">
        {/* Left: Back + Title */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Back button */}
          <div className="p-2 -ml-2 rounded-lg bg-background-accent dark:bg-background-accent/10 h-9 w-9 shrink-0" />

          {/* Title */}
          <div className="h-6 w-40 bg-background-accent dark:bg-background-accent/10 rounded" />
        </div>
      </div>

      {/* MOBILE IMAGE */}
      <div className="lg:hidden">
        <div className="w-full aspect-square rounded-lg bg-background-accent dark:bg-background-accent/10 border border-border dark:border-border-dark" />
      </div>

      {/* DETAILS CARD */}
      <div className="bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg p-6 lg:flex block gap-6">
        {/* DESKTOP IMAGE */}
        <div className="hidden lg:block w-sm">
          <div className="w-full aspect-square rounded-lg bg-background-accent dark:bg-background-accent/10 border border-border dark:border-border-dark" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-4 flex-1">
          {/* Location */}
          <div>
            <div className="h-5 w-24 bg-background-accent dark:bg-background-accent/10 rounded mb-1" />
            <div className="h-5 w-40 bg-background-accent dark:bg-background-accent/10 rounded" />
          </div>

          {/* Quantity */}
          <div>
            <div className="h-5 w-16 bg-background-accent dark:bg-background-accent/10 rounded mb-1" />
            <div className="h-5 w-10 bg-background-accent dark:bg-background-accent/10 rounded" />
          </div>

          {/* Description */}
          <div>
            <div className="h-5 w-28 bg-background-accent dark:bg-background-accent/10 rounded mb-1" />
            <div className="h-5 w-full bg-background-accent dark:bg-background-accent/10 rounded" />
            <div className="h-5 w-3/4 bg-background-accent dark:bg-background-accent/10 rounded mt-1" />
            <div className="h-5 w-1/2 bg-background-accent dark:bg-background-accent/10 rounded mt-1" />
          </div>

          {/* Last Updated */}
          <div>
            <div className="h-5 w-28 bg-background-accent dark:bg-background-accent/10 rounded mb-1" />
            <div className="h-5 w-24 bg-background-accent dark:bg-background-accent/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
