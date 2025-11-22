import usePreference from "../../../hooks/usePreference";

export default function ContainerDetailsSkeleton() {
  const [viewMode] = usePreference<"grid" | "list">(
    "ContainerDetails",
    "view",
    "grid"
  );
  return (
    <div className="space-y-6 animate-pulse">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Back button */}
          <div className="p-2 -ml-2 rounded-lg bg-background-accent h-9 w-9 shrink-0" />

          {/* Title */}
          <div className="h-6 w-40 bg-background-accent rounded" />
        </div>
      </div>

      {/* MOBILE PHOTO */}
      <div className="lg:hidden">
        <div className="w-full aspect-square rounded-lg bg-background-accent border border-border" />
      </div>

      {/* MAIN DETAILS CARD */}
      <div className="bg-background-surface border border-border rounded-lg p-6 lg:flex block gap-6">
        {/* DESKTOP PHOTO */}
        <div className="hidden lg:block w-sm">
          <div className="w-full aspect-square rounded-lg bg-background-accent border border-border" />
        </div>

        {/* DETAILS */}
        <div className="space-y-4 flex-1">
          {/* Location */}
          <div>
            <div className="h-5 w-24 bg-background-accent rounded mb-1" />
            <div className="h-5 w-40 bg-background-accent rounded" />
          </div>

          {/* Description */}
          <div>
            <div className="h-5 w-32 bg-background-accent rounded mb-1" />
            <div className="h-5 w-full bg-background-accent rounded" />
            <div className="h-5 w-3/4 bg-background-accent rounded mt-1" />
            <div className="h-5 w-1/2 bg-background-accent rounded mt-1" />
          </div>

          {/* Last Updated */}
          <div>
            <div className="h-5 w-32 bg-background-accent rounded mb-1" />
            <div className="h-5 w-28 bg-background-accent rounded" />
          </div>
        </div>
      </div>

      {/* ITEMS SECTION */}
      <div className="border-t border-border pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-20 bg-background-accent rounded" />
        </div>

        {viewMode === "grid" ? (
          <>
            {/* Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-background-surface border border-border rounded-lg overflow-hidden"
                >
                  {/* Image */}
                  <div className="aspect-square bg-background-accent" />

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <div className="h-5 w-3/4 bg-background-accent rounded" />
                    <div className="h-4 w-1/2 bg-background-accent rounded" />
                    <div className="h-4 w-2/3 bg-background-accent rounded" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Items List */}
            <div className="bg-background-surface border border-border rounded-lg overflow-hidden animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-4 ${
                    i !== 5 ? "border-b border-border-light" : ""
                  }`}
                >
                  {/* Image/Icon */}
                  <div className="h-12 w-12 rounded-lg bg-background-accent shrink-0" />

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <div className="h-5 w-40 bg-background-accent rounded" />
                  </div>

                  {/* Qty */}
                  <div className="hidden sm:block">
                    <div className="h-4 w-14 bg-background-accent rounded" />
                  </div>

                  {/* Updated Date */}
                  <div className="hidden md:block">
                    <div className="h-4 w-24 bg-background-accent rounded" />
                  </div>

                  {/* Chevron */}
                  <div className="h-5 w-5 bg-background-accent rounded shrink-0" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
