import ItemGridViewSkeleton from "../ItemGridViewSkeleton";

function Items() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-pulse">
        {/* Title */}
        <div className="h-8 w-28 bg-background-accent rounded" />
      </div>
      {/* TODO: get saved pref and display the correct view  */}
      <ItemGridViewSkeleton />
    </div>
  );
}

export default Items;
