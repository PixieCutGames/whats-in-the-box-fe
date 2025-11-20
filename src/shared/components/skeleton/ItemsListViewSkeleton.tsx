export default function ItemsListViewSkeleton() {
  return (
    <div className="bg-background-surface border border-border rounded-lg overflow-hidden animate-pulse">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`flex items-center gap-4 p-4 ${
            index !== 4 ? "border-b border-border-light" : ""
          }`}
        >
          {/* Image / Icon */}
          <div className="h-12 w-12 rounded-lg bg-background-accent shrink-0" />

          {/* Name + Location */}
          <div className="flex-1 min-w-0">
            {/* Name */}
            <div className="h-5 w-3/4 bg-background-accent rounded" />

            {/* Location */}
            <div className="h-4 w-1/2 bg-background-accent rounded mt-2" />
          </div>

          {/* Quantity */}
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
  );
}
