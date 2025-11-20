export default function ContainerListViewSkeleton() {
  return (
    <div className="bg-background-surface border border-border rounded-lg overflow-hidden animate-pulse">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`flex items-center gap-4 p-4 ${
            index !== 4 ? "border-b border-border-light" : ""
          }`}
        >
          {/* Image/Icon placeholder */}
          <div className="h-12 w-12 rounded-lg bg-background-accent shrink-0" />

          {/* Name */}
          <div className="flex-1 min-w-0">
            <div className="h-5 w-3/4 bg-background-accent rounded" />
          </div>

          {/* Items Count */}
          <div className="hidden sm:block">
            <div className="h-4 w-20 bg-background-accent rounded" />
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
